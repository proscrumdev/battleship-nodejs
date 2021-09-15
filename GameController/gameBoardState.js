const beep = require('beepbeep');
const Table = require('cli-table');

const Board = require('./gameBoard');

class GameBoardState extends Board {
  constructor(ships) {
    super();
    this.addShips(ships);
    this.setRenderBoard();
  }

  addShips(ships) {
    ships.forEach((ship) => {
      ship.positions.forEach(({ column, row }) => {
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

  setRenderBoard() {
    this.renderBoard = {};
    Object.keys(this.board)
      .forEach(k => {
        this.renderBoard[k] = { ...this.board[k] };
        Object.keys(this.board[k])
          .forEach(kk => {
            const vv = this.board[k][kk];
            if (vv && vv.icon) {
              this.renderBoard[k][kk] = vv.icon;
            }
          })
      })
  }

  render() {
    const head = ['', ...Object.values(this.LETTERS)]
    const table = new Table({ colAligns: head.map(() => 'middle'), colWidths: head.map(() => 4), head });

    Object.keys(this.renderBoard)
      .forEach(k => {
        table.push({ [k]: Object.values(this.renderBoard[k]) });
      });

    console.log(table.toString());
  }
}

module.exports = GameBoardState;
