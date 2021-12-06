const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '6.txt'))
    .toString()
    .split(',')
    .map(x=>parseInt(x));

const countLanternfish = function(days){
    let fishBins = [0,0,0,0,0,0,0,0,0];
    for(let x of input){
        fishBins[x]++;
    }
    while(days>0){
        let one = fishBins[1];
        for(let i=1;i<fishBins.length-1;i++){
            fishBins[i]=fishBins[i+1];
        }
        fishBins[8]=fishBins[0];
        fishBins[6]+=fishBins[0];
        fishBins[0]=one;
        days--;
    }
    return fishBins.reduce((a,c)=>{return a+c;},0);
}

console.log(countLanternfish(80));

console.log(countLanternfish(256));
