const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

let translate = {
    'one' : '1',
    'two' : '2',
    'three' : '3',
    'four' : '4',
    'five' : '5',
    'six' : '6',
    'seven' : '7',
    'eight' : '8',
    'nine' : '9',
}

let doTranslate = (line) => {
    let buffer = '';
    let newLine = '';
    for(let x of line.split('')){
        if(!isNaN(parseInt(x))){
            if(buffer.length > 0){
                newLine = newLine + doTranslate(buffer) + x;
            } else {
                newLine += x;
            }
            buffer = '';
            continue;
        }
        buffer += x;
        if(translate.hasOwnProperty(buffer)){
            newLine += translate[buffer];
            buffer = buffer.substring(buffer.length-1, buffer.length);
        }
    }
    if(buffer.length > 0){
        return newLine + doTranslate(buffer.substr(1));
    }
    return newLine;
}

const inputArr = [];
for(let x of input){
    inputArr.push(x.split(''));
}

const inputArrTranslate = [];
for(let x of input){
    inputArrTranslate.push(doTranslate(x).split(''));
}

const combineFirstLast = (line) => {
    let first = null;
    let last = null;
    for(let x of line){
        let num = parseInt(x);
        if(isNaN(num)){
            continue;
        }
        if(!first){
            first = x;
        }
        last = x;
    }
    return [first, last];
}

const combineAllLines = (doc) => {
    let result = 0;
    for(let x of doc){
        let combine = combineFirstLast(x);
        result += parseInt(combine[0]+combine[1]);
    }
    return result;
}

console.log(combineAllLines(inputArr));

console.log(combineAllLines(inputArrTranslate));
