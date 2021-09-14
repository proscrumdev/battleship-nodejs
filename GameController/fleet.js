const Ship = require('./ship.js');
const colors = require("cli-color");

class Fleet {
  constructor() {
    // this.name = name;
    this.ships = [
      new Ship("Aircraft Carrier", 5, colors.CadetBlue),
      new Ship("Battleship", 4, colors.Red),
      new Ship("Submarine", 3, colors.Chartreuse),
      new Ship("Destroyer", 3, colors.Yellow),
      new Ship("Patrol Boat", 2, colors.Orange)
    ];
    // console.log(this.ships)
  }

  placeShipsRandomly() {
    console.log("Placing ships randomly...");
    // Place the ships randomly
    for (let i = 0; i < this.ships.length; i++) {
      var shipPlaced = false;
      while (!shipPlaced) {
        shipPlaced = this.placeShipRandomly(this.ships[i]);
      }
    }
  }

  placeShipRandomly(ship) {
    let x = Math.floor(Math.random() * 8) + 1;
    let y = Math.floor(Math.random() * 8) + 1;
    let direction = Math.floor(Math.random() * 2);
    return this.placeShip(ship, x, y, direction);
  }

  // Place a ship on the board
  placeShip(ship, x, y, direction) {
    // Check if the ship can be placed
    if (this.canPlaceShip(ship, x, y, direction)) {
      console.log("Placing ship " + ship.name + " at (" + x + ", " + y + ")");
      // Place the ship
      ship.place(x, y, direction);
      return true;
    }
    return false;
  }

  canPlaceShip(ship, x, y, direction) {
    // Check if the ship can be placed
    if (this.ships.length > 0) {
      // Check if the ship overlaps with another ship
      for (let i = 0; i < this.ships.length; i++) {
        if (this.ships[i].overlaps(ship, x, y, direction)) {
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = Fleet;