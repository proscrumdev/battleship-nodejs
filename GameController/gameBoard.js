class GameBoard {
  LETTERS = {
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8
  }

  EMPTY = ' ';
  OCCUPIED = 'X';
  HIT = '💥';
  MISS = '🌊';

  board = {};

  constructor() {
    this.initializeBoard();
  }

  initializeBoard() {
    this.board =
      Object.keys(this.LETTERS)
        .map((k, _, arr) =>
          ({
            [k]: new Array(arr.length)
                  .fill(this.EMPTY)
                    .map((value, index) => ({ [this.LETTERS[arr[index]]]: value }))
                    .reduce((a, b) => ({ ...a, ...b }))
          })
        )
        .reduce((a, b) => ({ ...a, ...b }))
  }

  render() {
    console.table(this.board);
  }
}

module.exports = GameBoard;
