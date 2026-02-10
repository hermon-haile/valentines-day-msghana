let hasMoved = false;

const bgMusic = document.getElementById("bgMusic");

const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const overlay = document.getElementById("loveScreen");

const container = document.querySelector(".container");

function moveNoButton() {
  
    if (!hasMoved) {
        hasMoved = true;
        // switch to absolute positioning only after first move
        noBtn.style.position = "absolute";
    }

    const padding = 20;
    const container = document.querySelector(".container");

    const maxX = Math.max(
        0,
        container.clientWidth - noBtn.offsetWidth - padding
    );
    
    const maxY = Math.max(
        0,
        container.clientHeight - noBtn.offsetHeight - padding
    );

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}


// Desktop + mobile runaway
noBtn.addEventListener("mouseenter", activateNoButton);
noBtn.addEventListener("touchstart", activateNoButton);
noBtn.addEventListener("click", activateNoButton);

function explodeHearts(x, y) {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "💖";
        heart.style.left = x + (Math.random() * 120 - 60) + "px";
        heart.style.top = y + (Math.random() * 60 - 30) + "px";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }
}

yesBtn.addEventListener("click", (e) => {
    explodeHearts(
    e.clientX || window.innerWidth / 2,
    e.clientY || window.innerHeight / 2
    );

    setTimeout(() => {
    overlay.style.display = "flex";
    }, 500);
});

let musicStarted = false;

function startBackgroundMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(() => {});
        musicStarted = true;
    }
}

function activateNoButton() {
    moveNoButton();
}


document.addEventListener("click", startBackgroundMusic, { once: true });
document.addEventListener("touchstart", startBackgroundMusic, { once: true });