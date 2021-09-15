const cliColor = require('cli-color');

const battleship = (cliColorCallback = cliColor.white) => {
  console.log(cliColorCallback("                                     |__"));
  console.log(cliColorCallback("                                     |\\/"));
  console.log(cliColorCallback("                                     ---"));
  console.log(cliColorCallback("                                     / | ["));
  console.log(cliColorCallback("                              !      | |||"));
  console.log(cliColorCallback("                            _/|     _/|-++'"));
  console.log(cliColorCallback("                        +  +--|    |--|--|_ |-"));
  console.log(cliColorCallback("                     { /|__|  |/\\__|  |--- |||__/"));
  console.log(cliColorCallback("                    +---------------___[}-_===_.'____                 /\\"));
  console.log(cliColorCallback("                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _"));
  console.log(cliColorCallback(" __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7"));
  console.log(cliColorCallback("|                        Welcome to Battleship                         BB-61/"));
  console.log(cliColorCallback(" \\_________________________________________________________________________|"));
}

const cannon = (cliColorCallback = cliColor.white) => {
  console.log(cliColorCallback("                  __"));
  console.log(cliColorCallback("                 /  \\"));
  console.log(cliColorCallback("           .-.  |    |"));
  console.log(cliColorCallback("   *    _.-'  \\  \\__/"));
  console.log(cliColorCallback("    \\.-'       \\"));
  console.log(cliColorCallback("   /          _/"));
  console.log(cliColorCallback("  |      _  /"));
  console.log(cliColorCallback("  |     /_\\'"));
  console.log(cliColorCallback("   \\    \\_/"));
  console.log(cliColorCallback("    \"\"\"\""));
}

const hit = (cliColorCallback = cliColor.white) => {
  console.log(cliColorCallback("                \\         .  ./"));
  console.log(cliColorCallback("              \\      .:\";'.:..\"   /"));
  console.log(cliColorCallback("                  (M^^.^~~:.'\")."));
  console.log(cliColorCallback("            -   (/  .    . . \\ \\)  -"));
  console.log(cliColorCallback("               ((| :. ~ ^  :. .|))"));
  console.log(cliColorCallback("            -   (\\- |  \\ /  |  /)  -"));
  console.log(cliColorCallback("                 -\\  \\     /  /-"));
  console.log(cliColorCallback("                   \\  \\   /  /"));
}

module.exports = {
  battleship,
  cannon,
  hit,
}
