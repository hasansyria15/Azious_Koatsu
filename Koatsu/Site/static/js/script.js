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
// EXPORT POUR UTILISATION GLOBALE (si nécessaire)
// ============================================================
window.KOATSU = {
  SplashScreen,
  Navigation,
  ServicesCarousel,
  ScrollAnimations,
  QuoteForm,
  Utils
};
