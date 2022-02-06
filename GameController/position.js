class Position {
    constructor(column, row) {
        this.column = column;
        this.row = row;
    }

    toString() {
        return this.column.toString() + this.row.toString()
    }

}

module.exports = Position;