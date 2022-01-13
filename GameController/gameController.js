class GameController {
    static InitializeShips() {
        var colors = require("cli-color");
        const Ship = require("./ship.js");
        var ships = [
            new Ship("Aircraft Carrier", 5, colors.CadetBlue),
            new Ship("Battleship", 4, colors.Red),
            new Ship("Submarine", 3, colors.Chartreuse),
            new Ship("Destroyer", 3, colors.Yellow),
            new Ship("Patrol Boat", 2, colors.Orange)
        ];
        return ships;
    }

    static CheckIsHit(ships, shot) {
        console.log('========DISPLAYING ships==============')
        console.log(ships)
        if (shot == undefined)
            throw "The shooting position is not defined";
        if (ships == undefined)
            throw "No ships defined";
        var returnvalue = false;
        ships.forEach(function (ship) {
            ship.positions.forEach(position => {
                //create arrays of already hit columns and rows
                const hitRows = ship.hits.map( hit => { return  hit.row  } )
                const hitCols = ship.hits.map( hit => { return  hit.col  } )
                const positionAlreadyHot = position.row == shot.row && position.column == shot.column
                if (positionAlreadyHot)

                    if(hitRows.includes(position.row) && hitCols.includes(position.col) ){
                        returnValue = false;
                    }
                    else{
                        ship.hits.push({row: position.row, col : position.col})
                        returnvalue = true;
                    }
                    
                    if(ship.hits.length === ship.size){
                        ship.isSunk = true
                    }
                   
            });
        });
        return returnvalue;
    }

    static isShipValid(ship) {
        return ship.positions.length == ship.size;
    }
}

module.exports = GameController;