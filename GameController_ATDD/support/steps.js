const { Given, When, Then, defineParameterType } = require("@cucumber/cucumber");
const assert = require('assert').strict;
const shipDef = require("../../GameController/ship.js");
const position = require("../../GameController/position.js");
const letters = require("../../GameController/letters.js");
const gameController = require("../../GameController/gameController.js");

var ship;
var actual;

defineParameterType({name: "bool", regexp: /"([^"]*)"/, transformer(text) {return text.toLowerCase()=="true"}});

Given("I have a {int} ship with {int} positions", function(size, positions){
  ship = new shipDef();
  ship.size = size;
  for(var i = 1; i <= positions; i++) {
    ship.addPosition(new position(letters.A, i))
  }
});

When("I check if the ship is valid", function(){
  actual = gameController.isShipValid(ship);
});

Then("the result should be {bool}", function(expected){
  assert.strictEqual(actual, expected);
});
