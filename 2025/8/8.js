import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

function calculateDistance(x1, y1, z1, x2, y2, z2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

let distanceMap = new Map();

(function buildDistanceMap() {
  for (let line of input) {
    const distances = [];
    let point1 = line.split(",").map((x) => parseInt(x, 10));
    for (let line2 of input) {
      if (line === line2) {
        continue;
      }
      let point2 = line2.split(",").map((x) => parseInt(x, 10));
      distances.push({
        point: line2,
        distance: calculateDistance(
          point1[0],
          point1[1],
          point1[2],
          point2[0],
          point2[1],
          point2[2]
        ),
      });
    }
    distances.sort((a, b) => a.distance - b.distance);
    distanceMap.set(line, distances);
  }
})();

function buildCircuits(max) {
  let distanceMapClone = structuredClone(distanceMap);
  let circuits = [];
  let count = 0;
  let p1 = null;
  let p2 = null;
  while (max ? count < max : count < input.length || circuits.length !== 1) {
    let smallest = Number.MAX_SAFE_INTEGER;
    p1 = null;
    p2 = null;

    for (let point of input) {
      let neighbor = distanceMapClone.get(point)[0];
      if (neighbor.distance < smallest) {
        p1 = point;
        smallest = neighbor.distance;
        p2 = neighbor.point;
      }
    }

    let remainder = distanceMapClone.get(p1);
    remainder.shift();
    distanceMapClone.set(p1, remainder);
    let neighbor = distanceMapClone.get(p2);
    let neighborRemainder = neighbor.filter((x) => x.point !== p1);
    distanceMapClone.set(p2, neighborRemainder);

    let c1 = null;
    let c2 = null;
    for (let circuit of circuits) {
      if (circuit.includes(p1)) {
        c1 = circuit;
      }
      if (circuit.includes(p2)) {
        c2 = circuit;
      }
    }

    if (!c1 && !c2) {
      circuits.push([p1, p2]);
    } else if (c1 && !c2) {
      c1.push(p2);
    } else if (!c1 && c2) {
      c2.push(p1);
    } else if (c1 !== c2) {
      circuits = circuits.filter((x) => x !== c1 && x !== c2);
      circuits.push([...c1, ...c2]);
    }

    count++;
  }
  return max ? circuits : [p1, p2];
}

function multiplyCircuits(count, max) {
  let circuits = buildCircuits(max).sort((a, b) => b.length - a.length);
  let sum = circuits.shift().length;
  count--;
  while (count > 0) {
    sum = sum * circuits.shift().length;
    count--;
  }
  return sum;
}

function multiplyLastTwoX() {
  let points = buildCircuits();
  let p1 = parseInt(points[0].split(",")[0]);
  let p2 = parseInt(points[1].split(",")[0]);
  return p1 * p2;
}

console.log(multiplyCircuits(3, 1000));

console.log(multiplyLastTwoX());
