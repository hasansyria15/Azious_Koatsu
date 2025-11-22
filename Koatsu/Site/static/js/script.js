/**
 * ================================================================
 * KOATSU - JavaScript Principal
 * ================================================================
 */

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
   * Configure la navigation mobile
   */
  setupMobileNav() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    
    if (!mobileToggle) {
      return;
    }

    mobileToggle.addEventListener('click', () => {
      this.toggleMobileNav();
    });
  },

  /**
   * Toggle le menu mobile
   */
  toggleMobileNav() {
    const mobileNav = document.querySelector('.main-navigation .navbar-nav');
    const toggleBtn = document.querySelector('.mobile-nav-toggle i');

    if (mobileNav) {
      mobileNav.classList.toggle('show');
    }

    if (toggleBtn) {
      toggleBtn.classList.toggle('fa-bars');
      toggleBtn.classList.toggle('fa-times');
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
      e.preventDefault();
      
      if (this.validateForm()) {
        this.submitForm();
      }
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
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialiser les modules
  Navigation.init();
  ServicesCarousel.init();
  ScrollAnimations.init();
  QuoteForm.init();
  ScrollToTop.init();
  
  // Afficher le splash screen uniquement à la première visite
  if (Utils.isFirstVisit()) {
    SplashScreen.init();
  } else {
    // Cacher immédiatement le splash screen si déjà visité
    const splashElement = document.getElementById('splashScreen');
    if (splashElement) {
      splashElement.style.display = 'none';
    }
    
    // Déclencher immédiatement les animations du hero
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.classList.add('animate');
    }
  }

  console.log('KOATSU - Application initialized');
});


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
// SERVICES PAGE ANIMATIONS MODULE
// ============================================================
const ServicesPageAnimations = {
  config: {
    observerOptions: {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  },

  init() {
    this.initScrollReveal();
    this.initParallaxEffect();
    this.initCardHoverEffects();
    this.initCounterAnimations();
    this.initTiltEffect();
  },

  /**
   * Animation de révélation au scroll (Intersection Observer)
   */
  initScrollReveal() {
    // Vérifier si IntersectionObserver est supporté
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported');
      // Afficher tous les éléments sans animation
      document.querySelectorAll('.service-card, .feature-item, .category-item').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Ajouter un délai progressif pour effet cascade
          setTimeout(() => {
            entry.target.classList.add('animate-in');
            console.log('✓ Element animated:', entry.target.className);
          }, index * 100);
          
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, this.config.observerOptions);

    // Observer les cartes de services
    const serviceCards = document.querySelectorAll('.service-card');
    console.log(`Found ${serviceCards.length} service cards`);
    serviceCards.forEach(card => {
      card.classList.add('will-animate');
      observer.observe(card);
    });

    // Observer les feature items
    const featureItems = document.querySelectorAll('.feature-item');
    console.log(`Found ${featureItems.length} feature items`);
    featureItems.forEach(item => {
      item.classList.add('will-animate');
      observer.observe(item);
    });

    // Observer les éléments de catégories
    const categoryItems = document.querySelectorAll('.category-item');
    console.log(`Found ${categoryItems.length} category items`);
    categoryItems.forEach(item => {
      item.classList.add('will-animate');
      observer.observe(item);
    });
  },

  /**
   * Effet parallax sur le hero
   */
  initParallaxEffect() {
    const heroPages = document.querySelector('.hero-pages');
    if (!heroPages) {
      console.log('No hero-pages found for parallax');
      return;
    }

    console.log('✓ Parallax effect initialized');
    
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.3;
      
      if (scrolled < 600) { // Limiter l'effet aux 600 premiers pixels
        heroPages.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  },

  /**
   * Effets interactifs sur les cartes au survol
   */
  initCardHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
      // Effet de suivi de la souris
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateY(-15px) 
          scale(1.02)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      });

      // Animation des features au survol de la carte
      const features = card.querySelectorAll('.service-features li');
      card.addEventListener('mouseenter', () => {
        features.forEach((feature, index) => {
          setTimeout(() => {
            feature.style.animation = 'slideInRight 0.4s ease forwards';
          }, index * 80);
        });
      });
    });
  },

  /**
   * Animation de compteur pour les statistiques
   */
  initCounterAnimations() {
    const counterElements = document.querySelectorAll('[data-counter]');
    
    counterElements.forEach(element => {
      const target = parseInt(element.getAttribute('data-counter'));
      const duration = 2000; // 2 secondes
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
              } else {
                element.textContent = target;
              }
            };
            updateCounter();
            observer.unobserve(element);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(element);
    });
  },

  /**
   * Effet d'inclinaison 3D sur les icônes
   */
  initTiltEffect() {
    const icons = document.querySelectorAll('.service-icon, .feature-icon');

    icons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      });

      icon.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 5;
        const rotateY = (centerX - x) / 5;
        
        this.style.transform = `
          perspective(500px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale(1.1)
        `;
      });

      icon.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }
};

// ============================================================
// MAGNETIC BUTTON EFFECT (effet magnétique sur les boutons)
// ============================================================
const MagneticButtons = {
  init() {
    const buttons = document.querySelectorAll('.service-btn, .btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
      });
    });
  }
};

// ============================================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================================
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides ou juste "#"
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 100; // 100px pour le header
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

// ============================================================
// TYPING ANIMATION (animation de texte)
// ============================================================
const TypingAnimation = {
  init() {
    const elements = document.querySelectorAll('[data-typing]');
    
    elements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.opacity = '1';
      
      let index = 0;
      const speed = 50; // vitesse de frappe en ms
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const typeChar = () => {
              if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, speed);
              }
            };
            typeChar();
            observer.unobserve(element);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(element);
    });
  }
};

// ============================================================
// EXPORT POUR UTILISATION GLOBALE (si nécessaire)
// ============================================================
window.KOATSU = {
  SplashScreen,
  Navigation,
  ServicesCarousel,
  ScrollAnimations,
  QuoteForm,
  ScrollToTop,
  ServicesPageAnimations,
  MagneticButtons,
  SmoothScroll,
  TypingAnimation,
  Utils
};

// ============================================================
// INITIALISATION AUTOMATIQUE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialisation des modules de base (toutes les pages)
  if (typeof Navigation !== 'undefined') Navigation.init();
  if (typeof ScrollToTop !== 'undefined') ScrollToTop.init();
  if (typeof SmoothScroll !== 'undefined') SmoothScroll.init();

  // Initialisation spécifique à la page d'accueil
  if (document.getElementById('splashScreen')) {
    if (typeof SplashScreen !== 'undefined') SplashScreen.init();
  }

  if (document.querySelector('.services-carousel')) {
    if (typeof ServicesCarousel !== 'undefined') ServicesCarousel.init();
  }

  if (document.querySelector('.quote-form')) {
    if (typeof QuoteForm !== 'undefined') QuoteForm.init();
  }

  // Initialisation spécifique à la page services
  const servicesGridSection = document.querySelector('.services-grid-section');
  if (servicesGridSection) {
    console.log('✓ Services page detected');
    
    if (typeof ServicesPageAnimations !== 'undefined') {
      try {
        ServicesPageAnimations.init();
        console.log('✓ ServicesPageAnimations initialized');
      } catch (error) {
        console.error('Error initializing ServicesPageAnimations:', error);
      }
    }
    
    if (typeof MagneticButtons !== 'undefined') {
      try {
        MagneticButtons.init();
        console.log('✓ MagneticButtons initialized');
      } catch (error) {
        console.error('Error initializing MagneticButtons:', error);
      }
    }
  }

  // Animations de typing si présentes
  if (document.querySelector('[data-typing]')) {
    if (typeof TypingAnimation !== 'undefined') TypingAnimation.init();
  }

  // Animations au scroll (toutes les pages)
  if (typeof ScrollAnimations !== 'undefined') ScrollAnimations.init();

  console.log('🚀 KOATSU - All modules initialized successfully');
});
