// SCULPT LAGREE - Main JavaScript
// Mobile navigation, animations, and interactive features

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const nav = document.getElementById('nav');
    const menuBtn = document.querySelector('.menu-btn');

    if (nav && nav.classList.contains('active')) {
        if (!nav.contains(event.target) && !menuBtn?.contains(event.target)) {
            nav.classList.remove('active');
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');

        // Close other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
    });
});

// Lazy loading images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Scroll animations
const animateElements = document.querySelectorAll('.fade-up, .card, .testimonial-card');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing! Check your email for wellness tips and exclusive offers.');
            this.reset();
        }
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message! We will respond within 24 hours.');
        this.reset();
    });
}

// Add floating effect to elements
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach(el => {
    el.style.animation = 'float 3s ease-in-out infinite';
});

// Dynamic year in footer
const yearSpan = document.querySelector('.current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Class booking confirmation
function confirmBooking(className, day, time) {
    if (confirm(`Book ${className} on ${day} at ${time}?`)) {
        alert('Booking confirmed! Check your email for details.');
        return true;
    }
    return false;
}

// WhatsApp chat function
function openWhatsApp() {
    const phone = '2348123456789';
    const message = encodeURIComponent('Hello! I\'m interested in booking a class at Sculpt Lagree.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Smooth page transitions (for multi-page consistency)
document.addEventListener('DOMContentLoaded', function () {
    // Add active class to current page nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize any tooltips or popovers
    initTooltips();
});

function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.dataset.tooltip;
            document.body.appendChild(tooltip);

            const rect = el.getBoundingClientRect();
            tooltip.style.top = `${rect.top - 30}px`;
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;

            el.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    });
}

// Add CSS for tooltips
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    .tooltip {
        position: fixed;
        background: var(--deep-charcoal);
        color: var(--white);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    }
`;
document.head.appendChild(tooltipStyle);

// Simple WhatsApp Auto Message - Same on all pages
document.addEventListener('DOMContentLoaded', function () {
    const phoneNumber = '2348054522505';
    const message = "Good day Sir/Ma, this is Sculpt Pilates. Please drop your message and you will be attended to.";
    const encodedMessage = encodeURIComponent(message);

    const whatsappLinks = document.querySelectorAll('.whatsapp-float');
    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    });
});