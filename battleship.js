const readline = require('readline-sync');
const gameController = require("./GameController/gameController.js");
const cliColor = require('cli-color');
const beep = require('beepbeep');
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");
const asciiArt = require("./asciiArt.js");
const AsciiArt = require('./asciiArt.js');
const Position = require('./GameController/position.js');

var maximum = 4;
var minimum = 1;
var randomNumberBasedOnRange = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
var remainingPositions = [];
var remainingEnemyShotOptions = []
class Battleship {

    start() {
        AsciiArt.PrintBattleship()
        console.log();

        AsciiArt.PrintSetupHeader()

        this.InitializeGame();

        AsciiArt.PrintGameStartHeader()

        this.StartGame();
    }

    StartGame() {
        let haveWinner = false;
        console.clear();
        asciiArt.PrintCanon();

        do {
            console.log();
            
            AsciiArt.PrintCyanBright("Player, it's your turn");
            AsciiArt.PrintCyan("Enter coordinates for your shot :");
            this.renderRemainingPositions();

            var position = Battleship.ParsePosition(readline.question());
            remainingPositions = remainingPositions.filter((v) => {
                if (position) {
                    console.log(position)
                    const pos = this.convertNumberToLetter(position.column.value) + position.row;
                    return v !== pos;
                }
                return true;
            });

            var isHit = gameController.CheckIsHit(this.enemyFleet, position);

            if (isHit) {
                beep();
                AsciiArt.PrintHit()
                AsciiArt.PrintGreen("Yeah ! Nice hit !");
            }
            else {
                AsciiArt.PrintWater()
                AsciiArt.PrintRed("Miss");
            }
            //here we display sunken and remaining enemy ships?
            const statusCheck = gameController.CheckSunkenships(this.enemyFleet)
            console.log('==================================================')
            console.log(statusCheck)
            console.log('==================================================')
            var computerPos = this.GetRandomEnemyShot();
            var isHit = gameController.CheckIsHit(this.myFleet, computerPos);

            console.log();
            if (isHit) {
                beep();
                AsciiArt.PrintHit()
                AsciiArt.Green(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`))
            }
            else {
                AsciiArt.PrintWater()
                AsciiArt.PrintRed(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`))
            }

            const playerWin = gameController.CheckGameOver(this.enemyFleet);
            if(playerWin){
                haveWinner = true
                console.log('You have sunk all the enemy ships! Woot woot!')
            }
            
            if(!playerWin){
                var computerPos = this.GetRandomPosition();
                var isHit = gameController.CheckIsHit(this.myFleet, computerPos);
                console.log();
                AsciiArt.PrintBlueBright(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`))
                if (isHit) {
                    beep();
                    AsciiArt.PrintHit()
                    AsciiArt.Green(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`))
                }
                else {
                    AsciiArt.PrintWater()
                    AsciiArt.PrintRed(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`))
                }

                let computerWin = gameController.CheckGameOver(this.myFleet);
                
                if(computerWin){
                    console.log('You have lost all your ships to the enemy! You lose =(')
                    haveWinner = true
                }
            }
        }
        while (!haveWinner);
    }

    renderRemainingPositions() {
        console.log("Remaining positions left :");
        var messageToDisplay = '';
        remainingPositions.forEach((position) => {
            messageToDisplay += position + ';';
        });
        console.log(messageToDisplay);
    }

    static ParsePosition(input) {
        var letter = letters.get(input.toUpperCase().substring(0, 1));
        var number = parseInt(input.substring(1, 2), 10);
        return new position(letter, number);
    }


    GetRandomEnemyShot() {

        let shotOption = this.GetRandomPosition()

        let resultIsRemainingEnemyShotOption = remainingEnemyShotOptions.some(
            (option) => option.column === shotOption.column && option.row === shotOption.row
        )

        while(!resultIsRemainingEnemyShotOption){
            result = new position(letter, number);
            resultIsRemainingEnemyShotOption = remainingEnemyShotOptions.find(
                (option) => option.column === shotOption.column && option.row === shotOption.row
            )
        }

        return result;
    }

    GetRandomPosition(){
        var rows = 8;
        var lines = 8;
        var rndColumn = Math.floor((Math.random() * lines));
        var letter = letters.get(rndColumn + 1);
        var number = Math.floor((Math.random() * rows));

        let result = new position(letter, number);
        result
    }

    InitializeGame() {
        this.InitializeBoard();
        this.InitializeMyFleet();
        this.InitializeEnemyFleet();
        this.InitializeEnemyShotOptions();
    }

    convertNumberToLetter(value) {
        if (value === 1) {
            return "A"
        }
        if (value === 2) {
            return "B"
        }
        if (value === 3) {
            return "C"
        }
        if (value === 4) {
            return "D"
        }
        if (value === 5) {
            return "E"
        }
        if (value === 6) {
            return "F"
        }
        if (value === 7) {
            return "G"
        }
        if (value === 8) {
            return "H"
        }
    }

    InitializeBoard() {
        // letters
        for (let letter = 1; letter <= 8; letter++) {
            // numbers
            for (let number = 1; number <= 8; number++) {
                const position = this.convertNumberToLetter(letter) + number
                remainingPositions.push(position)
            }
        }
    }

    InitializeMyFleet() {
        this.myFleet = gameController.InitializeShips();

        console.log("Please position your fleet (Game board size is from A to H and 1 to 8) :");

        this.myFleet.forEach(function (ship) {
            console.log();
            console.log(`Please enter the positions for the ${ship.name} (size: ${ship.size})`);

            AsciiArt.PrintBoat(ship.name)
            

            for (var i = 1; i < ship.size + 1; i++) {
                console.log(`Enter position ${i} of ${ship.size} (i.e A3):`);
                const position = readline.question();
                ship.addPosition(Battleship.ParsePosition(position));
            }
        
        })
    }

    InitializeEnemyFleet(configNumber) {
        if (configNumber == 1) {
            this.InitializeEnemyFleet1();
        } else if (configNumber == 2) {
            this.InitializeEnemyFleet2();
        } else if (configNumber == 3) {
            this.InitializeEnemyFleet3();
        } else if (configNumber == 4) {
            this.InitializeEnemyFleet4();
        }
    }

    InitializeEnemyFleet1() {
        this.enemyFleet = gameController.InitializeShips();

        this.enemyFleet[0].addPosition(new position(letters.A, 4));
        this.enemyFleet[0].addPosition(new position(letters.A, 5));
        this.enemyFleet[0].addPosition(new position(letters.A, 6));
        this.enemyFleet[0].addPosition(new position(letters.A, 7));
        this.enemyFleet[0].addPosition(new position(letters.A, 8));


        this.enemyFleet[1].addPosition(new position(letters.B, 5));
        this.enemyFleet[1].addPosition(new position(letters.B, 6));
        this.enemyFleet[1].addPosition(new position(letters.B, 7));
        this.enemyFleet[1].addPosition(new position(letters.B, 8));

        this.enemyFleet[2].addPosition(new position(letters.C, 3));
        this.enemyFleet[2].addPosition(new position(letters.C, 4));
        this.enemyFleet[2].addPosition(new position(letters.C, 5));

        this.enemyFleet[3].addPosition(new position(letters.F, 8));
        this.enemyFleet[3].addPosition(new position(letters.F, 8));
        this.enemyFleet[3].addPosition(new position(letters.F, 8));

        this.enemyFleet[4].addPosition(new position(letters.G, 5));
        this.enemyFleet[4].addPosition(new position(letters.G, 6));
    }

    InitializeEnemyFleet2() {
        this.enemyFleet = gameController.InitializeShips();

        this.enemyFleet[0].addPosition(new position(letters.E, 4));
        this.enemyFleet[0].addPosition(new position(letters.E, 5));
        this.enemyFleet[0].addPosition(new position(letters.E, 6));
        this.enemyFleet[0].addPosition(new position(letters.E, 7));
        this.enemyFleet[0].addPosition(new position(letters.E, 8));


        this.enemyFleet[1].addPosition(new position(letters.B, 5));
        this.enemyFleet[1].addPosition(new position(letters.B, 6));
        this.enemyFleet[1].addPosition(new position(letters.B, 7));
        this.enemyFleet[1].addPosition(new position(letters.B, 8));

        this.enemyFleet[2].addPosition(new position(letters.F, 3));
        this.enemyFleet[2].addPosition(new position(letters.G, 3));
        this.enemyFleet[2].addPosition(new position(letters.H, 3));

        this.enemyFleet[3].addPosition(new position(letters.E, 8));
        this.enemyFleet[3].addPosition(new position(letters.F, 8));
        this.enemyFleet[3].addPosition(new position(letters.G, 8));

        this.enemyFleet[4].addPosition(new position(letters.D, 5));
        this.enemyFleet[4].addPosition(new position(letters.D, 6));
    }


    InitializeEnemyFleet3() {
        this.enemyFleet = gameController.InitializeShips();

        this.enemyFleet[0].addPosition(new position(letters.A, 4));
        this.enemyFleet[0].addPosition(new position(letters.B, 5));
        this.enemyFleet[0].addPosition(new position(letters.C, 6));
        this.enemyFleet[0].addPosition(new position(letters.D, 7));
        this.enemyFleet[0].addPosition(new position(letters.E, 8));


        this.enemyFleet[1].addPosition(new position(letters.A, 5));
        this.enemyFleet[1].addPosition(new position(letters.A, 6));
        this.enemyFleet[1].addPosition(new position(letters.A, 7));
        this.enemyFleet[1].addPosition(new position(letters.A, 8));

        this.enemyFleet[2].addPosition(new position(letters.C, 3));
        this.enemyFleet[2].addPosition(new position(letters.D, 3));
        this.enemyFleet[2].addPosition(new position(letters.E, 3));

        this.enemyFleet[3].addPosition(new position(letters.F, 8));
        this.enemyFleet[3].addPosition(new position(letters.G, 8));
        this.enemyFleet[3].addPosition(new position(letters.H, 8));

        this.enemyFleet[4].addPosition(new position(letters.C, 5));
        this.enemyFleet[4].addPosition(new position(letters.C, 6));
    }

    InitializeEnemyShotOptions() {
       const rows = [1,2,3,4,5,6,7,8]
       const columns = [1,2,3,4,5,6,7,8]
       remainingEnemyShotOptions = rows.map((row) => columns.map(column => new position(column, row)))

    }
}

module.exports = Battleship;
