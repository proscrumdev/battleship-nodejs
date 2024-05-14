const Battleship = require("../battleship.js");

class GameController {
  static positions = [];

  static InitializeShips() {
    var colors = require("cli-color");
    const Ship = require("./ship.js");
    var ships = [
      new Ship("Aircraft Carrier", 5, colors.blue),
      new Ship("Battleship", 4, colors.red),
      new Ship("Submarine", 3, colors.green),
      new Ship("Destroyer", 3, colors.yellow),
      new Ship("Patrol Boat", 2, colors.cyan),
    ];
    return ships;
  }

  static getUsedPositions() {
    return this.positions;
  }

  static addPosition(shot) {
    this.positions.push(shot);
  }

  static CheckIsHit(ships, shot, isMe) {
    if (shot == undefined) {
      console.log("The shooting position is not defined")
    }

    if (ships == undefined) {
      console.log("No ships defined");
    }
    
    var returnvalue = false;
    ships.forEach(function (ship) {
      ship.positions.forEach((position) => {
        if (position && shot && position.row == shot.row && position.column == shot.column) {
          ship.addHit(`${shot.column}${shot.row}`);

          returnvalue = true;
        }
      });
    });

    if (isMe) {
      this.addPosition(shot);
    }

    return returnvalue;
  }

  static CheckIsFleetSunk(ships) {
    if (ships == undefined) throw "No ships defined";
    var sunkenShips = this.GetSunkenShips(ships);
    return sunkenShips.length === ships.length;
  }

  static GetSunkenShips(ships) {
    if (ships == undefined) throw "No ships defined";
    return ships.filter(ship => ship.isSunk());
  }

  static isShipValid(ship) {
    return ship.positions.length == ship.size;
  }
}

module.exports = GameController;
