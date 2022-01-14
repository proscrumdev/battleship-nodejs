const gameController = require("./GameController/gameController.js")
const position = require("./GameController/position.js")
const letters = require("./GameController/letters.js")

class EnemyFleetHelper {
    static GetEnemyFleet1() {
        let enemyFleet = gameController.InitializeShips()

        enemyFleet[0].addPosition(new position(letters.A, 4))
        enemyFleet[0].addPosition(new position(letters.A, 5))
        enemyFleet[0].addPosition(new position(letters.A, 6))
        enemyFleet[0].addPosition(new position(letters.A, 7))
        enemyFleet[0].addPosition(new position(letters.A, 8))


        enemyFleet[1].addPosition(new position(letters.B, 5))
        enemyFleet[1].addPosition(new position(letters.B, 6))
        enemyFleet[1].addPosition(new position(letters.B, 7))
        enemyFleet[1].addPosition(new position(letters.B, 8))

        enemyFleet[2].addPosition(new position(letters.C, 3))
        enemyFleet[2].addPosition(new position(letters.C, 4))
        enemyFleet[2].addPosition(new position(letters.C, 5))

        enemyFleet[3].addPosition(new position(letters.F, 8))
        enemyFleet[3].addPosition(new position(letters.F, 8))
        enemyFleet[3].addPosition(new position(letters.F, 8))

        enemyFleet[4].addPosition(new position(letters.G, 5))
        enemyFleet[4].addPosition(new position(letters.G, 6))

        return enemyFleet
    }

    static GetEnemyFleet2() {
        let enemyFleet = gameController.InitializeShips()

        enemyFleet[0].addPosition(new position(letters.E, 4))
        enemyFleet[0].addPosition(new position(letters.E, 5))
        enemyFleet[0].addPosition(new position(letters.E, 6))
        enemyFleet[0].addPosition(new position(letters.E, 7))
        enemyFleet[0].addPosition(new position(letters.E, 8))


        enemyFleet[1].addPosition(new position(letters.B, 5))
        enemyFleet[1].addPosition(new position(letters.B, 6))
        enemyFleet[1].addPosition(new position(letters.B, 7))
        enemyFleet[1].addPosition(new position(letters.B, 8))

        enemyFleet[2].addPosition(new position(letters.F, 3))
        enemyFleet[2].addPosition(new position(letters.G, 3))
        enemyFleet[2].addPosition(new position(letters.H, 3))

        enemyFleet[3].addPosition(new position(letters.E, 8))
        enemyFleet[3].addPosition(new position(letters.F, 8))
        enemyFleet[3].addPosition(new position(letters.G, 8))

        enemyFleet[4].addPosition(new position(letters.D, 5))
        enemyFleet[4].addPosition(new position(letters.D, 6))

        return enemyFleet
    }


    static GetEnemyFleet3() {
        let enemyFleet = gameController.InitializeShips()

        enemyFleet[0].addPosition(new position(letters.A, 4))
        enemyFleet[0].addPosition(new position(letters.B, 5))
        enemyFleet[0].addPosition(new position(letters.C, 6))
        enemyFleet[0].addPosition(new position(letters.D, 7))
        enemyFleet[0].addPosition(new position(letters.E, 8))


        enemyFleet[1].addPosition(new position(letters.A, 5))
        enemyFleet[1].addPosition(new position(letters.A, 6))
        enemyFleet[1].addPosition(new position(letters.A, 7))
        enemyFleet[1].addPosition(new position(letters.A, 8))

        enemyFleet[2].addPosition(new position(letters.C, 3))
        enemyFleet[2].addPosition(new position(letters.D, 3))
        enemyFleet[2].addPosition(new position(letters.E, 3))

        enemyFleet[3].addPosition(new position(letters.F, 8))
        enemyFleet[3].addPosition(new position(letters.G, 8))
        enemyFleet[3].addPosition(new position(letters.H, 8))

        enemyFleet[4].addPosition(new position(letters.C, 5))
        enemyFleet[4].addPosition(new position(letters.C, 6))

        return enemyFleet
    }

    static GetEnemyFleet4() {
        let enemyFleet = gameController.InitializeShips()

        enemyFleet[0].addPosition(new position(letters.F, 4))
        enemyFleet[0].addPosition(new position(letters.F, 5))
        enemyFleet[0].addPosition(new position(letters.F, 6))
        enemyFleet[0].addPosition(new position(letters.F, 7))
        enemyFleet[0].addPosition(new position(letters.F, 8))


        enemyFleet[1].addPosition(new position(letters.H, 5))
        enemyFleet[1].addPosition(new position(letters.H, 6))
        enemyFleet[1].addPosition(new position(letters.H, 7))
        enemyFleet[1].addPosition(new position(letters.H, 8))

        enemyFleet[2].addPosition(new position(letters.A, 6))
        enemyFleet[2].addPosition(new position(letters.B, 7))
        enemyFleet[2].addPosition(new position(letters.C, 8))

        enemyFleet[3].addPosition(new position(letters.F, 1))
        enemyFleet[3].addPosition(new position(letters.G, 2))
        enemyFleet[3].addPosition(new position(letters.H, 3))

        enemyFleet[4].addPosition(new position(letters.C, 1))
        enemyFleet[4].addPosition(new position(letters.C, 2))

        return enemyFleet
    }
}

module.exports = EnemyFleetHelper