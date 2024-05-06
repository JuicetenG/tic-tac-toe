//creates and returns the board array
const gameBoard = (function() {
  const board = [];

  //fills board as 2D array
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

  //create board initially
  fillBoard();
  const getBoard = () => board;

  //shows board for playing in console
  const showBoard = () => {
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  };

  return {
    showBoard,
    getBoard,
    fillBoard
  };
})();

//controls and updates the games display as well as handles click events
const displayGame = (function () {
  //variables needed for controlling screen
  const display = document.querySelector('#container');
  const playerDisplay = document.querySelector('#playerDisplay');
  const resetButton = document.querySelector('#reset');
  let gameEnd = false;

  //initialize game
  const game = gameController();

  const updateScreen = () => {
    //reset screen
    display.textContent = '';
    
    //get and display active player
    const player = game.getActivePlayer();
    playerDisplay.textContent = `${player.name}'s turn`
    
    //create a variable for the board
    const board = gameBoard.getBoard();

    //loop through 2d array and display the contents on the display board
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

    //check for a winner and update display accordingly
    if(game.checkWinner()) {
      playerDisplay.textContent = `${player.name} Wins!`;
      gameEnd = true;
    } else if(game.checkTie()) {
      playerDisplay.textContent = 'Tie Game!';
      gameEnd = true;
    }
  };

  //function for handling clicks on display board squares
  function playerClicks(e) {
    if(gameEnd === true) return;
    const clickedX = e.target.dataset.x;
    const clickedY = e.target.dataset.y;
    game.playRound(clickedX, clickedY);
    updateScreen();
  }

  //resets board, active player, and gameEnd variable to start new game
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

//controls the flow of the game
function gameController() {
  const board = gameBoard.getBoard();
  const players = [
    {
      name: 'Player X',
      value: 'X'
    },
    {
      name: 'Player O',
      value: 'O'
    }
  ];

  //the following lines set active player initially and create a method for
  //changing, returning, and resetting that player
  let activePlayer = players[0];
  const changePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const resetPlayer = () =>{ activePlayer = players[0] };

  //display for console version of game
  console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`);
  gameBoard.showBoard();

  //takes active player and checks if board space is occupied, if not, places the active
  //player's value on the board in the selected space. returns if the game finds a win or tie
  function playerMove(player, x, y) {
    if((board[x][y] !== 'X') && (board[x][y] !== 'O')) {
      board[x][y] = player.value;
      if(checkWinner()) return;
      if(checkTie()) return;
      return true;
    } else return false;
  }

  //checks for a winner by destructuring and comparing the winning nested array combinations
  //in a forEach loop
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
    ];

    winningCombos.forEach((combo) => {
      let [a, aa] = combo[0], [b, bb] = combo[1], [c, cc] = combo[2];
      if((board[a][aa] === board[b][bb] && board[b][bb] === board[c][cc])
          && (board[a][aa] !== '' && board[b][bb] !== '' && board[c][cc] !== '')) {
            win = true;
          }   
    });
    return win;
  }

  //checks that all spaces are occupied and checkWinner returns false for tie condition
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

  //this is called when a player clicks on a square and it takes dataset attributes for the
  //x and y which end up being the 2D array coordinates on the game board
  const playRound = (x, y) => {
    //calls playerMove which returns true if the move is valid
    //if the move is invalid it returns without changing players and no move is made
    if(playerMove(activePlayer, x, y)) {
      gameBoard.showBoard();
      changePlayer();
      console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`);
    } else {
      gameBoard.showBoard();
      console.log(`${activePlayer.name}: ${activePlayer.value}, Enter 2D array index using 2 numbers for selection.`)
    }
  };

  return {
    playRound,
    checkTie,
    getActivePlayer,
    checkWinner,
    resetPlayer
  };
}





