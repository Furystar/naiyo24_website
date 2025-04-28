// Web Application Services Page Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Form submission handler
    const webForm = document.getElementById('webForm');
    if (webForm) {
        webForm.addEventListener('submit', handleFormSubmit);
    }
});

// Initialize animations with delays
function initAnimations() {
    const cards = document.querySelectorAll('.web-card, .tech-card, .process-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Open inquiry form
function openForm(webType) {
    const modal = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const webTypeField = document.getElementById('webType');
    
    // Set the web type and title based on selection
    let title = 'Web Application Inquiry';
    switch(webType) {
        case 'spa':
            title = 'Single Page Application Inquiry';
            break;
        case 'cms':
            title = 'Content Management System Inquiry';
            break;
        case 'ecommerce':
            title = 'E-commerce Platform Inquiry';
            break;
        case 'saas':
            title = 'SaaS Application Inquiry';
            break;
        case 'enterprise':
            title = 'Enterprise Web Application Inquiry';
            break;
        case 'api':
            title = 'API Services Inquiry';
            break;
        case 'consultation':
            title = 'Free Web Development Consultation';
            break;
    }
    
    modalTitle.textContent = title;
    webTypeField.value = webType;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close all modals
function closeForm() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.getElementById('successModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = document.createElement('i');
    
    // Show loading state
    buttonText.textContent = 'Submitting...';
    spinner.className = 'fas fa-spinner';
    submitButton.insertBefore(spinner, submitButton.querySelector('i'));
    submitButton.querySelector('i').style.display = 'none';
    
    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
        // Hide loading state
        buttonText.textContent = 'Submitted!';
        spinner.remove();
        submitButton.querySelector('i').style.display = 'inline-block';
        
        // Show success message
        setTimeout(() => {
            form.reset();
            document.getElementById('modalOverlay').classList.remove('active');
            document.getElementById('successModal').classList.remove('hidden');
            submitButton.querySelector('i').style.display = 'none';
            buttonText.textContent = 'Submit Inquiry';
        }, 500);
    }, 1500);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});