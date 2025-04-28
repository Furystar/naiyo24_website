document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('.submit-button');
    
    // Add loading state to submit button
    const spinner = document.createElement('span');
    spinner.className = 'spinner';
    submitButton.appendChild(spinner);
    const buttonText = document.createElement('span');
    buttonText.className = 'button-text';
    buttonText.textContent = submitButton.textContent;
    submitButton.textContent = '';
    submitButton.appendChild(buttonText);
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.disabled = true;
        spinner.style.display = 'inline-block';
        buttonText.textContent = 'Sending...';
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service_type: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        try {
            const response = await fetch('http://localhost:5000/api/submit-contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Show success message
                alert('Thank you for your message! We will contact you shortly. (Reference ID: ' + data.submission_id + ')');
                contactForm.reset();
            } else {
                throw new Error(data.error || 'Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            spinner.style.display = 'none';
            buttonText.textContent = 'Send Message';
        }
    });
    
    // Mobile menu toggle
    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
    
    // Initialize any other needed functionality
    document.querySelector('.hamburger').addEventListener('click', toggleMenu);
});