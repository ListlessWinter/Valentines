const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');
const bgMusic = document.getElementById('bg-music');

// Auto-play Music (and fallback for browser policies)
document.addEventListener('DOMContentLoaded', () => {
    // Try to play immediately
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay prevented. Waiting for user interaction.");
            // Fallback: Play on first click/touch
            document.body.addEventListener('click', function () {
                bgMusic.play();
            }, { once: true });
        });
    }
});

// Logic to move the 'No' button
function moveNoButton() {
    // Get viewport dimensions
    const maxWidth = window.innerWidth - noBtn.offsetWidth;
    const maxHeight = window.innerHeight - noBtn.offsetHeight;

    // Calculate random position
    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    // Apply new position (using fixed to ensure it can go anywhere on screen)
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Optional: Add a funny transform to make it look like it's dodging
    noBtn.style.transform = `rotate(${Math.floor(Math.random() * 40 - 20)}deg)`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent click behavior on touch
    moveNoButton();
});

// Logic for 'Yes' button
let yesClickCount = 0;

yesBtn.addEventListener('click', () => {
    yesClickCount++;

    if (yesClickCount < 10) {
        // Grow the button
        const currentScale = 1 + (yesClickCount * 0.3); // Grow by 30% each time to accommodate 10 clicks
        yesBtn.style.transform = `scale(${currentScale})`;
    } else {
        // Hide question, show presents selection
        questionContainer.classList.add('hidden');
        document.getElementById('presents-container').classList.remove('hidden');
    }
});

// Presents Logic
const present1 = document.getElementById('present-1');
const present2 = document.getElementById('present-2');
const present3 = document.getElementById('present-3');

present1.addEventListener('click', () => {
    // Correct Present!
    document.getElementById('presents-container').classList.add('hidden');
    successContainer.classList.remove('hidden');
    document.querySelector('.container').classList.add('burning');

    // Play the video
    const successVideo = document.getElementById('success-video');
    successVideo.play();

    // Launch Confetti
    launchConfetti();
    // Start Falling Petals
    createPetals();
});

present2.addEventListener('click', () => {
    alert("This one is empty... try another! 🎁");
});

present3.addEventListener('click', () => {
    alert("Nope, not this one! 😉");
});

function createPetals() {
    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Randomize positioning and animation
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s fall duration

        // Randomize color slightly
        const colors = ['#ff4b6e', '#ff0040', '#ffb7c5', '#e91e63'];
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(petal);

        // Cleanup
        setTimeout(() => {
            petal.remove();
        }, 5000);
    }, 300); // New petal every 300ms
}

function launchConfetti() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
