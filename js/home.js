document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    // Set username in welcome
    const userEl = document.getElementById('userName');
    if (userEl) {
        const user = localStorage.getItem('technest_user') || 'Student';
        userEl.textContent = user;
    }
    // ===== COUNTDOWN TIMER =====
    // A/L Exam date - August 4, 2025 (approximate)
    const examDate = new Date('2025-08-04T08:00:00').getTime();
    function updateCountdown() {
        const now = new Date().getTime();
        let diff = examDate - now;
        if (diff <= 0) {
            // If exam date has passed, set to next year
            const nextExam = new Date('2026-08-03T08:00:00').getTime();
            diff = nextExam - now;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
    // ===== SCROLL ANIMATIONS =====
    const animItems = document.querySelectorAll('.anim-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    animItems.forEach(item => observer.observe(item));
});