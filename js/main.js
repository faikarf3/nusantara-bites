// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const body = document.body;

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Header scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class to header
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Gallery Slider
class GallerySlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.gallery-item');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        
        if (this.slides.length > 0) {
            this.initSlider();
        }
    }

    initSlider() {
        // Create navigation buttons
        const slider = document.querySelector('.gallery-slider');
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        
        prevBtn.className = 'slider-btn prev-btn';
        nextBtn.className = 'slider-btn next-btn';
        
        prevBtn.innerHTML = '&#10094;';
        nextBtn.innerHTML = '&#10095;';
        
        slider.appendChild(prevBtn);
        slider.appendChild(nextBtn);
        
        // Add event listeners
        prevBtn.addEventListener('click', () => this.prevSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause autoplay on hover
        slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    showSlide(index) {
        this.slides.forEach(slide => slide.style.display = 'none');
        this.slides[index].style.display = 'block';
        this.currentSlide = index;
    }

    nextSlide() {
        this.showSlide((this.currentSlide + 1) % this.totalSlides);
    }

    prevSlide() {
        this.showSlide((this.currentSlide - 1 + this.totalSlides) % this.totalSlides);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Initialize gallery slider
document.addEventListener('DOMContentLoaded', () => {
    new GallerySlider();
});

// Form Validation
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const message = contactForm.querySelector('textarea[name="message"]');
        let isValid = true;
        
        // Reset previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        }
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = 'red';
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Smooth scrolling for anchor links
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

// Shopping Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    let count = 0;
    cart.forEach((item, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-qty">x${item.qty}</span>
            <span class="cart-item-price">$${item.price * item.qty}</span>
            <button class="remove-cart-item" data-index="${idx}">&times;</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price * item.qty;
        count += item.qty;
    });
    cartTotalSpan.textContent = total;
    cartCountSpan.textContent = count;
    saveCart();
}

document.addEventListener('DOMContentLoaded', () => {
    // Add to Cart button listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ name, price, qty: 1 });
            }
            updateCartUI();
            document.getElementById('cart-sidebar').classList.add('open');
        });
    });

    // Remove item from cart
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-cart-item')) {
            const idx = e.target.getAttribute('data-index');
            cart.splice(idx, 1);
            updateCartUI();
        }
    });

    // Clear cart
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        updateCartUI();
    });

    // Open/close cart sidebar
    document.getElementById('open-cart').addEventListener('click', () => {
        document.getElementById('cart-sidebar').classList.add('open');
        document.getElementById('open-cart').style.display = 'none';
    });
    document.getElementById('close-cart').addEventListener('click', () => {
        document.getElementById('cart-sidebar').classList.remove('open');
        document.getElementById('open-cart').style.display = 'flex';
    });

    // Initialize cart UI
    updateCartUI();
}); 