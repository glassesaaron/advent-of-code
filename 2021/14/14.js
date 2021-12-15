const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '14.txt'))
    .toString()
    .split('\n');

const start=input[0];
const pairs=new Map();
for(let i=2;i<input.length;i++){
    pairs.set(input[i].slice(0,2), input[i][6]);
}

const incrementCount = function(x,counts,amt){
    if(!counts.has(x)){
        counts.set(x, 0);
    }
    counts.set(x, counts.get(x)+amt);
    return counts;
}

const helper = function(currPairs, counts, steps){
    if(steps==0){
        return counts;
    }
    let newPairs = new Map();
    for(let x of currPairs.keys()){
        if(pairs.has(x)){
            let a=x[0]+pairs.get(x);
            let b=pairs.get(x)+x[1];
            let amt=currPairs.get(x);

            if(!newPairs.has(a)){
                newPairs.set(a, 0);
            }
            newPairs.set(a, newPairs.get(a)+amt);

            if(!newPairs.has(b)){
                newPairs.set(b, 0);
            }
            newPairs.set(b, newPairs.get(b)+amt);

            counts=incrementCount(pairs.get(x),counts,amt);
        }
    }
    return helper(newPairs, counts, steps-1);
}

const mostCommonMinusLeastCommon = function(steps){
    let currPairs=new Map();

    let counts=new Map();
    for(let i=0;i<start.length-1;i++){
        if(!currPairs.has()){
            currPairs.set(start[i]+start[i+1],0);
        }
        currPairs.set(start[i]+start[i+1], currPairs.get(start[i]+start[i+1])+1);
        counts=incrementCount(start[i],counts,1);
    }
    counts=incrementCount(start[start.length-1],counts,1);

    counts=helper(currPairs,counts,steps);
    
    let max=0;
    let min=Number.MAX_SAFE_INTEGER;
    counts.forEach(x=>{
        max=Math.max(max,x);
        min=Math.min(min,x);
    })
    return max-min;
}

console.log(mostCommonMinusLeastCommon(10));

console.log(mostCommonMinusLeastCommon(40));
