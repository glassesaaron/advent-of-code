const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

let crates = [];
let moves = [];

let layoutDone = false;
for(let line of input){
    if(line.length === 0){
        continue;
    }
    if(line.substr(0,2) === ' 1'){
        layoutDone = true;
        continue;
    }
    if(!layoutDone){
        let pointer = 1;
        let row = 0;
        while(pointer < line.length){
            if(!crates[row]){
                crates[row] = [];
            }
            if(line[pointer] !== ' '){
                crates[row].unshift(line[pointer]);
            }
            pointer += 4;
            row += 1;
        }
        continue;
    }
    let words = line.split(' ');
    moves.push([parseInt(words[1]),parseInt(words[3]),parseInt(words[5])]);
}

let doMoves = (oneAtATime) => {
    let tmpCrates = JSON.parse(JSON.stringify(crates));
    for(let move of moves){
        let oldCrate = tmpCrates[move[1]-1];
        let tmp = oldCrate.splice(oldCrate.length-move[0],move[0]);
        if(oneAtATime){
            tmp.reverse();
        }
        tmpCrates[move[2]-1] = tmpCrates[move[2]-1].concat(tmp);
    }
    return tmpCrates;
}

const findLastCratesSingle = () => {
    return doMoves(true).reduce((a,c)=>{return a+c[c.length-1]},'');
}

const findLastCratesMultiple= () => {
    return doMoves(false).reduce((a,c)=>{return a+c[c.length-1]},'');
}

console.log(findLastCratesSingle());

console.log(findLastCratesMultiple());
