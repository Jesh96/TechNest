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
    // Past papers data
    const papers = [
        { year: 2024, title: 'A/L ICT 2024', desc: 'Latest A/L ICT examination paper with all sections including MCQ, Structured, and Essay questions.',englishlink:"assets/ict-2024.pdf",sinhalalink:"assets/papers/ict-2024s.pdf" },
        { year: 2023, title: 'A/L ICT 2023', desc: 'Complete 2023 paper covering Data Communication, Databases, Programming, and System Analysis.',englishlink:"assets/ict-2023.pdf",sinhalalink:"assets/papers/ict-2023s.pdf" },
        { year: 2022, title: 'A/L ICT 2022', desc: 'Full examination paper. Includes all three parts of the examination.',englishlink:"assets/ict-2022.pdf",sinhalalink:"assets/papers/ict-2022s.pdf" },
        { year: 2021, title: 'A/L ICT 2021', desc: 'Paper conducted under modified syllabus. Good for practicing fundamentals.',englishlink:"assets/ict-2021.pdf",sinhalalink:"assets/papers/ict-2021s.pdf"},
        { year: 2020, title: 'A/L ICT 2020', desc: 'Examination paper with detailed solutions and examiner comments.',englishlink:"assets/ict-2020.pdf",sinhalalink:"assets/papers/ict-2020s.pdf" },
        { year: 2019, title: 'A/L ICT 2019', desc: 'Complete paper covering Number Systems, Logic Gates, Networking, and more.',englishlink:"assets/ict-2019.pdf",sinhalalink:"assets/papers/ict-2019s.pdf" },
        { year: 2018, title: 'A/L ICT 2018', desc: 'Full examination paper. Great for understanding question patterns.',englishlink:"assets/ict-2018.pdf",sinhalalink:"assets/papers/ict-2018s.pdf" },
        { year: 2017, title: 'A/L ICT 2017', desc: 'Past paper with all sections. Includes practical programming questions.',englishlink:"assets/ict-2017.pdf",sinhalalink:"assets/papers/ict-2017s.pdf" },
        { year: 2016, title: 'A/L ICT 2016', desc: 'Complete examination covering OS concepts, Database design, and Web development.',englishlink:"assets/ict-2016.pdf",sinhalalink:"assets/papers/ict-2016s.pdf" },
        { year: 2015, title: 'A/L ICT 2015', desc: 'Earlier format paper. Useful for comprehensive revision and practice.',englishlink:"assets/ict-2015.pdf",sinhalalink:"assets/papers/ict-2015s.pdf" },
        { year: 2014, title: 'A/L ICT 2014', desc: 'Perfect for testing your exam readiness and improving time management during the A/L ICT examination.',englishlink:"assets/ict-2014.pdf",sinhalalink:"assets/papers/ict-2014s.pdf" },
        { year: 2013, title: 'A/L ICT 2013', desc: 'Provides a comprehensive set of questions for practicing all major areas of the A/L ICT curriculum.',englishlink:"assets/ict-2013.pdf",sinhalalink:"assets/papers/ict-2013s.pdf" },
        { year: 2012, title: 'A/L ICT 2012', desc: 'Designed to improve logical thinking and problem-solving skills through structured and essay-type questions.',englishlink:"assets/ict-2012.pdf",sinhalalink:"assets/papers/ict-2012s.pdf" },
        { year: 2011, title: 'A/L ICT 2011', desc: 'Helps students understand the official examination pattern including MCQ, structured questions, and essay sections.',englishlink:"assets/ict-2011.pdf",sinhalalink:"assets/papers/ict-2011s.pdf" }
    ];

    // Render papers
    const grid = document.getElementById('papersGrid');
    if (grid) {
        grid.innerHTML = papers.map(paper => `
            <div class="paper-card">
                <span class="paper-year">${paper.year}</span>
                <h3>${paper.title}</h3>
                <p>${paper.desc}</p>
               <a href="${paper.englishlink}" class="btn-primary" target="_blank">
                  📥 English
</a>
<a href="${paper.sinhalalink}" class="btn-primary" target="_blank">
                  📥 Sinhala
</a>


            </div>
        `).join('');
    }
});
