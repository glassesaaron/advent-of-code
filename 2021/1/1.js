import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url).map((x) => parseInt(x));

const calculateIncreased = function (windowSize) {
  let increased = 0;
  for (let i = windowSize; i < input.length; i++) {
    if (input[i] > input[i - windowSize]) {
      increased++;
    }
  }
  return increased;
};

console.log(calculateIncreased(1));

console.log(calculateIncreased(3));
