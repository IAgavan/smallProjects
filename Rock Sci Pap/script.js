//game rules
const possibleChoises = ['rock', 'scissors', 'paper'];
const playerWinConditions = [
  ['rock', 'scissors'],
  ['paper', 'rock'],
  ['scissors', 'paper']
];

// UI elements access
const restartBtn = document.querySelector('#restart-btn');
const choices = document.querySelectorAll('.choice');
const resultBox = document.querySelector('.result');


const playerScore = document.querySelector('#playerScore');
const computerScore = document.querySelector('#computerScore');


// events
choices.forEach(choice => choice.addEventListener('click', Game));

restartBtn.addEventListener('click', () => {
  playerScore.textContent = 0;
  computerScore.textContent = 0;
})


// functions

function Game(event) {
  const player = playerChoice(event);
  const computer = computerChoice();
  let gameResult = checkResult(getResult(player, computer));
  
  showGameResult(gameResult, computer);
  setTimeout(hideResult, 1000, computer);
}


function checkResult(result) {
  let gameResult;
  if (result[0] === result[1]) {
    gameResult = 'Ничья';
    return gameResult
  }

  for (let i = 0; i < playerWinConditions.length; i++) {
    if (playerWinConditions[i][0] === result[0]) {
      if (playerWinConditions[i][1] === result[1]) {

        gameResult = 'Выиграл ты!'
        playerScore.textContent = +playerScore.textContent + 1;

        return gameResult
      } else {
        gameResult = 'Поражение!'
        computerScore.textContent = +computerScore.textContent + 1;
        
        return gameResult
      }
    }
  }

}

function getResult(playerChoice, computerChoice) {
  return [playerChoice, computerChoice];
}

function playerChoice(e) {
  return e.target.id;
}

function computerChoice() {
  return possibleChoises[Math.floor(Math.random() * possibleChoises.length)]
}

function showGameResult(gameResult, computer) {
  resultBox.querySelector('#result').querySelector('h1').textContent = gameResult;
  resultBox.querySelector('#result').querySelector('i').classList.add(`fa-hand-${computer}`)
  resultBox.querySelector('#result').querySelector('h2').textContent = `Computer chose ${computer}`;

  resultBox.classList.remove('hidden');

    
}

function hideResult(computer){
  resultBox.querySelector('#result').querySelector('i').classList.remove(`fa-hand-${computer}`)
  resultBox.classList.add('hidden');
}