class Ship {
  constructor(name, size, color) {
    this.name = name;
    this.size = size;
    this.color = color;
    this.positions = [];
    this.hits = [];
    this.orientation = null; // 'horizontal' or 'vertical'
  }

  addPosition(position) {
    this.positions.push(position);
  }

  isSunk() {
    return this.hits.length === this.size;
  }

  addHit(pos) {
    this.hits.push(pos);
  }
}

module.exports = Ship;
