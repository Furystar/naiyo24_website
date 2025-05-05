document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'form-notification';
    document.body.appendChild(notification);

    // API configuration
    const API_URL = 'http://localhost:5000/api/contact'; // Update with your actual API endpoint

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showErrorNotification('Please fill all required fields correctly');
            return;
        }

        // Get form data
        const formData = {
            name: sanitizeInput(contactForm.querySelector('#name').value.trim()),
            email: sanitizeInput(contactForm.querySelector('#email').value.trim()),
            phone: sanitizeInput(contactForm.querySelector('#phone').value.trim()),
            service_interest: sanitizeInput(contactForm.querySelector('#service').value),
            message: sanitizeInput(contactForm.querySelector('#message').value.trim())
        };

        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="button-text">Sending...</span><i class="fas fa-spinner fa-spin"></i>';

        try {
            // Send data to backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit form');
            }
            
            // Show success animation
            showSuccessNotification(formData.name);
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Submission error:', error);
            showErrorNotification(error.message || 'Something went wrong. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="button-text">Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.classList.remove('error');
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            }
        });
        
        // Validate email format
        const emailField = contactForm.querySelector('#email');
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
        // Basic sanitization - prevent XSS
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
                    <p>Your message has been successfully sent.</p>
                </div>
            </div>
        `;
        
        notification.classList.add('show', 'success');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    function showErrorNotification(message = 'Something went wrong. Please try again.') {
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

    // Clear field errors when user starts typing
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});