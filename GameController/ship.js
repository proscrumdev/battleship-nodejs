class Ship {
    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.positions = [];
    }

    addPosition(position) {
        // todo: add validation to prevent putting in place not on board, stacking vertically, etc
        this.positions.push(position);
    }

    isSunk() {
        return this.positions.every(position => position.isHit);
    }
}

module.exports = Ship;