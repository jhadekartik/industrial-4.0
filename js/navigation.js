// Navigation functions for Industry 4.0 Educational Portal

/**
 * Navigate to a specific unit page with smooth transition and robot animation
 * @param {number} unitNumber - The unit number to navigate to
 */
function navigateToUnit(unitNumber) {
    // Add robot animation frame
    showRobotTransition();
    
    // Add exit animation
    document.body.classList.add('page-transition-out');
    
    // Wait for animation to complete before navigating
    setTimeout(function() {
        window.location.href = unitNumber === 0 
            ? '../units.html' 
            : `../units/unit${unitNumber}.html`;
    }, 1000); // Longer delay to allow for robot animation
}

/**
 * Navigate back to the units selection page with smooth transition
 */
function navigateToUnits() {
    // Add robot animation frame
    showRobotTransition();
    
    // Add exit animation
    document.body.classList.add('page-transition-out');
    
    // Wait for animation to complete before navigating
    setTimeout(function() {
        // Check if we're in a unit page or elsewhere
        const path = window.location.pathname;
        if (path.includes('/units/')) {
            window.location.href = '../units.html';
        } else {
            window.location.href = 'units.html';
        }
    }, 1000); // Longer delay to allow for robot animation
}

/**
 * Show robot transition animation between pages
 */
function showRobotTransition() {
    // Create robot transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'robot-transition-overlay';
    
    // Create robot animation container
    const robotContainer = document.createElement('div');
    robotContainer.className = 'robot-transition-container';
    
    // Add robot image
    const robotImage = document.createElement('img');
    robotImage.src = window.location.pathname.includes('/units/') 
        ? '../img/robots/guide-robot.png' 
        : 'img/robots/guide-robot.png';
    robotImage.alt = 'Robot Guide';
    robotImage.className = 'robot-transition-image';
    
    // Add loading text
    const loadingText = document.createElement('div');
    loadingText.className = 'robot-transition-text';
    loadingText.innerHTML = '<span>Navigating</span><span class="dot-animation">...</span>';
    
    // Assemble the elements
    robotContainer.appendChild(robotImage);
    robotContainer.appendChild(loadingText);
    overlay.appendChild(robotContainer);
    
    // Add to body
    document.body.appendChild(overlay);
}

// Add CSS for robot transition animations
document.addEventListener('DOMContentLoaded', function() {
    // Create style element if it doesn't exist
    if (!document.getElementById('robot-transition-styles')) {
        const style = document.createElement('style');
        style.id = 'robot-transition-styles';
        style.textContent = `
            .robot-transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(26, 26, 46, 0.9);
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s ease-in-out;
            }
            
            .robot-transition-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .robot-transition-image {
                width: 150px;
                height: auto;
                animation: pulse 1s infinite alternate;
            }
            
            .robot-transition-text {
                color: var(--light-color);
                font-family: 'Orbitron', sans-serif;
                font-size: 1.5rem;
                margin-top: 1rem;
                letter-spacing: 2px;
            }
            
            .dot-animation {
                animation: dotAnimation 1.5s infinite;
            }
            
            @keyframes dotAnimation {
                0% { opacity: 0.2; }
                20% { opacity: 1; }
                100% { opacity: 0.2; }
            }
        `;
        document.head.appendChild(style);
    }
});