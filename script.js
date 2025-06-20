const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const modeSelect = document.getElementById('mode');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill('');

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
modeSelect.addEventListener('change', updateMode);

// Apply system theme initially
window.onload = () => {
  const savedMode = modeSelect.value;

  if (savedMode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', savedMode);
  }
};


function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    showPopup(`🎉 Player ${currentPlayer} Wins!`);
    gameActive = false;
    return;
  }

if (!boardState.includes('')) {
  showPopup("It's a Draw!");
  gameActive = false;
  return;
}


  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function resetGame() {
  boardState.fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.add('show');
}

function closePopup() {
  popup.classList.remove('show');
}

function updateMode() {
  const mode = modeSelect.value;
  if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }
}
