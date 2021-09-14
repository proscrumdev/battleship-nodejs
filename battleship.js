const readline = require('readline-sync');
const gameController = require("./GameController/gameController.js");
const cliColor = require('cli-color');
const beep = require('beepbeep');
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");

class Battleship {

    start() {
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
            console.log("Enter coordinates for your shot :");
            var position = Battleship.ParsePosition(readline.question());
            var isHit = gameController.CheckIsHit(this.enemyFleet, position);
            this.PrintHitsMisses(isHit)

            console.log(isHit ? "Yeah ! Nice hit !" : "Miss");

            var computerPos = this.GetRandomPosition();
            var isHit = gameController.CheckIsHit(this.myFleet, computerPos);
            console.log();
            console.log(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`));
            this.PrintHitsMisses(isHit)
        }
        while (true);
    }

    static ParsePosition(input) {
        var letter = letters.get(input.toUpperCase().substring(0, 1));
        var number = parseInt(input.substring(1, 2), 10);
        return new position(letter, number);
    }

    PrintHitsMisses(isHit) {
        if (isHit) {
            beep();

            console.log(cliColor.red("                \\         .  ./"));
            console.log(cliColor.red("              \\      .:\";'.:..\"   /"));
            console.log(cliColor.red("                  (M^^.^~~:.'\")."));
            console.log(cliColor.red("            -   (/  .    . . \\ \\)  -"));
            console.log(cliColor.red("               ((| :. ~ ^  :. .|))"));
            console.log(cliColor.red("            -   (\\- |  \\ /  |  /)  -"));
            console.log(cliColor.red("                 -\\  \\     /  /-"));
            console.log(cliColor.red("                   \\  \\   /  /"));
            console.log(cliColor.blue("   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
            console.log(cliColor.blue("   ^^^^  ^^  ^^^ ^^ ^^ ^ ^^^ ^ ^^^ ^^^ ^^ ^^^^^"));
            console.log(cliColor.blue("     ^^^ ^^^ ^^ ^^^ ^ ^ ^^ ^ ^^ ^^^^ ^^ ^^^ ^^  "));
        } else {
            console.log(cliColor.blue("                    .MHMH           X:"));
             console.log(cliColor.blue("                    :HMMH.      .X!HMM."));
             console.log(cliColor.blue("                    `HMHM!      !MHMMX"));
             console.log(cliColor.blue("                     HMHHH.      IMM!"));
             console.log(cliColor.blue(".                    XHHHHM!"));
             console.log(cliColor.blue(" XMMM!.              IMHXHMM.                  :I."));
             console.log(cliColor.blue("  `HMHMMI.          :HHXXHH'                .AMH'"));
             console.log(cliColor.blue("   `VMHHM!          HHXIHH                :MHH'"));
             console.log(cliColor.blue(".   `!HHHA.         XHIIIX.    .MX     .:HD  AHHV"));
             console.log(cliColor.blue(".    `HHHA.         !HI!IXI    AM:    AMHH'.:HHM"));
             console.log(cliColor.blue(".      `XXHA.      . `HI!:IX   :HH    AHHMV .IX"));
             console.log(cliColor.blue("        `!XIX:.  AMA:.H!::IX.  !HX   AHHHV :I"));
             console.log(cliColor.blue("         `XIXX: :HHHHHI. .HMMMXXH: !XIHHHII"));
             console.log(cliColor.blue("          `X!:IXIMHHXHI.  IHHH!HX.!IIXH!.I"));
             console.log(cliColor.blue(".          `H:.:!IHHXII:  .XH!!HMI::X! :X"));
             console.log(cliColor.blue("            :MI. .!!II!:  :II.!H!.:I:.I		"));		  
             console.log(cliColor.blue("   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")); 
             console.log(cliColor.blue("   ^^^^  ^^  ^^^ ^^ ^^ ^ ^^^ ^ ^^^ ^^^ ^^ ^^^^^"));
        }
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
}

module.exports = Battleship;