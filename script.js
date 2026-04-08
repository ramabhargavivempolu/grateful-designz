// Smooth scrolling function
function scrollTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const sectionId = href.substring(1);
        scrollTo(sectionId);
        closeMenu();
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        closeMenu();
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Simple validation
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && message) {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe service cards and gallery items
document.querySelectorAll('.service-card, .gallery-item').forEach(element => {
    observer.observe(element);
});

// Active nav link highlighting
const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('section'));

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll to top button (optional enhancement)
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #8C2670;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: none;
        z-index: 99;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.background = '#BF9000';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = '#8C2670';
        button.style.transform = 'scale(1)';
    });
};

createScrollToTopButton();

// Add styles for animations
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .gallery-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate-in,
    .gallery-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #BF9000;
        border-bottom: 2px solid #BF9000;
        padding-bottom: 5px;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: #8C2670;
            padding: 2rem 0;
            gap: 0;
        }
        
        .nav-menu.active .nav-link {
            display: block;
            padding: 1rem 2rem;
            text-align: center;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(10px, 10px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(10px, -10px);
        }
    }
`;

document.head.appendChild(style);

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.querySelectorAll('.service-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 100);
    });
});

console.log('Grateful Designz website loaded successfully!');
