const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '10.txt'))
    .toString()
    .split('\n');

const vals = new Map();
vals.set('(', ')');
vals.set('[',']');
vals.set('{','}');
vals.set('<','>');

const points = new Map();
points.set(')', { error: 3, complete: 1});
points.set(']', { error: 57, complete: 2});
points.set('}', { error: 1197, complete: 3});
points.set('>', { error: 25137, complete: 4});

const validateLine = function(line){
    let stack=[];
    for(let x of line){
        if(vals.has(x)){
            stack.push(x);
        }else{
            if(stack.length == 0){
                return x;
            } else {
                if(x != vals.get(stack.pop())){
                    return x;
                }
            }
        }
    }
    return stack;
}

const computeCompleteScore = function(line, stack){
    let score = 0;
    while(stack.length > 0){
        let x = stack.pop();
        score = (score * 5) + points.get(vals.get(x)).complete;
    }
    return score;
}

const countSyntaxError = function(){
    let sum=0;
    for(let line of input){
        let x = validateLine(line);
        if(typeof x !== 'object'){
            sum += points.get(x).error;
        }
    }
    return sum;
}

const countAutocompleteMiddleScore = function(){
    let scores = [];
    for(let line of input){
        let x = validateLine(line);
        if(typeof x === 'object'){
            scores.push(computeCompleteScore(line, x));
        }
    }
    scores = scores.sort((a,b)=>{ return a-b; });
    return scores[Math.floor(scores.length/2)];
}

console.log(countSyntaxError());

console.log(countAutocompleteMiddleScore());
