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
        AsciiArt.PrintBlue("              _/\_/\_/\_/\_/\_/\_/\_/\_")
        AsciiArt.PrintBlue("         _/\_/\_/\_/\_/\_/\_/\_/\_     ")
        AsciiArt.PrintBlue("              _/\_/\_/\_/\_/\_/\_/\_/\_")
        AsciiArt.PrintBlue("         _/\_/\_/\_/\_/\_/\_/\_/\_     ")
        AsciiArt.PrintBlue("              _/\_/\_/\_/\_/\_/\_/\_/\_")
        AsciiArt.PrintBlue("         _/\_/\_/\_/\_/\_/\_/\_/\_     ")
        AsciiArt.PrintBlue("              _/\_/\_/\_/\_/\_/\_/\_/\_")
        AsciiArt.PrintBlue("         _/\_/\_/\_/\_/\_/\_/\_/\_     ")
    }

    static PrintSetupHeader() {
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-----------------------------------------SET UP YOUR BATTLESHIPS---------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
    }

    static PrintGameStartHeader() {
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-----------------------------------------GAME START----------------------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
        AsciiArt.PrintYellow("-------------------------------------------------------------------------------------------------------------------");
    }
}

module.exports = AsciiArt;