const beep = require('beepbeep');
const cliColor = require('cli-color');
const readline = require('readline-sync');

const displayGraphic = require("./GameController/displayGraphic");
const GameBoardState = require("./GameController/gameBoardState");
const GameBoardTracker = require("./GameController/gameBoardTracker");
const gameController = require("./GameController/gameController.js");
const letters = require("./GameController/letters.js");
const position = require("./GameController/position.js");

class Battleship {

  start() {
    displayGraphic.battleship(cliColor.magenta);
    console.log();

    this.InitializeGame();
    this.StartGame();
  }

  StartGame() {
    console.clear();
    displayGraphic.cannon();

    do {
      console.log();
      console.log(cliColor.magenta("Player, it's your turn"));
      console.log(cliColor.magenta("Enter coordinates for your shot (E.G A1 or press control + C to exit):"));
      var position = Battleship.ParsePosition(readline.question());
      var {isHit, isSunk} = gameController.CheckIsHit(this.enemyFleet, position);
      console.log();
      console.log();
      if (isHit) {
        beep();
        displayGraphic.hit(cliColor.red);
      }

      if (isHit) {
          console.log(cliColor.red("Yeah ! Nice hit !"))
      } else {
          console.log(cliColor.blue("Miss"));
      }

      this.myTrackerBoard.updateTracker(position, this.enemyBoard);
      this.myTrackerBoard.render();

      // if (isSunk) {
      //     this.enemyFleet = this.enemyFleet.filter(ship => ship.name !== isSunk.name);
      //     console.log(cliColor.redBright(`You sunk my ${isSunk.name}!`));
      //     const remainingShips = this.enemyFleet.reduce((a, b) => `${a && a + ', '}${b.name}`, '');
      //     console.log();
      //     console.log(cliColor.magenta(`${remainingShips} remaining.`));
      // }


      var computerPos = this.GetRandomPosition();
      var {isHit, isSunk} = gameController.CheckIsHit(this.myFleet, computerPos);
      console.log();
      console.log();
      console.log();
      console.log(cliColor.yellow(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? cliColor.red(`has hit your ship !`) : cliColor.blue('miss'))));

      if (isHit) {
        beep();
        displayGraphic.hit(cliColor.red);
      }

      // if (isSunk) {
      //     this.myFleet = this.myFleet.filter(ship => ship.name !== isSunk.name);
      //     console.log(cliColor.redBright(`Your ${isSunk.name} has been sunk!`));
      //     const remainingShips = this.myFleet.reduce((a, b) => `${a && a + ', '}${b.name}`, '');
      //     console.log();
      //     console.log(cliColor.yellow(`${remainingShips} remaining.`));
      // }
    }
    while (true);
  }

  static ParsePosition(input) {
    var letter = letters.get(input.toUpperCase().substring(0, 1));
    var number = parseInt(input.substring(1, 2), 10);
    return new position(letter, number);
  }

  GetRandomPosition() {
    var rows = 8;
    var lines = 8;
    var rndColumn = Math.floor((Math.random() * lines));
    var letter = letters.get(rndColumn + 1);
    var number = Math.floor((Math.random() * rows));
    var result = new position(letter, number);
    return result;
  }

  InitializeGame() {
    this.InitializeMyFleet();
    this.InitializeEnemyFleet();
  }

  InitializeMyFleet() {
    this.myFleet = gameController.InitializeShips();

    console.log("Please position your fleet (Game board size is from A to H and 1 to 8) :");

    this.myFleet.forEach(function (ship) {
      console.log();
      console.log(`Please enter the positions for the ${ship.name} (size: ${ship.size})`);
      for (var i = 1; i < ship.size + 1; i++) {
          console.log(`Enter position ${i} of ${ship.size} (i.e A3):`);
          const position = readline.question();
          ship.addPosition(Battleship.ParsePosition(position));
      }
    })

    this.myBoard = new GameBoardState(this.myFleet);
    this.myTrackerBoard = new GameBoardTracker();
  }

  InitializeEnemyFleet() {
    this.enemyFleet = gameController.InitializeShips();

    this.enemyFleet[0].addPosition(new position(letters.B, 4));
    this.enemyFleet[0].addPosition(new position(letters.B, 5));
    this.enemyFleet[0].addPosition(new position(letters.B, 6));
    this.enemyFleet[0].addPosition(new position(letters.B, 7));
    this.enemyFleet[0].addPosition(new position(letters.B, 8));

    this.enemyFleet[1].addPosition(new position(letters.E, 6));
    this.enemyFleet[1].addPosition(new position(letters.E, 7));
    this.enemyFleet[1].addPosition(new position(letters.E, 8));
    this.enemyFleet[1].addPosition(new position(letters.E, 9));

    this.enemyFleet[2].addPosition(new position(letters.A, 3));
    this.enemyFleet[2].addPosition(new position(letters.B, 3));
    this.enemyFleet[2].addPosition(new position(letters.C, 3));

    this.enemyFleet[3].addPosition(new position(letters.F, 8));
    this.enemyFleet[3].addPosition(new position(letters.G, 8));
    this.enemyFleet[3].addPosition(new position(letters.H, 8));

    this.enemyFleet[4].addPosition(new position(letters.C, 5));
    this.enemyFleet[4].addPosition(new position(letters.C, 6));

    this.enemyBoard = new GameBoardState(this.enemyFleet);
    this.enemyTrackerBoard = new GameBoardTracker();
  }
}

module.exports = Battleship;
