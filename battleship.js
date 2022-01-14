const readline = require('readline-sync');
const gameController = require("./GameController/gameController.js");
const cliColor = require('cli-color');
const beep = require('beepbeep');
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");
const asciiArt = require("./asciiArt.js");
const AsciiArt = require('./asciiArt.js');
const BattleshipHelper = require('./battleshipHelper.js')
const EnemyFleetHelper = require('./enemyFleetHelper.js')
const GridHelper = require('./gridHelper.js')

var maximum = 4;
var minimum = 1;
var randomNumberBasedOnRange = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
var remainingPositions = [];
var gridShowingGuessesToHitEnemy = []
var gridShowingGuessesToHitUser = []

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
            GridHelper.PrintGrid(gridShowingGuessesToHitEnemy, 'Enemy')
            GridHelper.PrintGrid(gridShowingGuessesToHitUser, 'You')
            this.renderRemainingPositions();

            var position = Battleship.ParsePosition(readline.question());
            var userInputXPosition = position.column.value
            var userInputYPosition = position.row

            remainingPositions = remainingPositions.filter((v) => {
                if (position) {
                    const pos = BattleshipHelper.GetLetterForNumber(userInputXPosition) + userInputYPosition;
                    return v !== pos;
                }
                return true;
            });

            var isHit = gameController.CheckIsHit(this.enemyFleet, position);

            if (isHit) {
                beep();
                AsciiArt.PrintHit()
                AsciiArt.PrintGreen("Yeah ! Nice hit !");
                GridHelper.SetGridCellAsHit(gridShowingGuessesToHitEnemy, userInputXPosition, userInputYPosition)
            }
            else {
                AsciiArt.PrintWater()
                AsciiArt.PrintRed("Miss")
                GridHelper.SetGridCellAsMissed(gridShowingGuessesToHitEnemy, userInputXPosition, userInputYPosition)
            }

            BattleshipHelper.PrintStatus(this.enemyFleet)

            var computerPos = this.GetRandomPosition();
            var isHit = gameController.CheckIsHit(this.myFleet, computerPos);

            const playerWin = gameController.CheckGameOver(this.enemyFleet);
            if(playerWin){
                haveWinner = true
                console.log('You have sunk all the enemy ships! Woot woot!')
            }
            
            if(!playerWin){
                var computerPos = this.GetRandomPosition();
                var computerInputXPosition = computerPos.column.value
                var computerInputYPosition = computerPos.row
                var isHit = gameController.CheckIsHit(this.myFleet, computerPos);

                console.log();
                AsciiArt.PrintBlueBright(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`))
                if (isHit) {
                    beep();
                    AsciiArt.PrintHit()
                    AsciiArt.Green(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`))
                    GridHelper.SetGridCellAsHit(gridShowingGuessesToHitUser, computerInputXPosition, computerInputYPosition)
                }
                else {
                    AsciiArt.PrintWater()
                    AsciiArt.PrintRed(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`))
                    GridHelper.SetGridCellAsMissed(gridShowingGuessesToHitUser, computerInputXPosition, computerInputYPosition)
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
        this.InitializeBoard();
        this.InitializeGrid();
        this.InitializeMyFleet();
        this.InitializeEnemyFleet(randomNumberBasedOnRange);
    }

    InitializeBoard() {
        // letters
        for (let letter = 1; letter <= 8; letter++) {
            // numbers
            for (let number = 1; number <= 8; number++) {
                const position = BattleshipHelper.GetLetterForNumber(letter) + number
                remainingPositions.push(position)
            }
        }
    }

    InitializeGrid() {
        gridShowingGuessesToHitEnemy = GridHelper.GetInitialGrid()
        gridShowingGuessesToHitUser = GridHelper.GetInitialGrid()
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
            this.enemyFleet = EnemyFleetHelper.GetEnemyFleet1();
        } else if (configNumber == 2) {
            this.enemyFleet = EnemyFleetHelper.GetEnemyFleet2();
        } else if (configNumber == 3) {
            this.enemyFleet = EnemyFleetHelper.GetEnemyFleet3();
        } else if (configNumber == 4) {
            this.enemyFleet = EnemyFleetHelper.GetEnemyFleet4();
        }
    }
}

module.exports = Battleship;
