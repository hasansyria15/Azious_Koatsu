/**
 * KOATSU - Animations Services (Version simplifiée)
 * Ce fichier contient uniquement les animations pour la page services
 */

(function() {
  'use strict';

  console.log('🎨 Loading services animations...');

  // Animation de révélation au scroll
  function initScrollReveal() {
    console.log('📜 Initializing scroll reveal...');
    
    // Vérifier si IntersectionObserver est supporté
    if (!('IntersectionObserver' in window)) {
      console.warn('⚠️ IntersectionObserver not supported');
      return;
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = function(entries) {
      entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.classList.add('animate-in');
            console.log('✓ Element animated:', entry.target.className);
          }, index * 100);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observer les cartes de services
    const serviceCards = document.querySelectorAll('.service-card');
    console.log('📦 Found', serviceCards.length, 'service cards');
    
    serviceCards.forEach(function(card) {
      card.classList.add('will-animate');
      observer.observe(card);
    });

    // Observer les feature items
    const featureItems = document.querySelectorAll('.feature-item');
    console.log('🌟 Found', featureItems.length, 'feature items');
    
    featureItems.forEach(function(item) {
      item.classList.add('will-animate');
      observer.observe(item);
    });
  }

  // Effets interactifs sur les cartes
  function initCardHoverEffects() {
    console.log('🎯 Initializing card hover effects...');
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(function(card) {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
    
    console.log('✓ Card hover effects initialized on', serviceCards.length, 'cards');
  }

  // Effet magnétique sur les boutons
  function initMagneticButtons() {
    console.log('🧲 Initializing magnetic buttons...');
    
    const buttons = document.querySelectorAll('.service-btn, .btn-primary, .btn-secondary');
    console.log('🔘 Found', buttons.length, 'buttons');
    
    buttons.forEach(function(button) {
      button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
      });

      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
      });
    });
    
    console.log('✓ Magnetic buttons initialized');
  }

  // Smooth scroll pour les ancres
  function initSmoothScroll() {
    console.log('📍 Initializing smooth scroll...');
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 100;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
    
    console.log('✓ Smooth scroll initialized');
  }

  // Initialisation au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🚀 Initializing KOATSU Services Animations...');
    
    // Vérifier si on est sur la page services
    const servicesPage = document.querySelector('.services-grid-section');
    
    if (servicesPage) {
      console.log('✅ Services page detected!');
      
      try {
        initScrollReveal();
        initCardHoverEffects();
        initMagneticButtons();
        initSmoothScroll();
        
        console.log('✅ All animations initialized successfully!');
      } catch (error) {
        console.error('❌ Error initializing animations:', error);
      }
    } else {
      console.log('ℹ️ Not on services page, skipping animations');
    }
  }

})();
