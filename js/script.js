document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. OFF-CANVAS MENU LOGIC ---
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const offCanvasMenu = document.getElementById('offCanvasMenu');

    if (openMenu && closeMenu && offCanvasMenu) {
        // Function to Toggle Menu
        const toggleMenu = (state) => {
            if (state === 'open') {
                offCanvasMenu.classList.add('active'); // Matches CSS .active
                document.body.style.overflow = 'hidden'; // Prevents background scroll when menu is open
            } else {
                offCanvasMenu.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enables scroll
            }
        };

        openMenu.addEventListener('click', () => toggleMenu('open'));
        closeMenu.addEventListener('click', () => toggleMenu('close'));

        // Close menu on link click (important for mobile UX)
        offCanvasMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu('close'));
        });
    }

    // --- 2. NEWS CAROUSEL LOGIC ---
    const carousel = document.getElementById('newsCarousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && prevBtn && nextBtn) {
        
        const updateNavButtons = () => {
            const isStart = carousel.scrollLeft <= 5; 
            const isEnd = Math.ceil(carousel.scrollLeft + carousel.clientWidth) >= carousel.scrollWidth - 5; 
            
            prevBtn.style.display = isStart ? 'none' : 'block';
            nextBtn.style.display = isEnd ? 'none' : 'block';
        };
        
        // Scroll Next
        nextBtn.addEventListener('click', () => {
            const firstCard = carousel.querySelector('.news-card');
            if (firstCard) {
                // Get dynamic card width + gap
                const scrollDistance = firstCard.clientWidth + 20; 
                carousel.scrollBy({ left: scrollDistance, behavior: 'smooth' });
            }
        });

        // Scroll Previous
        prevBtn.addEventListener('click', () => {
            const firstCard = carousel.querySelector('.news-card');
            if (firstCard) {
                const scrollDistance = firstCard.clientWidth + 20;
                carousel.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
            }
        });

        carousel.addEventListener('scroll', updateNavButtons);
        window.addEventListener('resize', updateNavButtons);
        updateNavButtons(); // Run on load
    }
    
    // --- 3. HERO SLIDESHOW LOGIC ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        const intervalTime = 6000; 
        const animations = ['move-left', 'move-right', 'move-up', 'move-down'];

        function nextSlide() {
            slides[currentSlide].classList.remove('active', ...animations);
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');

            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            slides[currentSlide].classList.add(randomAnimation);
        }

        // Init
        slides[0].classList.add('active', animations[0]);
        setInterval(nextSlide, intervalTime);
    }
    
    // --- 4. SCROLL REVEAL (Intersection Observer) ---
    const revealSections = document.querySelectorAll('.stagger-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const staggeredItems = entry.target.querySelectorAll('.stagger-item');
                staggeredItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`; 
                    item.classList.add('in-view');
                });
                
                revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealSections.forEach(section => revealObserver.observe(section));

});
