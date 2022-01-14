class GameControllerHelpers {

    static validInput(input){
        const userInput = input.trim();
        //should find a better way to regex based on grid size
        const positionRegex = /[a-hA-H]{1}[1-9]{1}/;
        const positionMatch = positionRegex.exec(userInput);
        return positionMatch;
    }
    static checkShipAllignment(shipPositions, currentPosition, remaining, size){
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
            //better way woul dbe to create a "game board matrix" and get available slots based on ship size and
            //remaining slots
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
    

}

module.exports = GameControllerHelpers;