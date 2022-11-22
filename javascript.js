//module to create gameboard

const gameboard = (() => {
  const board = ["", "", "", "", "X", "", "O", "", ""];
  return { board };
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
  console.log(board);
  board.forEach((element) => {
    const square = document.createElement("div");
    counter += 1;
    square.classList = "grid-square";
    square.textContent = element;
    square.id = counter;
    boardDisplay.appendChild(square);
  });
})();

// module to play game

const Game = () => {
  const player1 = Player("Bryn");
  const player2 = Player("Computer");
  board = gameboard;
  console.log(player1.getName());
  console.log(player2.getName());
  console.log(board);
  return { player1, player2, board };
};

//const gamePlay = Game;

console.log(gamePlay.player1.getName());
