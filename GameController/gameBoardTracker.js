const Table = require('cli-table');

const Board = require('./gameBoard');

class GameBoardTracker extends Board {
  constructor() {
    super();
  }

  update(positionTargeted, enemyBoard) {
    Object.keys(this.board)
      .forEach(k => {
        Object.keys(this.board[k])
          .forEach(kk => {
            const ship = enemyBoard.board[k][kk];
            if (typeof ship === 'object') {
              ship.positions
                .forEach(({ column, isHit, row }) => {
                  if (isHit) {
                      this.board[column][row] = this.HIT
                  }
                })
            } else {
              const { column, row } = positionTargeted;
              if (`${k}${kk}` === `${column}${row}`) {
                  this.board[k][kk] = this.MISS;
              }
            }
          })
      })
  }

  render() {
    const head = ['', ...Object.values(this.LETTERS)]
    const table = new Table({ colAligns: head.map(() => 'middle'), colWidths: head.map(() => 4), head });

    Object.keys(this.board)
      .forEach(k => {
        table.push({ [k]: Object.values(this.board[k]) });
      });

    console.log(table.toString());
  }
}

module.exports = GameBoardTracker;
