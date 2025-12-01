const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

const makeMove = (current, move) => {
    let next = current;
    let zeros = 0;
    let right = move[0] === 'R';
    let increment = right ? 1 : -1;
    let remaining = parseInt(move.slice(1));
    while(remaining > 0){
        next += increment;
        if(next < 0){
            next = 99;
        }
        if(next > 99){
            next = 0;
        }
        if(next === 0){
            zeros++;
        }
        remaining--;
    }
    return {
        position: next,
        zeros: zeros,
    }
}

const countEndZeros = () => {
    let current = 50;
    let zeros = 0;
    for(let line of input){
        let { position } = makeMove(current, line);
        current = position;
        if(current === 0){
            zeros++;
        }
    }
    return zeros;
}

const countAllZeros = () => {
    let current = 50;
    let allZeros = 0;
    for(let line of input){
        let { position, zeros } = makeMove(current, line);
        current = position;
        allZeros += zeros;
    }
    return allZeros;
}


console.log(countEndZeros());

console.log(countAllZeros());
