document.addEventListener('DOMContentLoaded', () => {
    // Create floating particles
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 6 + 3) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
            particle.style.animationDelay = (Math.random() * 8) + 's';
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }
    // Handle login
    const btnEnter = document.getElementById('btnEnter');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    if (btnEnter) {
        btnEnter.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            if (username) {
                localStorage.setItem('technest_user', username);
            } else {
                localStorage.setItem('technest_user', 'Student');
            }
            // Add transition effect
            document.querySelector('.login-card').style.transform = 'scale(0.95)';
            document.querySelector('.login-card').style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 300);
        });
        // Enter key support
        [usernameInput, passwordInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') btnEnter.click();
            });
        });
    }
});