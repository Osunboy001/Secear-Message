const texts = document.querySelectorAll('.text-animate');

function animateOnScroll() {
  const trigger = window.innerHeight * 0.85; // Trigger when 85% down the screen
  
  texts.forEach(el => {
    const top = el.getBoundingClientRect().top;
    
    if (top < trigger && top > 0) {
      el.classList.add('active');
    }
  });
}

// Run on page load
window.addEventListener('load', animateOnScroll);

// Run when scrolling
window.addEventListener('scroll', animateOnScroll);