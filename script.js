// Translation data
const translations = {
    he: {
        // Navigation
        'menu': 'תפריט',
        'contact': 'צור קשר',
        
        // Menu section
        'our-menu': 'התפריט שלנו',
        'all': 'הכל',
        'meals': 'ארוחות',
        'additions': 'תוספות',
        'drinks': 'משקאות',
        
        // Contact section
        'visit-us': 'בואו לבקר אותנו',
        'address': 'כתובת',
        'address-text': 'רחוב הרצל 123<br>תל אביב, ישראל 12345',
        'hours': 'שעות פעילות',
        'hours-text': 'ראשון - חמישי: 11:00 - 22:00<br>שישי - שבת: 11:00 - 23:00<br>יום ראשון: 12:00 - 21:00',
        'phone': 'טלפון'
    },
    en: {
        // Navigation
        'menu': 'Menu',
        'contact': 'Contact',
        
        // Menu section
        'our-menu': 'Our Menu',
        'all': 'All',
        'meals': 'Meals',
        'additions': 'Additions',
        'drinks': 'Drinks',
        
        // Contact section
        'visit-us': 'Visit Us',
        'address': 'Address',
        'address-text': '123 Herzl Street<br>Tel Aviv, Israel 12345',
        'hours': 'Hours',
        'hours-text': 'Sunday - Thursday: 11:00 - 22:00<br>Friday - Saturday: 11:00 - 23:00<br>Sunday: 12:00 - 21:00',
        'phone': 'Phone'
    },
    ru: {
        // Navigation
        'menu': 'Меню',
        'contact': 'Контакты',
        
        // Menu section
        'our-menu': 'Наше Меню',
        'all': 'Все',
        'meals': 'Блюда',
        'additions': 'Дополнения',
        'drinks': 'Напитки',
        
        // Contact section
        'visit-us': 'Посетите Нас',
        'address': 'Адрес',
        'address-text': 'ул. Герцль 123<br>Тель-Авив, Израиль 12345',
        'hours': 'Часы Работы',
        'hours-text': 'Воскресенье - Четверг: 11:00 - 22:00<br>Пятница - Суббота: 11:00 - 23:00<br>Воскресенье: 12:00 - 21:00',
        'phone': 'Телефон'
    },
    ar: {
        // Navigation
        'menu': 'القائمة',
        'contact': 'اتصل بنا',
        
        // Menu section
        'our-menu': 'قائمتنا',
        'all': 'الكل',
        'meals': 'الوجبات',
        'additions': 'الإضافات',
        'drinks': 'المشروبات',
        
        // Contact section
        'visit-us': 'قم بزيارتنا',
        'address': 'العنوان',
        'address-text': 'شارع هرتسل 123<br>تل أبيب، إسرائيل 12345',
        'hours': 'ساعات العمل',
        'hours-text': 'الأحد - الخميس: 11:00 - 22:00<br>الجمعة - السبت: 11:00 - 23:00<br>الأحد: 12:00 - 21:00',
        'phone': 'الهاتف'
    }
};

// Current language (default Hebrew)
let currentLanguage = 'he';

// Translation function
function translatePage(language) {
    currentLanguage = language;
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Set text direction based on language
    if (language === 'ar' || language === 'he') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
    
    // Translate all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });
    
    // Save language preference
    localStorage.setItem('selectedLanguage', language);
}

// Language selector event listener
document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language-selector');
    
    if (languageSelector) {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'he';
        languageSelector.value = savedLanguage;
        translatePage(savedLanguage);
        
        // Add change event listener
        languageSelector.addEventListener('change', (e) => {
            translatePage(e.target.value);
        });
    }
});

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');
const navLinks = document.querySelectorAll('.nav-menu a');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for menu interactions
        } else {
            // Swipe down - could be used for menu interactions
        }
    }
}

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Menu Category Filtering with mobile optimization
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        console.log('Selected category:', category);
        
        // Filter menu items with mobile-friendly animations
        menuItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            console.log('Item category:', itemCategory, 'Match:', category === 'all' || itemCategory === category);
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                // Staggered animation for better mobile experience
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.display = 'block';
                }, index * 50); // Reduced delay for mobile
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }, 200); // Reduced delay for mobile
            }
        });
        
        // Scroll to menu section on mobile after filtering
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                const menuSection = document.querySelector('#menu');
                if (menuSection) {
                    const offsetTop = menuSection.offsetTop;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.menu-item, .contact-item, .about-text');
animatedElements.forEach(el => {
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Menu item hover effects
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Mobile-optimized scroll effects
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    
    // Only apply effects on desktop
    if (window.innerWidth > 768) {
        // Add any desktop-specific scroll effects here
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

 // Add loading animation to images with error handling and retry
const PLACEHOLDER_SRC = 'images/placeholder.svg';
const images = document.querySelectorAll('img');
images.forEach(img => {
    // Native loading/decoding hints
    if (img.classList.contains('logo-img')) {
        img.loading = 'eager';
        img.decoding = 'async';
        img.setAttribute('fetchpriority', 'high');
    } else {
        img.loading = 'lazy';
        img.decoding = 'async';
    }
    
    // Set initial opacity to 0 for loading effect
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    // If already loaded from cache, fade-in immediately
    if (img.complete && img.naturalWidth > 0) {
        requestAnimationFrame(() => {
            img.style.opacity = '1';
        });
    }
    
    img.addEventListener('load', () => {
        img.classList.remove('image-error');
        img.style.opacity = '1';
    });
    
    img.addEventListener('error', () => {
        console.error('Failed to load image:', img.src);
        
        // Retry loading the image once with a cache-busting param
        if (!img.dataset.retried) {
            img.dataset.retried = 'true';
            setTimeout(() => {
                try {
                    const url = new URL(img.src, window.location.href);
                    url.searchParams.set('_', Date.now().toString());
                    img.src = url.toString();
                } catch {
                    // Fallback for invalid URLs
                    img.src = img.src + (img.src.includes('?') ? '&' : '?') + '_' + Date.now();
                }
            }, 500);
            return;
        }
        
        // After retry, swap to a placeholder (avoid loops)
        if (!img.src.endsWith(PLACEHOLDER_SRC)) {
            img.src = PLACEHOLDER_SRC;
            img.alt = 'Image not available';
        }
        img.classList.add('image-error');
        img.style.opacity = '1';
    });
});

// Form validation (if contact form is added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#d4af37';
        }
    });
    
    return isValid;
}

// Add click effect to buttons
const buttons = document.querySelectorAll('.cta-button, .category-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize page with mobile optimization
document.addEventListener('DOMContentLoaded', () => {
    // Set initial viewport height for mobile browsers
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // Preload critical images with mobile optimization
    const criticalImages = [
        'images/logo.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            console.log('Logo preloaded successfully');
        };
        img.onerror = () => {
            console.error('Failed to preload logo:', src);
        };
    });
    
    // Add touch-friendly interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Optimize for mobile performance
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
