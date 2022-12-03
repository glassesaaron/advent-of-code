const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '3.txt'))
    .toString()
    .split('\n');

let getCharValue = (x) => {
    let ascii = x.charCodeAt(0);
    if(ascii <= 90){
        return ascii - 38;
    }
    return ascii - 96;
}

let rucksacks = [];

for(let rucksack of input){
    let halfway = Math.ceil(rucksack.length/2);
    let contents = {
        a: rucksack.slice(0, halfway),
        b: rucksack.slice(halfway),
        dicta: {},
        dictb: {},
        dictab: {},
        dict: {},
    };
    for(let x of contents.a){
        contents.dicta[x] = true;
        contents.dict[x] = getCharValue(x);
    }
    for(let x of contents.b){
        contents.dictb[x] = true;
        contents.dict[x] = getCharValue(x);
        if(contents.dicta.hasOwnProperty(x)){
            contents.dictab[x] = getCharValue(x);
        }
    }
    rucksacks.push(contents);
}

const rucksackSum = function(){
    let sum = 0;
    for(let rucksack of rucksacks){
        for(let item of Object.keys(rucksack.dictab)){
            sum += rucksack.dictab[item];
        }
    }
    return sum;
}

const rucksackSumByGroup = function(groupSize){
    let sum = 0;
    let group = 0;
    let common = {};
    for(let rucksack of rucksacks){
        group++;
        if(group === 1){
            common = Object.assign({}, rucksack.dict);
        } else {
            let newCommon = Object.assign({}, common);
            for(let x of Object.keys(common)){
                if(!rucksack.dict.hasOwnProperty(x)){
                    delete newCommon[x];
                }
            }
            common = newCommon;
        }
        if(group === groupSize){
            for(let x of Object.keys(common)){
                sum += common[x];
            }
            group = 0;
            common = {};
        }
    }
    return sum;
}

console.log(rucksackSum());

console.log(rucksackSumByGroup(3));
