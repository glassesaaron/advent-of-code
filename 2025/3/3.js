import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

let cache = new Map();

function findBiggest(line, num) {
  if (cache.has(line + num)) {
    return cache.get(line + num);
  }
  if (line.length === 0 || num === 0 || line.length < num) {
    return "";
  }
  const current = line[0];
  const left = parseInt(current + findBiggest(line.substr(1), num - 1), 10);
  const right = findBiggest(line.substr(1), num);
  const result = Math.max(left, right);
  cache.set(line + num, result);
  return result;
}

function countBiggest(num) {
  return input.map((x) => findBiggest(x, num)).reduce((a, c) => a + c, 0);
}

console.log(countBiggest(2));

console.log(countBiggest(12));
