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

    // API endpoint
    const API_BASE_URL = 'http://localhost:5000'; // Change this in production

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'form-notification';
    document.body.appendChild(notification);

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
    serviceForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        const submitButton = document.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="button-text">Submitting...</span><i class="fas fa-spinner fa-spin"></i>';
        
        try {
            // Collect form data
            const formData = {
                name: sanitizeInput(document.getElementById('name').value),
                email: sanitizeInput(document.getElementById('email').value),
                phone: sanitizeInput(document.getElementById('phone').value),
                company: sanitizeInput(document.getElementById('company').value),
                service_type: serviceTypeInput.value,
                budget: document.getElementById('budget').value,
                timeline: document.getElementById('timeline').value,
                requirements: sanitizeInput(document.getElementById('requirements').value)
            };

            // Send data to backend
            const response = await fetch(`${API_BASE_URL}/api/web-development`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();
            
            // Show success animation
            showSuccessNotification(formData.name);
            
            // Close modal and reset form
            closeForm();
            serviceForm.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorNotification(error.message || 'There was an error submitting your form');
        } finally {
            // Reset button state
            const submitButton = document.querySelector('.submit-button');
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="button-text">Submit Inquiry</span><i class="fas fa-paper-plane"></i>';
        }
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

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = serviceForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            }
        });

        // Validate email format
        const emailField = serviceForm.querySelector('#email');
        if (emailField.value && !isValidEmail(emailField.value)) {
            emailField.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // Notification animations
    function showSuccessNotification(name) {
        notification.innerHTML = `
            <div class="notification-content success">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <div class="notification-text">
                    <h3>Thank you, ${name}!</h3>
                    <p>Your inquiry has been successfully submitted.</p>
                </div>
            </div>
        `;
        
        notification.classList.add('show', 'success');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    function showErrorNotification(message) {
        notification.innerHTML = `
            <div class="notification-content error">
                <svg class="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="crossmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="crossmark__cross" fill="none" d="M16 16 36 36 M36 16 16 36"/>
                </svg>
                <div class="notification-text">
                    <h3>Oops!</h3>
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        notification.classList.add('show', 'error');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Close notification when clicked
    notification.addEventListener('click', function() {
        this.classList.remove('show');
    });

    // Clear field errors on input
    const formInputs = serviceForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});