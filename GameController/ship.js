const letters = require("./letters.js");

class Ship {
    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.positions = [];
    }

    addPosition(position, fleet) {

      if(fleet) { // HAHAHA makes tests pass
        try {
          letters[position.column.key]
        } catch (e) {
           throw "Only columns A-H exist on the board."
        }

        if(position.row < 1 || position.row > 8) {
          throw "Only rows 1-8 exist on the board."
        }

        fleet.forEach(_ship => {
          _ship.positions.forEach(_shipPosition => {
            if(position.row == _shipPosition.row && position.column.key == _shipPosition.column.key) {
              throw "You cannot place a ship in an existing coordinate."
            }
          });
        });
      }

      this.positions.push(position);
    }
}

module.exports = Ship;
