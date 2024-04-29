const gameBoard = (function() {
  const board = [];
  function fillBoard() {
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
  const game = gameController();
  const winnerInfo = {
    winner: '',
    tie: ''
  };

  const getWinnerInfo = () => winnerInfo;

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
      }
    }
  }

  function clickingtons(e) {
    const clickedX = e.target.dataset.x;
    const clickedY = e.target.dataset.y;
    
    game.playRound(clickedX, clickedY);
    updateScreen();
  }
  display.addEventListener('click', clickingtons);
  updateScreen();

  return {
    getWinnerInfo,
  };
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

  console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`);
  gameBoard.showBoard();

  function playerMove(player, x, y) {
    const winners = displayGame.getWinnerInfo();
    if((board[x][y] !== 'X') && (board[x][y] !== 'O')) {
      board[x][y] = player.value;
      if(checkWinner()) {
        //console.log(`${player.name} has won the game`);
        winners.winner = player.name;
        console.log(winners.winner);
        gameBoard.showBoard();
        gameBoard.fillBoard();
        return;
      }
      if(checkTie()) {
        //console.log("tie game");
        winners.tie = 'tie game';
        console.log(winners.tie);
        gameBoard.showBoard();
        gameBoard.fillBoard();
        return;
      }
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
  game.playRound(0,2) */
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
    getActivePlayer
  }
}

const game = gameController();



