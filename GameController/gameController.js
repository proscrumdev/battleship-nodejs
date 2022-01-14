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
                const positionAlreadyHit = hitRows.includes(position.row) && hitCols.includes(position.col)
                if (position.row == shot.row && position.column == shot.column)
                    //check if same position has been hit
                    if(!positionAlreadyHit){
                    //add row and col to ships hit array
                    ship.hits.push({row: position.row, col : position.col})
                    returnvalue = true;
                    
                    if(ship.hits.length === ship.size){
                        ship.isSunk = true
                    }
                }
            });
        });
        return returnvalue;
    }
    static CheckSunkenships(ships) {
        let sunkStatuses = '';
        ships.forEach(ship => {
            sunkStatuses += `${ship.name}  : ${(ship.isSunk) ? 'This ship rests at the bottom of the sea' : 'Arrrrr, she is still afloat'}\n`
        })
        return sunkStatuses
    }

    static isShipValid(ship) {
        return ship.positions.length == ship.size;
    }

    static CheckGameOver(ships) {
        const sunkenShipsLength = ships.filter( ship => ship.isSunk === true).length
        return sunkenShipsLength === ships.length
    }
    
    static CheckValidShipPosition(ship, position, entryNum) {
        let isValid = false;
        const userInput = position.trim();
        const positionMatch = validInput(position);

        if(positionMatch && position.length === 2 && !ship.getpositions.includes(userInput.toUpperCase())) {
            const remainingSlots = ship.size - entryNum;
            isValid = true;
            if(remainingSlots < ship.size-1 ){
                const validAlignment = checkShipAllignment(ship.positions, userInput, remainingSlots, ship.size);
                isValid = validAlignment;
            }
        }
        return isValid;
    } 

    static GenerateBoard(size){
        if(26 >= size > 0){
            const alphabet = alphabetArray(size)
            const numbers = Array.from({length:size}, (_,k) => k + 1 )
            const matrixArray =  alphabet.map( letter => { return numbers.map(num => `${letter}${num}`)})
            return matrixArray
        }
        else{
            return 'Board size cannot be greater than 26';
        }
    }
}
//Helpers
const alphabetArray = (size) =>{
    return alphabet = (26 >= size > 0) ? [...Array(size)].map(_=>(++i).toString(36).toUpperCase(),i=9) : [];
}
const validInput = (input) =>{
    const userInput = input.trim();
    //should find a better way to regex based on grid size
    const positionRegex = /[a-hA-H]{1}[1-9]{1}/;
    const positionMatch = positionRegex.exec(userInput);
    return positionMatch;
}
const checkShipAllignment = (shipPositions, currentPosition, remaining, size) => {
    let validPositioning = false;
    let lastPosition = shipPositions[shipPositions.length - 1];
    let currentColumn = currentPosition.toUpperCase().substring(0, 1);
    let currentRow = parseInt(currentPosition.substring(1, 2), 10);

    if( (size - (remaining + 2 )) === 0){
        const lastRow = lastPosition.row;
        const lastColumn = lastPosition.column.key;
        //only checks if the ship alignment is in one direction (vertical/horizontal)
        validPositioning = (lastRow === currentRow || lastColumn === currentColumn) ? true : false;
        //need to check for distance value of row or col (since we dont want gaps between positions)
    }
    else{
        const shipVertical = shipPositions.filter( pos => pos.column.key === shipPositions[0].column.key);
        const shipHorizontall = shipPositions.filter( pos => pos.row === shipPositions[0].row);
        validPositioning = (shipVertical.length > shipHorizontall.length) 
                            ? currentColumn === lastPosition.column.key 
                            : currentRow === lastPosition.row ;
    }   
    return validPositioning;
  }


module.exports = GameController;