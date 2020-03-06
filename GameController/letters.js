require('enum').register();
var Letters = new Enum({
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8
}, {
    ignoreCase: true
});

module.exports = Letters;