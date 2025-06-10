class IndustryQuiz {
    constructor(unitNumber) {
        this.unitNumber = unitNumber;
        this.questions = this.getQuestionsForUnit(unitNumber);
        this.currentQuestion = 0;
        this.score = 0;
        this.quizContainer = null;
    }
    
    getQuestionsForUnit(unit) {
        // Questions database organized by unit
        const questionsByUnit = {
            1: [
                {
                    question: "What is the primary goal of Industry 4.0?",
                    options: [
                        "Replacing human workers with robots",
                        "Creating intelligent factories with adaptive, self-optimizing systems",
                        "Reducing manufacturing costs by outsourcing",
                        "Increasing factory size and production volume"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which industrial revolution introduced mechanical production powered by water and steam?",
                    options: ["Industry 1.0", "Industry 2.0", "Industry 3.0", "Industry 4.0"],
                    correctAnswer: 0
                },
                {
                    question: "Which is NOT one of the design principles of Industry 4.0?",
                    options: ["Interoperability", "Centralized Decision Making", "Information Transparency", "Technical Assistance"],
                    correctAnswer: 1
                }
            ],
            2: [
                {
                    question: "What are Cyber-Physical Systems (CPS)?",
                    options: [
                        "Computer security systems that protect against cyber attacks",
                        "Physical exercise programs for computer users",
                        "Integrations of computation, networking, and physical processes",
                        "Virtual reality systems for industrial training"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which technology allows workers to see digital information overlaid on the physical world?",
                    options: ["Virtual Reality", "Augmented Reality", "Mixed Reality", "Digital Twin"],
                    correctAnswer: 1
                }
            ],
            3: [
                {
                    question: "What does IIoT stand for?",
                    options: [
                        "Intelligent Internet of Things",
                        "Industrial Internet of Things",
                        "Integrated Internet of Things",
                        "International Internet of Things"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which is NOT a common communication protocol used in IIoT?",
                    options: ["MQTT", "HTTP", "SNTP", "OPC UA"],
                    correctAnswer: 2
                }
            ],
            4: [
                {
                    question: "Which technology uses computer vision, natural language processing, and expert systems?",
                    options: ["Big Data", "Cloud Computing", "Artificial Intelligence", "Blockchain"],
                    correctAnswer: 2
                },
                {
                    question: "What is the primary benefit of cloud computing in Industry 4.0?",
                    options: [
                        "Reduced need for skilled workers",
                        "Elimination of physical machinery",
                        "Scalable computing resources without major infrastructure investments",
                        "Simplified regulatory compliance"
                    ],
                    correctAnswer: 2
                }
            ]
        };
        
        return questionsByUnit[unit] || [];
    }
    
    createQuizInterface() {
        // Create quiz container
        this.quizContainer = document.createElement('div');
        this.quizContainer.className = 'quiz-container';
        
        // Add quiz header
        const quizHeader = document.createElement('div');
        quizHeader.className = 'quiz-header';
        quizHeader.innerHTML = `
            <h2>Unit ${this.unitNumber} Knowledge Check</h2>
            <p>Test your understanding of the key concepts from this unit.</p>
        `;
        
        // Add quiz content area
        const quizContent = document.createElement('div');
        quizContent.className = 'quiz-content';
        
        // Assemble quiz container
        this.quizContainer.appendChild(quizHeader);
        this.quizContainer.appendChild(quizContent);
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'quiz-close-btn';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.addEventListener('click', () => this.closeQuiz());
        this.quizContainer.appendChild(closeButton);
        
        // Add to page
        document.body.appendChild(this.quizContainer);
        
        // Display first question
        this.displayQuestion();
    }
    
    displayQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }
        
        const question = this.questions[this.currentQuestion];
        const quizContent = this.quizContainer.querySelector('.quiz-content');
        
        quizContent.innerHTML = `
            <div class="question-number">Question ${this.currentQuestion + 1} of ${this.questions.length}</div>
            <div class="question-text">${question.question}</div>
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <div class="option" data-index="${index}">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add event listeners to options
        quizContent.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedIndex = parseInt(e.currentTarget.getAttribute('data-index'));
                this.checkAnswer(selectedIndex);
            });
        });
    }
    
    checkAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const options = this.quizContainer.querySelectorAll('.option');
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Highlight correct and incorrect answers
        options.forEach((option, index) => {
            if (index === question.correctAnswer) {
                option.classList.add('correct');
            } else if (index === selectedIndex) {
                option.classList.add('incorrect');
            }
        });
        
        // Update score
        if (selectedIndex === question.correctAnswer) {
            this.score++;
        }
        
        // Show next button
        setTimeout(() => {
            const nextButton = document.createElement('button');
            nextButton.className = 'next-question-btn';
            nextButton.textContent = this.currentQuestion < this.questions.length - 1 ? 'Next Question' : 'See Results';
            nextButton.addEventListener('click', () => {
                this.currentQuestion++;
                this.displayQuestion();
            });
            
            this.quizContainer.querySelector('.quiz-content').appendChild(nextButton);
        }, 1000);
    }
    
    showResults() {
        const quizContent = this.quizContainer.querySelector('.quiz-content');
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        quizContent.innerHTML = `
            <div class="quiz-results">
                <div class="results-header">
                    <i class="${percentage >= 70 ? 'fas fa-trophy' : 'fas fa-clipboard-check'}"></i>
                    <h2>${percentage >= 70 ? 'Congratulations!' : 'Quiz Completed'}</h2>
                </div>
                <div class="score-display">
                    <div class="score-circle">
                        <div class="score-number">${percentage}%</div>
                    </div>
                    <p>You answered ${this.score} out of ${this.questions.length} questions correctly.</p>
                </div>
                <div class="results-message">
                    ${this.getResultMessage(percentage)}
                </div>
                <button class="close-results-btn">Continue Learning</button>
            </div>
        `;
        
        // Add event listener to close button
        quizContent.querySelector('.close-results-btn').addEventListener('click', () => {
            this.closeQuiz();
        });
        
        // Save quiz result
        this.saveQuizResult(percentage);
    }
    
    getResultMessage(percentage) {
        if (percentage >= 90) {
            return "Excellent! You have a thorough understanding of this unit's concepts.";
        } else if (percentage >= 70) {
            return "Good job! You have a solid grasp of the material.";
        } else if (percentage >= 50) {
            return "You're on the right track, but might want to review some concepts.";
        } else {
            return "Consider reviewing this unit again to strengthen your understanding.";
        }
    }
    
    saveQuizResult(percentage) {
        const results = JSON.parse(localStorage.getItem('industry4QuizResults') || '{}');
        results[`unit${this.unitNumber}`] = percentage;
        localStorage.setItem('industry4QuizResults', JSON.stringify(results));
    }
    
    closeQuiz() {
        // Add exit animation
        this.quizContainer.classList.add('fade-out');
        
        // Remove after animation completes
        setTimeout(() => {
            document.body.removeChild(this.quizContainer);
        }, 500);
    }
}

// Add quiz button to unit pages
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.unit-page')) {
        // Get current unit number
        const path = window.location.pathname;
        const match = path.match(/unit(\d+)\.html/);
        if (!match || !match[1]) return;
        
        const unitNumber = parseInt(match[1]);
        
        // Create quiz button
        const quizButton = document.createElement('button');
        quizButton.className = 'quiz-button pulse-animation';
        quizButton.innerHTML = '<i class="fas fa-question-circle"></i> Take Quiz';
        
        // Add event listener
        quizButton.addEventListener('click', function() {
            const quiz = new IndustryQuiz(unitNumber);
            quiz.createQuizInterface();
        });
        
        // Add to page
        document.querySelector('.unit-header').appendChild(quizButton);
    }
});