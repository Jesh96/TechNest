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
    const STORAGE_KEY = 'technest_marks';
    const MAX_MARKS = 25;
    function getMarks() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }
    function saveMarks(marks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
    }
    // ===== ADD MARK =====
    const markInput = document.getElementById('markInput');
    const addBtn = document.getElementById('addMarkBtn');
    const feedback = document.getElementById('inputFeedback');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const val = parseInt(markInput.value);
            if (isNaN(val) || val < 0 || val > 100) {
                feedback.textContent = '⚠ Please enter a valid mark (0-100)';
                feedback.className = 'input-feedback error';
                return;
            }
            let marks = getMarks();
            marks.push(val);
            if (marks.length > MAX_MARKS) {
                marks = marks.slice(marks.length - MAX_MARKS);
            }
            saveMarks(marks);
            feedback.textContent = '✓ Mark added successfully!';
            feedback.className = 'input-feedback success';
            markInput.value = '';
            drawChart();
            updateStats();
            updateMotivation();
            setTimeout(() => { feedback.textContent = ''; }, 2500);
        });
        markInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addBtn.click();
        });
    }
    // ===== CLEAR DATA =====
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all progress data?')) {
                localStorage.removeItem(STORAGE_KEY);
                drawChart();
                updateStats();
                updateMotivation();
            }
        });
    }
    // ===== DRAW CHART =====
    function drawChart() {
        const canvas = document.getElementById('progressChart');
        if (!canvas) return;
        // Make canvas responsive
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = Math.min(350, window.innerHeight * 0.4);
        const ctx = canvas.getContext('2d');
        const marks = getMarks();
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        const pad = { top: 30, right: 30, bottom: 50, left: 55 };
        const cW = W - pad.left - pad.right;
        const cH = H - pad.top - pad.bottom;
        // Background
        ctx.fillStyle = '#FAFBFC';
        ctx.fillRect(pad.left, pad.top, cW, cH);
        // Grid lines & Y-axis labels
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.font = '11px Segoe UI';
        for (let i = 0; i <= 5; i++) {
            const y = pad.top + cH - (i / 5) * cH;
            ctx.strokeStyle = i === 0 ? '#CBD5E1' : '#E8EDF2';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pad.left, y);
            ctx.lineTo(W - pad.right, y);
            ctx.stroke();
            ctx.fillStyle = '#64748B';
            ctx.fillText(i * 20, pad.left - 10, y);
        }
        // X-axis labels
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const maxPoints = 25;
        for (let i = 1; i <= maxPoints; i++) {
            if (i === 1 || i % 5 === 0) {
                const x = pad.left + ((i - 1) / (maxPoints - 1)) * cW;
                ctx.fillStyle = '#64748B';
                ctx.fillText(i, x, pad.top + cH + 10);
            }
        }
        // Axis titles
        ctx.fillStyle = '#1B4965';
        ctx.font = 'bold 12px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText('Attempt Number', W / 2, H - 8);
        ctx.save();
        ctx.translate(14, H / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Marks', 0, 0);
        ctx.restore();
        if (marks.length === 0) {
            ctx.fillStyle = '#94A3B8';
            ctx.font = '14px Segoe UI';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('No data yet. Add marks to see your progress!', W / 2, H / 2);
            return;
        }
        // Calculate point positions
        const points = marks.map((mark, i) => ({
            x: pad.left + (marks.length === 1 ? cW / 2 : (i / (maxPoints - 1)) * cW),
            y: pad.top + cH - (mark / 100) * cH,
            value: mark
        }));
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + cH);
        gradient.addColorStop(0, 'rgba(255, 107, 53, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 107, 53, 0.02)');
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(points[points.length - 1].x, pad.top + cH);
        ctx.lineTo(points[0].x, pad.top + cH);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        // Line
        ctx.beginPath();
        ctx.strokeStyle = '#FF6B35';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        points.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        // Points
        points.forEach((p) => {
            // Outer circle
            ctx.beginPath();
            ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#FF6B35';
            ctx.fill();
            // Inner circle
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
        });
        // Value labels on points
        ctx.font = 'bold 10px Segoe UI';
        ctx.fillStyle = '#1B4965';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        points.forEach((p) => {
            ctx.fillText(p.value, p.x, p.y - 10);
        });
    }
    // ===== UPDATE STATS =====
    function updateStats() {
        const marks = getMarks();
        const avgEl = document.getElementById('statAvg');
        const highEl = document.getElementById('statHigh');
        const lowEl = document.getElementById('statLow');
        const latestEl = document.getElementById('statLatest');
        const totalEl = document.getElementById('statTotal');
        if (marks.length === 0) {
            if (avgEl) avgEl.textContent = '--';
            if (highEl) highEl.textContent = '--';
            if (lowEl) lowEl.textContent = '--';
            if (latestEl) latestEl.textContent = '--';
            if (totalEl) totalEl.textContent = '0';
            return;
        }
        const avg = (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1);
        const high = Math.max(...marks);
        const low = Math.min(...marks);
        const latest = marks[marks.length - 1];
        if (avgEl) avgEl.textContent = avg;
        if (highEl) highEl.textContent = high;
        if (lowEl) lowEl.textContent = low;
        if (latestEl) latestEl.textContent = latest;
        if (totalEl) totalEl.textContent = marks.length;
    }
    // ===== UPDATE MOTIVATION =====
    function updateMotivation() {
        const marks = getMarks();
        const card = document.getElementById('motivationCard');
        if (!card) return;
        if (marks.length === 0) {
            card.className = 'motivation-card start';
            card.innerHTML = `
                <div class="motivation-icon">🚀</div>
                <h3>Start Your Journey!</h3>
                <p>Add your first mark to begin tracking your progress. Every great achievement starts with a single step.</p>
            `;
            return;
        }
        const avg = marks.reduce((a, b) => a + b, 0) / marks.length;
        if (avg >= 75) {
            card.className = 'motivation-card great';
            card.innerHTML = `
                <div class="motivation-icon">🏆</div>
                <h3>Outstanding Performance!</h3>
                <p>You're scoring an average of ${avg.toFixed(1)}! You're well-prepared for the A/L examination. Keep up the excellent work!</p>
            `;
        } else if (avg >= 50) {
            card.className = 'motivation-card good';
            card.innerHTML = `
                <div class="motivation-icon">⭐</div>
                <h3>Good Progress!</h3>
                <p>Your average is ${avg.toFixed(1)}. You're on the right track! Focus on weaker areas and you'll see even better results.</p>
            `;
        } else {
            card.className = 'motivation-card keep-going';
            card.innerHTML = `
                <div class="motivation-icon">💪</div>
                <h3>Keep Going!</h3>
                <p>Your average is ${avg.toFixed(1)}. Don't give up! Every practice session makes you stronger. Review the topics you find difficult and try again.</p>
            `;
        }
    }
    // ===== INIT =====
    drawChart();
    updateStats();
    updateMotivation();
    // Redraw chart on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawChart, 200);
    });
});
