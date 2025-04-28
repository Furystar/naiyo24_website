document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Form submission handler
    const desktopForm = document.getElementById('desktopForm');
    if (desktopForm) {
        desktopForm.addEventListener('submit', handleFormSubmit);
    }
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
    document.getElementById('successModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    
    // Show loading state
    buttonText.textContent = 'Submitting...';
    const spinner = document.createElement('i');
    spinner.className = 'fas fa-spinner';
    submitButton.insertBefore(spinner, submitButton.querySelector('i'));
    submitButton.querySelector('i').style.display = 'none';
    
    // Simulate submission
    setTimeout(() => {
        buttonText.textContent = 'Submitted!';
        spinner.remove();
        
        setTimeout(() => {
            form.reset();
            document.getElementById('modalOverlay').classList.remove('active');
            document.getElementById('successModal').classList.remove('hidden');
            submitButton.querySelector('i').style.display = 'none';
            buttonText.textContent = 'Submit Inquiry';
        }, 500);
    }, 1500);
}