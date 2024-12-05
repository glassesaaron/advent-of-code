const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

let rules = new Map();
let lines = [];
for (let line of input) {
  if (line.indexOf("|") !== -1) {
    const rule = line.split("|").map((x) => parseInt(x, 10));
    if (!rules.has(rule[0])) {
      rules.set(rule[0], new Set());
    }
    rules.set(rule[0], rules.get(rule[0]).add(rule[1]));
  }
  if (line.indexOf(",") !== -1) {
    lines.push(line.split(",").map((x) => parseInt(x, 10)));
  }
}

function checkLine(originalLine, doSwap) {
  let line = [...originalLine];
  let indexes = new Map();
  for (let i = 0; i < line.length; i++) {
    indexes.set(line[i], i);
  }
  for (let i = 0; i < line.length; i++) {
    let num = line[i];
    if (rules.has(num)) {
      let rule = rules.get(num);
      for (let curr of rule) {
        if (indexes.get(num) > indexes.get(curr)) {
          if (!doSwap) {
            return false;
          }
          let oldValue = num;
          let oldIndex = i;
          let newValue = curr;
          let newIndex = indexes.get(curr);
          line[newIndex] = oldValue;
          line[oldIndex] = newValue;
          indexes.set(oldValue, newIndex);
          indexes.set(newValue, oldIndex);
          i = 0;
          break;
        }
      }
    }
  }
  return !doSwap ? true : line;
}

function sumValidMiddles() {
  let result = 0;
  for (let line of lines) {
    if (checkLine(line, false)) {
      result += line[Math.floor((line.length - 1) / 2)];
    }
  }
  return result;
}

function sumFixedMiddles() {
  let result = 0;
  for (let line of lines) {
    if (!checkLine(line, false)) {
      const newLine = checkLine(line, true);
      result += newLine[Math.floor((line.length - 1) / 2)];
    }
  }
  return result;
}

console.log(sumValidMiddles());
console.log(sumFixedMiddles());
