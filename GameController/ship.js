class Ship {
    constructor(name, size, color, icon) {
      this.color = color;
      this.icon = icon;
      this.name = name;
      this.positions = [];
      this.size = size;
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
