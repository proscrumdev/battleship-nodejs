class Ship {
    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.positions = [];
        this.hits = [];
    }

    addPosition(position) {
        this.positions.push(position);
    }

    addHit(position) {
        this.hits.push(position);
    }

    isSunk() {
        return this.hits.length === this.positions.length ? "Sunk" : "Not Sunk";
    }
}

module.exports = Ship;