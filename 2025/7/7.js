import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

function countBeams() {
  let lines = structuredClone(input);
  let first = lines.shift();
  let positions = [];
  let split = 0;
  for (let i = 0; i < first.length; i++) {
    if (first[i] === "S") {
      positions.push(i);
      break;
    }
  }
  for (let line of lines) {
    let newPositions = new Set(positions);
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '^' && positions.includes(i)) {
        split++;
        newPositions.delete(i);
        if (i > 0) {
          newPositions.add(i - 1);
        }
        if (i + 1 < line.length) {
          newPositions.add(i + 1);
        }
      }
    }
    positions = [...newPositions];
  }
  return split;
}

function countTimelines(){
  let lines = structuredClone(input);
  let first = lines.shift();
  let position;
  for (let i = 0; i < first.length; i++) {
    if (first[i] === "S") {
      position = i;
      break;
    }
  }
  return countTimelinesHelper(position, lines);
}

let cache = new Map();

function countTimelinesHelper(position, lines){
  let key = position+','+lines.join('');
  if(cache.has(key)){
    return cache.get(key);
  }
  let remainder = structuredClone(lines);
  let result = 0;
  if(lines.length < 2){
    return 1;
  }
  let first = remainder.shift();
  let hit = false;
  for (let i = 0; i < first.length; i++) {
    if (first[i] === "^" && position === i) {
      if (i > 0) {
        hit = true;
        result += countTimelinesHelper(position-1, remainder)
      }
      if (i + 1 < first.length) {
        hit = true;
        result += countTimelinesHelper(position+1, remainder)
      }
    }
  }
  let final;
  if(hit){
    final = result;
  } else {
    final = countTimelinesHelper(position, remainder);
  }
  cache.set(key, final);
  return final;
}

console.log(countBeams());

console.log(countTimelines());
