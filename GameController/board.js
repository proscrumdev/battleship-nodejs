class Board {
    constructor(ownerName) {
        this.ownerName = ownerName;
        constructBoard();
    }

    constructBoard() {
        // Instantiate one board
        generateEmptyBoardWithAllPositions();

        // Instantiate all ships
        // Store all of them in an array of arrays
    }

    generateEmptyBoardWithAllPositions() {

    }

    isSunk() {
        return this.positions.every(position => position.isHit);
    }
}

module.exports = Board;
