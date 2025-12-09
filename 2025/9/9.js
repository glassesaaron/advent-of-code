import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

let points = input.map((x) => x.split(",").map((x) => parseInt(x, 10)));

let redPoints = new Set();
let greenPoints = new Set();
let rows = new Map();
let maxX = -1;
let maxY = -1;

(function buildPoints() {
  for (let i = 0; i < points.length; i++) {
    redPoints.add(points[i][0] + "," + points[i][1]);
    maxX = Math.max(maxX, points[i][0]);
    maxY = Math.max(maxY, points[i][1]);
    let p1 = points[i];
    let p2 = i + 1 === points.length ? points[0] : points[i + 1];
    if (p1[0] === p2[0]) {
      let y1 = Math.min(p1[1], p2[1]);
      let y2 = Math.max(p1[1], p2[1]);
      for (let y = y1 + 1; y < y2; y++) {
        greenPoints.add(p1[0] + "," + y);
      }
    } else {
      let x1 = Math.min(p1[0], p2[0]);
      let x2 = Math.max(p1[0], p2[0]);
      for (let x = x1 + 1; x < x2; x++) {
        greenPoints.add(x + "," + p1[1]);
      }
    }
  }
  for (let point of new Set([...redPoints, ...greenPoints])) {
    let x = point.split(",")[0];
    let y = point.split(",")[1];
    if (!rows.has(y)) {
      rows.set(y, { min: Number.MAX_SAFE_INTEGER, max: -1 });
    }
    let prev = rows.get(y);
    let newMin = Math.min(prev.min, x);
    let newMax = Math.max(prev.max, x);
    rows.set(y, { min: newMin, max: newMax });
  }
})();

function rectangleSize(p1, p2) {
  return (Math.abs(p1[0] - p2[0]) + 1) * (Math.abs(p1[1] - p2[1]) + 1);
}

function largestRectangle() {
  let largest = -1;
  for (let p1 of points) {
    for (let p2 of points) {
      largest = Math.max(largest, rectangleSize(p1, p2));
    }
  }
  return largest;
}

function drawMap() {
  for (let y = 0; y <= maxY; y++) {
    let line = "";
    for (let x = 0; x <= maxX; x++) {
      if (greenPoints.has(x + "," + y)) {
        line += "X";
      } else if (redPoints.has(x + "," + y)) {
        line += "#";
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
}
//drawMap();

function isValid(x1, x2, y1, y2) {
  let smallX = Math.min(x1, x2);
  let bigX = Math.max(x1, x2);
  let smallY = Math.min(y1, y2);
  let bigY = Math.max(y1, y2);
  for (let y = smallY; y < bigY; y++) {
    if (
      !rows.has(y.toString()) ||
      smallX < rows.get(y.toString()).min ||
      bigX > rows.get(y.toString()).max
    ) {
      return false;
    }
  }
  return true;
}

function largestGreenRectangle() {
  let largest = -1;
  for (let i = 0; i < points.length; i++) {
    // progress
    // console.log(i + "/" + points.length);
    let p1 = points[i];
    for (let j = i; j < points.length; j++) {
      let p2 = points[j];
      const size = rectangleSize(p1, p2);
      if (size <= largest) {
        continue;
      }
      if (isValid(p1[0], p2[0], p1[1], p2[1])) {
        largest = Math.max(largest, size);
      }
    }
  }
  return largest;
}

console.log(largestRectangle());

console.log(largestGreenRectangle());
