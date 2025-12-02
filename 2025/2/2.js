import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url, ",");

function isNotMirror(input) {
  if (input.length % 2 !== 0) {
    return true;
  }
  const midpoint = input.length / 2;
  return input.slice(0, midpoint) !== input.slice(midpoint);
}

function repeatToEnd(str, input) {
  let substr = str;
  let remaining = input;
  while (substr === remaining.substr(0, substr.length)) {
    remaining = remaining.substr(substr.length, remaining.length);
  }
  return remaining.length === 0;
}

function doesNotRepeat(input) {
  if (input.length === 1) {
    return true;
  }
  let remaining = input;
  let substr = `${remaining[0]}`;
  remaining = remaining.slice(1);
  if (repeatToEnd(substr, remaining)) {
    return false;
  }
  if (input.length === 2) {
    return true;
  }
  while (remaining.length > 0 && substr.length <= remaining.length) {
    substr = `${substr}${remaining[0]}`;
    remaining = remaining.substr(1, remaining.length);
    if (repeatToEnd(substr, remaining)) {
      return false;
    }
  }
  return true;
}

function checkRange(start, end, func) {
  let result = [];
  for (let i = start; i <= end; i++) {
    if (!func(i.toString())) {
      result.push(i);
    }
  }
  return result;
}

function findDoubles() {
  let result = [];
  for (let line of input) {
    let range = line.split("-").map((x) => parseInt(x));
    result = [...result, ...checkRange(range[0], range[1], isNotMirror)];
  }
  return result;
}

function findRepeats() {
  let result = [];
  for (let line of input) {
    let range = line.split("-").map((x) => parseInt(x));
    result = [...result, ...checkRange(range[0], range[1], doesNotRepeat)];
  }
  return result;
}

function sumArray(func) {
  return func().reduce((a, c) => a + c, 0);
}

console.log(sumArray(findDoubles));

console.log(sumArray(findRepeats));
