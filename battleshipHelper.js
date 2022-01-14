class BattleshipHelper {

    static GetNumberForLetter(letter) {
        var numbersByLetter = {
            'A': 1,
            'B': 2,
            'C': 3,
            'D': 4,
            'E': 5,
            'F': 6,
            'G': 7,
            'H': 8
        }

        if(!numbersByLetter[letter]) {
            console.error('No number for letter ', letter)

            return 1
        }

        return numbersByLetter[letter]
    }

    static GetLetterForNumber(number) {
        var lettersByNumber = {
            1: 'A',
            2: 'B',
            3: 'C',
            4: 'D',
            5: 'E',
            6: 'F',
            7: 'G',
            8: 'H'
        }

        if(!lettersByNumber[number]) {
            console.error('No letter for number ', number)

            return 'A'
        }

        return lettersByNumber[number]
    }

}

module.exports = BattleshipHelper