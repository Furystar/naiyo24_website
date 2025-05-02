document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Form submission handler
    const desktopForm = document.getElementById('desktopForm');
    if (desktopForm) {
        desktopForm.addEventListener('submit', handleFormSubmit);
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

function initAnimations() {
    const cards = document.querySelectorAll('.platform-card, .app-card, .tech-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function openForm(appType) {
    const modal = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const appTypeField = document.getElementById('appType');
    
    let title = 'Desktop Application Inquiry';
    switch(appType) {
        case 'windows': title = 'Windows Application Inquiry'; break;
        case 'macos': title = 'macOS Application Inquiry'; break;
        case 'linux': title = 'Linux Application Inquiry'; break;
        case 'business': title = 'Business Software Inquiry'; break;
        case 'multimedia': title = 'Multimedia Application Inquiry'; break;
        case 'utility': title = 'Utility Tool Inquiry'; break;
        case 'games': title = 'Game Development Inquiry'; break;
        case 'scientific': title = 'Scientific Application Inquiry'; break;
        case 'custom': title = 'Custom Solution Inquiry'; break;
        case 'consultation': title = 'Free Desktop App Consultation'; break;
    }
    
    modalTitle.textContent = title;
    appTypeField.value = appType;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeForm() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    
    // Show loading state
    buttonText.textContent = 'Submitting...';
    const spinner = document.createElement('i');
    spinner.className = 'fas fa-spinner fa-spin';
    submitButton.insertBefore(spinner, submitButton.querySelector('i'));
    submitButton.querySelector('i').style.display = 'none';
    
    // Collect form data
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        company: form.querySelector('#company').value,
        app_type: form.querySelector('#appType').value,
        platforms: form.querySelector('#platforms').value,
        budget: form.querySelector('#budget').value,
        requirements: form.querySelector('#requirements').value
    };

    try {
        // API endpoint (adjust based on your backend URL)
        const API_URL = 'http://localhost:5000/api/desktop-app';
        
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

