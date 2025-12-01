import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url)
  .map((x) => x.split(" "))
  .map((x) => {
    return { direction: x[0], value: parseInt(x[1]) };
  });

const calculateDistance = function () {
  let horizontal = 0;
  let vertical = 0;
  for (let x of input) {
    switch (x.direction) {
      case "down":
        horizontal += x.value;
        break;
      case "up":
        horizontal -= x.value;
        break;
      default:
        vertical += x.value;
    }
  }
  return horizontal * vertical;
};

const calculateDistanceWithAim = function () {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  for (let x of input) {
    switch (x.direction) {
      case "down":
        aim += x.value;
        break;
      case "up":
        aim -= x.value;
        break;
      default:
        horizontal += x.value;
        depth += x.value * aim;
    }
  }
  return horizontal * depth;
};

console.log(calculateDistance());
console.log(calculateDistanceWithAim());
