// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const buttonn = document.querySelector('.scrollup')

hamburger.onclick = function () {
  navLinks.classList.toggle("show");
  // Animate hamburger icon
  hamburger.style.transform = navLinks.classList.contains("show") 
    ? "rotate(90deg)" 
    : "rotate(0deg)";
};

// Close menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove("show");
    hamburger.style.transform = "rotate(0deg)";
  });
});

// ============================================
// HERO BACKGROUND SLIDER
// ============================================
const hero = document.querySelector(".hero");

const images = [
  "images/home b3.jpg",
  "images/home b2.jpg",
  "images/home b4.jpg"
];

let index = 0;

function changeBackground() {
  hero.style.backgroundImage = `url('${images[index]}')`;
  index = (index + 1) % images.length;
}

changeBackground();
setInterval(changeBackground, 2300);

// ============================================
// ANIMATED COUNTERS
// ============================================
const counters = document.querySelectorAll(".counter");
let counterAnimated = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = Number(counter.getAttribute("data-target"));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let count = 0;

    function updateCounter() {
      count += increment;
      
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    }

    updateCounter();
  });
}

// ============================================
// REVIEW CAROUSEL
// ============================================
let currentReview = 0;
const track = document.querySelector(".review-track");
const reviews = document.querySelectorAll(".review-card");

function moveReview() {
  currentReview = (currentReview + 1) % reviews.length;
  track.style.transform = `translateX(-${currentReview * 100}%)`;
}

setInterval(moveReview, 4000);

// Add manual navigation (optional enhancement)
const reviewWrapper = document.querySelector(".review-wrapper");
let isDown = false;
let startX;
let scrollLeft;

reviewWrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - reviewWrapper.offsetLeft;
});

reviewWrapper.addEventListener('mouseleave', () => {
  isDown = false;
});

reviewWrapper.addEventListener('mouseup', () => {
  isDown = false;
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const reveals = document.querySelectorAll(".reveal");

function checkReveal() {
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementBottom = el.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    
    // Trigger when element is 100px into viewport
    if (elementTop < windowHeight - 100 && elementBottom > 0) {
      el.classList.add("active");
      
      // Trigger counter animation when counters section is visible
      if (!counterAnimated && el.querySelector('.counter')) {
        animateCounters();
        counterAnimated = true;
      }
    }
  });
}

// Check on scroll
window.addEventListener("scroll", checkReveal);

// Check on page load
checkReveal();

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// CONTACT FORM HANDLER
// ============================================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const myEmail = document.getElementById('email').value;
  const userMessage = document.getElementById('message').value;

  // Validate inputs
  if (!name || !myEmail || !userMessage) {
    alert('Please fill in all fields');
    return;
  }

  const sellerEmail = 'morakinyoifeoluwa10@gmail.com';
  const subject = encodeURIComponent(`Message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${myEmail}\n\nMessage:\n${userMessage}`);

  window.location.href = `mailto:${sellerEmail}?subject=${subject}&body=${body}`;
  
  // Optional: Clear form after submission
  setTimeout(() => {
    contactForm.reset();
  }, 1000);
});

// ============================================
// GRID ITEMS STAGGERED ANIMATION
// ============================================
const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
});

// ============================================
// ADD PARALLAX EFFECT TO HERO IMAGE
// ============================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image img');
  
  if (heroImage && scrolled < 800) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ============================================
// INTERSECTION OBSERVER FOR BETTER PERFORMANCE
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Animate counters when visible
      if (!counterAnimated && entry.target.querySelector('.counter')) {
        animateCounters();
        counterAnimated = true;
      }
    }
  });
}, observerOptions);

// Observe all reveal elements
reveals.forEach(reveal => {
  observer.observe(reveal);
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
  }, 100);
});

// ============================================
// CONSOLE MESSAGE (OPTIONAL - REMOVE IF NOT NEEDED)
// 

// ============================================
// PREVENT ANIMATION ON PAGE RESIZE
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
});

// Add this CSS rule dynamically
const style = document.createElement('style');
style.textContent = `
  .resize-animation-stopper * {
    animation: none !important;
    transition: none !important;
  }
`;
document.head.appendChild(style);

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
const buttons = document.querySelectorAll('button, .btn, .hero-btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
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

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  button, .btn, .hero-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.style.color = 'orange';
    } else if (navLink) {
      navLink.style.color = '#222';
    }
  });
}

window.addEventListener('scroll', highlightNav);

// ============================================
// FOOTER YEAR AUTO-UPDATE
// ============================================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
  const currentYear = new Date().getFullYear();
  footerYear.textContent = `© ${currentYear} LawFirm. All Rights Reserved.`;
}

 buttonn.addEventListener('click', () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  console.log('cracy')
})
