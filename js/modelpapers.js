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
            title: 'Model Paper 01',
            desc: 'Build a strong foundation in ICT by practicing questions on core concepts, computer components, and basic digital systems.',
            difficulty: 'easy',
            link:"assets/jan2.pdf"
        },
        {
            title: 'Model Paper 02 ',
            desc: 'Test your understanding of networking concepts including communication methods, network structures, and internet services.',
            difficulty: 'medium',
            link:"assets/jan3.pdf"
        },
        {
            title: 'Model Paper 03',
            desc: 'Develop skills in database design and management with questions on data organization, relationships, and query techniques.',
            difficulty: 'medium',
            link:"assets/jan4.pdf"
        },
        {
            title: 'Model Paper 04 ',
            desc: 'Improve problem-solving abilities through exercises on algorithms, logic building, and programming fundamentals.',
            difficulty: 'hard',
            link:"assets/MO1.pdf"
        },
        {
            title: 'Model Paper 05 ',
            desc: 'Explore ICT applications in real-world scenarios including information systems and technology usage in organizations.',
            difficulty: 'easy',
            link:"assets/MO2.pdf"
        },
        {
            title: 'Model Paper 06 ',
            desc: 'Challenge yourself with a mixed paper covering multiple ICT topics to prepare for the full A/L ICT examination.',
            difficulty: 'hard',
            link:"assets/MO3.pdf"
        },
        {
            title: 'Model Paper 07 ',
            desc: 'Focus on data representation techniques including binary systems, character encoding, and digital data storage concepts.',
            difficulty: 'medium',
            link:"assets/MO4.pdf"
        },
        {
            title: 'Model Paper 08 ',
            desc: 'Practice questions on computer architecture, processing components, memory systems, and input/output devices.',
            difficulty: 'easy',
            link:"assets/MOmarch1.pdf"
        },
        {
            title: 'Model Paper 09',
            desc: 'Explore software concepts including operating systems, application software, and system utilities used in modern computing.',
            difficulty: 'medium',
            link:"assets/REV 08.pdf"
        },
         {
            title: 'Model Paper 10 ',
            desc: 'A comprehensive practice paper combining multiple ICT topics to strengthen exam readiness and problem-solving skills.',
            difficulty: 'easy',
            link:"assets/REV 09.pdf"
        }


    ];
    const difficultyLabels = {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard'
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