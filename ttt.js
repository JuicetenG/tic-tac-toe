const gameBoard = (function() {
  function fillBoard() {
    const board = [];
    let v = 1;
    for(let i = 0; i < 3; i++) {
      board[i] = [];
      for(let j = 0; j < 3; j++) {
        board[i].push(v);
        v++;
      }
    }
    return board;
  }

  let board = fillBoard();

  const playerMove = (player, x, y) => {
    if((board[x][y] !== 'X') && (board[x][y] !== 'O')) {
      board[x][y] = player.value;
      if(checkWinner()) {
        console.log(`${player.name} has won the game`);
        showBoard();
        board = fillBoard();
        return;
      }
      if(checkTie()) {
        console.log("tie game");
        showBoard();
        board = fillBoard();
        return;
      }
      return true;
    } else return false;
  };

  function checkWinner() {
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
    
    let win = false;
    winningCombos.forEach((combo) => {
      let [a, aa] = combo[0], [b, bb] = combo[1], [c, cc] = combo[2];
      if(board[a][aa] === board[b][bb] && board[b][bb] === board[c][cc]) win = true; 
    });
    return win;
  }

  /* for console to check tie game
  game.playRound(0,1) 
  game.playRound(0,0) 
  game.playRound(1,0) 
  game.playRound(1,2) 
  game.playRound(1,1)
  game.playRound(2,0) 
  game.playRound(2,2)
  game.playRound(2,1) 
  game.playRound(0,2) 
  */
  function checkTie() {
    let catsGame = 0;
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(board[i][j] === 'X' || board[i][j] === 'O') {
          catsGame++;
        }
      }
      if(catsGame === 9 && !checkWinner()) return true;
    }
  }

  const showBoard = () => {
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  };

  return {
    showBoard,
    playerMove
  };
})();

const displayGame = (function () {
  const display = document.querySelector('#container');
  const game = gameController();
  
  const updateScreen = () => {
  
    for(let i = 0; i < 3; i++) {
      const row = document.createElement('div');
      row.dataset.y = i;
      display.appendChild(row);
      for(let j = 0; j < 3; j++) {
        const square = document.createElement('button');
        square.dataset.x = j;
        square.classList.add('square');
        row.appendChild(square);
        square.textContent = `${j}, ${i}`
      }
    }
  }

  updateScreen();
})();

function gameController() {
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

  console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`);
  gameBoard.showBoard();
  const playRound = (x, y) => {
    
    if(gameBoard.playerMove(activePlayer, x, y)) {
      gameBoard.showBoard();
      changePlayer();
      console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`);
    } else return;
  }

  return {
    playRound,
    getActivePlayer
  }
}

displayGame();



