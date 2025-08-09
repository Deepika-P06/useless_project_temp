// script.js - dynamically create floating clouds & birds, handle clicks

// Words + fake antonym meanings
const WORDS = [
  { word: "Run",   meaning: "To stand perfectly still while imagining motion." },
  { word: "Jump",  meaning: "To sink gracefully into the floor." },
  { word: "Speak", meaning: "To keep your voice safely in your pocket." },
  { word: "Laugh", meaning: "To maintain a perfectly serious face at all times." },
  { word: "Eat",   meaning: "To admire food from a distance and send it compliments." },
  { word: "Sleep", meaning: "To remain awake while thinking intensely about sleeping." },
  { word: "Code",  meaning: "To stare at an editor until it fixes itself." },
  { word: "Walk",  meaning: "To teleport a few centimeters and call it exercise." }
];

const SKY = document.getElementById('sky');
const meaningBox = document.getElementById('meaningBox');
const wordTitle = document.getElementById('wordTitle');
const wordMeaning = document.getElementById('wordMeaning');
const closeBtn = document.getElementById('closeBtn');

// create N clouds across the sky by taking words (we'll loop words to fill space)
function spawnClouds() {
  // clear existing
  SKY.innerHTML = '';

  // add a few decorative birds
  spawnBirds(3);

  // create several cloud nodes with varying delays/speeds/vertical positions
  const viewportHeight = SKY.clientHeight || window.innerHeight * 0.6;

  for (let i = 0; i < WORDS.length; i++) {
    // create cloud element
    const data = WORDS[i];
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.textContent = data.word;
    cloud.setAttribute('data-meaning', data.meaning);
    cloud.setAttribute('data-word', data.word);

    // randomize starting vertical position (within sky)
    const topPercent = 6 + Math.random() * 80; // between ~6% and 86%
    cloud.style.top = `${topPercent}%`;

    // start off-screen left by a random offset
    const startOffset = -80 - Math.random() * 420;
    cloud.style.left = `${startOffset}px`;

    // animation duration and delay randomization
    const duration = 18 + Math.random() * 18; // 18s - 36s
    const delay = Math.random() * 6; // staggered start
    cloud.style.animation = `floatAcross ${duration}s linear ${delay}s infinite`;

    // make it clickable to show meaning
    cloud.addEventListener('click', (e) => {
      e.stopPropagation();
      const w = cloud.getAttribute('data-word');
      const m = cloud.getAttribute('data-meaning');
      showMeaning(w, m);
    });

    SKY.appendChild(cloud);
  }

  // spawn a few extra clouds (repeat words) for density
  for (let j = 0; j < 4; j++) {
    const data = WORDS[Math.floor(Math.random() * WORDS.length)];
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.textContent = data.word;
    cloud.setAttribute('data-meaning', data.meaning);
    cloud.setAttribute('data-word', data.word);
    cloud.style.top = `${6 + Math.random() * 80}%`;
    cloud.style.left = `${-120 - Math.random() * 700}px`;
    const duration = 20 + Math.random() * 28;
    const delay = Math.random() * 10;
    cloud.style.animation = `floatAcross ${duration}s linear ${delay}s infinite`;
    cloud.addEventListener('click', (e) => {
      e.stopPropagation();
      showMeaning(cloud.getAttribute('data-word'), cloud.getAttribute('data-meaning'));
    });
    SKY.appendChild(cloud);
  }
}

// create simple bird elements
function spawnBirds(count = 2) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bird';
    // vertical placement
    const top = 8 + Math.random() * 70;
    b.style.top = `${top}%`;
    // start from left off-screen
    b.style.left = `${-60 - Math.random() * 160}px`;
    // flight timing
    const dur = 10 + Math.random() * 12;
    const delay = Math.random() * 6;
    b.style.animation = `birdFly ${dur}s linear ${delay}s infinite`;
    // small random rotation
    b.style.transform = `rotate(${(Math.random() * 10) - 5}deg)`;
    SKY.appendChild(b);
  }
}

// show meaning popup
function showMeaning(word, meaning) {
  wordTitle.textContent = word;
  wordMeaning.textContent = meaning;
  meaningBox.classList.add('visible');
  meaningBox.classList.remove('hidden');
  meaningBox.setAttribute('aria-hidden', 'false');
}

// hide meaning popup
closeBtn.addEventListener('click', () => {
  meaningBox.classList.remove('visible');
  meaningBox.classList.add('hidden');
  meaningBox.setAttribute('aria-hidden', 'true');
});

// click outside to close (optional)
document.addEventListener('click', (e) => {
  if (!meaningBox.classList.contains('hidden')) {
    meaningBox.classList.remove('visible');
    meaningBox.classList.add('hidden');
    meaningBox.setAttribute('aria-hidden', 'true');
  }
});

// initial spawn
spawnClouds();

// keep clouds reasonably positioned on resize (recreate clouds)
window.addEventListener('resize', () => {
  spawnClouds();
});
