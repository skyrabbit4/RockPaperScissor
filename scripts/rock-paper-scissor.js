// load saved score or start fresh
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
updateScoreElement();

//used event listeners instead of inline event handlers
document.querySelector('.js-rock-button').addEventListener('click',()=>{playGame('rock')});

document.querySelector('.js-paper-button').addEventListener('click',()=>{playGame('paper')});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{playGame('scissors')});

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
  const resultEl = document.querySelector('.js-result');
  resultEl.textContent = result;
  resultEl.classList.remove('you-win', 'you-lose', 'tie');
  if (result === 'You Win')   resultEl.classList.add('you-win');
  if (result === 'You Lose')  resultEl.classList.add('you-lose');
  if (result === 'Tie')       resultEl.classList.add('tie');

  // show the two move icons
  document.querySelector('.js-moves').innerHTML = `
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
  document.querySelector('.js-score').textContent =
    `Wins: ${score.wins}  Losses: ${score.losses}  Ties: ${score.ties}`;
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result').textContent = '';
  document.querySelector('.js-result').classList.remove('you-win','you-lose','tie');
  document.querySelector('.js-moves').textContent = '';
}
let isAutoPlay = false;
let intervalId;
/*
const autoPlay=()=>{
    if(!isAutoPlay) {
        intervalId= setInterval(()=>{
        const playerMove = pickComputerMove();
        playGame(playerMove);
        },1000);
        isAutoPlay=true;
    }else{
        clearInterval(intervalId);
        isAutoPlay = false;
        
    }//using arrow function
}*/

function autoPlay() {
  if(!isAutoPlay) {
    intervalId= setInterval(()=>{
        const playerMove = pickComputerMove();
        playGame(playerMove);
        },0.00000000000000000000001);
        isAutoPlay=true;
  }else{
    clearInterval(intervalId);
    isAutoPlay = false;
    
  }

}

