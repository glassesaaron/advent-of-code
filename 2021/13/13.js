import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

let folds = [];

while (input[input.length - 1] != "") {
  let x = input.pop().split(" ");
  let y = x[2].split("=");
  folds.push([...y]);
}
folds.reverse();
input.pop();

const buildMap = function () {
  let xMax = 0;
  let yMax = 0;
  for (let x of input) {
    let y = x.split(",");
    xMax = Math.max(xMax, parseInt(y[0]));
    yMax = Math.max(yMax, parseInt(y[1]));
  }
  xMax++;
  yMax++;
  let result = [];
  for (let i = 0; i < yMax; i++) {
    result.push(new Array(xMax).fill("."));
  }
  return result;
};

const doFold = function (map, fold) {
  let start = parseInt(fold[1]);
  if (fold[0] == "y") {
    for (let y = start + 1; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        map[start - (y - start)][x] =
          map[start - (y - start)][x] == "#" ? "#" : map[y][x];
      }
    }
    return map.slice(0, start);
  } else {
    for (let y = 0; y < map.length; y++) {
      for (let x = start + 1; x < map[0].length; x++) {
        map[y][start - (x - start)] =
          map[y][start - (x - start)] == "#" ? "#" : map[y][x];
      }
    }
    let result = [];
    for (let x of map) {
      result.push(x.slice(0, start));
    }
    return result;
  }
};

const countDotsAfterFold = function (limit, print) {
  let map = buildMap();
  for (let x of input) {
    let y = x.split(",");
    map[parseInt(y[1])][parseInt(y[0])] = "#";
  }

  if (!limit) {
    limit = folds.length;
  }
  for (let i = 0; i < limit; i++) {
    map = doFold(map, folds[i]);
  }

  let count = 0;
  for (let x of map) {
    for (let y of x) {
      count += y == "#" ? 1 : 0;
    }
  }

  if (print) {
    let s = "";
    for (let x of map) {
      s += x.join("") + "\n";
    }
    return s;
  }

  return count;
};

console.log(countDotsAfterFold(1, false));

console.log(countDotsAfterFold(null, true));
