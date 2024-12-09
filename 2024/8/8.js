const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

let map = [];
let positions = new Map();
for (let y = 0; y < input.length; y++) {
  let line = input[y];
  for (let x = 0; x < line.length; x++) {
    let char = line[x];
    if (char === ".") {
      continue;
    }
    if (!positions.has(char)) {
      positions.set(char, []);
    }
    positions.set(char, [
      ...positions.get(char),
      {
        x: x,
        y: y,
      },
    ]);
  }
  map.push(line.split(""));
}

function findAntinodes(positions, repeats) {
  let antinodes = [];
  for (let i = 0; i < positions.length; i++) {
    let positionA = positions[i];
    for (let j = i; j < positions.length; j++) {
      if (i === j) {
        continue;
      }
      let positionB = positions[j];
      let xDiff = positionB.x - positionA.x;
      let yDiff = positionB.y - positionA.y;
      let newX = positionA.x - xDiff;
      let newY = positionA.y - yDiff;
      if (repeats) {
        antinodes.push({
          x: positionA.x,
          y: positionA.y,
        });
        antinodes.push({
          x: positionB.x,
          y: positionB.y,
        });
      }
      while (
        newX >= 0 &&
        newY >= 0 &&
        newX < map[0].length &&
        newY < map.length
      ) {
        antinodes.push({
          x: newX,
          y: newY,
        });
        if (!repeats) {
          break;
        }
        newX -= xDiff;
        newY -= yDiff;
      }
      newX = positionB.x + xDiff;
      newY = positionB.y + yDiff;
      while (
        newX >= 0 &&
        newY >= 0 &&
        newX < map[0].length &&
        newY < map.length
      ) {
        antinodes.push({
          x: newX,
          y: newY,
        });
        if (!repeats) {
          break;
        }
        newX += xDiff;
        newY += yDiff;
      }
    }
  }
  return antinodes;
}

function findAllAntinodes(repeats, draw) {
  let antinodes = new Set();
  let newMap = [...map];
  for (const [key, position] of positions) {
    let newAntinodes = findAntinodes(position, repeats);
    for (let antinode of newAntinodes) {
      antinodes.add(antinode.x + "," + antinode.y);
      newMap[antinode.y][antinode.x] = "#";
    }
  }
  if (draw) {
    console.log(newMap.map((x) => x.join("")).join("\n"));
  }
  return antinodes.size;
}

console.log(findAllAntinodes(false, false));
console.log(findAllAntinodes(true, false));
