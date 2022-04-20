const { Worker, isMainThread } = require('worker_threads');
const readline = require('readline-sync');
const gameController = require("./GameController/gameController.js");
const cliColor = require('cli-color');
const beep = require('beepbeep');
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");
let telemetryWorker;

class Battleship {
    start() {
        telemetryWorker = new Worker("./TelemetryClient/telemetryClient.js");
        telemetryWorker.postMessage({eventName: 'ApplicationStarted', properties:  {Technology: 'Node.js'}});
        Battleship.displayGameStartMessage();

        this.InitializeGame();
        this.StartGame();
    }

    StartGame() {
        Battleship.displayHitStartMessage();
        var isHit;
        var position, computerPos;
        this.hitPositions= [];
        this.missPositions=[];
        do {
            console.log();
            console.log("Player, it's your turn");
            console.log("Enter coordinates for your shot :");
            position = Battleship.ParsePosition(readline.question());
            isHit = gameController.CheckIsHit(this.enemyFleet, position);

            telemetryWorker.postMessage({eventName: 'Player_ShootPosition', properties:  {Position: position.toString(), IsHit: isHit}});

            if(isHit){
                console.log("Nice hit !");
                this.hitPositions.push(position);
                if (this.handleShipHitMessage(this.enemyFleet, position, true)) {
                    break;
                }
            }else{
                console.log("Miss");
                this.missPositions.push(position);
            }

            computerPos = this.GetRandomPosition();
            isHit = gameController.CheckIsHit(this.myFleet, computerPos);

            telemetryWorker.postMessage({eventName: 'Computer_ShootPosition', properties:  {Position: computerPos.toString(), IsHit: isHit}});

            if(isHit){
                console.log(`Computer shot in ${computerPos.column}${computerPos.row} and has hit your ship !`);
                if (this.handleShipHitMessage(this.myFleet, computerPos, false)) {
                    break;
                }
            }else{
                console.log(`Computer shot in ${computerPos.column}${computerPos.row} and miss`);
            }
            this.displayFleetStatus();
        }
        while (true);
    }



    handleShipHitMessage(fleet, shot, isHuman){
        Battleship.displayShipHitMessage();
        var hitShipIndex = gameController.getHitShipCounter(fleet, shot);
        var isDestroyed = false;
        if(fleet[hitShipIndex].hitCount !== fleet[hitShipIndex].size){
            fleet[hitShipIndex].hitCount++;
            if(fleet[hitShipIndex].hitCount === fleet[hitShipIndex].size){
                console.log(`The ship ${fleet[hitShipIndex].name} is destroyed.!!`);
            }
        }

        if(Battleship.isFleetDestroyed(fleet)){
            this.displayFleetStatus();
            console.log(isHuman ? "You are the winner!": "You lost!");
            isDestroyed = true;
        }
        return isDestroyed;
    }

    displayFleetStatus(){
        console.log("--------------------");
        console.log("This is the status of your fleet");
        console.log("");
        this.myFleet.forEach((ship) =>{
            const shipPositions = ship.positions.map(position=> position.toString()).join(', ');
            if(ship.hitCount === ship.size){
                console.log(`⛔️ ${ship.name}: is sunk`);
            }else{
                console.log(`✅ ${ship.hitCount}(${ship.size}) - '${ship.name}' is positioned at : ${shipPositions}`);
            }
        })
        console.log("");
        console.log(`Hit positions: ${this.hitPositions.map(position=> position.toString()).join(', ')}`);
        console.log(`Miss positions: ${this.missPositions.map(position=> position.toString()).join(', ')}`)
        console.log("");
        console.log("This is the status of your enemy fleet");
        console.log("");
        this.enemyFleet.forEach((ship) =>{
            if(ship.hitCount === ship.size){
                console.log(`⛔️ ${ship.name}: is sunk`);
            }else{
                console.log(`✅ ${ship.hitCount}(${ship.size}) - '${ship.name}'`);
            }
        });

        console.log("--------------------");
    }

    static isFleetDestroyed(fleet){
        return fleet.filter((ship)=> ship.hitCount === ship.size).length === fleet.length;
    }

    static ParsePosition(input) {
      const result = /^([A-H]+[1-8])$/.test(input);
      if(!result) {
        throw "Invalid Coordinates (Acceptable: A-H & 1-8. Example: A8)";
      }
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
        //this.InitializeMyFleetDemo();
        this.InitializeMyFleet();
        this.InitializeEnemyFleet();
    }

    InitializeMyFleet() {
        this.myFleet = gameController.InitializeShips();

        console.log("Please position your fleet (Game board size is from A to H and 1 to 8) :");
        const fleet = this.myFleet;
        this.myFleet.forEach(function (ship) {
            console.log();
            console.log(`Please enter the positions for the ${ship.name} (size: ${ship.size})`);
            for (var i = 1; i < ship.size + 1; i++) {
                    console.log(`Enter position ${i} of ${ship.size} (i.e A3):`);
                    const position = readline.question();
                    telemetryWorker.postMessage({eventName: 'Player_PlaceShipPosition', properties:  {Position: position, Ship: ship.name, PositionInShip: i}});
                    try {
                      ship.addPosition(Battleship.ParsePosition(position), fleet);
                    } catch (e) {
                      console.log(e);
                      i--;
                    }
            }
        })
    }

    InitializeMyFleetDemo() {
        this.myFleet = gameController.InitializeShips();

        this.myFleet[0].addPosition(new position(letters.G, 1));
        this.myFleet[0].addPosition(new position(letters.G, 2));
        this.myFleet[0].addPosition(new position(letters.G, 3));
        this.myFleet[0].addPosition(new position(letters.G, 4));
        this.myFleet[0].addPosition(new position(letters.G, 5));

        this.myFleet[1].addPosition(new position(letters.A, 1));
        this.myFleet[1].addPosition(new position(letters.A, 2));
        this.myFleet[1].addPosition(new position(letters.A, 3));
        this.myFleet[1].addPosition(new position(letters.A, 4));

        this.myFleet[2].addPosition(new position(letters.B, 5));
        this.myFleet[2].addPosition(new position(letters.B, 6));
        this.myFleet[2].addPosition(new position(letters.B, 7));

        this.myFleet[3].addPosition(new position(letters.D, 1));
        this.myFleet[3].addPosition(new position(letters.D, 2));
        this.myFleet[3].addPosition(new position(letters.D, 3));

        this.myFleet[4].addPosition(new position(letters.C, 3));
        this.myFleet[4].addPosition(new position(letters.C, 4));
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
    }

    static displayGameStartMessage(){
        console.log("Starting...");
        console.log();
        console.log(cliColor.magenta("                                     |__"));
        console.log(cliColor.magenta("                                     |\\/"));
        console.log(cliColor.magenta("                                     ---"));
        console.log(cliColor.magenta("                                     / | ["));
        console.log(cliColor.magenta("                              !      | |||"));
        console.log(cliColor.magenta("                            _/|     _/|-++'"));
        console.log(cliColor.magenta("                        +  +--|    |--|--|_ |-"));
        console.log(cliColor.magenta("                     { /|__|  |/\\__|  |--- |||__/"));
        console.log(cliColor.magenta("                    +---------------___[}-_===_.'____                 /\\"));
        console.log(cliColor.magenta("                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _"));
        console.log(cliColor.magenta(" __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7"));
        console.log(cliColor.magenta("|                        Welcome to Battleship                         BB-61/"));
        console.log(cliColor.magenta(" \\_________________________________________________________________________|"));
        console.log();
    }

    static displayHitStartMessage(){
        console.clear();
        console.log();
        console.log("                  __");
        console.log("                 /  \\");
        console.log("           .-.  |    |");
        console.log("   *    _.-'  \\  \\__/");
        console.log("    \\.-'       \\");
        console.log("   /          _/");
        console.log("  |      _  /");
        console.log("  |     /_\\'");
        console.log("   \\    \\_/");
        console.log("    \"\"\"\"");
        console.log();
    }
    static displayShipHitMessage(){
        beep();
        console.log();
        console.log("                \\         .  ./");
        console.log("              \\      .:\";'.:..\"   /");
        console.log("                  (M^^.^~~:.'\").");
        console.log("            -   (/  .    . . \\ \\)  -");
        console.log("               ((| :. ~ ^  :. .|))");
        console.log("            -   (\\- |  \\ /  |  /)  -");
        console.log("                 -\\  \\     /  /-");
        console.log("                   \\  \\   /  /");
        console.log();
    }


}

module.exports = Battleship;
