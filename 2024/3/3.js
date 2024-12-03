const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

function findDoDont() {
  const doMatches = input[0].matchAll(/do\(\)/g);
  const dontMatches = input[0].matchAll(/don't\(\)/g);

  let doSet = new Set();
  for (const match of doMatches) {
    doSet.add(match.index);
  }
  let dontSet = new Set();
  for (const match of dontMatches) {
    dontSet.add(match.index);
  }

  // first attempt, brute force
  let enabled = true;
  let enabledArr = [];
  for (let i = 0; i < input[0].length; i++) {
    if (doSet.has(i)) {
      enabled = true;
    }
    if (dontSet.has(i)) {
      enabled = false;
    }
    enabledArr.push(enabled);
  }
  return enabledArr;
}

function findMul(enableFilter) {
  let enabledArr = [];
  if (enableFilter) {
    enabledArr = findDoDont();
  }

  const matches = input[0].matchAll(/mul\(\d+,\d+\)/g);

  let sum = 0;
  for (const match of matches) {
    let nums = match[0]
      .substr(4)
      .slice(0, -1)
      .split(",")
      .map((x) => parseInt(x, 10));
    if (!enableFilter || enabledArr[match.index]) {
      sum += nums[0] * nums[1];
    }
  }
  return sum;
}

console.log(findMul(false));
console.log(findMul(true));
