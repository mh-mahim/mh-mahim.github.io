// 1. Dynamic Welcome Message
const welcomeText = document.getElementById('welcome-text');
const messages = [
    "Welcome to my Portfolio!",
    "Exploring Electronics & Code.",
    "Designing the Future.",
    "Open for Collaboration!"
];
let msgIndex = 0;

function rotateMessage() {
    welcomeText.style.opacity = 0;
    setTimeout(() => {
        welcomeText.innerText = messages[msgIndex];
        welcomeText.style.opacity = 1;
        msgIndex = (msgIndex + 1) % messages.length;
    }, 500);
}
setInterval(rotateMessage, 3000);

// 2. Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu on click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// 3. Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

// 4. Subtle Parallax for Hero Image
document.addEventListener('mousemove', (e) => {
    const img = document.querySelector('.profile-img');
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    
    if(img) {
        img.style.transform = `translateX(${x}px) translateY(${y}px) rotate(2deg)`;
    }
});

