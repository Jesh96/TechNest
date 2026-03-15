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
    // Model papers data
    const modelPapers = [
        {
            title: 'LESSON 1,2',
            desc: ' (INTRODUCTION OF ICT-PASTPAPER QUESTIONS).',
            difficulty: 'MODERATE',
            link:"assets/l-1,2.pdf"
        },
        {
            title: 'LESSON 3,4',
            desc: ' (NUMBER SYSTEMS & LOGIC GATES-PASTPAPER QUESTIONS)',
            difficulty: 'IMPORTANT',
            link:"assets/l-3,4.pdf"
        },
        {
            title: 'LESSON 05 ',
            desc: '(OPERATING SYSTEMS PASTPAPER QUESTIONS)',
            difficulty: 'IMPORTANT',
            link:"assets/l-5.pdf"
        },
        {
            title: 'LESSON 06 ',
            desc: '(NETWORKING PASTPAPER QUESTIONS)',
            difficulty: 'IMPORTANT',
            link:"assets/l-6.pdf"
        },
        {
            title: 'LESSON 07 ',
            desc: '(SYSTEM DEVELOPMENT - PASTPAPER QUESTIONS)',
            difficulty: 'IMPORTANT',
            link:"assets/l-7.pdf"
        },
        {
            title: 'LESSON 08 ',
            desc: '(DATABASE PASTPAPER QUESTIONS)',
            difficulty: 'IMPORTANT',
            link:"assets/l-8.pdf"
        },
        {
            title: 'LESSON 09 ',
            desc: '(PYTHON PASTPAPER QUESTIONS)',
            difficulty: 'IMPORTANT',
            link:"assets/l-9.pdf"
        },
        {
            title: 'LESSON 10 ',
            desc: '(WEB DEVELOPMENT-PASTPAPER QUESTIONS)',
            difficulty: 'IMPORTANT',
            link:"assets/l-10.pdf"
        },
        {
            title: 'LESSON 11,12,13 ',
            desc: '(INTERNET OF THINGS, E-COMMERCE, NEW-TRENDS-PASTPAPER QUESTIONS)',
            difficulty: 'OCCASIONAL',
            link:"assets/l-11,12,13.pdf"
        }

    ];
    const difficultyLabels = {
        MODERATE: 'MODERATE',
        OCCASIONAL: 'OCCASIONAL',
        IMPORTANT: 'IMPORTANT'
    };
    // Render model papers
    const grid = document.getElementById('modelGrid');
    if (grid) {
        grid.innerHTML = modelPapers.map(paper => `
            <div class="model-card">
                <span class="difficulty-badge ${paper.difficulty}">${difficultyLabels[paper.difficulty]}</span>
                <h3>${paper.title}</h3>
                <p>${paper.desc}</p>
                 <a href="${paper.link}" class="btn-primary" target="_blank">
                    📝 Attempt Paper
                </a>
            </div>
        `).join('');
    }
});