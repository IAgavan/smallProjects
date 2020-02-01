const winMessage = document.querySelector('.winning-message');
const board = document.querySelector('.board')
const cells = board.querySelectorAll('.cell');
const restartButton = document.querySelector('#restart');
// const chooseXO = document.querySelector('.turn');

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let turn = 'x';


restartButton.addEventListener('click', startGame);

startGame()

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o')
    cell.removeEventListener('click', chooseCell)
    cell.addEventListener('click', chooseCell, {
      once: true
    })
  })
  winMessage.classList.remove('show');
}


function chooseCell(e) {
  e.target.classList.add(`${turn}`);

  if (checkWinner()) {
    winMessage.classList.add('show')
    winMessage.querySelector('.message').textContent = `'${turn}' wins`
  }else if (checkDraw()) {
    winMessage.classList.add('show')
    winMessage.querySelector('.message').textContent = `Draw`
  }

  //  меняем ход
  changeTurn();
}


function changeTurn() {
  board.classList.remove(`${turn}`)
  turn = turn=='x'? 'o':'x';
  board.classList.add(`${turn}`)}



function checkWinner() {

  return winConditions.some(condition => {
    return condition.every(index => {
      return cells[index].classList.contains(`${turn}`)
    })
  })

// for (let i = 0; i < winConditions.length; i++) {
//   let count = 0;
//   for (let j = 0; j < winConditions[i].length; j++) {
//     if (
//       cells[winConditions[i][j]].classList.contains(`${turn}`)) {
//       count += 1;
//     };
//   }
//   if (count == 3) {
//     winMessage.classList.add('show')
//     winMessage.querySelector('.message').textContent = `'${turn}' wins`
//   }
// }

}

function checkDraw() {
  return [...cells].every(cell=>{
    return cell.classList.contains('x') ||cell.classList.contains('o')
  })
}



