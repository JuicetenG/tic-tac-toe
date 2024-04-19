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
    return (board[0][0] === board[0][1] && board[0][1] === board[0][2]) ||
           (board[1][0] === board[1][1] && board[1][1] === board[1][2]) ||
           (board[2][0] === board[2][1] && board[2][1] === board[2][2]) ||
           (board[0][0] === board[1][0] && board[1][0] === board[2][0]) ||
           (board[0][1] === board[1][1] && board[1][1] === board[2][1]) ||
           (board[0][2] === board[1][2] && board[1][2] === board[2][2]) ||
           (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
           (board[0][2] === board[1][1] && board[1][1] === board[2][0]);
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
  */
  function checkTie() {
    let catsGame = 0;
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(board[i][j] === 'X' || board[i][j] === 'O') {
          catsGame++;
          console.log(catsGame);
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
  
  const playRound = (x, y) => {
    console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`);
    
    if(gameBoard.playerMove(activePlayer, x, y)) {
      gameBoard.showBoard();
      changePlayer();
    } else return;
  }

  return {
    playRound,
    getActivePlayer
  }
}

const game = gameController();


