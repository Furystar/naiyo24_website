document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('DOMContentLoaded', function() {
        // Call Button functionality
        const callButton = document.getElementById('callButton');
        if (callButton) {
            callButton.addEventListener('click', function(e) {
                // Check if on mobile device
                if (!isMobileDevice()) {
                    e.preventDefault();
                    alert('Please use a mobile device to call or dial: +91 7003226046');
                    // Alternative: window.location.href = 'tel:+917003226046';
                }
                // On mobile devices, the href="tel:" will work automatically
            });
        }
    
        // Email Button functionality
        const emailButton = document.getElementById('emailButton');
        if (emailButton) {
            emailButton.addEventListener('click', function(e) {
                // You can add additional tracking or logic here if needed
                console.log('Email button clicked');
                // The href="mailto:" will work automatically
            });
        }
    
        // Mobile detection function
        function isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    });

    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            // Validate form before submission
            if (!validateForm()) {
                return;
            }
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                const formData = {
                    name: sanitizeInput(document.getElementById('name').value),
                    email: sanitizeInput(document.getElementById('email').value),
                    phone: sanitizeInput(document.getElementById('phone').value),
                    service_type: sanitizeInput(document.getElementById('service').value),
                    message: sanitizeInput(document.getElementById('message').value)
                };
                
                // Using environment variable for API endpoint
                const apiEndpoint = process.env.CONTACT_FORM_API || 'https://your-api-endpoint.com/api/submit-contact-form';
                
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify(formData),
                    credentials: 'same-origin' // Include cookies if needed
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Server responded with status ${response.status}`);
                }
                
                const data = await response.json();
                
                // Show success message
                showAlert('success', `Thank you, ${formData.name}! Your message has been sent. We'll contact you soon.`);
                
                // Reset form
                contactForm.reset();
                
                // Track successful submission (optional)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_form_submission', {
                        'event_category': 'engagement',
                        'event_label': 'Contact Form'
                    });
                }
                
            } catch (error) {
                console.error('Submission error:', error);
                showAlert('error', `Submission failed: ${error.message}`);
                
                // Track failed submission (optional)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'exception', {
                        'description': `Contact form error: ${error.message}`,
                        'fatal': false
                    });
                }
                
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }
    
    // Form validation function
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const service = document.getElementById('service').value;
        
        // Simple validation
        if (!name) {
            showAlert('error', 'Please enter your name');
            return false;
        }
        
        if (!email) {
            showAlert('error', 'Please enter your email address');
            return false;
        } else if (!isValidEmail(email)) {
            showAlert('error', 'Please enter a valid email address');
            return false;
        }
        
        if (!service) {
            showAlert('error', 'Please select a service');
            return false;
        }
        
        if (!message) {
            showAlert('error', 'Please enter your message');
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Input sanitization
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    // Alert notification system
    function showAlert(type, message) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `form-alert alert-${type}`;
        alertDiv.innerHTML = `
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        `;
        
        // Insert before the form
        contactForm.parentNode.insertBefore(alertDiv, contactForm);
        
        // Add close button functionality
        alertDiv.querySelector('.alert-close').addEventListener('click', function() {
            alertDiv.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
    
    // Add CSS for alerts (could also be in your CSS file)
    const style = document.createElement('style');
    style.textContent = `
        .form-alert {
            padding: 15px 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            animation: slideIn 0.3s ease-out;
            position: relative;
        }
        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .alert-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .alert-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            padding: 0 0 0 15px;
            color: inherit;
        }
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});