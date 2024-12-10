const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

let isFile = true;
let id = 0;
let bigChunks = [];
let line = [];
let largestChunk = 0;
for (let char of input[0]) {
  let val = parseInt(char, 10);
  largestChunk = Math.max(largestChunk, val);
  if (val > 0) {
    if (isFile) {
      for (let i = 0; i < val; i++) {
        line.push(id);
      }
      bigChunks.push(new Array(val).fill(id).join(""));
      id++;
    } else {
      for (let i = 0; i < val; i++) {
        line.push(".");
      }
      bigChunks.push(".".repeat(val));
    }
  }
  isFile = !isFile;
}

function removeSpace() {
  const chunks = [...line];
  let start = 0;
  let end = chunks.length - 1;
  while (end > start) {
    if (chunks[start] !== ".") {
      start++;
      continue;
    }
    if (chunks[end] !== ".") {
      chunks[start] = chunks[end];
      chunks[end] = ".";
    }
    end--;
  }
  return chunks;
}

function buildSpaces(chunks, end) {
  let spaces = new Map();
  for (let i = 0; i < end; i++) {
    if (chunks[i][0] === ".") {
      if (!spaces.has(chunks[i].length)) {
        spaces.set(chunks[i].length, []);
      }
      let space = spaces.get(chunks[i].length);
      space.push(i);
      spaces.set(chunks[i].length, space);
    }
  }
  return spaces;
}

function removeSpaceGroups() {
  let chunks = [...bigChunks];
  let end = chunks.length - 1;
  let moved = new Set();

  while (end > 0) {
    if (chunks[end][0] !== ".") {
      let chunk = chunks[end];

      if (moved.has(chunk)) {
        end--;
        continue;
      }

      let spaces = buildSpaces(chunks, end);
      let hasSpace = Number.MAX_SAFE_INTEGER;
      let chunkLength = chunk.length;
      while (chunkLength < largestChunk) {
        if (spaces.has(chunkLength) && spaces.get(chunkLength)[0] < hasSpace) {
          hasSpace = spaces.get(chunkLength)[0];
        }
        chunkLength++;
      }

      if (hasSpace !== Number.MAX_SAFE_INTEGER) {
        let start = hasSpace;
        let startLength = chunks[start].length;
        chunks[start] = chunks[end];
        chunks[end] = ".".repeat(chunks[end].length);
        if (chunks[start].length < startLength) {
          chunks = [
            ...chunks.slice(0, start),
            chunks[start],
            ".".repeat(startLength - chunks[start].length),
            ...chunks.slice(start + 1, chunks.length),
          ];
          end += startLength - chunks[start].length;
        }
      }
      moved.add(chunk);
    }
    end--;
  }
  return chunks;
}

function checksum(line) {
  let sum = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === ".") {
      continue;
    }
    sum += line[i] * i;
  }
  return sum;
}

console.log(checksum(removeSpace()));
console.log(checksum(removeSpaceGroups().join("")));
