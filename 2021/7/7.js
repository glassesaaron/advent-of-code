const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '7.txt'))
    .toString()
    .split(',')
    .map(x=>parseInt(x,10));

const sortedInput = input.sort((a,b)=>{return a-b;});

const calculateLeastMoves = function(){
    let midpoint = sortedInput[Math.round(sortedInput.length/2)];
    let moves = sortedInput.reduce((a,c)=>{return a+Math.abs(midpoint-c);},0);
    return moves;
}

const calculateLeastMovesCrabLogic = function(){
    let avg = Math.floor(sortedInput.reduce((a,c)=>{return a+c;},0) / sortedInput.length);
    let moves = 0;
    for(let x of sortedInput){
        let max = x >= avg ? x : avg;
        let min = x < avg ? x : avg;
        let cost = 1;
        while(max > min){
            moves += cost;
            max--;
            cost++;
        }
    }
    return moves;
}

console.log(calculateLeastMoves());

console.log(calculateLeastMovesCrabLogic());
