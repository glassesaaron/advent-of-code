import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

let buildProgram = () => {
    let steps=[];
    let i=0;
    for(let line of input){
        if(line === 'noop'){
            steps.push(0);
        } else {
            let num = parseInt(line.substr(5,input.length-1));
            steps.push(0);
            steps.push(num);
        }
        i++;
    }
    return steps;
}

let steps = buildProgram();

let sumStrengths = (strengthList) => {
    let result=0;
    let x=1;
    for(let i=0;i<steps.length;i++){
        if(strengthList.indexOf(i+1) !== -1){
            result += (x*(i+1));
        }
        x += steps[i];
    }
    return result;
}

let drawImage = () => {
    let x=1;
    let col=0;
    let result = '';
    for(let i=0;i<steps.length;i++){
        result += x===col||x===col-1||x===col+1 ? '#' : '.';
        col++;
        if(col>39&&i!=steps.length-1){
            result += '\n';
            col=0;
        }
        x += steps[i];
    }
    return result;
}

console.log(sumStrengths([20,60,100,140,180,220]));

console.log(drawImage());
