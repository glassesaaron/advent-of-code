import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

const lines = [];
(function buildLines() {
  let i = 0;
  for (let line of input) {
    let parts = line.split(" ");
    let indicator = parts.shift();
    indicator = indicator.slice(1, -1);
    let joltage = parts.pop();
    joltage = joltage.slice(1, -1);
    joltage = joltage.split(",").map((x) => parseInt(x, 10));
    parts = parts.map((x) =>
      x
        .slice(1, -1)
        .split(",")
        .map((x) => parseInt(x, 10))
    );
    lines.push([indicator, parts, joltage, i]);
    i++;
  }
})();

const lineCache = new Map();

function runLine(steps, state, buttonsPressed, line, previousStates) {
  if (
    lineCache.has(line[3]) &&
    lineCache.get(line[3]).has(state) &&
    lineCache.get(line[3]).get(state) <= steps
  ) {
    return;
  }
  if (previousStates.includes(state)) {
    return;
  }
  if (steps > 0) {
    if (!lineCache.has(line[3])) {
      let map = new Map();
      map.set(state, steps);
      lineCache.set(line[3], map);
    } else {
      let map = lineCache.get(line[3]);
      if (!map.has(state)) {
        map.set(state, steps);
        lineCache.set(line[3], map);
      } else {
        const tmpSteps = map.get(state);
        if (steps < tmpSteps) {
          map.set(state, steps);
          lineCache.set(line[3], map);
        }
      }
    }
  }
  for (let button of line[1]) {
    let newState = state.split("");
    for (let pos of button) {
      newState[pos] = newState[pos] === "." ? "#" : ".";
    }
    newState = newState.join("");
    let prevStates = [...previousStates];
    prevStates.push(state);
    runLine(steps + 1, newState, [...buttonsPressed, button], line, prevStates);
  }
}

function runLines() {
  for (let line of lines) {
    const initialState = line[0].split("").fill(".").join("");
    runLine(0, initialState, [], line, []);
  }
}

const voltCache = new Map();

function runLineVolt(steps, state, buttonsPressed, line) {
  for (let i = 0; i < state.length; i++) {
    if (state[i] > parseInt(line[2][i], 10)) {
      return;
    }
  }
  if (state.join(",") === line[2].join(",")) {
    if (!voltCache.has(line[3])) {
      voltCache.set(line[3], steps);
    } else {
      let min = Math.min(voltCache.get(line[3]), steps);
      voltCache.set(line[3], min);
    }
    return;
  }
  for (let button of line[1]) {
    let newState = structuredClone(state);
    let newButtonPressed = [...buttonsPressed];
    let newSteps = steps;
    let done = false;
    while (!done) {
      newSteps++;
      newButtonPressed.push(button);
      for (let pos of button) {
        newState[pos]++;
        if (newState[pos] >= line[2][pos]) {
          done = true;
        }
      }
    }
    runLineVolt(newSteps, newState, newButtonPressed, line);
  }
}

function runLineVolts() {
  for (let line of lines) {
    const initialState = new Array(line[2].length).fill(0);
    runLineVolt(0, initialState, [], line, []);
  }
}

function countPresses() {
  runLines();
  let result = 0;
  for (let line of lines) {
    result += lineCache.get(line[3]).get(line[0]);
  }
  return result;
}

function countVolts() {
  runLineVolts();
  let result = 0;
  for (let line of lines) {
    result += voltCache.get(line[3]);
  }
  return result;
}

console.log(countPresses());

console.log(countVolts());
