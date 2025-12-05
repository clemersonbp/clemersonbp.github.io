/**
 * Personal Website Scripts
 * Clean, modern interactions with dark mode support
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Theme Toggle
    initTheme();

    // Mobile Navigation
    initMobileNav();

    // Smooth Scroll
    initSmoothScroll();

    // Scroll Snap Navigation
    initScrollSnapNavigation();
});

/**
 * Theme Management
 */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme on button click
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * Mobile Navigation
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Scroll Snap Navigation with Dots Indicator
 */
function initScrollSnapNavigation() {
    const sections = document.querySelectorAll('.scroll-section');
    
    if (sections.length === 0) return;

    // Create navigation dots container
    const dotsContainer = document.createElement('nav');
    dotsContainer.className = 'scroll-nav';
    dotsContainer.setAttribute('aria-label', 'Navegação por seções');

    // Create dots for each section
    sections.forEach((section, index) => {
        const dot = document.createElement('button');
        dot.className = 'scroll-nav-dot';
        dot.setAttribute('aria-label', `Ir para seção ${index + 1}`);
        dot.setAttribute('data-index', index);
        
        // Get section name from ID for tooltip
        const sectionId = section.getAttribute('id');
        const sectionNames = {
            'sobre': 'Sobre',
            'experiencia': 'Experiência',
            'formacao': 'Formação',
            'tecnologias': 'Tecnologias',
            'contato': 'Contato'
        };
        
        const tooltip = document.createElement('span');
        tooltip.className = 'scroll-nav-tooltip';
        tooltip.textContent = sectionNames[sectionId] || `Seção ${index + 1}`;
        dot.appendChild(tooltip);
        
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        dotsContainer.appendChild(dot);
    });

    document.body.appendChild(dotsContainer);

    // Update active dot on scroll
    const dots = dotsContainer.querySelectorAll('.scroll-nav-dot');
    
    const updateActiveDot = () => {
        let currentSection = 0;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            // Check if section is at least 50% visible
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = index;
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSection);
        });
    };

    // Initial update
    updateActiveDot();

    // Update on scroll
    window.addEventListener('scroll', updateActiveDot, { passive: true });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}
