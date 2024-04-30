const gameBoard = (function() {
  const board = [];
  function fillBoard() {
    let v = 1;
    for(let i = 0; i < 3; i++) {
      board[i] = [];
      for(let j = 0; j < 3; j++) {
        board[i].push('');
        v++;
      }
    }
    return board;
  }

  fillBoard();
  const getBoard = () => board;
  const showBoard = () => {
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  };

  return {
    showBoard,
    getBoard,
    fillBoard,
  };
})();

const displayGame = (function () {
  const display = document.querySelector('#container');
  const playerDisplay = document.querySelector('#playerDisplay');
  const resetButton = document.querySelector('#reset');
  const game = gameController();
  let gameEnd = false;

  const updateScreen = () => {
    display.textContent = '';
    
    const player = game.getActivePlayer();
    
    playerDisplay.textContent = `${player.name}'s turn`
    const board = gameBoard.getBoard();

    for(let i = 0; i < 3; i++) {
      const row = document.createElement('div');
      display.appendChild(row);
      for(let j = 0; j < 3; j++) {
        const square = document.createElement('button');
        square.dataset.x = j;
        square.dataset.y = i;
        square.classList.add('square');
        row.appendChild(square);
        square.textContent = board[j][i];
        if(board[j][i] === "X") {
          square.classList.add('x-color');
        } else if (board[j][i] === "O") {
          square.classList.add('o-color');
        }
      }
    }

    if(game.checkWinner()) {
      playerDisplay.textContent = `${player.name} Wins!`;
      gameEnd = true;
    } else if(game.checkTie()) {
      playerDisplay.textContent = 'Tie Game!';
      gameEnd = true;
    }
  }

  function playerClicks(e) {
    if(gameEnd === true) return;
    const clickedX = e.target.dataset.x;
    const clickedY = e.target.dataset.y;
    game.playRound(clickedX, clickedY);
    updateScreen();
  }

  function resetGame() {
    gameBoard.fillBoard();
    game.resetPlayer();
    updateScreen();
    gameEnd = false;
  }

  display.addEventListener('click', playerClicks);
  resetButton.addEventListener('click', resetGame);
  updateScreen();
})(); 

function gameController() {
  const board = gameBoard.getBoard();
  const players = [
    {
      name: 'Player 1',
      value: 'X'
    },
    {
      name: 'Player 2',
      value: 'O'
    }
  ]

  let activePlayer = players[0];
  const changePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const resetPlayer = () =>{ activePlayer = players[0] };

  console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`);
  gameBoard.showBoard();

  function playerMove(player, x, y) {
    if((board[x][y] !== 'X') && (board[x][y] !== 'O')) {
      board[x][y] = player.value;
      if(checkWinner()) return;
      if(checkTie()) return;
      return true;
    } else return false;
  }

  function checkWinner() {
    let win = false;
    const winningCombos = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ]
    
    winningCombos.forEach((combo) => {
      let [a, aa] = combo[0], [b, bb] = combo[1], [c, cc] = combo[2];
      if((board[a][aa] === board[b][bb] && board[b][bb] === board[c][cc])
          && (board[a][aa] !== '' && board[b][bb] !== '' && board[c][cc] !== '')) win = true; 
    });

    return win;
  }

  function checkTie() {
    let catsGame = 0;
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if((board[i][j] === 'X' || board[i][j] === 'O') && (board[i][j] !== '')) {
          catsGame++;
        }
      }
      if(catsGame === 9 && !checkWinner()) return true;
    }
  }

  const playRound = (x, y) => {
    if(playerMove(activePlayer, x, y)) {
      gameBoard.showBoard();
      changePlayer();
      console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`);
    } else {
      gameBoard.showBoard();
      console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`)
    }
  }

  return {
    playRound,
    checkTie,
    getActivePlayer,
    checkWinner,
    resetPlayer
  }
}





