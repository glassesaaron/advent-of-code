import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

const freshIngredients = [];
const ingredients = [];

(function buildIngredients() {
  let firstDone = false;
  for (let line of input) {
    if (!firstDone) {
      if (line === "") {
        firstDone = true;
      } else {
        const range = line.split("-").map((x) => parseFloat(x, 10));
        freshIngredients.push([range[0], range[1]]);
      }
    } else {
      ingredients.push(parseFloat(line, 10));
    }
  }
})();

function findFresh() {
  let count = 0;
  let used = new Set();
  for (let ingredient of ingredients) {
    for (let i = 0; i < freshIngredients.length; i++) {
      const freshIngredient = freshIngredients[i];
      if (used.has(ingredient, i)) {
        continue;
      }
      if (
        ingredient >= freshIngredient[0] &&
        ingredient <= freshIngredient[1]
      ) {
        used.add(ingredient, i);
        count++;
      }
    }
  }
  return count;
}

function findAll() {
  let ranges = structuredClone(freshIngredients).sort((a, b) => a[0] - b[0]);
  let done = false;
  while (!done) {
    let start = ranges.length;
    for (let i = 0; i < ranges.length - 1; i++) {
      let range1 = ranges[i];
      let range2 = ranges[i + 1];
      if (range1[1] >= range2[0]) {
        ranges[i] = [
          Math.min(range1[0], range2[0]),
          Math.max(range1[1], range2[1]),
        ];
        ranges.splice(i + 1, 1);
        break;
      }
    }
    done = start === ranges.length;
  }
  return ranges.reduce((a, c) => a + (c[1] - c[0] + 1), 0);
}

console.log(findFresh());

console.log(findAll());
