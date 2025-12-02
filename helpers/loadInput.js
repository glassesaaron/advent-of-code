import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export function loadInput(filePath, splitChar) {
  const __filename = fileURLToPath(filePath);
  const __dirname = dirname(__filename);

  return fs
    .readFileSync(path.resolve(__dirname, "input.txt"))
    .toString()
    .split(splitChar ? splitChar : "\n");
}
