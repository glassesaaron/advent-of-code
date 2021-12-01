const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '1.txt'))
    .toString()
    .split('\n')
    .map(x=>parseInt(x));

const calculateIncreased = function(windowSize){
    let increased=0;
    for(let i=windowSize;i<input.length;i++){
        if(input[i]>input[i-windowSize]){
            increased++;
        }
    }
    return increased;
}

console.log(calculateIncreased(1));

console.log(calculateIncreased(3));
