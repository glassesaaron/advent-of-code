const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '3.txt'))
    .toString()
    .split('\n');

const calculatePowerConsumption = function(){
    let bitCount = (new Array(input[0].length)).fill(0).map(()=>[0,0]);

    for(let bitString of input){
        for(let i=0;i<bitString.length;i++){
            bitCount[i][parseInt(bitString[i], 10)]++;
        }
    }

    let gammaString = '';
    let epsilonString = '';
    for(let x of bitCount){
        gammaString += x[0] > x[1] ? '0' : '1';
        epsilonString += x[0] < x[1] ? '0' : '1';
    }

    return parseInt(gammaString, 2) * parseInt(epsilonString, 2);
}

const calculateLifeSupportingRating = function(){
    let oxygenGeneratorRating = lifeSupportHelper(input, 0, (x, y)=>{ return x == y ? false : x > y; });
    let co2ScrubberRating = lifeSupportHelper(input, 0, (x, y)=>{ return x == y ? true : x < y; });
    return oxygenGeneratorRating * co2ScrubberRating;
}

const lifeSupportHelper = function(remaining, position, comparator){
    let bitCount = [[], []];
    for(let x of remaining){
        bitCount[parseInt(x[position], 10)].push(x);
    }
    let newRemaining = comparator(bitCount[0].length, bitCount[1].length) ? bitCount[0] : bitCount[1];
    if(newRemaining.length == 1){
        return parseInt(newRemaining[0], 2);
    }
    return lifeSupportHelper(newRemaining, position + 1, comparator);
}

console.log(calculatePowerConsumption());

console.log(calculateLifeSupportingRating());
