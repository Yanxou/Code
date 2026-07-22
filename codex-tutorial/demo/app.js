const emojis = ['🐶', '🐱', '🐸', '🦊', '🐼', '🐨', '🦁', '🐙'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timerInterval = null;
let seconds = 0;
let isLocked = false;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initGame() {
  const board = document.getElementById('gameBoard');
  board.innerHTML = '';
  const deck = shuffle([...emojis, ...emojis]);
  cards = deck;
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  seconds = 0;
  isLocked = false;
  clearInterval(timerInterval);
  timerInterval = null;
  document.getElementById('moves').textContent = '0';
  document.getElementById('timer').textContent = '00:00';
  document.getElementById('pairs').textContent = '0 / 8';
  document.getElementById('winOverlay').classList.remove('active');

  deck.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">${emoji}</div>
        <div class="card-face card-back"></div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, index));
    board.appendChild(card);
  });
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    seconds++;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${m}:${s}`;
  }, 1000);
}

function flipCard(card, index) {
  if (isLocked) return;
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;
  if (flippedCards.length >= 2) return;

  if (!timerInterval) startTimer();

  card.classList.add('flipped');
  flippedCards.push({ card, index });

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('moves').textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  isLocked = true;
  const [a, b] = flippedCards;
  const isMatch = cards[a.index] === cards[b.index];

  if (isMatch) {
    setTimeout(() => {
      a.card.classList.add('matched');
      b.card.classList.add('matched');
      matchedPairs++;
      document.getElementById('pairs').textContent = `${matchedPairs} / 8`;
      flippedCards = [];
      isLocked = false;
      if (matchedPairs === 8) {
        setTimeout(showWin, 500);
      }
    }, 400);
  } else {
    setTimeout(() => {
      a.card.classList.remove('flipped');
      b.card.classList.remove('flipped');
      flippedCards = [];
      isLocked = false;
    }, 800);
  }
}

function showWin() {
  clearInterval(timerInterval);
  timerInterval = null;
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  document.getElementById('winMessage').textContent =
    `你用了 ${moves} 步，耗时 ${m}:${s}`;
  document.getElementById('winOverlay').classList.add('active');
}

document.getElementById('resetBtn').addEventListener('click', initGame);
document.getElementById('playAgainBtn').addEventListener('click', initGame);

initGame();
