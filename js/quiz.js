document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    // ===== QUESTION POOL =====
    const questionPool = [
        {
            question: "What does CPU stand for?",
            options: ["Central Processing Unit", "Central Program Utility", "Computer Personal Unit", "Central Processor Unifier"],
            correct: 0
        },
        {
            question: "Which of the following is an input device?",
            options: ["Monitor", "Printer", "Scanner", "Speaker"],
            correct: 2
        },
        {
            question: "What is the binary equivalent of decimal number 10?",
            options: ["1000", "1010", "1100", "1001"],
            correct: 1
        },
        {
            question: "Which protocol is used for sending emails?",
            options: ["HTTP", "FTP", "SMTP", "TCP"],
            correct: 2
        },
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
            correct: 0
        },
        {
            question: "What is the smallest unit of data in a computer?",
            options: ["Byte", "Kilobyte", "Bit", "Nibble"],
            correct: 2
        },
        {
            question: "Which network topology connects all devices to a central hub?",
            options: ["Bus", "Ring", "Star", "Mesh"],
            correct: 2
        },
        {
            question: "What does SQL stand for?",
            options: ["Simple Query Language", "Structured Query Language", "Standard Question Language", "Sequential Query Logic"],
            correct: 1
        },
        {
            question: "Which of the following is a secondary storage device?",
            options: ["RAM", "Cache", "Hard Disk", "Register"],
            correct: 2
        },
        {
            question: "What does URL stand for?",
            options: ["Universal Resource Locator", "Uniform Resource Locator", "Unified Record Locator", "Universal Record Link"],
            correct: 1
        },
        {
            question: "Which generation of computers introduced Integrated Circuits (ICs)?",
            options: ["First", "Second", "Third", "Fourth"],
            correct: 2
        },
        {
            question: "What does DNS stand for?",
            options: ["Domain Name System", "Digital Network Service", "Data Name Server", "Domain Network Standard"],
            correct: 0
        },
        {
            question: "Which of the following is an operating system?",
            options: ["Python", "Linux", "HTML", "MySQL"],
            correct: 1
        },
        {
            question: "What is the base of the hexadecimal number system?",
            options: ["2", "8", "10", "16"],
            correct: 3
        },
        {
            question: "Which of these is a web browser?",
            options: ["Apache", "MySQL", "Firefox", "Node.js"],
            correct: 2
        },
        {
            question: "In database terminology, what is a row also called?",
            options: ["Field", "Record", "Column", "Table"],
            correct: 1
        },
        {
            question: "What does HTTP stand for?",
            options: ["Hyper Text Transfer Protocol", "High Tech Transfer Program", "Hyper Text Transport Protocol", "Home Transfer Text Protocol"],
            correct: 0
        },
        {
            question: "Which of the following is a high-level programming language?",
            options: ["Machine Code", "Assembly", "Python", "Binary"],
            correct: 2
        },
        {
            question: "What is the full form of LAN?",
            options: ["Large Area Network", "Local Access Network", "Local Area Network", "Long Area Network"],
            correct: 2
        },
        {
            question: "Which logic gate outputs TRUE only when all inputs are TRUE?",
            options: ["OR", "AND", "NOT", "XOR"],
            correct: 1
        }
    ];
    // ===== STATE =====
    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let answers = []; // {selected, correct, questionIndex}
    let answered = false;
    // ===== ELEMENTS =====
    const startScreen = document.getElementById('quizStart');
    const questionScreen = document.getElementById('quizQuestion');
    const resultsScreen = document.getElementById('quizResults');
    const startBtn = document.getElementById('startQuizBtn');
    // ===== SELECT QUESTIONS =====
    function selectQuestions() {
        // Use date-based seeding for daily refresh
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        // Simple seeded shuffle
        let pool = [...questionPool];
        let seededRandom = function() {
            let x = Math.sin(seed + seededRandom.counter++) * 10000;
            return x - Math.floor(x);
        };
        seededRandom.counter = 0;
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        return pool.slice(0, 5);
    }
    // ===== START QUIZ =====
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            currentQuestions = selectQuestions();
            currentIndex = 0;
            score = 0;
            answers = [];
            answered = false;
            startScreen.style.display = 'none';
            resultsScreen.style.display = 'none';
            questionScreen.style.display = 'block';
            showQuestion();
        });
    }
    // ===== SHOW QUESTION =====
    function showQuestion() {
        answered = false;
        const q = currentQuestions[currentIndex];
        const letters = ['A', 'B', 'C', 'D'];
        // Progress
        document.getElementById('progressFill').style.width = ((currentIndex) / 5 * 100) + '%';
        document.getElementById('progressText').textContent = `${currentIndex + 1} / 5`;
        // Question text
        document.getElementById('questionText').textContent = q.question;
        // Options
        const optionsContainer = document.getElementById('optionsList');
        optionsContainer.innerHTML = q.options.map((opt, i) => `
            <button class="option-btn" data-index="${i}">
                <span class="option-letter">${letters[i]}</span>
                <span class="option-text">${opt}</span>
            </button>
        `).join('');
        // Feedback & Next
        document.getElementById('answerFeedback').className = 'answer-feedback';
        document.getElementById('answerFeedback').style.display = 'none';
        document.getElementById('nextBtn').classList.remove('show');
        // Option click handlers
        optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
        });
        // Animate
        questionScreen.style.animation = 'none';
        questionScreen.offsetHeight; // reflow
        questionScreen.style.animation = 'fadeInUp 0.4s ease';
    }
    // ===== HANDLE ANSWER =====
    function handleAnswer(selectedIndex) {
        if (answered) return;
        answered = true;
        const q = currentQuestions[currentIndex];
        const isCorrect = selectedIndex === q.correct;
        if (isCorrect) score++;
        answers.push({
            question: q.question,
            options: q.options,
            selected: selectedIndex,
            correct: q.correct,
            isCorrect: isCorrect
        });
        // Highlight options
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            const idx = parseInt(btn.dataset.index);
            btn.classList.add('disabled');
            if (idx === q.correct) {
                btn.classList.add('correct');
                btn.querySelector('.option-letter').textContent = '✓';
            }
            if (idx === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
                btn.querySelector('.option-letter').textContent = '✗';
            }
        });
        // Feedback
        const feedbackEl = document.getElementById('answerFeedback');
        if (isCorrect) {
            feedbackEl.className = 'answer-feedback correct';
            feedbackEl.textContent = '✓ Correct! Well done!';
        } else {
            feedbackEl.className = 'answer-feedback wrong';
            feedbackEl.textContent = `✗ Incorrect. The correct answer is: ${q.options[q.correct]}`;
        }
        feedbackEl.style.display = 'block';
        // Show next button
        const nextBtn = document.getElementById('nextBtn');
        nextBtn.classList.add('show');
        nextBtn.textContent = currentIndex === 4 ? 'See Results' : 'Next Question →';
        nextBtn.onclick = () => {
            currentIndex++;
            if (currentIndex >= 5) {
                showResults();
            } else {
                showQuestion();
            }
        };
    }
    // ===== SHOW RESULTS =====
    function showResults() {
        questionScreen.style.display = 'none';
        resultsScreen.style.display = 'block';
        // Score
        document.getElementById('finalScore').textContent = `${score} / 5`;
        // Icon & message
        const iconEl = document.getElementById('resultsIcon');
        const msgEl = document.getElementById('scoreMessage');
        if (score === 5) {
            iconEl.textContent = '🏆';
            msgEl.textContent = 'Perfect score! You have excellent ICT knowledge!';
        } else if (score >= 4) {
            iconEl.textContent = '🌟';
            msgEl.textContent = 'Great job! You know your ICT concepts well!';
        } else if (score >= 3) {
            iconEl.textContent = '👍';
            msgEl.textContent = 'Good effort! Review the topics you missed.';
        } else if (score >= 2) {
            iconEl.textContent = '📚';
            msgEl.textContent = 'Keep studying! Practice makes perfect.';
        } else {
            iconEl.textContent = '💪';
            msgEl.textContent = 'Don\'t give up! Review your notes and try again.';
        }
        // Review section
        const reviewContainer = document.getElementById('reviewContainer');
        reviewContainer.innerHTML = answers.map((a, i) => `
            <div class="review-item ${a.isCorrect ? 'correct-review' : 'wrong-review'}">
                <div class="review-q">${i + 1}. ${a.question}</div>
                <div class="review-answer">
                    Your answer: <span class="${a.isCorrect ? 'correct-text' : 'wrong-text'}">${a.options[a.selected]} ${a.isCorrect ? '✓' : '✗'}</span>
                    ${!a.isCorrect ? `<br>Correct answer: <span class="correct-text">${a.options[a.correct]} ✓</span>` : ''}
                </div>
            </div>
        `).join('');
        // Restart button
        document.getElementById('restartBtn').onclick = () => {
            resultsScreen.style.display = 'none';
            startScreen.style.display = 'block';
        };
    }
});