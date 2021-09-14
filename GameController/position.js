class Position {
    constructor(column, row) {
        this.column = column;
        this.row = row;
    }

    includes(positionString) {
        const position = this.toString();
        return position === positionString;
    }

    toString() {
        return `${this.column}${this.row}`;
    }
}

module.exports = Position;