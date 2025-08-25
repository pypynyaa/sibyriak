document.addEventListener('DOMContentLoaded', function() {
    // ==================== Preloader ====================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Блокируем скролл при загрузке
        document.body.style.overflow = 'hidden';

        // Анимация появления текста в SVG
        const textElement = preloader.querySelector('text');
        if (textElement) {
            const text = textElement.textContent;
            textElement.textContent = '';
            
            // Разбиваем текст на буквы и анимируем появление
            for (let i = 0; i < text.length; i++) {
                const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.textContent = text[i];
                tspan.setAttribute('x', i * 30);
                tspan.setAttribute('y', '35');
                tspan.style.opacity = '0';
                textElement.appendChild(tspan);
                
                // Анимация появления каждой буквы
                if (typeof gsap !== 'undefined') {
                    gsap.to(tspan, {
                        opacity: 1,
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: 'power2.out'
                    });
                }
            }
        }

        // Общая анимация прелоадера
        window.addEventListener('load', function() {
            if (typeof gsap !== 'undefined') {
                gsap.timeline()
                    .to(preloader.querySelector('.preloader__inner'), {
                        duration: 1,
                        scale: 1.05,
                        ease: 'power2.inOut'
                    })
                    .to(preloader, {
                        duration: 0.8,
                        opacity: 0,
                        ease: 'power2.out',
                        onComplete: function() {
                            preloader.style.display = 'none';
                            document.body.style.overflow = 'auto';
                        }
                    });
            } else {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    

        // Фолбэк на случай быстрой загрузки
        setTimeout(function() {
            if (preloader.style.display !== 'none') {
                if (typeof gsap !== 'undefined') {
                    gsap.to(preloader, {
                        duration: 0.8,
                        opacity: 0,
                        onComplete: function() {
                            preloader.style.display = 'none';
                            document.body.style.overflow = 'auto';
                        }
                    });
                } else {
                    preloader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        }, 3000);
    }

    // ==================== Header Management ====================
    function initHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        // Show header immediately
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';

        // Scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Calculate spacing
        const updateHeaderSpacing = () => {
            const headerHeight = header.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
            
            // Update hero section
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.paddingTop = `${headerHeight}px`;
                hero.style.minHeight = `calc(100vh - ${headerHeight}px)`;
            }
        };

        updateHeaderSpacing();
        window.addEventListener('resize', updateHeaderSpacing);
    }

    initHeader();

    // ==================== Mobile Menu ====================
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // ==================== Hero Animations ====================
    if (typeof gsap !== 'undefined') {
        const heroTitleLines = document.querySelectorAll('.hero__title-line span');
        const heroText = document.querySelector('.hero__text');
        const heroScrollText = document.querySelector('.hero__scroll-text');
        const socialLinks = document.querySelectorAll('.social-list__link');
        
        if (heroTitleLines.length > 0) {
            gsap.timeline({ delay: 0.5 })
                .to(heroTitleLines, {
                    duration: 1.2,
                    y: 0,
                    ease: 'power4.out',
                    stagger: 0.1
                })
                .to(heroText, {
                    duration: 0.8,
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out'
                }, '-=0.6')
                .to(heroScrollText, {
                    duration: 0.8,
                    opacity: 1,
                    ease: 'power2.out'
                }, '-=0.4')
                .to(socialLinks, {
                    duration: 0.8,
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    stagger: 0.1
                }, '-=0.4');
        }
    }

    // ==================== Initialize AOS ====================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // ==================== Initialize Parallax ====================
    const parallaxElements = document.querySelectorAll('[data-parallax="scroll"]');
    if (parallaxElements.length > 0 && typeof Parallax !== 'undefined') {
        parallaxElements.forEach(element => {
            new Parallax(element, {
                naturalWidth: 1920,
                naturalHeight: 1080,
                speed: 0.3
            });
        });
    }

    // ==================== Scroll Animations ====================
    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('[data-animate]');
        animateElements.forEach(element => {
            const animation = element.getAttribute('data-animate');
            
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                [animation]: 50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    // ==================== Villa Card Hover Effect ====================
    if (typeof gsap !== 'undefined') {
        const villaCards = document.querySelectorAll('.villa-card');
        villaCards.forEach(card => {
            const image = card.querySelector('.villa-card__image');
            if (!image) return;
            
            card.addEventListener('mousemove', function(e) {
                const x = e.clientX - card.getBoundingClientRect().left;
                const y = e.clientY - card.getBoundingClientRect().top;
                const centerX = card.offsetWidth / 2;
                const centerY = card.offsetHeight / 2;
                const moveX = (x - centerX) / 20;
                const moveY = (y - centerY) / 20;
                
                gsap.to(image, {
                    duration: 0.5,
                    x: moveX,
                    y: moveY,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(image, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: 'power2.out'
                });
            });
        });
    }

    // ==================== Final Adjustments ====================
    // Ensure header doesn't overlap content
    setTimeout(() => {
        const header = document.querySelector('.header');
        if (header) {
            document.body.style.paddingTop = `${header.offsetHeight}px`;
        }
    }, 300);

            function checkScroll() {
            const elements = document.querySelectorAll('.contact-info__card, .faq-item, .section__title');
            elements.forEach(element => {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
});