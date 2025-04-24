document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Carousel
    const testimonials = [
        {
            text: "Naiyo24 transformed our online presence completely. Their team delivered beyond our expectations!",
            name: "John Smith",
            company: "TechStart Inc."
        },
        {
            text: "The best decision we made was choosing Naiyo24 for our digital transformation journey.",
            name: "Sarah Johnson",
            company: "Innovate Corp"
        },
        {
            text: "Professional, efficient, and innovative - Naiyo24 exceeded all our requirements.",
            name: "Michael Chen",
            company: "Global Solutions"
        }
    ];

    let currentTestimonial = 0;
    const testimonialContainer = document.querySelector('.testimonial-carousel');

    function updateTestimonial() {
        if (testimonialContainer) {
            const testimonial = testimonials[currentTestimonial];
            testimonialContainer.innerHTML = `
                <div class="testimonial">
                    <p>"${testimonial.text}"</p>
                    <h4>${testimonial.name}</h4>
                    <p class="company">${testimonial.company}</p>
                </div>
            `;
        }
    }

    // Change testimonial every 5 seconds
    if (testimonialContainer) {
        updateTestimonial();
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 5000);
    }

    // Form Submission
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to your server
            alert('Thank you for your inquiry! We will get back to you soon.');
            quoteForm.reset();
        });
    }

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .pricing-card, .testimonial').forEach(el => {
        observer.observe(el);
    });

    // WhatsApp Button Animation
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        whatsappButton.addEventListener('mouseenter', () => {
            whatsappButton.style.transform = 'scale(1.1)';
        });

        whatsappButton.addEventListener('mouseleave', () => {
            whatsappButton.style.transform = 'scale(1)';
        });
    }

    // Modal Functions
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
});