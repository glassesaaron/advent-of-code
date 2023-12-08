const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

const order = input[0].split('');
const map = {};
const aEnd = [];
for(let i=2;i<input.length;i++){
    let line = input[i].split(' ');
    let item = {
        L: line[2].substr(1,line[2].length-2),
        R: line[3].substr(0,line[2].length-2),
    };
    map[line[0]] = item;
    if(line[0][line[0].length-1] === 'A'){
        aEnd.push(item);
    }
}

// https://stackoverflow.com/questions/47047682/least-common-multiple-of-an-array-values-using-euclidean-algorithm
const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

const findRouteLength = function(currents){
    let steps = 0;
    let round = [...order];
    let found = false;
    let founds = new Array(currents.length).fill(false);
    while(!found){
        while(round.length > 1){
            steps++;
            let next = round.shift();
            for(let i=0;i<currents.length;i++){
                currents[i] = map[currents[i][next]];
            }
        }
        steps++;
        let next = round.shift();
        for(let i=0;i<currents.length;i++){
            let isFound = currents[i][next][currents[i][next].length-1] === 'Z';
            if(isFound && !founds[i]){
                founds[i] = steps;
            }
            currents[i] = map[currents[i][next]];
        }
        found = true;
        for(let x of founds){
            found = found && x !== false;
        }
        round = [...order];
    }
    return founds.reduce(lcm);
}

console.log(findRouteLength([map['AAA']]));

console.log(findRouteLength(aEnd));
