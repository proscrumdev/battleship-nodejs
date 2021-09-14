class Position {
    constructor(column, row) {
        this.column = column;
        this.row = row;
        this.isHit = false;
    }

    hit() {
        this.isHit = true;
    }
}

module.exports = Position;