document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Form submission handler
    const webForm = document.getElementById('webForm');
    if (webForm) {
        webForm.addEventListener('submit', handleFormSubmit);
    }

    // Close modal buttons
    document.querySelector('.close-modal')?.addEventListener('click', closeForm);
    document.querySelector('.close-success-modal')?.addEventListener('click', closeSuccessModal);

    // Close modals when clicking outside
    document.getElementById('modalOverlay')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeForm();
        }
    });

    document.getElementById('successModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeSuccessModal();
        }
    });

    // Close modals with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.getElementById('modalOverlay')?.classList.contains('active')) {
                closeForm();
            }
            if (!document.getElementById('successModal')?.classList.contains('hidden')) {
                closeSuccessModal();
            }
        }
    });
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
    document.body.style.overflow = 'auto';
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = document.createElement('i');
    
    // Show loading state
    buttonText.textContent = 'Submitting...';
    spinner.className = 'fas fa-spinner fa-spin';
    submitButton.insertBefore(spinner, submitButton.querySelector('i'));
    submitButton.querySelector('i').style.display = 'none';
    
    // Collect form data
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        company: form.querySelector('#company').value,
        web_type: form.querySelector('#webType').value,
        platforms: form.querySelector('#platforms').value,
        budget: form.querySelector('#budget').value,
        timeline: form.querySelector('#timeline').value,
        requirements: form.querySelector('#requirements').value
    };

    try {
        // API endpoint (adjust based on your backend URL)
        const API_URL = 'http://localhost:5000/api/web-app';
        
        // Send data to backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Show success message
        buttonText.textContent = 'Submitted!';
        spinner.remove();
        
        setTimeout(() => {
            form.reset();
            closeForm();
            document.getElementById('successModal').classList.remove('hidden');
            buttonText.textContent = 'Submit Inquiry';
        }, 500);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error state
        buttonText.textContent = 'Error - Try Again';
        spinner.remove();
        submitButton.querySelector('i').style.display = 'inline-block';
        
        // Reset after delay
        setTimeout(() => {
            buttonText.textContent = 'Submit Inquiry';
        }, 2000);
    }
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