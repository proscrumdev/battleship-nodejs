class Ship {
    constructor(name, size, color, x, y, direction) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.direction = direction;
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

    overlaps(ship, x, y, direction) {
        if (this.positions.length === 0) return false;

        let overlaps = false;
        // direction 0 -> horizontal, 1 -> vertical
        if (direction === 0) {
            for (let i = 0; i < ship.size; i++) {
                if (this.positions.includes(`${x + i}${y}`)) {
                    overlaps = true;
                }
            }
        } else {
            // vertical
            for (let i = 0; i < ship.size; i++) {
                if (this.positions.includes(`${x}${y + i}`)) {
                    overlaps = true;
                }
            }
        }
        return overlaps;
    }

    place(x, y, direction) {
        // direction 0 -> horizontal, 1 -> vertical
        if (direction === 0) {
            for (let i = 0; i < this.size; i++) {
                this.addPosition(`${x + i}${y}`);
            }
        } else {
            // vertical
            for (let i = 0; i < this.size; i++) {
                this.addPosition(`${x}${y + i}`);
            }
        }
    }
}

module.exports = Ship;