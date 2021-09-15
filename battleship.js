const beep = require('beepbeep');
const cliColor = require('cli-color');
const readline = require('readline-sync');

const displayGraphic = require("./GameController/displayGraphic");
const GameBoardState = require("./GameController/gameBoardState");
const GameBoardTracker = require("./GameController/gameBoardTracker");
const gameController = require("./GameController/gameController.js");
const letters = require("./GameController/letters.js");
const position = require("./GameController/position.js");
const utils = require("./GameController/utils.js");

class Battleship {

  start() {
    console.clear();
    displayGraphic.battleship(cliColor.magenta);
    console.log();

    this.InitializeGame();
    this.StartGame();
  }

  StartGame() {
    // console.clear();
    // displayGraphic.cannon();
    const { handleActionAi, handleActionPlayer } = utils;

    do {
      // console.log();
      // console.log(cliColor.magenta("Player, it's your turn"));
      // console.log(cliColor.magenta("Enter coordinates for your shot (E.G A1 or press control + C to exit):"));
      // var position = Battleship.ParsePosition(readline.question());
      const getPlayerPositionCallback = () => readline.question();
      const playerPosition = handleActionPlayer(getPlayerPositionCallback)
      var {isHit, isSunk} = gameController.CheckIsHit(this.enemyFleet, playerPosition);
      console.log();
      console.log();
      if (isHit) {
        beep();
        // displayGraphic.hit(cliColor.red);
      }

      if (isHit) {
          console.log(cliColor.red("Yeah ! Nice hit !"))
      } else {
          console.log(cliColor.blue("Miss"));
      }

      console.log();
      console.log(cliColor.yellowBright("Enemy Tracker"));
      this.myTrackerBoard.update(playerPosition, this.enemyBoard);
      this.myTrackerBoard.render();

      console.log();
      console.log();
      console.log(cliColor.magentaBright("My Board"));
      this.myBoard.render();

      // if (isSunk) {
      //     this.enemyFleet = this.enemyFleet.filter(ship => ship.name !== isSunk.name);
      //     console.log(cliColor.redBright(`You sunk my ${isSunk.name}!`));
      //     const remainingShips = this.enemyFleet.reduce((a, b) => `${a && a + ', '}${b.name}`, '');
      //     console.log();
      //     console.log(cliColor.magenta(`${remainingShips} remaining.`));
      // }


      const getAiPositionCallback = () => this.GetRandomPosition();
      const aiPosition = handleActionAi(getAiPositionCallback);
      var {isHit, isSunk} = gameController.CheckIsHit(this.myFleet, aiPosition);
      console.log();
      console.log();
      console.log();
      console.log(cliColor.yellow(`Computer shot in ${aiPosition.column}${aiPosition.row} and ` + (isHit ? cliColor.red(`has hit your ship !`) : cliColor.blue('miss'))));

      if (isHit) {
        beep();
        // displayGraphic.hit(cliColor.red);
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
    const rows = 8;
    const lines = 8;
    const rndColumn = Math.floor((Math.random() * lines));
    const letter = letters.get(rndColumn + 1);
    const number = Math.floor((Math.random() * rows));
    return `${letter}${number}`;
  }

  InitializeGame() {
    this.InitializeMyFleet();
    this.InitializeEnemyFleet();
  }

  InitializeMyFleet() {
    const { initializeFleet } = utils;
    this.myFleet = initializeFleet(gameController.InitializeShips());
    // this.myFleet = gameController.InitializeShips();

    // console.log("Please position your fleet (Game board size is from A to H and 1 to 8) :");

    // const { setPlayerPosition } = utils;
    // this.myFleet.forEach(function (ship) {
    //   console.log();
    //   console.log(`Please enter the positions for the ${ship.name} (size: ${ship.size})`);
    //   for (var i = 1; i < ship.size + 1; i++) {
    //     setPlayerPosition(i, ship);
    //   }
    // })

    this.myBoard = new GameBoardState(this.myFleet);
    this.myTrackerBoard = new GameBoardTracker();
  }

  InitializeEnemyFleet() {
    const { initializeFleet } = utils;
    this.enemyFleet = initializeFleet(gameController.InitializeShips());
    // this.enemyFleet = gameController.InitializeShips();

    // this.enemyFleet[0].addPosition(new position(letters.B, 4));
    // this.enemyFleet[0].addPosition(new position(letters.B, 5));
    // this.enemyFleet[0].addPosition(new position(letters.B, 6));
    // this.enemyFleet[0].addPosition(new position(letters.B, 7));
    // this.enemyFleet[0].addPosition(new position(letters.B, 8));

    // this.enemyFleet[1].addPosition(new position(letters.E, 6));
    // this.enemyFleet[1].addPosition(new position(letters.E, 7));
    // this.enemyFleet[1].addPosition(new position(letters.E, 8));
    // this.enemyFleet[1].addPosition(new position(letters.E, 9));

    // this.enemyFleet[2].addPosition(new position(letters.A, 3));
    // this.enemyFleet[2].addPosition(new position(letters.B, 3));
    // this.enemyFleet[2].addPosition(new position(letters.C, 3));

    // this.enemyFleet[3].addPosition(new position(letters.F, 8));
    // this.enemyFleet[3].addPosition(new position(letters.G, 8));
    // this.enemyFleet[3].addPosition(new position(letters.H, 8));

    // this.enemyFleet[4].addPosition(new position(letters.C, 5));
    // this.enemyFleet[4].addPosition(new position(letters.C, 6));

    this.enemyBoard = new GameBoardState(this.enemyFleet);
    // this.enemyBoard.render();
    this.enemyTrackerBoard = new GameBoardTracker();
  }
}

module.exports = Battleship;
