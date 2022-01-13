class Ship {
    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.positions = [];
        this.hits = [];
        this.isSunk = false;
    }

    addPosition(position) {
        this.positions.push(position);
    }
}

module.exports = Ship;