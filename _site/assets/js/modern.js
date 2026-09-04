/**
 * Modern Portfolio JavaScript
 * 
 * Handles all interactive functionality for the portfolio website including:
 * - Loading screen animations
 * - Smooth scrolling navigation
 * - Header hide/show on scroll
 * - Theme toggling (dark/light mode)
 * - Interactive animations and effects
 * - Mobile navigation
 * 
 * @author Saleh Salem Alhaddad
 * @version 2.0.0
 * @license MIT
 */

// =============================================================================
// YEARS OF EXPERIENCE (auto-calculated)
// =============================================================================
// Never hardcode the number of years. The Liquid include renders a build-time
// value so the page is correct with JavaScript disabled and for crawlers; this
// recomputes it on every load, because GitHub Pages only rebuilds on push and
// the figure would otherwise go stale until the next commit.

const CAREER_START = '2018-06-01';

/**
 * Whole years elapsed since the given start date.
 * @param {string} startISO "YYYY-MM-DD"
 * @param {Date}   now
 * @returns {number|null} null if the date is invalid or in the future
 */
function yearsSince(startISO, now) {
  // Append a time so the string parses as LOCAL midnight rather than UTC —
  // otherwise browsers behind UTC land on the previous day and can lose a year
  // on the anniversary date itself.
  const start = new Date(startISO + 'T00:00:00');
  if (isNaN(start.getTime())) return null;

  let years = now.getFullYear() - start.getFullYear();
  const monthDelta = now.getMonth() - start.getMonth();
  // Anniversary not reached yet this year
  if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < start.getDate())) {
    years -= 1;
  }
  return years < 0 ? null : years;
}

/** Fill every .calc-years element with the current year count. */
function updateExperienceYears() {
  const now = new Date();
  document.querySelectorAll('.calc-years').forEach(function(el) {
    const years = yearsSince(el.getAttribute('data-career-start') || CAREER_START, now);
    if (years !== null) el.textContent = String(years);
  });
}

// =============================================================================
// MAIN APPLICATION INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {

  // Keep the years-of-experience figures current between site builds
  updateExperienceYears();

  // =============================================================================
  // LOADING SCREEN MANAGEMENT
  // =============================================================================
  
  // Remove loading screen with fade animation
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // Ensure the loading screen is hidden after a maximum time
    const hideLoadingScreen = () => {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.pointerEvents = 'none';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 300);
    };
    
    // Hide after 1 second or when page is fully loaded
    setTimeout(hideLoadingScreen, 1000);
    
    // Also hide when page is fully loaded (backup)
    if (document.readyState === 'complete') {
      hideLoadingScreen();
    } else {
      window.addEventListener('load', hideLoadingScreen);
    }
  }

  // =============================================================================
  // SMOOTH SCROLLING NAVIGATION
  // =============================================================================
  
  // Enable smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // =============================================================================
  // HEADER SCROLL BEHAVIOR
  // =============================================================================
  
  // Navigation scroll behavior - hide/show header based on scroll direction
  let lastScrollTop = 0;
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class
    if (scrollTop > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    
    // Hide/show header based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    
    lastScrollTop = scrollTop;
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Add animation classes to appropriate elements
  document.querySelectorAll('.highlight-card, .experience-item, .skill-category, .tech-icon-item, .article-card, .work-item').forEach(el => {
    el.classList.add('animate-on-scroll');
  });

  // Enhanced button hover effects
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Enhanced card hover effects
  document.querySelectorAll('.highlight-card, .experience-item, .skill-category, .article-card, .work-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Contact item hover effects
  document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });

  // Tech icon hover effects
  document.querySelectorAll('.tech-icon-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      const img = this.querySelector('.tech-icon-img');
      if (img) {
        img.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const img = this.querySelector('.tech-icon-img');
      if (img) {
        img.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Profile card pulse effect
  const profileCard = document.querySelector('.profile-card-enhanced');
  if (profileCard) {
    setInterval(() => {
      profileCard.style.boxShadow = '0 20px 40px rgba(100, 255, 218, 0.2)';
      setTimeout(() => {
        profileCard.style.boxShadow = '0 20px 40px rgba(100, 255, 218, 0.1)';
      }, 1000);
    }, 5000);
  }

  // Typing animation for hero text (if needed)
  const heroName = document.querySelector('.hero-name');
  if (heroName && heroName.textContent) {
    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.opacity = '1';
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroName.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    setTimeout(typeWriter, 1500);
  }

  // Initialize tooltips (if using a tooltip library)
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Particle effect for hero background (lightweight)
  function createParticles() {
    const hero = document.querySelector('.hero-enhanced');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(100, 255, 218, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 1;
      `;
      hero.appendChild(particle);
    }

    // Add CSS animation for particles
    if (!document.querySelector('#particle-style')) {
      const style = document.createElement('style');
      style.id = 'particle-style';
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px) scale(1.1); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-10px) scale(0.9); opacity: 0.4; }
          75% { transform: translateY(-15px) translateX(5px) scale(1.05); opacity: 0.5; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Initialize particles with delay
  setTimeout(createParticles, 2000);

  // Add progressive enhancement for older browsers
  if (!CSS.supports('display', 'grid')) {
    document.querySelectorAll('.highlights-grid, .skills-grid, .tech-icons-grid').forEach(grid => {
      grid.style.display = 'flex';
      grid.style.flexWrap = 'wrap';
      grid.style.justifyContent = 'center';
    });
  }

  console.log('🚀 Portfolio enhanced features loaded successfully!');
});

// Robust theme toggle and persistence
function applyTheme(theme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update toggle UI if present
  const toggle = document.querySelector('.theme-toggle');
  const toggleThumb = document.querySelector('.theme-toggle-thumb');
  
  if (toggle && toggleThumb) {
    // Force immediate visual update
    if (theme === 'dark') {
      html.classList.add('dark-theme');
      html.classList.remove('light-theme');
      toggleThumb.style.transform = 'translateX(26px)';
    } else {
      html.classList.add('light-theme'); 
      html.classList.remove('dark-theme');
      toggleThumb.style.transform = 'translateX(0px)';
    }
  }
}

function getPreferredTheme() {
  if (localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  // Use system preference if available
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || getPreferredTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

// Apply theme ASAP on page load
(function() {
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Apply theme ASAP on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  applyTheme(getPreferredTheme());
  
  // Attach click event to theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }  // =============================================================================
  // MOBILE NAVIGATION TOGGLE
  // =============================================================================
  
  // Mobile navigation toggle functionality
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isActive = navMenu.classList.contains('active');
      
      if (isActive) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

});

// Listen for system theme changes
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// Export functions for external use
window.portfolioFunctions = {
  toggleTheme,
  yearsSince,
  updateExperienceYears,
  scrollToSection: function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

// Export functions for external use
window.portfolioFunctions = {
  toggleTheme,
  yearsSince,
  updateExperienceYears,
  scrollToSection: function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
