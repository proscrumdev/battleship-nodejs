const cliColor = require('cli-color');

class AsciiArt {

    static PrintCyan(text) {
        return console.log(cliColor.cyan(text))
    }

    static PrintCyanBright(text) {
        return console.log(cliColor.cyanBright(text))
    }

    static PrintBlueBright(text) {
        return console.log(cliColor.blueBright(text))
    }

    static PrintYellow(text) {
        return console.log(cliColor.yellow(text))
    }

    static PrintBlue(text) {
        return console.log(cliColor.blue(text))
    }

    static PrintRed(text) {
        return console.log(cliColor.red(text))
    }

    static PrintGreen(text) {
        return console.log(cliColor.green(text))
    }

    static PrintMagenta(text) {
        return console.log(cliColor.magenta(text))
    }

    static PrintWithColor(color) {
        if(!cliColor[color])
            console.error('Color ', color, ' does not exist on cliColor.')
        else
            return function(text) { return console.log(cliColor[color](text)) }
    }

    static PrintBattleship() {
        AsciiArt.PrintMagenta("                                     |__");
        AsciiArt.PrintMagenta("                                     |\\/");
        AsciiArt.PrintMagenta("                                     ---");
        AsciiArt.PrintMagenta("                                     / | [");
        AsciiArt.PrintMagenta("                              !      | |||");
        AsciiArt.PrintMagenta("                            _/|     _/|-++'");
        AsciiArt.PrintMagenta("                        +  +--|    |--|--|_ |-");
        AsciiArt.PrintMagenta("                     { /|__|  |/\\__|  |--- |||__/");
        AsciiArt.PrintMagenta("                    +---------------___[}-_===_.'____                 /\\");
        AsciiArt.PrintMagenta("                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _");
        AsciiArt.PrintMagenta(" __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7");
        AsciiArt.PrintMagenta("|                        Welcome to Battleship                         BB-61/");
        AsciiArt.PrintMagenta(" \\_________________________________________________________________________|");
    }

    static PrintCanon() {
        AsciiArt.PrintYellow("                 /  \\");
        AsciiArt.PrintYellow("                  __");
        AsciiArt.PrintYellow("           .-.  |    |");
        AsciiArt.PrintYellow("   *    _.-'  \\  \\__/");
        AsciiArt.PrintYellow("    \\.-'       \\");
        AsciiArt.PrintYellow("   /          _/");
        AsciiArt.PrintYellow("  |      _  /");
        AsciiArt.PrintYellow("  |     /_\\'");
        AsciiArt.PrintYellow("   \\    \\_/");
        AsciiArt.PrintYellow("    \"\"\"\"");
    }

    static PrintHit() {
        AsciiArt.PrintRed("                \\         .  ./");
        AsciiArt.PrintRed("              \\      .:\";'.:..\"   /");
        AsciiArt.PrintRed("                  (M^^.^~~:.'\").");
        AsciiArt.PrintRed("            -   (/  .    . . \\ \\)  -");
        AsciiArt.PrintRed("               ((| :. ~ ^  :. .|))");
        AsciiArt.PrintRed("            -   (\\- |  \\ /  |  /)  -");
        AsciiArt.PrintRed("                 -\\  \\     /  /-");
        AsciiArt.PrintRed("                   \\  \\   /  /");
    }

    static PrintWater() {
        AsciiArt.PrintBlue("              _/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_")
        AsciiArt.PrintBlue("         _/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_     ")
        AsciiArt.PrintBlue("              _/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_")
        AsciiArt.PrintBlue("         _/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_    ")
        AsciiArt.PrintBlue("              _/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_")
        AsciiArt.PrintBlue("         _/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_     ")
        AsciiArt.PrintBlue("              _/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_")
        AsciiArt.PrintBlue("         _/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_     ")
    }


    static PrintBoat(boatName) {
        var boatExecutorsByBoatName = {
            'Aircraft Carrier': function() {
                const printItem = AsciiArt.PrintWithColor('cyan')

                printItem("")
                printItem("                |")
                printItem("                -+-")
                printItem("              ---#---")
                printItem("              __|_|__            __")
                printItem("             \\_____/           ||\\________")
                printItem("__   __   __ \\_____/            ^---------^")
                printItem("||\\__||\\__||\\__|___  | '-O-`")
                printItem("-^---------^--^----^___.-------------.___.--------.___.------")
                printItem("`-------------|-------------------------------|-------------'")
                printItem("     \\___      |    \\    o O o    /     |      ___/")
                printItem("         \\____/       \\         /       \\____/")
                printItem("              |         \\     /           |")
                printItem("              |           \\|/             |")
                printItem("              |            |              |")
                printItem("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                printItem("")
            },
            'Battleship': function() {
                const printItem = AsciiArt.PrintWithColor('cyan')

                printItem("")
                printItem("                                     |__")
                printItem("                                     |\\/")
                printItem("                                     ---")
                printItem("                                     / | [")
                printItem("                              !      | |||")
                printItem("                            _/|     _/|-++'")
                printItem("                        +  +--|    |--|--|_ |-")
                printItem("                     { /|__|  |/\\__|  |--- |||__/")
                printItem("                    +---------------___[}-_===_.'____                 /\\")
                printItem("                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _")
                printItem(" __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7")
                printItem("|                                                                       BB-61/")
                printItem(" \\_________________________________________________________________________|")
                printItem("")
            },
            'Submarine': function() {
                const printItem = AsciiArt.PrintWithColor('cyan')

                printItem("")
                printItem("                ?")
                printItem("                ~~~~~~~~~~~~~~~~~~~~~~~~~~~|^~~~~~~~~~~~~~~~~~~~~~~~~~o~~~~~~~~~~~")
                printItem("                       o                   |                  o      __o")
                printItem("                        o                  |                 o     |X__>")
                printItem("                      ___o                 |                __o")
                printItem("                    (X___>--             __|__            |X__>     o")
                printItem("                                        |    \\                   __o")
                printItem("                                        |     \\                |X__>")
                printItem("                 _______________________|______\\________________")
                printItem("                <                                               \\____________   _")
                printItem("                \\                                                           \\ (_)")
                printItem("                 \\    O       O       O                                       >=)")
                printItem("                  \\__________________________________________________________/ (_)")
                printItem("")
            },
            'Destroyer': function() {
                const printItem = AsciiArt.PrintWithColor('yellow')

                printItem("")
                printItem("                     __/___            ")
                printItem("              _____/______|           ")
                printItem("      _______/_____\\______\\_____     ")
                printItem("     \\              < < <       |    ")
                printItem("       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                printItem("")
            },
            'Patrol Boat': function() {
                const printItem = AsciiArt.PrintWithColor('cyan')

                printItem("")
                printItem("                o . o o.o")
                printItem("                     ...oo")
                printItem("                       __[]__")
                printItem("                    __|_o_o_o\__")
                printItem("                   \\''''''''''/")
                printItem("                    \\. ..  . /")
                printItem("                ^^^^^^^^^^^^^^^^^^^^")
                printItem("")
            },
        }

        var boat = boatExecutorsByBoatName[boatName]

        if(boat)
            boat()
    }


    static PrintSetupHeader() {
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-----------------------------------------SET UP YOUR BATTLESHIPS---------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
    }

    static PrintGameStartHeader(currentLevel = 1) {
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("--------------------------------------STARTING GAME FOR LEVEL: " + currentLevel + " ---------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
    }
}

module.exports = AsciiArt;