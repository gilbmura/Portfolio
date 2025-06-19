// Theme Toggle
const themeChange = document.getElementById('themeChange');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeChange.innerHTML = '<i class="sun-icon"></i>';
    }
} else if (prefersDarkScheme.matches) {
    document.body.setAttribute('data-theme', 'dark');
    themeChange.innerHTML = '<i class="sun-icon"></i>';
}

themeChange.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeChange.innerHTML = '<i class="moon-icon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeChange.innerHTML = '<i class="sun-icon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Navigation
// Create mobile navigation toggle button
const createMobileNavToggle = () => {
    const navbar = document.querySelector('.gil-navbar');
    if (!document.getElementById('NavChange')) {
        const NavChange = document.createElement('div');
        NavChange.id = 'NavChange';
        NavChange.className = 'nav-change';
        NavChange.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        navbar.prepend(NavChange);
        return NavChange;
    }
    return document.getElementById('NavChange');
};

// Initialize mobile navigation
const initMobileNav = () => {
    const NavChange = createMobileNavToggle();
    const navLinks = document.querySelector('.gil-nav-links');

    NavChange.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        NavChange.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.gil-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            NavChange.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !NavChange.contains(e.target)) {
            navLinks.classList.remove('active');
            NavChange.classList.remove('active');
        }
    });
};

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add animation classes
function setupAnimations() {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate');
        observer.observe(section);
    });
    
    document.querySelectorAll('.gil-profile, .gil-home-content h1, .gil-description, .gil-buttons').forEach(element => {
        element.classList.add('animate');
        observer.observe(element);
    });
}

// Handle responsive behavior
function handleResponsive() {
    if (window.innerWidth <= 768) {
        initMobileNav();
    }
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', () => {
    setupAnimations();
    handleResponsive();
});

window.addEventListener('resize', handleResponsive); 