let currentPlayer = 1;
let moves = 0;
let gameActive = true;
let player1Score = 0;
let player2Score = 0;

const gameboard = document.getElementById('gameboard');
const cells = document.getElementsByClassName('cell');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');

// Combinações vencedoras
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Função para fazer uma jogada
function makeMove(cell) {
  if (gameActive && cell.innerHTML === '') {
    const symbol = currentPlayer === 1 ? 'X' : 'O';
    cell.innerHTML = symbol;
    cell.classList.add('selected');
    moves++;

    if (checkWin(symbol)) {
      endGame(currentPlayer);
    } else if (moves === 9) {
      endGame(0);
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
  }
}

// Função para verificar se um jogador venceu
function checkWin(symbol) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    let win = true;
    for (let j = 0; j < combination.length; j++) {
      if (cells[combination[j]].innerHTML !== symbol) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

// Função para encerrar o jogo
function endGame(winner) {
  gameActive = false;
  let message = '';
  if (winner === 1) {
    message = 'Jogador 1 venceu!';
    player1Score++;
  } else if (winner === 2) {
    message = 'Jogador 2 venceu!';
    player2Score++;
  } else {
    message = 'Empate!';
  }
  document.getElementById('message').innerHTML = message;
  player1ScoreDisplay.innerHTML = player1Score;
  player2ScoreDisplay.innerHTML = player2Score;
}

// Função para reiniciar a partida
function restartGame() {
  currentPlayer = 1;
  moves = 0;
  gameActive = true;
  document.getElementById('message').innerHTML = '';
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    cells[i].classList.remove('selected');
  }
}

// Função para zerar o placar
function resetScore() {
  player1Score = 0;
  player2Score = 0;
  player1ScoreDisplay.innerHTML = player1Score;
  player2ScoreDisplay.innerHTML = player2Score;
}

// Adicionando eventos de clique nas células
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function () {
    makeMove(cells[i]);
  });
}

// Reiniciar a partida ao carregar a página
restartGame();

const restartButton = document.getElementById('restartButton');
const resetScoreButton = document.getElementById('resetScoreButton');

restartButton.addEventListener('click', restartGame);
resetScoreButton.addEventListener('click', resetScore);