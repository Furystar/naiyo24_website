document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded'); // Debugging

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('active', window.scrollY > 300);
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Billing Toggle Functionality - FIXED VERSION
    const billingToggle = document.getElementById('billingToggle');
    console.log('Billing toggle element:', billingToggle); // Debugging

    function updateAllPrices(isMonthly) {
        console.log('Updating prices to:', isMonthly ? 'Monthly' : 'One-time'); // Debugging
        
        // Update prices in the plan cards
        const prices = isMonthly ? 
            ['₹1,499', '₹3,599', '₹5,099+'] : 
            ['₹14,999', '₹35,999', '₹50,999+'];
        
        const periods = isMonthly ? 
            'per month' : 
            'one-time payment';

        // Update desktop plan cards
        document.querySelectorAll('.plan-card .price').forEach((el, i) => {
            el.textContent = prices[i];
            console.log(`Updated desktop price ${i} to:`, prices[i]); // Debugging
        });
        
        document.querySelectorAll('.plan-card .period').forEach(el => {
            el.textContent = periods;
        });

        // Update mobile dropdown options
        const mobilePlanSelector = document.getElementById('mobilePlanSelector');
        if (mobilePlanSelector) {
            const options = mobilePlanSelector.querySelectorAll('option');
            if (options.length >= 4) {
                options[1].textContent = isMonthly ? 
                    'Starter - ₹1,499/month' : 'Starter - ₹14,999';
                options[2].textContent = isMonthly ? 
                    'Professional - ₹3,599/month' : 'Professional - ₹35,999';
                options[3].textContent = isMonthly ? 
                    'Enterprise - ₹5,099+/month' : 'Enterprise - ₹50,999+';
            }
        }

        // Update mobile plan content
        document.querySelectorAll('.mobile-plan-content .price').forEach((el, i) => {
            el.textContent = prices[i];
        });
        
        document.querySelectorAll('.mobile-plan-content .period').forEach(el => {
            el.textContent = periods;
        });
    }

    if (billingToggle) {
        // Initialize prices on load
        updateAllPrices(billingToggle.checked);
        
        // Handle toggle changes
        billingToggle.addEventListener('change', function() {
            updateAllPrices(this.checked);
        });
    } else {
        console.error('Billing toggle element not found!'); // Debugging
    }

    // Mobile Plans Dropdown
    const planSelector = document.getElementById('mobilePlanSelector');
    if (planSelector) {
        const planContents = document.querySelectorAll('.mobile-plan-content');
        const planCards = document.querySelectorAll('.plan-card');
        
        // Clone plan content for mobile
        planCards.forEach(card => {
            const planType = card.classList.contains('featured') ? 
                'professional' : card.querySelector('h3').textContent.toLowerCase();
            const contentDiv = document.createElement('div');
            contentDiv.className = `mobile-plan-card ${planType}`;
            contentDiv.innerHTML = card.innerHTML;
            document.getElementById(`${planType}Plan`).appendChild(contentDiv);
        });
        
        // Show first plan by default
        document.getElementById('starterPlan').classList.add('active');
        
        planSelector.addEventListener('change', function() {
            planContents.forEach(content => content.classList.remove('active'));
            const selectedPlan = document.getElementById(`${this.value}Plan`);
            if (selectedPlan) {
                selectedPlan.classList.add('active');
                selectedPlan.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});