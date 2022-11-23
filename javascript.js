//module to create gameboard

const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  // const resetBoard = () => {
  //   console.log("RESET");
  //   gameboard.board = board.map((element) => "");
  //   console.log(board);
  // };
  const allEqual = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].every((val) => val === "X")) {
        return true;
      } else if (arr[i].every((val) => val === "O")) {
        return true;
      }
    }
  };
  const winCheck = (grid) => {
    const newGrid = [];
    const rowSize = 3;
    for (let i = 0; i < grid.length; i += rowSize) {
      const chunk = grid.slice(i, i + rowSize);
      newGrid.push(chunk);
    }
    const columns = [[], [], []];
    const diagnols = [[], []];
    for (let j = 0; j < newGrid.length; j++) {
      columns[0].push(newGrid[j][0]);
      columns[1].push(newGrid[j][1]);
      columns[2].push(newGrid[j][2]);
    }
    diagnols[0].push(newGrid[0][0]);
    diagnols[1].push(newGrid[0][2]);
    diagnols[0].push(newGrid[1][1]);
    diagnols[1].push(newGrid[1][1]);
    diagnols[0].push(newGrid[2][2]);
    diagnols[1].push(newGrid[2][0]);
    const checkArr = [
      newGrid[0],
      newGrid[1],
      newGrid[2],
      columns[0],
      columns[1],
      columns[2],
      diagnols[0],
      diagnols[1],
    ];
    if (allEqual(checkArr)) {
      console.log("THERES A WIN");
      gamePlay.gameEnd("win");
    }
  };
  return { board, winCheck };
})();

// factory function to create players

const Player = (name) => {
  const getName = () => name;
  return { getName };
};

// display board module

const displayController = (() => {
  const boardDisplay = document.querySelector("#board");
  board = gameboard.board;
  let counter = -1;
  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  const renderBoard = () => {
    if (counter !== -1) {
      removeAllChildNodes(boardDisplay);
    }
    board.forEach((element, index) => {
      const square = document.createElement("div");
      counter += 1;
      square.classList = "grid-square";
      square.textContent = element;
      square.id = index;
      square.addEventListener("click", () => {
        gamePlay.clickSquare(square.id);
      });
      boardDisplay.appendChild(square);
    });
  };

  return { renderBoard };
})();

// module to play game

const Game = () => {
  let gameCount = 0;
  const gameName = `game${gameCount}`;
  const startGame = () => {
    const gameName = gameboard.board;
    displayController.renderBoard(gameName);
    const player1 = Player("Bryn");
    const player2 = Player("Computer");
  };
  let currentTurn = "player1";
  const changeTurn = () => {
    if (currentTurn === "player1") {
      currentTurn = "player2";
    } else if (currentTurn === "player2") {
      currentTurn = "player1";
    }
  };
  let turns = 9;
  const takeTurn = () => {
    turns -= 1;
  };
  const clickSquare = (id) => {
    if (gameboard.board[id] === "") {
      if (currentTurn === "player1") {
        gameboard.board[id] = "X";
      } else if (currentTurn === "player2") {
        gameboard.board[id] = "O";
      }
      displayController.renderBoard();
      changeTurn();
      takeTurn();
      gameProgress();
      gameboard.winCheck(gameboard.board);
    } else {
      return null;
    }
  };
  const gameProgress = () => {
    if (turns < 1) {
      gameEnd("draw");
    }
  };
  const gameEnd = (result) => {
    gameCount += 1;
    if (result === "draw") {
      console.log("DRAW!!!");
    } else if (result === "win") {
      console.log("WIN!");
    }
  };

  return { startGame, clickSquare, gameEnd };
};

const gamePlay = Game();

gamePlay.startGame();

// start game > generate board object > generate player objects > render board

// player1 takes first turn as X > X rendered in clicked div > total turns reduced > turn switched to player2

// process continues until 3 Xs or Os in line or turns < 1
