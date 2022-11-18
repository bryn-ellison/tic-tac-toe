//module to create gameboard

const gameboard = (() => {
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return { board };
})();

console.log(gameboard.board);

// module to display board in browser

// factory function to create players
