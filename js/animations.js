// Animation effects for Industry 4.0 Educational Portal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initParallaxEffect();
    init3DCardEffect();
    initScrollAnimations();
});

function initParallaxEffect() {
    // Add parallax effect to background elements
    const parallaxElements = document.querySelectorAll('.background-elements, .gear, .circuit, .data-stream');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            parallaxElements.forEach(element => {
                const speed = element.classList.contains('gear') ? 20 : 
                              element.classList.contains('circuit') ? 10 : 5;
                              
                const x = (0.5 - mouseX) * speed;
                const y = (0.5 - mouseY) * speed;
                
                element.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    }
}

function init3DCardEffect() {
    // Add 3D effect to cards
    const cards = document.querySelectorAll('.unit-card, .content-card');
    
    cards.forEach(card => {
        card.classList.add('card-3d');
        
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'rotateX(0) rotateY(0)';
        });
    });
}

function initScrollAnimations() {
    // Add scroll-triggered animations
    const animatedElements = document.querySelectorAll('.content-section, .timeline-item, .feature-list li');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {threshold: 0.1});
        
        animatedElements.forEach(element => {
            element.classList.add('pre-animation');
            observer.observe(element);
        });
    }
}