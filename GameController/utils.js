const cliColor = require('cli-color');
const readline = require('readline-sync');

const Letters = require("./letters");
const Position = require("./position.js");

const parsePosition = (input) => {
  const values = input.split('');
  const [letter, number] = values;
  return new Position(letter.toUpperCase(), Number(number))
}

// throws error
const validatePositionInput = (input) => {
  const values = input.split('');
  if (values.length !== 2) {
    throw new Error('Your ship\'s position should include 1 letter and 1 number - i.e. A3');
  }

  const [letter, number] = values;
  if (!isNaN(Number(letter)) || !letter.match(/[a-hA-H]/)) {
    throw new Error('Your ship\'s position should start with a letter A-H');
  }
  if (isNaN(Number(number)) || Number(number) > 8 || Number(number) < 1) {
    throw new Error('Your ship\'s position should end with a number 1-8');
  }
}

// todo: flesh out
// throws error
const validatePositionAlignment = (positions) => {}

const setPlayerPosition = (index, ship) => {
  while (true) {
    console.log(`Enter position ${index} of ${ship.size} (i.e A3):`);
    const input = readline.question();
    try {
      validatePositionInput(input);
      const position = parsePosition(input);

      validatePositionAlignment(position);
      ship.addPosition(position);
      break;
    }
    catch (error) {
      console.log();
      console.log(cliColor.yellowBright(error.message));
      continue;
    }
  }
}

// !: local testing use only
const initializeFleet = (fleet) => {
  const updatedFleet = [ ...fleet ];

  updatedFleet[0].addPosition(new Position(Letters.B, 4));
  updatedFleet[0].addPosition(new Position(Letters.B, 5));
  updatedFleet[0].addPosition(new Position(Letters.B, 6));
  updatedFleet[0].addPosition(new Position(Letters.B, 7));
  updatedFleet[0].addPosition(new Position(Letters.B, 8));

  updatedFleet[1].addPosition(new Position(Letters.E, 5));
  updatedFleet[1].addPosition(new Position(Letters.E, 6));
  updatedFleet[1].addPosition(new Position(Letters.E, 7));
  updatedFleet[1].addPosition(new Position(Letters.E, 8));

  updatedFleet[2].addPosition(new Position(Letters.A, 3));
  updatedFleet[2].addPosition(new Position(Letters.B, 3));
  updatedFleet[2].addPosition(new Position(Letters.C, 3));

  updatedFleet[3].addPosition(new Position(Letters.F, 8));
  updatedFleet[3].addPosition(new Position(Letters.G, 8));
  updatedFleet[3].addPosition(new Position(Letters.H, 8));

  updatedFleet[4].addPosition(new Position(Letters.D, 5));
  updatedFleet[4].addPosition(new Position(Letters.D, 6));

  return updatedFleet;
}

module.exports = { initializeFleet, setPlayerPosition };
