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
  const gameReset = () => {
    removeAllChildNodes(boardContainer);
    boardContainer.appendChild(boardDisplay);
    gamePlay.startGame();
  };
  const resetBtn = () => {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Play game";
    resetButton.id = "reset-button";
    resetButton.addEventListener("click", () => {
      gameReset();
    });
    boardContainer.appendChild(resetButton);
  };
  const menu = () => {
    const menuContainer = document.createElement("div");
    menuContainer.id = "menu-container";
    const menuMessage = document.createElement("p");
    menuMessage.textContent = "Warriors, enter your names:";
    const form = document.createElement("form");
    const player1Label = document.createElement("label");
    player1Label.textContent = "X";
    const player1Field = document.createElement("input");
    const player2Label = document.createElement("label");
    player2Label.textContent = "O";
    const player2Field = document.createElement("input");
    const submit = document.createElement("button");
    submit.textContent = "FIGHT";
    submit.addEventListener("click", () => {
      player1 = Player(player1Field.value);
      player2 = Player(player2Field.value);
      gamePlay.startGame();
    });
    boardContainer.appendChild(menuContainer);
    menuContainer.appendChild(menuMessage);
    menuContainer.appendChild(player1Label);
    menuContainer.appendChild(player1Field);
    menuContainer.appendChild(player2Label);
    menuContainer.appendChild(player2Field);
    menuContainer.appendChild(submit);
  };
  return { renderBoard, showResult, menu };
})();

// module to play game

const Game = () => {
  let gameCount = 0;
  const startGame = () => {
    const newboard = gameboard.newBoard();
    turns = 9;
    displayController.renderBoard(newboard);
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
        displayController.showResult(`${player1.getName()} wins!`);
      } else {
        displayController.showResult(`${player2.getName()} wins!`);
      }
    }
  };

  return { startGame, clickSquare, gameEnd };
};

let player1 = "";
let player2 = "";

const gamePlay = Game();

displayController.menu();
