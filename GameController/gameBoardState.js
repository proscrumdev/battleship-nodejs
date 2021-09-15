const beep = require('beepbeep');

const Board = require('./gameBoard');

class GameBoardState extends Board {
  constructor(ships) {
    super();
    this.addShips(ships)
  }

  addShips(ships) {
    console.log({ board: this.board, ships });
    ships.forEach((ship) => {
      console.log({ positions: ship.positions });
      ship.positions.forEach(({ column, row }) => {
        console.log({ column, row });
        // if (row !== EMPTY) {
        //     beep();
        //     throw new Error('That space is off the board!');
        // }
        // if (row === OCCUPIED) {
        //     beep();
        //     throw new Error('A ship already occupies that space!');
        // }
        this.board[column][row] = ship;
      })
    });
  }
}

module.exports = GameBoardState;
