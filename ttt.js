const gameBoard = (function() {
  const board = [];
  let v = 1;
  for(let i = 0; i < 3; i++) {
    board[i] = [];
    for(let j = 0; j < 3; j++) {
      board[i].push(v);
      v++;
    }
  }

  const playerMove = (player, x, y) => {
    if(board[x][y] !== ('X' || 'O')) {
      board[x][y] = player.value;
    } else { 
      return;
    }
  };

  const sendBoard = () => board;

  const showBoard = () => {
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  };

  return {
    sendBoard, 
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
  }
  const getActivePlayer = () => activePlayer;

  const playRound = (x, y) => {
    console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`);
    gameBoard.playerMove(activePlayer, x, y);


    changePlayer();
    gameBoard.showBoard();
  }

  return {
    playRound,
    getActivePlayer
  }
}

const game = gameController();


