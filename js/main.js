// Main JavaScript functionality for Industry 4.0 Educational Portal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize animations
    initAnimations();
    
    // Check if we need to show loading screen
    handlePageLoading();
    
    // Initialize progress tracking if we're on a content page
    if (document.querySelector('.unit-page') || document.querySelector('.units-grid')) {
        initProgressTracking();
    }
}

function setupEventListeners() {
    // Start button on landing page
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            // Use the navigateToUnits function from navigation.js instead
            if (typeof navigateToUnits === 'function') {
                navigateToUnits();
            } else {
                // Fallback to direct navigation if the function isn't available
                window.location.href = 'units.html';
            }
        });
    }
    
    // Unit cards on units selection page
    const unitCards = document.querySelectorAll('.unit-card');
    unitCards.forEach(card => {
        card.addEventListener('click', function() {
            const unitNumber = this.getAttribute('data-unit');
            navigateWithTransition(`units/unit${unitNumber}.html`);
        });
    });
    
    // Robot assistant interactions
    const robotAssistant = document.querySelector('.robot-assistant-img');
    if (robotAssistant) {
        robotAssistant.addEventListener('click', function() {
            toggleRobotHelp();
        });
    }
    
    // Robot explain button
    const explainButton = document.getElementById('robot-explain');
    if (explainButton) {
        explainButton.addEventListener('click', function() {
            explainCurrentSection();
        });
    }
    
    // Robot highlight button
    const highlightButton = document.getElementById('robot-highlight');
    if (highlightButton) {
        highlightButton.addEventListener('click', function() {
            highlightKeyPoints();
        });
    }
}

function navigateWithTransition(url) {
    // Add exit animation
    document.body.classList.add('page-transition-out');
    
    // Wait for animation to complete before navigating
    setTimeout(function() {
        window.location.href = url;
    }, 500);
}

function handlePageLoading() {
    // Add entrance animation to body
    document.body.classList.add('page-transition-in');
    
    // Remove the animation class after it completes
    setTimeout(function() {
        document.body.classList.remove('page-transition-in');
    }, 500);
}

function toggleRobotHelp() {
    // Create speech bubble if it doesn't exist
    let speechBubble = document.querySelector('.robot-speech-bubble');
    
    if (!speechBubble) {
        speechBubble = document.createElement('div');
        speechBubble.className = 'robot-speech-bubble fade-in';
        speechBubble.innerHTML = '<p>How can I help you understand Industry 4.0 better?</p>';
        
        const robotContainer = document.querySelector('.robot-assistant');
        robotContainer.prepend(speechBubble);
    } else {
        // Toggle visibility
        speechBubble.classList.toggle('fade-in');
        speechBubble.style.display = speechBubble.style.display === 'none' ? 'block' : 'none';
    }
}

function explainCurrentSection() {
    // Get the current visible section
    const sections = document.querySelectorAll('.content-section');
    let currentSection;
    
    // Find which section is most visible in the viewport
    let maxVisibility = 0;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const visibility = getVisibilityPercentage(rect);
        
        if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentSection = section;
        }
    });
    
    if (currentSection) {
        // Get the section ID to determine what to explain
        const sectionId = currentSection.id;
        
        // Add your explanation logic here
        console.log(`Explaining section: ${sectionId}`);
    }
}

// Progress tracking functionality
function initProgressTracking() {
    // Check if we're on a unit page
    if (document.querySelector('.unit-page')) {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);
        
        // Update progress based on scroll position
        window.addEventListener('scroll', updateProgressBar);
        updateProgressBar(); // Initial update
        
        // Mark sections as read when they come into view
        const sections = document.querySelectorAll('.content-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-read');
                    saveProgress();
                }
            });
        }, {threshold: 0.5});
        
        sections.forEach(section => observer.observe(section));
    }
    
    // Check for completed units on units page
    if (document.querySelector('.units-grid')) {
        updateUnitCompletionStatus();
    }
}

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.progress-bar').style.width = scrolled + '%';
}

function saveProgress() {
    // Get current unit number from URL or data attribute
    const unitNumber = getCurrentUnitNumber();
    if (!unitNumber) return;
    
    // Count read sections
    const totalSections = document.querySelectorAll('.content-section').length;
    const readSections = document.querySelectorAll('.section-read').length;
    
    // Save to localStorage
    const progress = JSON.parse(localStorage.getItem('industry4Progress') || '{}');
    progress[`unit${unitNumber}`] = Math.round((readSections / totalSections) * 100);
    localStorage.setItem('industry4Progress', JSON.stringify(progress));
}

function updateUnitCompletionStatus() {
    const progress = JSON.parse(localStorage.getItem('industry4Progress') || '{}');
    
    // Update unit cards with completion status
    document.querySelectorAll('.unit-card').forEach(card => {
        const unitNumber = card.getAttribute('data-unit');
        const unitProgress = progress[`unit${unitNumber}`] || 0;
        
        // Add progress indicator
        let progressIndicator = card.querySelector('.unit-progress');
        if (!progressIndicator) {
            progressIndicator = document.createElement('div');
            progressIndicator.className = 'unit-progress';
            card.appendChild(progressIndicator);
        }
        
        // Update progress display
        progressIndicator.innerHTML = `
            <div class="progress-track">
                <div class="progress-fill" style="width: ${unitProgress}%"></div>
            </div>
            <div class="progress-text">${unitProgress}% Complete</div>
        `;
        
        // Add completed class if 100%
        if (unitProgress === 100) {
            card.classList.add('unit-completed');
        }
    });
}

function getCurrentUnitNumber() {
    // Try to get from URL first
    const path = window.location.pathname;
    const match = path.match(/unit(\d+)\.html/);
    if (match && match[1]) {
        return match[1];
    }
    
    // Try to get from active tab
    const activeTab = document.querySelector('.unit-tab.active');
    if (activeTab) {
        return activeTab.getAttribute('data-unit');
    }
    
    return null;
}

// Add this function to main.js
function initAnimations() {
    // Check if these functions exist in animations.js before calling them
    if (typeof initParallaxEffect === 'function') {
        initParallaxEffect();
    }
    
    if (typeof init3DCardEffect === 'function') {
        init3DCardEffect();
    }
    
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
}