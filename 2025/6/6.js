import { loadInput } from "../../helpers/loadInput.js";
const rawInput = loadInput(import.meta.url);
const input = rawInput.map((x) => {
  x = x.replace(/(\s)+/g, ",");
  if (x[0] === ",") {
    x = x.slice(1, x.length);
  }
  if (x[x.length - 1] === ",") {
    x = x.slice(0, -1);
  }
  return x;
});

let lines = [];

(function buildLines() {
  lines = input[0].split(",").map((x) => [parseInt(x, 10)]);
  for (let i = 1; i < input.length; i++) {
    let line = input[i].split(",").map((x) => (isNaN(x) ? x : parseInt(x, 10)));
    for (let j = 0; j < line.length; j++) {
      lines[j].push(line[j]);
    }
  }
})();

function computeLines() {
  let tmpLines = structuredClone(lines);
  let result = [];
  for (let line of tmpLines) {
    let operation = line.pop();
    let first = line.shift();
    result.push(
      line.reduce((a, c) => (operation === "+" ? a + c : a * c), first)
    );
  }
  return result;
}

function sumLines() {
  return computeLines().reduce((a, c) => a + c, 0);
}

function stupidLines() {
  let result = 0;
  let operator = "";
  let nums = [];
  for (let i = 0; i < rawInput[rawInput.length - 1].length; i++) {
    if (rawInput[rawInput.length - 1][i] !== " ") {
      operator = rawInput[rawInput.length - 1][i];
      nums = [];
    }
    let num = "";
    for (let j = 0; j < rawInput.length - 1; j++) {
      num += rawInput[j][i];
    }
    num = parseInt(num);
    if (!isNaN(num)) {
      nums.push(num);
    }
    if (
      i + 1 >= rawInput[rawInput.length - 1].length ||
      rawInput[rawInput.length - 1][i + 1] !== " "
    ) {
      const first = nums.shift();
      result += nums.reduce(
        (a, c) => (operator === "+" ? a + c : a * c),
        first
      );
    }
  }
  return result;
}

console.log(sumLines());

console.log(stupidLines());
