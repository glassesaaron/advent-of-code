import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

const countInput = function () {
  let count = 0;
  let valid = [2, 3, 4, 7];
  for (let inputLine of input) {
    let parsedLine = inputLine.split("|");
    for (let x of parsedLine[1].split(" ")) {
      count += valid.includes(x.length) ? 1 : 0;
    }
  }
  return count;
};

const diff = function (a, b) {
  let count = 0;
  for (let x of a) {
    if (!b.includes(x)) {
      count++;
    }
  }
  return count;
};

const sumOutputValues = function () {
  let sum = 0;
  for (let x of input) {
    sum += lineOutputValue(x);
  }
  return sum;
};

const lineOutputValue = function (inputLine) {
  let sum = "";

  let valid = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
  };

  let digitMap = {};
  let possibleFive = [];
  let possibleSix = [];
  let inputSplit = inputLine.split("|");
  for (let x of inputSplit[0].trim().split(" ")) {
    let y = x.split("").sort().join("");
    if (valid.hasOwnProperty(y.length.toString())) {
      digitMap[y] = valid[y.length.toString()];
    } else {
      if (y.length == 5) {
        possibleFive.push(y);
      } else {
        possibleSix.push(y);
      }
    }
  }

  let four;
  for (let x of Object.keys(digitMap)) {
    if (digitMap[x] == 4) {
      four = x;
    }
  }

  let two;
  let threeFive = [];
  for (let x of possibleFive) {
    if (diff(x, four) == 3) {
      two = x;
    } else {
      threeFive.push(x);
    }
  }

  let five;
  let three;
  for (let x of threeFive) {
    let count = 0;
    for (let y of possibleSix) {
      count += diff(y, x);
    }
    if (count == 4) {
      five = x;
    } else {
      three = x;
    }
  }

  let zero;
  let sixNine = [];
  for (let x of possibleSix) {
    if (diff(x, five) == 2) {
      zero = x;
    } else {
      sixNine.push(x);
    }
  }

  let six;
  let nine;
  for (let x of sixNine) {
    if (diff(x, three) == 1) {
      nine = x;
    } else {
      six = x;
    }
  }

  digitMap[two] = 2;
  digitMap[three] = 3;
  digitMap[five] = 5;
  digitMap[zero] = 0;
  digitMap[six] = 6;
  digitMap[nine] = 9;

  for (let x of inputSplit[1].trim().split(" ")) {
    x = x.split("").sort().join("");
    sum += digitMap[x].toString();
  }

  return parseInt(sum);
};

console.log(countInput());

console.log(sumOutputValues());
