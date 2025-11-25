/**
 * ================================================================
 * KOATSU - JavaScript Principal
 * ================================================================
 */

// ============================================================
// PAGE TRANSITION MODULE
// ============================================================
const PageTransition = {
    overlay: null,

    init() {
        this.overlay = document.getElementById('pageTransitionOverlay');

        if (!this.overlay) {
            console.warn('Page transition overlay not found');
            return;
        }

        // Intercepter tous les clics sur les liens internes
        this.attachLinkHandlers();

        // Cacher l'overlay au chargement initial
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideOverlay();
            }, 100);
        });
    },

    attachLinkHandlers() {
        // Sélectionner tous les liens internes (navigation)
        const links = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');

        links.forEach(link => {
            // Ne pas intercepter les liens avec target="_blank" ou qui ont des ancres
            const href = link.getAttribute('href');
            if (link.getAttribute('target') === '_blank' ||
                (href && href.includes('#') && !href.startsWith('#'))) {
                return;
            }

            link.addEventListener('click', (e) => {
                // Ne pas intercepter si c'est un lien vers la même page
                const currentPath = window.location.pathname;
                const linkPath = new URL(link.href, window.location.origin).pathname;

                if (currentPath === linkPath) {
                    return;
                }

                e.preventDefault();
                this.navigate(link.href);
            });
        });
    },

    navigate(url) {
        // Montrer l'overlay
        this.showOverlay();

        // Ajouter la classe de transition au body
        document.body.classList.add('transitioning');

        // Animer la page actuelle
        const pageWrapper = document.querySelector('.page-wrapper');
        if (pageWrapper) {
            pageWrapper.classList.add('page-exit');
        }

        // Attendre la fin de l'animation puis naviguer
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    },

    showOverlay() {
        if (this.overlay) {
            this.overlay.classList.add('active');
        }
    },

    hideOverlay() {
        if (this.overlay) {
            this.overlay.classList.remove('active');
            document.body.classList.remove('transitioning');
        }
    }
};

// ============================================================
// SPLASH SCREEN MODULE
// ============================================================
const SplashScreen = {
    /**
     * Configuration du splash screen
     */
    config: {
        duration: 3000, // Durée d'affichage en millisecondes
        fadeOutDuration: 800, // Durée de l'animation de disparition
    },

    /**
     * Initialise le splash screen
     */
    init() {
        this.splashElement = document.getElementById('splashScreen');

        if (!this.splashElement) {
            console.warn('Splash screen element not found');
            return;
        }

        this.show();
    },

    /**
     * Affiche le splash screen
     */
    show() {
        // Ajouter la classe splash-active au body pour cacher le header
        document.body.classList.add('splash-active');

        // Empêcher le scroll pendant le splash screen
        document.body.style.overflow = 'hidden';

        // Cacher le splash screen après la durée configurée
        setTimeout(() => {
            this.hide();
        }, this.config.duration);
    },

    /**
     * Cache le splash screen avec animation
     */
    hide() {
        this.splashElement.classList.add('fade-out');

        // Retirer le splash screen du DOM après l'animation
        setTimeout(() => {
            this.splashElement.style.display = 'none';
            document.body.style.overflow = 'auto';

            // Retirer la classe splash-active pour afficher le header
            document.body.classList.remove('splash-active');

            // Déclencher les animations du hero section
            this.triggerHeroAnimations();
        }, this.config.fadeOutDuration);
    },

    /**
     * Déclenche les animations du hero après le splash screen
     */
    triggerHeroAnimations() {
        const heroSection = document.querySelector('.hero-section');

        if (heroSection) {
            heroSection.classList.add('animate');
        }
    }
};


// ============================================================
// NAVIGATION MODULE
// ============================================================
const Navigation = {
    /**
     * Initialise le module de navigation
     */
    init() {
        this.setupLanguageDropdown();
        this.setupMobileNav();
    },

    /**
     * Configure le dropdown de sélection de langue
     */
    setupLanguageDropdown() {
        const dropdownBtn = document.getElementById('languageDropdown');
        const dropdownMenu = document.getElementById('languageMenu');

        if (!dropdownBtn || !dropdownMenu) {
            return;
        }

        // Toggle dropdown au clic
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', (event) => {
            const dropdown = document.querySelector('.language-selector .dropdown');

            if (dropdown && !dropdown.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    },

    /**
     * Configure la navigation mobile (Menu Overlay)
     */
    setupMobileNav() {
        this.mobileToggle = document.getElementById('mobileMenuToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileMenuClose = document.getElementById('mobileMenuClose');
        this.mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

        if (!this.mobileToggle || !this.mobileMenu) {
            return;
        }

        // Ouvrir le menu au clic sur le hamburger
        this.mobileToggle.addEventListener('click', () => {
            this.openMobileNav();
        });

        // Fermer le menu au clic sur le bouton X
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', () => {
                this.closeMobileNav();
            });
        }

        // Fermer le menu au clic sur le backdrop
        if (this.mobileMenuBackdrop) {
            this.mobileMenuBackdrop.addEventListener('click', () => {
                this.closeMobileNav();
            });
        }

        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('open')) {
                this.closeMobileNav();
            }
        });

        // Fermer le menu lors d'un clic sur un lien de navigation
        const mobileNavLinks = this.mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Petit délai pour l'animation avant la navigation
                setTimeout(() => {
                    this.closeMobileNav();
                }, 150);
            });
        });
    },

    /**
     * Ouvre le menu mobile avec animation
     */
    openMobileNav() {
        if (!this.mobileMenu) return;

        // Ajouter la classe active au bouton hamburger
        this.mobileToggle.classList.add('active');
        this.mobileToggle.setAttribute('aria-expanded', 'true');

        // Ouvrir le menu overlay
        this.mobileMenu.classList.add('open');
        this.mobileMenu.setAttribute('aria-hidden', 'false');

        // Empêcher le scroll du body
        document.body.style.overflow = 'hidden';

        // Focus sur le premier lien pour l'accessibilité
        const firstLink = this.mobileMenu.querySelector('.mobile-nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 400);
        }
    },

    /**
     * Ferme le menu mobile avec animation
     */
    closeMobileNav() {
        if (!this.mobileMenu) return;

        // Retirer la classe active du bouton hamburger
        this.mobileToggle.classList.remove('active');
        this.mobileToggle.setAttribute('aria-expanded', 'false');

        // Fermer le menu overlay
        this.mobileMenu.classList.remove('open');
        this.mobileMenu.setAttribute('aria-hidden', 'true');

        // Réactiver le scroll du body
        document.body.style.overflow = '';

        // Remettre le focus sur le bouton hamburger
        this.mobileToggle.focus();
    },

    /**
     * Toggle le menu mobile (ancien code gardé pour compatibilité)
     */
    toggleMobileNav() {
        if (this.mobileMenu && this.mobileMenu.classList.contains('open')) {
            this.closeMobileNav();
        } else {
            this.openMobileNav();
        }
    }
};


// ============================================================
// UTILITIES MODULE
// ============================================================
const Utils = {
    /**
     * Vérifie si c'est la première visite
     * @returns {boolean}
     */
    isFirstVisit() {
        const hasVisited = sessionStorage.getItem('koatsu_visited');

        if (!hasVisited) {
            sessionStorage.setItem('koatsu_visited', 'true');
            return true;
        }

        return false;
    },

    /**
     * Smooth scroll vers une section
     * @param {string} targetId - ID de l'élément cible
     */
    smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};


// ============================================================
// SCROLL ANIMATIONS MODULE
// ============================================================
const ScrollAnimations = {
    /**
     * Initialise les animations au scroll
     */
    init() {
        this.setupIntersectionObserver();
    },

    /**
     * Configure l'observateur d'intersection
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2 // Déclenche quand 20% de l'élément est visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Optionnel : arrêter d'observer après l'animation
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observer la section services
        const servicesSection = document.querySelector('.services-section');
        if (servicesSection) {
            observer.observe(servicesSection);
        }

        // Observer la section quote
        const quoteSection = document.querySelector('.quote-section');
        if (quoteSection) {
            observer.observe(quoteSection);
        }

        // Observer la section contact
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            observer.observe(contactSection);
        }
    }
};


// ============================================================
// QUOTE FORM MODULE
// ============================================================
const QuoteForm = {
    /**
     * Initialise le formulaire de demande de soumission
     */
    init() {
        this.form = document.getElementById('quoteForm');

        if (!this.form) {
            return;
        }

        this.setupFormValidation();
    },

    /**
     * Configure la validation du formulaire
     */
    setupFormValidation() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validateForm()) {
                e.preventDefault();
            }
            // Si la validation passe, le formulaire sera soumis normalement au serveur
        });

        // Validation en temps réel
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                // Retirer l'erreur si l'utilisateur tape
                if (input.value.trim()) {
                    this.clearError(input);
                }
            });
        });
    },

    /**
     * Valide un champ individuel
     */
    validateField(field) {
        const formGroup = field.closest('.form-group');
        const value = field.value.trim();

        if (!value) {
            this.showError(formGroup, 'The field is required.');
            return false;
        }

        // Validation email
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(formGroup, 'Please enter a valid email address.');
                return false;
            }
        }

        this.clearError(formGroup);
        return true;
    },

    /**
     * Valide tout le formulaire
     */
    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    },

    /**
     * Affiche une erreur sur un champ
     */
    showError(formGroup, message) {
        formGroup.classList.add('has-error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    },

    /**
     * Retire l'erreur d'un champ
     */
    clearError(formGroup) {
        if (formGroup) {
            formGroup.classList.remove('has-error');
        }
    },

    /**
     * Soumet le formulaire
     */
    submitForm() {
        const formData = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            details: document.getElementById('userDetails').value
        };

        console.log('Form submitted:', formData);

        // Simuler l'envoi (remplacer par un vrai appel API)
        this.showSuccessMessage();
        this.form.reset();
    },

    /**
     * Affiche un message de succès
     */
    showSuccessMessage() {
        const submitBtn = this.form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted Successfully!';
        submitBtn.style.background = '#4caf50';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    }
}


// ============================================================
// SERVICES CAROUSEL MODULE
// ============================================================
const ServicesCarousel = {
    /**
     * Configuration du carousel
     */
    config: {
        currentSlide: 0,
        autoplayInterval: 5000, // 5 secondes
        autoplayTimer: null
    },

    /**
     * Initialise le carousel
     */
    init() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.carousel-dots .dot');

        if (!this.slides.length || !this.dots.length) {
            return;
        }

        this.setupDots();
        this.startAutoplay();
    },

    /**
     * Configure les dots de navigation
     */
    setupDots() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoplay();
            });
        });
    },

    /**
     * Va à une slide spécifique
     */
    goToSlide(slideIndex) {
        // Retirer active de la slide actuelle
        this.slides[this.config.currentSlide].classList.remove('active');
        this.dots[this.config.currentSlide].classList.remove('active');

        // Mettre à jour l'index
        this.config.currentSlide = slideIndex;

        // Ajouter active à la nouvelle slide
        this.slides[this.config.currentSlide].classList.add('active');
        this.dots[this.config.currentSlide].classList.add('active');
    },

    /**
     * Passe à la slide suivante
     */
    nextSlide() {
        const nextIndex = (this.config.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    },

    /**
     * Démarre l'autoplay
     */
    startAutoplay() {
        this.config.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.config.autoplayInterval);
    },

    /**
     * Arrête l'autoplay
     */
    stopAutoplay() {
        if (this.config.autoplayTimer) {
            clearInterval(this.config.autoplayTimer);
            this.config.autoplayTimer = null;
        }
    },

    /**
     * Redémarre l'autoplay
     */
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
};


// ============================================================
// SCROLL TO TOP BUTTON
// ============================================================
const ScrollToTop = {
    init() {
        this.button = document.getElementById('scrollToTop');
        if (!this.button) return;

        this.bindEvents();
        this.checkScroll();
    },

    bindEvents() {
        // Show/hide button on scroll
        window.addEventListener('scroll', () => this.checkScroll());

        // Scroll to top on click
        this.button.addEventListener('click', () => this.scrollToTop());
    },

    checkScroll() {
        if (window.pageYOffset > 300) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// ============================================================
// EXPORT POUR UTILISATION GLOBALE
// ============================================================
window.KOATSU = {
    SplashScreen,
    Navigation,
    ServicesCarousel,
    ScrollAnimations,
    QuoteForm,
    ScrollToTop,
    Utils
};

// ============================================================
// INITIALISATION AUTOMATIQUE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Page Transition (toutes les pages)
    PageTransition.init();

    // Modules de base (toutes les pages)
    Navigation.init();
    ScrollToTop.init();
    ScrollAnimations.init();

    // Splash screen (page d'accueil uniquement)
    if (Utils.isFirstVisit() && document.getElementById('splashScreen')) {
        SplashScreen.init();
    } else {
        const splashElement = document.getElementById('splashScreen');
        if (splashElement) splashElement.style.display = 'none';

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) heroSection.classList.add('animate');
    }

    // Carousel de services (page d'accueil)
    if (document.querySelector('.services-carousel')) {
        ServicesCarousel.init();
    }

    // Formulaire de devis (page d'accueil)
    if (document.querySelector('.quote-form')) {
        QuoteForm.init();
    }

    // Animations de la page services
    if (document.querySelector('.services-grid-section')) {
        const initServicesAnimations = () => {
            // Précharger les images
            const images = document.querySelectorAll('.service-card img');
            const imagePromises = Array.from(images).map(img =>
                new Promise(resolve => {
                    if (img.complete) resolve();
                    else {
                        img.addEventListener('load', resolve);
                        img.addEventListener('error', resolve);
                    }
                })
            );

            // Attendre le chargement des images puis activer les animations
            Promise.all(imagePromises).then(() => {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('animate-in');
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
                );

                // Sélecteurs des éléments à animer
                const elements = document.querySelectorAll(
                    '.services-intro .section-header, .services-intro .section-subtitle, ' +
                    '.services-intro .section-title, .services-intro .section-description, ' +
                    '.service-card, .why-choose-us .section-header, .feature-item, ' +
                    '.cta-section, .service-categories, .service-features'
                );

                elements.forEach(el => {
                    el.classList.add('will-animate');
                    observer.observe(el);
                });

                console.log(`✓ ${elements.length} éléments animés`);
            });
        };

        initServicesAnimations();
    }

    // Animations de la page about
    if (document.querySelector('.about-intro') || document.querySelector('.who-we-are')) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        const aboutElements = document.querySelectorAll(
            '.about-content, .about-image, .story-content, .story-highlight, .story-visual-card, ' +
            '.philosophy-content, .commitment-card, .value-card, ' +
            '.timeline-item, .region-card, .industry-item'
        );

        aboutElements.forEach(el => {
            el.classList.add('will-animate');
            observer.observe(el);
        });

        console.log(`✓ ${aboutElements.length} éléments About animés`);
    }

    // Animations de la page contact
    if (document.querySelector('.contact-intro') || document.querySelector('.our-locations')) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        const contactElements = document.querySelectorAll(
            '.contact-intro, .location-card, .map-card, .why-koatsu-content, .contact-form-wrapper, ' +
            '.contact-info-card, .tagline-box'
        );

        contactElements.forEach(el => {
            el.classList.add('will-animate');
            observer.observe(el);
        });

        console.log(`✓ ${contactElements.length} éléments Contact animés`);
    }

    console.log('🚀 KOATSU initialisé');
});
