const assert=require('assert').strict;
const battleship=require("../battleship.js");
const letters=require("../GameController/letters.js");
const position=require("../GameController/position.js")

describe('parsePositionTests', function() {
  it('should return a valid position for valid input', function() {
    var expected = new position(letters.B, 3);
    var actual = battleship.ParsePosition("B3");
    assert.deepStrictEqual(actual, expected);
  });
});