import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url)[0];

const calculateStartPosition = function(differenceSize){
    let trailing = {
        str: [],
        greaterThanTwo: [],
    };
    for(let i=0;i<differenceSize;i++){
        if(trailing.hasOwnProperty(input[i])){
            trailing[input[i]]++;
            trailing.greaterThanTwo.push(input[i]);
        } else {
            trailing[input[i]] = 1;
        }
        trailing.str.push(input[i]);
    }
    if(trailing.greaterThanTwo.length === 0){
        return differenceSize;
    }
    for(let i=differenceSize;i<input.length;i++){
        let last = trailing.str.shift();
        trailing[last]--;
        if(trailing[last] < 2 && trailing.greaterThanTwo.includes(last)){
            trailing.greaterThanTwo.splice(trailing.greaterThanTwo.indexOf(last),1)
        }
        if(trailing.hasOwnProperty(input[i])){
            trailing[input[i]]++;
            if(trailing[input[i]] > 1 && trailing.greaterThanTwo.indexOf(input[i]) === -1){
                trailing.greaterThanTwo.push(input[i]);
            }
        } else {
            trailing[input[i]] = 1;
        }
        trailing.str.push(input[i]);
        if(trailing.greaterThanTwo.length === 0){
            return i+1;
        }
    }
}

console.log(calculateStartPosition(4));

console.log(calculateStartPosition(14));
