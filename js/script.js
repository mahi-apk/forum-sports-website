document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. OFF-CANVAS MENU LOGIC (Existing Functionality) ---
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const offCanvasMenu = document.getElementById('offCanvasMenu');

    if (openMenu && closeMenu && offCanvasMenu) {
        openMenu.addEventListener('click', () => {
            offCanvasMenu.classList.add('open');
        });

        closeMenu.addEventListener('click', () => {
            offCanvasMenu.classList.remove('open');
        });

        // Close menu on link click
        offCanvasMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                offCanvasMenu.classList.remove('open');
            });
        });
    }

    // --- 2. NEWS CAROUSEL LOGIC (New Functionality) ---
    const carousel = document.getElementById('newsCarousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && prevBtn && nextBtn) {
        
        // Function to check scroll position and update button visibility
        const updateNavButtons = () => {
            // Check if scroll is at the very beginning (0)
            const isStart = carousel.scrollLeft <= 1; // Added a 1px tolerance for edge cases
            
            // Check if scroll is at the very end
            // scrollWidth is total width, clientWidth is visible width
            const isEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1; 
            
            // Hide Prev button at the start, show otherwise
            prevBtn.classList.toggle('hidden', isStart);
            
            // Hide Next button at the end, show otherwise
            nextBtn.classList.toggle('hidden', isEnd);
        };
        
        // Scroll Next
        nextBtn.addEventListener('click', () => {
            // Calculate the width of one card plus the gap (assumed 20px in CSS)
            const firstCard = carousel.querySelector('.news-card');
            if (firstCard) {
                const scrollDistance = firstCard.offsetWidth + 20; 
                carousel.scrollBy({ left: scrollDistance, behavior: 'smooth' });
            }
        });

        // Scroll Previous
        prevBtn.addEventListener('click', () => {
            const firstCard = carousel.querySelector('.news-card');
            if (firstCard) {
                const scrollDistance = firstCard.offsetWidth + 20;
                carousel.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
            }
        });

        // Event listeners for updating buttons when user scrolls manually or resizes the window
        carousel.addEventListener('scroll', updateNavButtons);
        window.addEventListener('resize', updateNavButtons);
        
        // Initial check when the page loads
        updateNavButtons();
    }
    
    // --- 3. HERO SLIDESHOW LOGIC (Existing Functionality) ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        const intervalTime = 6000; // Change image every 6 seconds

        const animations = ['move-left', 'move-right', 'move-up', 'move-down'];

        function nextSlide() {
            // Hide current slide
            slides[currentSlide].classList.remove('active', ...animations);

            // Move to next slide
            currentSlide = (currentSlide + 1) % totalSlides;

            // Show next slide
            slides[currentSlide].classList.add('active');

            // Apply random animation
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            slides[currentSlide].classList.add(randomAnimation);
        }

        // Initialize the first slide
        slides[0].classList.add('active', animations[0]);

        // Start the slideshow
        setInterval(nextSlide, intervalTime);
    }
    
    // --- 4. SCROLL REVEAL (Staggered Animation) ---
    const revealSections = document.querySelectorAll('.stagger-reveal');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger the items inside the visible section
                const staggeredItems = entry.target.querySelectorAll('.stagger-item');
                staggeredItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`; 
                    item.classList.add('in-view');
                });
                
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Start slightly earlier than the bottom of the viewport
    });

    revealSections.forEach(section => {
        observer.observe(section);
    });

});