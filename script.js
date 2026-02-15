const music = document.getElementById("bgMusic");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

/* ⭐ PHÁO HOA TO + LÂU */
function firework(x, y) {
    for (let i = 0; i < 220; i++) { // 🔥 nhiều tia hơn (to hơn)
        particles.push({
            x, y,
            vx: rand(-7, 7),        // 🔥 bay xa hơn
            vy: rand(-7, 7),
            life: 200,              // 🔥 sống lâu hơn
            size: rand(2, 4),       // 🔥 hạt to hơn
            color: `hsl(${rand(0,360)},100%,60%)`
        });
    }
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.15)"; // 🔥 mờ chậm → vệt kéo dài
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // rơi chậm hơn
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) particles.splice(i,1);
    });

    requestAnimationFrame(animate);
}

animate();

/* 🔥 PHÁO HOA TỰ ĐỘNG – TO & CHẬM */
setInterval(() => {
    firework(
        rand(150, canvas.width - 150),
        rand(150, canvas.height / 2)
    );
}, 1200);

/* 🔥 BẤM LÌ XÌ → NỔ LIÊN HOÀN * NHẠC NHẼO NX */
function nhanLiXi() {
    document.getElementById("troll").style.display = "block";

    music.volume = 0.6;
    music.play().catch(err => {
        console.log("Không bật được nhạc:", err);
    });

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            firework(
                rand(150, canvas.width - 150),
                rand(150, canvas.height / 2)
            );
        }, i * 200);
    }
}
