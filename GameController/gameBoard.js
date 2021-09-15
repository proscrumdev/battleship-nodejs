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
  ALPHABET = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

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

  shipsEndingCoordinate(pos,len) {
    const row = pos.charAt(0)
    const col = parseInt(pos.charAt(1));
    var options = []

    // Make sure the opening move is valid
    if (this.board[row][col] === ' ') {
      options.push(this.checkLeft(row,col,len))
      options.push(this.checkRight(row,col,len))
      options.push(this.checkDown(row,col,len))
      options.push(this.checkUp(row,col,len))
    }
    return options.filter( el => el !== '')
  }
  checkLeft(row,col,len) {
    const start_at = col
    if(col-len < 1)
      return '';
    for(col;col > start_at-len;col--) {
      if(this.board[row][col] !== ' ')
        return '';
    }
    return(`${row}${col}`);
  }
  checkRight(row,col,len) {
    const start_at = col
    if(col+len > 8)
      return '';
    for(col;col < len+start_at;col++) {
      if(this.board[row][col] !== ' ')
        return '';
    }
    return(`${row}${col}`);
  }
  checkUp(row,col,len) {
    var row_as_number = this.ALPHABET.indexOf(row)
    if(row_as_number - len < 1)
      return '';
    for(row_as_number;row_as_number > this.ALPHABET.indexOf(row)-len;row_as_number--) {
      if(this.board[this.ALPHABET[row_as_number]][col] !== ' ')
        return '';
    }
    return(this.ALPHABET[row_as_number]+col)
  }
  checkDown(row,col,len) {
    var row_as_number = this.ALPHABET.indexOf(row)
    if(row_as_number + len > 8)
      return '';
    for(row_as_number;row_as_number < this.ALPHABET.indexOf(row)+len;row_as_number++) {
      if(this.board[this.ALPHABET[row_as_number]][col] !== ' ')
        return '';
    }
    return(this.ALPHABET[row_as_number] + col)
  }
}

module.exports = GameBoard;
