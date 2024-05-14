class Ship {
  constructor(name, size, color) {
    this.name = name;
    this.size = size;
    this.color = color;
    this.hits = {};
    this.sunk = false;
    this.positions = [];
  }

  addPosition(position) {
    this.positions.push(position);
  }

  addHit(position) {
    this.hits[position] = true;
  }

  isSunk() {
    return Object.keys(this.hits).length === this.positions.length;
  }
}

module.exports = Ship;
