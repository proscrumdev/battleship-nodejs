const assert=require('assert').strict;
const battleship=require("../battleship.js");
const letters=require("../GameController/letters.js");
const position=require("../GameController/position.js")
const Ship=require("../GameController/ship.js")


describe('parsePositionTests', function() {
  it('should return a valid position for valid input', function() {
    var expected = new position(letters.B, 3);
    var actual = battleship.ParsePosition("B3");
    assert.deepStrictEqual(actual, expected);
  });
});


describe('hasNeighbourTests', function() {
  it('should pass on valid positions', function() {
    var colors = require("cli-color");
    var ship = new Ship("Patrol Boat", 2, colors.Orange)
    ship.addPosition(new position(letters.B, 3));
    ship.addPosition(new position(letters.B, 4));
    var expected = true;
    var actual = ship.isContinous();
    assert.equal(actual, expected);
  });
});

describe('hasNeighbourTests', function() {
  it('should fail with non continous coordinates', function() {
    var colors = require("cli-color");
    var ship = new Ship("Patrol Boat", 2, colors.Orange)
    ship.addPosition(new position(letters.B, 3));
    ship.addPosition(new position(letters.B, 5));
    var expected = false;
    var actual = ship.isContinous();
    assert.equal(actual, expected);
  });
});