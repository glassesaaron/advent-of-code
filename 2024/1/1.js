const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

let list1 = [];
let list2 = [];
let map1 = new Map();
let map2 = new Map();

for(const line of input){
    const arr = line.split('   ');
    
    const val1 = parseInt(arr[0], 10);
    list1.push(val1);
    if(!map1.has(val1)){
        map1.set(val1, 0);
    }
    map1.set(val1, map1.get(val1)+1);

    const val2 = parseInt(arr[1], 10);
    list2.push(val2);
    if(!map2.has(val2)){
        map2.set(val2, 0);
    }
    map2.set(val2, map2.get(val2)+1);
}

list1.sort();
list2.sort();

let countDistances = () => {
    let result=0;
    for(let i=0;i<list1.length;i++){
        result += Math.abs(list1[i]-list2[i]);
    }
    return result;
}

let multiplyRepeats = () => {
    let result=0;
    for(let x of list1){
        if(map2.has(x)){
            result += x * map2.get(x);
        }
    }
    return result;
}

console.log(countDistances());

console.log(multiplyRepeats());