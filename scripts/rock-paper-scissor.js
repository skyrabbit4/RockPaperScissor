// load saved score or start fresh
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Cache DOM elements for better performance
const elements = {
  result: document.querySelector('.js-result'),
  moves: document.querySelector('.js-moves'),
  score: document.querySelector('.js-score'),
  autoplayButton: document.querySelector('.js-autoplay-button')
};

updateScoreElement();

//used event listeners instead of inline event handlers
document.querySelector('.js-rock-button').addEventListener('click',()=>{playGame('rock')});

document.querySelector('.js-paper-button').addEventListener('click',()=>{playGame('paper')});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{playGame('scissors')});

document.querySelector('.js-reset-button').addEventListener('click', resetScore);

document.querySelector('.js-autoplay-button').addEventListener('click', autoPlay);


document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r') {
    playGame('rock');
    event.preventDefault();
  }
  else if(event.key==='p') {
    playGame('paper');
    event.preventDefault();
  }
  else if(event.key==='s') {
    playGame('scissors');
    event.preventDefault();
  }
  else if(event.key === ' ' || event.key === 'Spacebar') {
    autoPlay();
    event.preventDefault();
  }
  else if(event.key === 'Escape') {
    if (isAutoPlay) {
      autoPlay();
    }
    event.preventDefault();
  }
});
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  // determine win/lose/tie
  if (playerMove === 'scissors') {
    if (computerMove === 'rock')      result = 'You Lose';
    else if (computerMove === 'paper') result = 'You Win';
    else                                result = 'Tie';
  }
  else if (playerMove === 'paper') {
    if (computerMove === 'rock')      result = 'You Win';
    else if (computerMove === 'paper') result = 'Tie';
    else                                result = 'You Lose';
  }
  else if (playerMove === 'rock') {
    if (computerMove === 'rock')      result = 'Tie';
    else if (computerMove === 'paper') result = 'You Lose';
    else                                result = 'You Win';
  }

  // update counts
  if (result === 'You Win')  score.wins++;
  if (result === 'You Lose') score.losses++;
  if (result === 'Tie')      score.ties++;

  // persist and redraw score
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  // update result text + apply color class
  elements.result.textContent = result;
  elements.result.classList.remove('you-win', 'you-lose', 'tie');
  if (result === 'You Win')   elements.result.classList.add('you-win');
  if (result === 'You Lose')  elements.result.classList.add('you-lose');
  if (result === 'Tie')       elements.result.classList.add('tie');

  // show the two move icons
  elements.moves.innerHTML = `
    You <img src="images/${playerMove}-emoji.png" class="move-icon" alt="${playerMove}">
    <img src="images/${computerMove}-emoji.png" class="move-icon" alt="${computerMove}"> Computer
  `;
}

function pickComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const idx = Math.floor(Math.random() * moves.length);
  return moves[idx];
}

function updateScoreElement() {
  const totalGames = score.wins + score.losses + score.ties;
  const winPercentage = totalGames > 0 ? Math.round((score.wins / totalGames) * 100) : 0;
  
  elements.score.innerHTML = `
    Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}<br>
    <small>Games: ${totalGames} | Win Rate: ${winPercentage}%</small>
  `;
}

function resetScore() {
  if (confirm('Are you sure you want to reset your score?')) {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
    elements.result.textContent = '';
    elements.result.classList.remove('you-win','you-lose','tie');
    elements.moves.textContent = '';
  }
}
let isAutoPlay = false;
let intervalId;

function autoPlay() {
  if(!isAutoPlay) {
    intervalId= setInterval(()=>{
        const playerMove = pickComputerMove();
        playGame(playerMove);
        },1000);
        isAutoPlay=true;
        updateAutoplayButton();
  }else{
    clearInterval(intervalId);
    isAutoPlay = false;
    updateAutoplayButton();
  }
}

function updateAutoplayButton() {
  if (isAutoPlay) {
    elements.autoplayButton.textContent = 'Stop Autoplay';
    elements.autoplayButton.style.background = '#f44336';
  } else {
    elements.autoplayButton.textContent = 'Autoplay';
    elements.autoplayButton.style.background = '';
  }
}

