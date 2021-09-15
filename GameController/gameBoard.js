const letters = {
  'A': 1,
  'B': 2,
  'C': 3,
  'D': 4,
  'E': 5,
  'F': 6,
  'G': 7,
  'H': 8
}

class GameBoard {
  EMPTY = ' ';
  OCCUPIED = 'X';
  HIT = '💥';
  MISS = '🌊';

  board = {};

  constructor() {
    this.board =
      Object.keys(letters)
        .map((k, _, arr) =>
          ({
            [k]: new Array(arr.length)
                  .fill(this.EMPTY)
                    .map((value, index) => ({ [letters[arr[index]]]: value }))
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
