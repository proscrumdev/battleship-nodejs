const readline = require('readline-sync');
const gameController = require("./GameController/gameController.js");
const cliColor = require('cli-color');
const beep = require('beepbeep');
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");

class Battleship {

    start() {
        console.log(cliColor.white("                                     |__"));
        console.log(cliColor.white("                                     |\\/"));
        console.log(cliColor.white("                                     ---"));
        console.log(cliColor.white("                                     / | ["));
        console.log(cliColor.white("                              !      | |||"));
        console.log(cliColor.white("                            _/|     _/|-++'"));
        console.log(cliColor.white("                        +  +--|    |--|--|_ |-"));
        console.log(cliColor.white("                     { /|__|  |/\\__|  |--- |||__/"));
        console.log(cliColor.white("                    +---------------___[}-_===_.'____                 /\\"));
        console.log(cliColor.white("                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _"));
        console.log(cliColor.white(" __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7"));
        console.log(cliColor.white("|                        Welcome to Battleship                         BB-61/"));
        console.log(cliColor.white(" \\_________________________________________________________________________|"));
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
        console.log("    \"\"\"\"");

        do {
            console.log();
            console.log("Player, it's your turn");
            this.PrintEnemyFleet();
            console.log("Enter coordinates for your shot (e.g. A3):");
            var position = Battleship.ParsePosition(readline.question());
            var isHit = gameController.CheckIsHit(this.enemyFleet, position);
            if (isHit) {
                beep();

                console.log(cliColor.green("       888888b.    .d88888b.   .d88888b.  888b     d888 888"));
                console.log(cliColor.green("       888  \"88b  d88P\" \"Y88b d88P\" \"Y88b 8888b   d8888 888"));
                console.log(cliColor.green("       888  .88P  888     888 888     888 88888b.d88888 888"));
                console.log(cliColor.green("       8888888K.  888     888 888     888 888Y88888P888 888"));
                console.log(cliColor.green("       888  \"Y88b 888     888 888     888 888 Y888P 888 888"));
                console.log(cliColor.green("       888    888 888     888 888     888 888  Y8P  888 Y8P"));
                console.log(cliColor.green("       888   d88P Y88b. .d88P Y88b. .d88P 888   \"   888  \""));
                console.log(cliColor.green("       8888888P\"   \"Y88888P\"   \"Y88888P\"  888       888 888"));
                console.log(cliColor.green("\nYeah ! Nice hit !"));
            } else {
                console.log(cliColor.blue("Miss"));
            }



            var computerPos = this.GetRandomPosition();
            var isHit = gameController.CheckIsHit(this.myFleet, computerPos);
            console.log();
            if (isHit) {
                console.log(cliColor.red(`Computer shot in ${computerPos.column}${computerPos.row} and has hit your ship !\n`));

                beep();

                console.log(cliColor.red("       888888b.    .d88888b.   .d88888b.  888b     d888 888"));
                console.log(cliColor.red("       888  \"88b  d88P\" \"Y88b d88P\" \"Y88b 8888b   d8888 888"));
                console.log(cliColor.red("       888  .88P  888     888 888     888 88888b.d88888 888"));
                console.log(cliColor.red("       8888888K.  888     888 888     888 888Y88888P888 888"));
                console.log(cliColor.red("       888  \"Y88b 888     888 888     888 888 Y888P 888 888"));
                console.log(cliColor.red("       888    888 888     888 888     888 888  Y8P  888 Y8P"));
                console.log(cliColor.red("       888   d88P Y88b. .d88P Y88b. .d88P 888   \"   888  \""));
                console.log(cliColor.red("       8888888P\"   \"Y88888P\"   \"Y88888P\"  888       888 888"));
            } else {
                console.log(cliColor.green(`Computer shot in ${computerPos.column}${computerPos.row} and missed.`));
            }
            console.log("\n_________________________________________________________________________\n");
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

    PrintEnemyFleet() {
        console.log("\nEnemy fleet :\n");
        this.enemyFleet.forEach(function (ship) {
            if (ship.isSunk() === "Sunk") {
                console.log(cliColor.green(`${ship.name} : ${ship.isSunk()}`));
            } else {
                console.log(cliColor.magenta(`${ship.name} : ${ship.isSunk()}`));
            }
        })
        console.log("");
    }
}

module.exports = Battleship;

/*

                :           :
               t#,         t#,
  .           ;##W.       ;##W.                        ;f.
  Ef.        :#L:WE      :#L:WE             ..       : i##:
  E#Wi      .KG  ,#D    .KG  ,#D           ,W,     .Et i##:
  E#K#D:    EE    ;#f   EE    ;#f         t##,    ,W#t i##:
  E#t,E#f. f#.     t#i f#.     t#i       L###,   j###t i##:
  E#WEE##Wt:#G     GK  :#G     GK      .E#j##,  G#fE#t i##:
  E##Ei;;;;.;#L   LW.   ;#L   LW.     ;WW; ##,:K#i E#t i##:
  E#DWWt     t#f f#:     t#f f#:     j#E.  ##f#W,  E#t i##:
  E#t f#K;    f#D#;       f#D#;    .D#L    ###K:   E#t i#W.
  E#Dfff##E,   G#t         G#t    :K#t     ##D.    E#t ,i.
  jLLLLLLLLL;   t           t     ...      #G      ..  :G#:
                                           j           iKt

*/

/* Colossal
888888b.    .d88888b.   .d88888b.  888b     d888 888
888  "88b  d88P" "Y88b d88P" "Y88b 8888b   d8888 888
888  .88P  888     888 888     888 88888b.d88888 888
8888888K.  888     888 888     888 888Y88888P888 888
888  "Y88b 888     888 888     888 888 Y888P 888 888
888    888 888     888 888     888 888  Y8P  888 Y8P
888   d88P Y88b. .d88P Y88b. .d88P 888   "   888  "
8888888P"   "Y88888P"   "Y88888P"  888       888 888



*/

/* BigFig
 _  _  _     |
|_)/ \/ \|V| |
|_)\_/\_/| | o
*/