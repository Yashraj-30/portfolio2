// Optimized Portfolio JavaScript
class Portfolio {
    constructor() {
      this.init();
    }
  
    init() {
      this.setupSmoothScrolling();
      this.setupActiveNavigation();
      this.setupThemeToggle();
      this.setupContactForm();
      this.setupAnimations();
      this.setupMobileMenu();
      this.setupScrollEffects();
      this.addDynamicStyles();
    }
  
    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  
    // Active navigation link highlighting
    setupActiveNavigation() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
          }
        });
  
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      };
  
      window.addEventListener('scroll', updateActiveLink);
    }
  
    // Theme toggle functionality
    setupThemeToggle() {
      const themeToggle = document.querySelector('.toggle-switch');
      const toggleSlider = document.querySelector('.toggle-slider');
  
      if (themeToggle && toggleSlider) {
        themeToggle.addEventListener('click', () => {
          document.body.classList.toggle('light-theme');
          const isLight = document.body.classList.contains('light-theme');
          toggleSlider.style.transform = isLight ? 'translateX(-27px)' : 'translateX(0)';
          this.updateNavbarBackground();
        });
      }
    }
  
    // Contact form handling
    setupContactForm() {
      const contactForm = document.querySelector('.contact-form form');
      if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const name = contactForm.querySelector('input[type="text"]').value;
          const email = contactForm.querySelector('input[type="email"]').value;
          const message = contactForm.querySelector('textarea').value;
          
          if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
          }
          
          alert('Thank you for your message! I\'ll get back to you soon.');
          contactForm.reset();
        });
      }
    }
  
    // Intersection Observer for animations
    setupAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
  
      // Observe all sections for animation
      document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
      });
  
      // Typing animation for main heading
      this.setupTypingAnimation();
      
      // Skill tags animation
      this.setupSkillTagsAnimation();
      
      // Project card hover effects
      this.setupProjectCardEffects();
    }
  
    // Typing animation for the main heading
    setupTypingAnimation() {
      const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.innerHTML = '';
        
        const type = () => {
          if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
          }
        };
        
        type();
      };
  
      window.addEventListener('load', () => {
        const mainHeading = document.querySelector('.home-text h1');
        if (mainHeading) {
          const originalText = mainHeading.textContent;
          typeWriter(mainHeading, originalText, 100);
        }
      });
    }
  
    // Skill tags animation
    setupSkillTagsAnimation() {
      document.querySelectorAll('.skill-tag').forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('fade-in');
      });
    }
  
    // Project card hover effects
    setupProjectCardEffects() {
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-10px) scale(1.02)';
          const isLightTheme = document.body.classList.contains('light-theme');
          card.style.boxShadow = isLightTheme 
            ? '0 20px 40px rgba(99, 102, 241, 0.2)'
            : '0 20px 40px rgba(138, 138, 138, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0) scale(1)';
          card.style.boxShadow = '';
        });
      });
    }
  
    // Mobile menu setup
    setupMobileMenu() {
      const navMenu = document.querySelector('.nav-menu');
      const hamburger = document.createElement('div');
      hamburger.className = 'hamburger';
      hamburger.innerHTML = '<span></span><span></span><span></span>';
      
      const themeToggle = document.querySelector('.theme-toggle');
      if (themeToggle) {
        themeToggle.parentNode.insertBefore(hamburger, themeToggle);
      }
      
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
      });
      
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
        });
      });
    }
  
    // Scroll effects
    setupScrollEffects() {
      window.addEventListener('scroll', () => {
        this.updateNavbarBackground();
        this.parallaxEffect();
      });
    }
  
    // Navbar background change on scroll
    updateNavbarBackground() {
      const navbar = document.querySelector('.navbar');
      const isLightTheme = document.body.classList.contains('light-theme');
      
      if (navbar) {
        if (isLightTheme) {
          navbar.style.background = window.scrollY > 100 
            ? 'rgba(255, 255, 255, 0.35)' 
            : 'rgba(255, 255, 255, 0.25)';
        } else {
          navbar.style.background = window.scrollY > 100 
            ? 'rgba(26, 26, 26, 0.98)' 
            : 'rgba(26, 26, 26, 0.95)';
        }
      }
    }
  
    // Parallax effect for background
    parallaxEffect() {
      const scrolled = window.scrollY;
      const speed = scrolled * 0.5;
      document.body.style.backgroundPosition = `center ${speed}px`;
    }
  
    // Add dynamic styles
    addDynamicStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .fade-in {
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .nav-link.active {
          color: var(--dark-accent);
          position: relative;
        }
        
        body.light-theme .nav-link.active {
          color: var(--light-accent);
        }
        
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--dark-accent);
          border-radius: 2px;
        }
        
        body.light-theme .nav-link.active::after {
          background: var(--light-accent);
        }
        
        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
        }
        
        .hamburger span {
          width: 25px;
          height: 3px;
          background: var(--dark-text);
          transition: 0.3s;
        }
        
        body.light-theme .hamburger span {
          background: var(--light-text);
        }
        
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }
          
          .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background: var(--dark-navbar-bg);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            padding: 2rem 0;
          }
          
          body.light-theme .nav-menu {
            background: var(--light-navbar-bg);
            backdrop-filter: blur(20px);
          }
          
          .nav-menu.active {
            left: 0;
          }
        }
        
        body {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        body.loaded {
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
      
      // Add loading animation
      window.addEventListener('load', () => {
        document.body.classList.add('loaded');
      });
    }
  }
  
  // Initialize portfolio when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
  });