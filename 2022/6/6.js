const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n')[0];

const calculateStartPosition = function(differenceSize){
    let trailing = [];
    let found = true;
    for(let i=0;i<differenceSize;i++){
        found = found && !trailing.includes(input[i]);
        trailing.push(input[i]);
    }
    if(found){
        return differenceSize;
    }
    for(let i=differenceSize;i<input.length;i++){
        trailing.shift();
        trailing.push(input[i]);
        let duplicate = false;
        // TODO: yikes, n^2
        // we can try being clever later,
        // if being stupid doesn't work
        for(let j=0;j<trailing.length;j++){
            if(duplicate){
                break;
            }
            for(let k=0;k<trailing.length;k++){
                if(j !== k && trailing[j] === trailing[k]){
                    duplicate = true;
                    break;
                }
            }
        }
        if(!duplicate){
            return i+1;
        }
    }
}

console.log(calculateStartPosition(4));

console.log(calculateStartPosition(14));
