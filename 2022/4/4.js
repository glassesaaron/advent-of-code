const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '4.txt'))
    .toString()
    .split('\n');

let pairs = [];

for(let line of input){
    const currentPair = line.replaceAll('-',',').split(',').map(x=>parseInt(x));
    let a = currentPair[0];
    let b = currentPair[1];
    let c = currentPair[2];
    let d = currentPair[3];
    if(a > c || (a == c && d > b)){
        pairs.push([[c,d],[a,b]]);
    } else {
        pairs.push([[a,b],[c,d]]);
    }
}

let calculateTotalOverlap = () => {
    let count = 0;
    for(let pair of pairs){
       if(pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1]){
        count++;
       }
    }
    return count;
}

let calculateAnyOverlap = () => {
    let count = 0;
    for(let pair of pairs){
       if(pair[0][1] >= pair[1][0]){
        count++;
       }
    }
    return count;
}

console.log(calculateTotalOverlap());

console.log(calculateAnyOverlap());
