const cliColor = require('cli-color');
const BattleshipHelper = require('./battleshipHelper');

class GridHelper {
    static GetInitialGrid() {
        var grid = []

        for (let x = 1; x <= 8; x++) {
            for (let y = 1; y <= 8; y++) {
                grid.push({
                    x,
                    y,
                    isHit: false,
                    isMissed: false,
                })
            }
        }

        return grid
    }


    static PrintGrid(grid, whoShotAt) {
        function printLineForGridWidth(width) {
            for (let x = 1; x <= width; x++) {
                process.stdout.write('___')
            }
            console.log()
        }

        printLineForGridWidth(9)
        console.log('         Shots on ' + whoShotAt)
        printLineForGridWidth(9)

        process.stdout.write('    ')
        for (let x = 1; x <= 8; x++) {
            var xAxisLabel = BattleshipHelper.GetLetterForNumber(x)
            process.stdout.write(xAxisLabel + '  ')
        }
        console.log()

        process.stdout.write('   ')
        printLineForGridWidth(8)

        for (let y = 1; y <= 8; y++) {
            for (let x = 1; x <= 8; x++) {
                var characterToWrite = cliColor.white('0')
                var cell = GridHelper.GetGridCell(grid, x, y)

                if(cell.isHit)
                    characterToWrite = cliColor.red('X')
                else if(cell.isMissed)
                    characterToWrite = cliColor.blue('W')

                if(x === 1)
                    process.stdout.write(y + ' | ')

                process.stdout.write(characterToWrite + '  ')
            }

            console.log('')
        }
        printLineForGridWidth(9)
        console.log()
    }

    static SetGridCellAsHit(grid, x, y) {
        var cell = GridHelper.GetGridCell(grid, x, y)

        cell.isHit = true
    }

    static SetGridCellAsMissed(grid, x, y) {
        var cell = GridHelper.GetGridCell(grid, x, y)

        cell.isMissed = true
    }

    static GetGridCell(grid, x, y) {
        var cell = grid.filter(function(gridItem) {
            return (gridItem.x === x) && (gridItem.y === y)
        })[0]

        if(!cell) {
            console.error('No grid cell found for column ', x, ' and row ', y)
            return {}
        }

        return cell
    }
}

module.exports = GridHelper