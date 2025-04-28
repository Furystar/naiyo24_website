// services.js
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modalOverlay = document.getElementById('modalOverlay');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeSuccessModalBtn = document.querySelector('.close-success-modal');
    const serviceForm = document.getElementById('serviceForm');
    const serviceTypeInput = document.getElementById('serviceType');
    const modalTitle = document.getElementById('modalTitle');

    // Service titles mapping
    const serviceTitles = {
        'ecommerce': 'E-commerce Website',
        'corporate': 'Corporate Website',
        'news': 'News & Magazine Website',
        'educational': 'Educational Website',
        'custom-web': 'Custom Website'
    };

    // Open form modal
    window.openForm = function(serviceType) {
        serviceTypeInput.value = serviceType;
        modalTitle.textContent = serviceTitles[serviceType] + ' Inquiry';
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close form modal
    window.closeForm = function() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Close success modal
    window.closeSuccessModal = function() {
        successModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    // Event listeners for close buttons
    closeModalBtn.addEventListener('click', closeForm);
    closeSuccessModalBtn.addEventListener('click', closeSuccessModal);

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeForm();
        }
    });

    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });

    // Form submission handler
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = document.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="button-text">Submitting...</span><i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate form submission
        setTimeout(() => {
            closeForm();
            successModal.classList.remove('hidden');
            serviceForm.reset();
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="button-text">Submit Inquiry</span><i class="fas fa-paper-plane"></i>';
        }, 1500);
    });

    // Close modals with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modalOverlay.classList.contains('active')) {
                closeForm();
            }
            if (!successModal.classList.contains('hidden')) {
                closeSuccessModal();
            }
        }
    });
});