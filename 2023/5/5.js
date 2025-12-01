import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

let seeds = [];
let inputMap = {};
let from = null;
let to = null;
for(let line of input){
    if(line === ''){
        continue;
    }
    if(line.slice(0,5) === 'seeds'){
        seeds = line.split(':')[1].trim().split(' ').map(x=>parseInt(x));
        continue;
    }
    if(isNaN(parseInt(line.split(' ')[0]))){
        const map = line.split(' ')[0];
        const fromTo = map.split('-');
        from = fromTo[0];
        to = fromTo[2];
        inputMap[from] = {
            next: to,
        };
        inputMap[from].items = [];
        continue;
    } else {
        inputMap[from].items.push(line.split(' ').map(x=>parseInt(x)))
    }
}

const doMappings = function(obj, inputMapItem){
    if(!inputMap.hasOwnProperty(inputMapItem)){
        return obj;
    }
    const mappings = inputMap[inputMapItem];
    for(let mapping of mappings.items){
        const dest = mapping[0];
        const source = mapping[1];
        const length = mapping[2];
        if(obj >= source && obj <= source+length){
            if(dest >= source){
                let diff = dest-source;
                obj = obj+diff;
            } else {
                let diff = source-dest;
                obj = obj-diff;
            }
            break;
        }
    }
    if(mappings.next){
        return doMappings(obj, mappings.next);
    }
}

const findLowest = function(obj){
    let min = null;
    for(let x of obj){
        let low = doMappings(x, 'seed');
        if(min === null){
            min = low;
        } else {
            min = Math.min(min, low);
        }
    }
    return min;
}

// todo: refactor, brute force, extremely slow
const findLowestRange = function(obj){
    let min = null;
    for(let i=0;i<obj.length;i=i+2){
        //console.log(new Date().toString(), ((i/2)+1)+'/'+(obj.length/2));
        for(let j=obj[i];j<obj[i]+obj[i+1];j++){
            let low = doMappings(j, 'seed');
            if(min === null){
                min = low;
            } else {
                min = Math.min(min, low);
            }
        }
    }
    return min;
}

console.log(findLowest(seeds));

console.log(findLowestRange(seeds));
