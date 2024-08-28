const { Worker } = require("worker_threads");
const readline = require("readline-sync");
const gameController = require("./GameController/gameController.js");
const cliColor = require("cli-color");
const beep = require("beepbeep");
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");
let telemetryWorker;
const Ship = require("./GameController/ship.js");

class Battleship {
  start() {
    telemetryWorker = new Worker("./TelemetryClient/telemetryClient.js");

    console.log("Starting...");
    telemetryWorker.postMessage({
      eventName: "ApplicationStarted",
      properties: { Technology: "Node.js" },
    });

    console.log(cliColor.magenta("                                     |__"));
    console.log(cliColor.magenta("                                     |\\/"));
    console.log(cliColor.magenta("                                     ---"));
    console.log(cliColor.magenta("                                     / | ["));
    console.log(cliColor.magenta("                              !      | |||"));
    console.log(
      cliColor.magenta("                            _/|     _/|-++'"),
    );
    console.log(
      cliColor.magenta("                        +  +--|    |--|--|_ |-"),
    );
    console.log(
      cliColor.magenta("                     { /|__|  |/\\__|  |--- |||__/"),
    );
    console.log(
      cliColor.magenta(
        "                    +---------------___[}-_===_.'____                 /\\",
      ),
    );
    console.log(
      cliColor.magenta(
        "                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _",
      ),
    );
    console.log(
      cliColor.magenta(
        " __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7",
      ),
    );
    console.log(
      cliColor.magenta(
        "|                        Welcome to Battleship                         BB-61/",
      ),
    );
    console.log(
      cliColor.magenta(
        " \\_________________________________________________________________________|",
      ),
    );
    console.log();

    this.InitializeGame();
    this.StartGame();
  }

  StartGame() {
    console.clear();
    console.log("                  __");
    console.log("                 /  \\");
    console.log("           .-.  |    |");
    console.log("   *    _.-'  \\  \\__/");
    console.log("    \\.-'       \\");
    console.log("   /          _/");
    console.log("  |      _  /");
    console.log("  |     /_\\'");
    console.log("   \\    \\_/");
    console.log('    """"');

    do {
      console.log("=======================================");
      console.log("Player, it's your turn");
      console.log("Enter coordinates for your shot :");
      var position = Battleship.ParsePosition(readline.question());
      var isHit = gameController.CheckIsHitAndMarkTheShip(
        this.enemyFleet,
        position,
      );

      var isFleetRuined = gameController.isAllShipsSunk(this.enemyFleet);
      if (isFleetRuined) {
        console.log("You are the winner!");
        break;
      }

      telemetryWorker.postMessage({
        eventName: "Player_ShootPosition",
        properties: { Position: position.toString(), IsHit: isHit },
      });
      if (isHit) {
        beep();

        console.log(cliColor.green("                \\         .  ./"));
        console.log(cliColor.green('              \\      .:";\'.:.."   /'));
        console.log(cliColor.green("                  (M^^.^~~:.'\")."));
        console.log(cliColor.green("            -   (/  .    . . \\ \\)  -"));
        console.log(cliColor.green("               ((| :. ~ ^  :. .|))"));
        console.log(cliColor.green("            -   (\\- |  \\ /  |  /)  -"));
        console.log(cliColor.green("                 -\\  \\     /  /-"));
        console.log(cliColor.green("                   \\  \\   /  /"));

        cliColor.green("Yeah! Nice hit!");
      } else {
        console.log(cliColor.red("You missed!"));
      }

      var computerPos = this.GetRandomPosition();
      var isHit = gameController.CheckIsHitAndMarkTheShip(
        this.myFleet,
        computerPos,
      );

      var isFleetRuined = gameController.isAllShipsSunk(this.myFleet);
      if (isFleetRuined) {
        console.log("You lost!");
        break;
      }

      telemetryWorker.postMessage({
        eventName: "Computer_ShootPosition",
        properties: { Position: computerPos.toString(), IsHit: isHit },
      });

      console.log();
      if (isHit) {
        beep();

        console.log(cliColor.red("                \\         .  ./"));
        console.log(cliColor.red('              \\      .:";\'.:.."   /'));
        console.log(cliColor.red("                  (M^^.^~~:.'\")."));
        console.log(cliColor.red("            -   (/  .    . . \\ \\)  -"));
        console.log(cliColor.red("               ((| :. ~ ^  :. .|))"));
        console.log(cliColor.red("            -   (\\- |  \\ /  |  /)  -"));
        console.log(cliColor.red("                 -\\  \\     /  /-"));
        console.log(cliColor.red("                   \\  \\   /  /"));
      }

      var position = `${computerPos.column}${computerPos.row}`;
      console.log(
        `Computer shot in ${cliColor.yellow(position)} and ` +
          (isHit ? cliColor.red("has hit your ship!") : cliColor.green("miss")),
      );
    } while (true);
  }

  static ParsePosition(input) {
    var letter = letters.get(input.toUpperCase().substring(0, 1));
    var number = parseInt(input.substring(1, 2), 10);
    return new position(letter, number);
  }

  GetRandomPosition() {
    var rows = 8;
    var lines = 8;
    var rndColumn = Math.floor(Math.random() * lines);
    var letter = letters.get(rndColumn + 1);
    var number = Math.floor(Math.random() * rows);
    var result = new position(letter, number);
    return result;
  }

  InitializeGame() {
    this.InitializeMyFleet();
    this.InitializeEnemyFleet();
  }

  InitializeMyFleet() {
    this.myFleet = gameController
      .InitializeShips()
      .map((ship) => new Ship(ship.name, ship.size));

    console.log(
      `Please position your fleet (Game board size is from ${cliColor.yellow("A")} to ${cliColor.yellow("H")} and ${cliColor.yellow("1")} to ${cliColor.yellow("8")}) :`,
    );

    this.myFleet.forEach((ship) => {
      console.log();
      console.log(
        `Please enter the positions for the ${ship.name} (size: ${cliColor.yellow(ship.size)})`,
      );

      let validPlacement = false;
      while (!validPlacement) {
        let positions = [];
        for (let i = 1; i <= ship.size; i++) {
          console.log(`Enter position ${i} of ${ship.size} (e.g., A3):`);
          const pos = Battleship.ParsePosition(readline.question());

          // Check if the position is already entered for this ship
          if (
            positions.some((p) => p.row === pos.row && p.column === pos.column)
          ) {
            console.log(
              cliColor.red(
                "Error: This position has already been entered. Please re-enter the positions for this ship.",
              ),
            );
            positions = []; // Clear the positions to start over
            break;
          }

          if (this.IsPositionOccupied(this.myFleet, pos.row, pos.column)) {
            console.error(
              `Position ${pos} already occupied by another ship. Please re-enter the positions for this ship.`,
            );
            positions = []; // Clear the positions to start over
            break;
          }

          positions.push(pos);
        }

        if (positions.length === ship.size) {
          positions.forEach((pos) => ship.addPosition(pos));
          validPlacement = true;
        } else {
          console.log(cliColor.red("Invalid positions. Please try again."));
        }
      }
    });
  }

  InitializeEnemyFleet() {
    this.enemyFleet = gameController
      .InitializeShips()
      .map((ship) => new Ship(ship.name, ship.size));

    this.enemyFleet.forEach((ship) => {
      let placed = false;
      while (!placed) {
        placed = this.PlaceShipRandomly(ship);
      }
    });
  }

  PlaceShipRandomly(ship) {
    const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
    ship.orientation = orientation;

    const startRow = Math.floor(Math.random() * 8) + 1;
    const startCol = Math.floor(Math.random() * 8) + 1;

    if (this.IsValidPlacement(ship, startRow, startCol, orientation)) {
      for (let i = 0; i < ship.size; i++) {
        const row = orientation === "vertical" ? startRow + i : startRow;
        const col = orientation === "horizontal" ? startCol + i : startCol;
        if (this.IsPositionOccupied(this.enemyFleet, row, col)) {
          return false;
        }
        ship.addPosition(new position(letters.get(col), row));
      }
      return true;
    }

    return false;
  }

  IsValidPlacement(ship, startRow, startCol, orientation) {
    for (let i = 0; i < ship.size; i++) {
      const row = orientation === "vertical" ? startRow + i : startRow;
      const col = orientation === "horizontal" ? startCol + i : startCol;

      if (row < 1 || row > 8 || col < 1 || col > 8) {
        console.error("Invalid position: out of bounds");
        return false;
      }
    }
    return true;
  }

  IsPositionOccupied(fleet, row, col) {
    return fleet.some((ship) =>
      ship.positions.some(
        (pos) => pos.row === row && pos.column === letters.get(col),
      ),
    );
  }
}
module.exports = Battleship;
