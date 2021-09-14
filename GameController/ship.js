class Ship {
    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.positions = [];
    }

    addPosition(position) {
        this.positions.push(position);
    }

    isSunk() {
        return this.positions.every(position => position.isHit);
    }
}

module.exports = Ship;