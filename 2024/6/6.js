const fs = require("fs");
const path = require("path");
const { Worker, isMainThread , workerData, parentPort } = require('worker_threads');

function createWorker(workerData) {
  return new Promise(function (resolve, reject) {
    const worker = new Worker(__filename, {
      workerData: workerData,
    });
    worker.on("message", (data) => {
      resolve(data);
    });
    worker.on("error", (msg) => {
      reject(`An error ocurred: ${msg}`);
    });
  });
}

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

let originalMap = [];
let originalPos = {
  direction: '^',
  x: 0,
  y: 0,
  offMap: false,
}
let directions = ['^','>','v','<'];
let steps = [{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}]
for(let y=0;y<input.length;y++){
  let line = input[y];
  let newLine = line.split('');
  for(let x=0;x<newLine.length;x++){
    if(directions.includes(newLine[x])){
      originalPos = { direction: newLine[x], x: x, y: y, offMap: false};
      newLine[x]='.';
    }
  }
  originalMap.push(newLine);
}

function findPath(detectLoop, map){
  let pos = Object.assign({}, originalPos);
  let visited = new Map();
  while(!pos.offMap && !(visited.has(pos.x+','+pos.y) && visited.get(pos.x+','+pos.y).has(pos.direction))){
    if(!visited.has(pos.x+','+pos.y)){
      visited.set(pos.x+','+pos.y, new Set())
    }
    visited.set(pos.x+','+pos.y,(visited.get(pos.x+','+pos.y,).add(pos.direction)));
    let nextSteps = steps[directions.indexOf(pos.direction)];
    let nextY = pos.y + nextSteps.y;
    let nextX = pos.x + nextSteps.x;
    if(nextY === map.length || nextY < 0 || nextX === map[0].length || nextX < 0){
      pos.offMap = true;
    } else if(map[nextY][nextX] === '#'){
      let nextDirection = directions.indexOf(pos.direction)+1;
      if(nextDirection === directions.length){
        nextDirection=0;
      }
      nextSteps = steps[nextDirection];
      pos.direction = directions[nextDirection];
    } else {
      pos.y = nextY;
      pos.x = nextX;
    }
  }
  return detectLoop ? !pos.offMap : visited.size;
}

// first attempt, brute force
async function findAllLoopPossibliities(){
  const workerPromises = [];
  for(let y=0;y<originalMap.length;y++){
    workerPromises.push(createWorker(y));
  }
  const threadResults = await Promise.all(workerPromises);
  return threadResults.reduce((a,c)=>a+c,0);
}

async function main(){
  if (isMainThread) {
    console.log(findPath(false, [...originalMap]));
    console.log(await findAllLoopPossibliities());
  } else {
    let result=0;
    let y=workerData;
    for(let x=0;x<originalMap[y].length;x++){
      if(originalMap[y][x] === '.' && !(originalPos.y === y && originalPos.x === x)){
        originalMap[y][x] = '#';
        if(findPath(true, originalMap)){
          result++;
        }
        originalMap[y][x] = '.';
      }
    }
    parentPort.postMessage(result);
  }
}

main();
