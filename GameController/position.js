class Position {
    constructor(column, row) {
        this.column = column;
        this.row = row;
        this.hit = false;
    }

    hit() {
        this.hit = true;
    }
}

module.exports = Position;