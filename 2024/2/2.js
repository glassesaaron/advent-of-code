const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

let reports = [];
for (let line of input) {
  reports.push(line.split(" ").map((x) => parseInt(x, 10)));
}

function isSafe(report, min, max) {
  let safe = true;
  for (let i = 1; i < report.length; i++) {
    if (i > 1) {
      if (
        !(
          (report[i] > report[i - 1] && report[i - 1] > report[i - 2]) ||
          (report[i] < report[i - 1] && report[i - 1] < report[i - 2])
        )
      ) {
        safe = false;
        break;
      }
    }
    let diff = Math.abs(report[i] - report[i - 1]);
    if (diff < min || diff > max) {
      safe = false;
      break;
    }
  }
  return safe;
}

function countSafe(min, max) {
  let count = 0;
  for (let report of reports) {
    if (isSafe(report, min, max)) {
      count++;
    }
  }
  return count;
}

// first attempt, brute force
function makeSafe(min, max) {
  let count = 0;
  for (let report of reports) {
    for (let i = 0; i < report.length; i++) {
      if (
        isSafe(
          [...report.slice(0, i), ...report.slice(i + 1, report.length)],
          min,
          max
        )
      ) {
        count++;
        break;
      }
    }
  }
  return count;
}

console.log(countSafe(1, 3));
console.log(makeSafe(1, 3));
