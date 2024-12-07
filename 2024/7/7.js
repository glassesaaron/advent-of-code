const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

let rules = [];
for(let line of input){
  let split = line.split(':');
  rules.push({
    sum: parseInt(split[0],10),
    steps: split[1].trim().split(' ').map(x=>parseInt(x,10))
  })
}

function checkSteps(sum, steps, includeCombine){
  let stepsCopy = [...steps];
  let possibilities = [stepsCopy.shift()];
  for(let step of stepsCopy){
    let newPossibilities = [];
    for(let possibility of possibilities){
      newPossibilities.push(possibility + step);
      newPossibilities.push(possibility * step);
      if(includeCombine){
        newPossibilities.push(parseInt(possibility+''+step));
      }
    }
    possibilities = newPossibilities;
  }
  for(let possibility of possibilities){
    if(possibility === sum){
      return true;
    }
  }
  return false;
}

function checkAll(includeCombine){
  let result=0;
  for(let rule of rules){
    if(checkSteps(rule.sum, rule.steps, includeCombine)){
      result+=rule.sum
    }
  }
  return result;
}

console.log(checkAll(false));
console.log(checkAll(true));