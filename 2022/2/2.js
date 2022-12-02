const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '2.txt'))
    .toString()
    .split('\n');

const outcomeMap1 = {
    'A' : {
        'X' : 4,
        'Y' : 8,
        'Z' : 3,
    },
    'B' : {
        'X' : 1,
        'Y' : 5,
        'Z' : 9,
    },
    'C' : {
        'X' : 7,
        'Y' : 2,
        'Z' : 6,
    },
}

const outcomeMap2 = {
    'A' : {
        'X' : 3,
        'Y' : 4,
        'Z' : 8,
    },
    'B' : {
        'X' : 1,
        'Y' : 5,
        'Z' : 9,
    },
    'C' : {
        'X' : 2,
        'Y' : 6,
        'Z' : 7,
    },
}

let calculateScore = (outcomesMap) => {
    return input.reduce((a,c)=>{
        return a + outcomesMap[c[0]][c[2]];
    },0);
}

console.log(calculateScore(outcomeMap1));
console.log(calculateScore(outcomeMap2));
