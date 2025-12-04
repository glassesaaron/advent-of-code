import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

const inputMap = input.map((x) => x.split(""));

function countNode(map, x, y) {
  let count = 0;
  if (y > 0) {
    count += map[y - 1][x] === "@" ? 1 : 0;
    if (x > 0) {
      count += map[y - 1][x - 1] === "@" ? 1 : 0;
    }
    if (x < map[0].length - 1) {
      count += map[y - 1][x + 1] === "@" ? 1 : 0;
    }
  }
  if (x > 0) {
    count += map[y][x - 1] === "@" ? 1 : 0;
  }
  if (x < map[0].length - 1) {
    count += map[y][x + 1] === "@" ? 1 : 0;
  }
  if (y < map.length - 1) {
    count += map[y + 1][x] === "@" ? 1 : 0;
    if (x > 0) {
      count += map[y + 1][x - 1] === "@" ? 1 : 0;
    }
    if (x < map[0].length - 1) {
      count += map[y + 1][x + 1] === "@" ? 1 : 0;
    }
  }
  return count;
}

function countNeighbors(num, recurse) {
  let map = structuredClone(inputMap);
  let count = 0;
  let ranOnce = false;

  while (recurse || !ranOnce) {
    let startCount = count;
    let newMap = JSON.parse(JSON.stringify(map));
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === "@" && countNode(map, x, y) < num) {
          newMap[y][x] = ".";
          count++;
        }
      }
    }
    map = newMap;
    recurse = recurse && startCount !== count;
    ranOnce = true;
  }

  return count;
}

console.log(countNeighbors(4, false));

console.log(countNeighbors(4, true));
