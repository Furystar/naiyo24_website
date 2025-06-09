document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .about-img-animate, .value-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Run once on load
    setTimeout(animateOnScroll, 100);
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for sections with bg-parallax class
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.bg-parallax');
        
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementTop = element.offsetTop;
            const distance = scrollPosition - elementTop;
            const speed = element.dataset.speed || 0.3;
            
            if (scrollPosition > elementTop - window.innerHeight && scrollPosition < elementTop + element.offsetHeight) {
                element.style.backgroundPositionY = `${distance * speed}px`;
            }
        });
    });

    // Partner Companies Carousel
    const partnerCompanies = [
        { name: 'Bhukk', letter: 'B', desc: 'Food Technology Solutions' },
        { name: 'EduQuest247', letter: 'E', desc: 'Online Learning Platform' },
        { name: 'OEMS 24', letter: 'O', desc: 'Enterprise Management' },
        { name: 'Nariii', letter: 'N', desc: 'Fashion & Lifestyle' },
        { name: 'Sirf Bill', letter: 'S', desc: 'Payment Solutions' },
        { name: 'Luriana 24', letter: 'L', desc: 'Digital Marketing' },
        { name: 'Startiva', letter: 'S', desc: 'Business Innovation' },
        { name: 'Digitizez', letter: 'D', desc: 'Digital Transformation' },
        { name: 'Webilixx', letter: 'W', desc: 'Web Solutions' },
        { name: '2Stranger', letter: '2', desc: 'Creative Agency' },
    ];

    function getRandomColor() {
        // Enhanced pastel color generator
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 30 + 60); // 60-90%
        const lightness = Math.floor(Math.random() * 15 + 55); // 55-70%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    function createPartnerItem(company) {
        const div = document.createElement('div');
        div.className = 'partner-item';
        
        const logo = document.createElement('div');
        logo.className = 'partner-logo';
        logo.style.background = getRandomColor();
        logo.textContent = company.letter;
        
        const name = document.createElement('div');
        name.className = 'partner-name';
        name.textContent = company.name;
        
        const desc = document.createElement('div');
        desc.className = 'partner-desc';
        desc.textContent = company.desc;
        
        div.appendChild(logo);
        div.appendChild(name);
        div.appendChild(desc);
        return div;
    }

    function setupPartnerCarousel() {
        const track = document.querySelector('.partner-track');
        if (!track) return;
        
        // Duplicate the list for seamless infinite scroll
        const companies = [...partnerCompanies, ...partnerCompanies];
        companies.forEach(company => {
            track.appendChild(createPartnerItem(company));
        });

        // Add pause on hover/click functionality
        const carousel = document.querySelector('.partner-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'paused';
            });
            
            carousel.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
            
            carousel.addEventListener('mousedown', () => {
                track.style.animationPlayState = 'paused';
            });
            
            carousel.addEventListener('mouseup', () => {
                track.style.animationPlayState = 'running';
            });
            
            // For touch devices
            carousel.addEventListener('touchstart', () => {
                track.style.animationPlayState = 'paused';
            });
            
            carousel.addEventListener('touchend', () => {
                track.style.animationPlayState = 'running';
            });
        }
    }

    setupPartnerCarousel();

    // Text reveal animation for headings
    const animateHeadings = () => {
        const headings = document.querySelectorAll('.animate-heading');
        
        headings.forEach(heading => {
            const originalText = heading.textContent;
            heading.textContent = '';
            
            for (let i = 0; i < originalText.length; i++) {
                const span = document.createElement('span');
                span.textContent = originalText[i] === ' ' ? ' ' : originalText[i];
                span.style.opacity = '0';
                span.style.transform = 'translateY(15px)';
                span.style.display = 'inline-block';
                span.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
                span.style.transitionDelay = `${i * 0.05}s`;
                heading.appendChild(span);
            }
        });
        
        const revealText = () => {
            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    const spans = heading.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        };
        
        revealText();
        window.addEventListener('scroll', revealText);
    };
    
    // Run text animations
    setTimeout(animateHeadings, 200);
    
    // About page image animation on scroll
    const aboutImgs = document.querySelectorAll('.about-img-animate');
    function animateAboutImgs() {
        aboutImgs.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                img.classList.add('visible');
            }
        });
    }
    
    animateAboutImgs();
    window.addEventListener('scroll', animateAboutImgs);
    
    // Add hover effect to service cards and feature cards
    const addTiltEffect = () => {
        const cards = document.querySelectorAll('.service-card, .feature-card, .value-card, .testimonial-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (y - centerY) / 20;
                const tiltY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6)';
                }, 100);
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease';
            });
        });
    };
    
    // Only add tilt effect on non-mobile devices
    if (window.innerWidth > 768) {
        addTiltEffect();
    }
    
    // Add staggered animation delays to testimonial cards
    const setupStaggeredAnimations = () => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const ratings = document.querySelectorAll('.rating i');
        
        testimonialCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        ratings.forEach((star, index) => {
            star.style.setProperty('--i', index);
        });
    };
    
    setupStaggeredAnimations();
    
    // Add parallax effect to client image and quote icon
    const addParallaxElements = () => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach(card => {
            const clientImage = card.querySelector('.client-image');
            const quoteIcon = card.querySelector('.quote-icon');
            
            if (!clientImage || !quoteIcon) return;
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 10;
                const moveY = (y - centerY) / 10;
                
                clientImage.style.transform = `translateZ(20px) translate(${moveX / 2}px, ${moveY / 2}px)`;
                quoteIcon.style.transform = `translateZ(25px) translate(${moveX}px, ${moveY}px) rotate(-10deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                clientImage.style.transform = 'translateZ(20px)';
                quoteIcon.style.transform = 'translateZ(25px)';
            });
        });
    };
    
    // Only add parallax effect on non-mobile devices
    if (window.innerWidth > 768) {
        addParallaxElements();
    }
});