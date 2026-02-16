const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const text = document.getElementById("newYearText");

/* ================= CANVAS ================= */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ================= SKY ================= */
function drawSky() {
    const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height,
        0,
        canvas.width / 2,
        canvas.height,
        canvas.height
    );
    grad.addColorStop(0, "#1b2b4f");
    grad.addColorStop(0.5, "#0b0f2a");
    grad.addColorStop(1, "#05010f");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* ================= STARS ================= */
class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.5 + 0.3;
        this.speed = Math.random() * 0.3 + 0.1;
        this.alpha = Math.random() * 0.6 + 0.4;
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.y = -5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.fill();
    }
}
const stars = Array.from({ length: 200 }, () => new Star());

/* ================= METEOR ================= */
class Meteor {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width * 0.7;
        this.y = Math.random() * canvas.height * 0.3;
        this.vx = 4 + Math.random() * 4;
        this.vy = 4 + Math.random() * 4;
        this.len = 120;

        const hue = Math.random() * 360;
        updateTextColor(hue);
    }
    update() {
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * this.len, this.y - this.vy * this.len);
        ctx.stroke();

        this.x += this.vx;
        this.y += this.vy;

        if (this.x > canvas.width || this.y > canvas.height) this.reset();
    }
}
const meteors = Array.from({ length: 5 }, () => new Meteor());

function updateTextColor(hue) {
    text.style.color = `hsl(${hue}, 80%, 75%)`;
    text.style.textShadow = `
        0 0 18px hsla(${hue},100%,80%,0.7),
        0 0 40px hsla(${hue},100%,60%,0.4)
    `;
}

/* ================= FIREWORK ================= */
class Firework {
    constructor(x, y) {
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            const a = Math.random() * Math.PI * 2;
            const s = Math.random() * 4 + 2;
            this.particles.push({
                x, y,
                vx: Math.cos(a) * s,
                vy: Math.sin(a) * s,
                life: 70,
                hue: Math.random() * 360
            });
        }
    }
    update() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.02;
            p.life--;
            ctx.fillStyle = `hsla(${p.hue},100%,60%,${p.life / 70})`;
            ctx.fillRect(p.x, p.y, 2, 2);
        });
        this.particles = this.particles.filter(p => p.life > 0);
    }
}
const fireworks = [];

setInterval(() => {
    fireworks.push(
        new Firework(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.5
        )
    );
}, 1200);

/* ================= LOOP ================= */
function loop() {
    drawSky();
    stars.forEach(s => s.update());
    meteors.forEach(m => m.update());

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        if (fireworks[i].particles.length === 0) {
            fireworks.splice(i, 1);
        }
    }

    requestAnimationFrame(loop);
}
loop();

/* ================= BUTTON ================= */
document.getElementById("lixiBtn").addEventListener("click", () => {
    const troll = document.getElementById("troll");
    troll.classList.add("show");

    const music = document.getElementById("bgMusic");
    music.volume = 0.6;
    music.currentTime = 0;
    music.play().catch(() => {});
});
