const assert = require('assert').strict;
const gameController = require("../GameController/gameController.js");
const letters = require("../GameController/letters.js");
const position = require("../GameController/position.js")
const ship = require("../GameController/ship");

describe('isShipValidTests', function () {

  it('should return true if the ship is valid', function () {
    var testship = new ship("Battleship", 3, 0);
    testship.addPosition(new position(letters.A, 1));
    testship.addPosition(new position(letters.A, 2));
    testship.addPosition(new position(letters.A, 3));

    var actual = gameController.isShipValid(testship);
    assert.ok(actual);
  });

  it('should return false if the ship is invalid', function () {
    var testship = new ship("Battleship", 3, 0);

    var actual = gameController.isShipValid(testship);
    assert.ok(!actual);
  });
});