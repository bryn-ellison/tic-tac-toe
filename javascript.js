//module to create gameboard

const gameboard = (() => {
  const newBoard = () => {
    return ["", "", "", "", "", "", "", "", ""];
  };
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
      gamePlay.gameEnd("win");
    }
  };
  return { newBoard, winCheck };
})();

// factory function to create players

const Player = (name) => {
  const getName = () => name;
  return { getName };
};

// display board module

const displayController = (() => {
  const boardDisplay = document.querySelector("#board");
  const boardContainer = document.querySelector("#board-container");
  //board = thisBoard;
  let counter = -1;
  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  const renderBoard = (board) => {
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
        gamePlay.clickSquare(square.id, board);
      });
      boardDisplay.appendChild(square);
    });
  };
  const showResult = (result) => {
    removeAllChildNodes(boardContainer);
    const resultMessage = document.createElement("div");
    resultMessage.textContent = result;
    resultMessage.id = "results";
    boardContainer.appendChild(resultMessage);
    resetBtn();
  };
  const resetBtn = () => {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Play game";
    resetButton.id = "reset-button";
    resetButton.addEventListener("click", () => {
      removeAllChildNodes(boardContainer);
      boardContainer.appendChild(boardDisplay);
      gamePlay.startGame();
    });
    boardContainer.appendChild(resetButton);
  };
  return { renderBoard, showResult };
})();

// module to play game

const Game = () => {
  let gameCount = 0;
  const startGame = () => {
    const newboard = gameboard.newBoard();
    turns = 9;
    displayController.renderBoard(newboard);
    const player1 = Player("Bryn");
    const player2 = Player("Computer");
    return { player1, player2 };
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
  const clickSquare = (id, board) => {
    console.log(board);
    if (board[id] === "") {
      if (currentTurn === "player1") {
        board[id] = "X";
      } else if (currentTurn === "player2") {
        board[id] = "O";
      }
      displayController.renderBoard(board);
      gameboard.winCheck(board);
      changeTurn();
      takeTurn();
      gameProgress();
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
      displayController.showResult("Draw!");
    } else if (result === "win") {
      if (currentTurn === "player1") {
        displayController.showResult(`${startGame().player1.getName()} wins!`);
      } else {
        displayController.showResult(`${startGame().player2.getName()} wins!`);
      }
    }
  };

  return { startGame, clickSquare, gameEnd };
};

const gamePlay = Game();

gamePlay.startGame();
