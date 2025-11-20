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
    }, this.config.fadeOutDuration);
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
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialiser les modules
  Navigation.init();
  
  // Afficher le splash screen uniquement à la première visite
  if (Utils.isFirstVisit()) {
    SplashScreen.init();
  } else {
    // Cacher immédiatement le splash screen si déjà visité
    const splashElement = document.getElementById('splashScreen');
    if (splashElement) {
      splashElement.style.display = 'none';
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
  Utils
};
