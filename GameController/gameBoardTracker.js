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
}

module.exports = GameBoardTracker;
