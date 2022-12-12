export {};
import path from "node:path";
import fs from "node:fs";

fs.readFile(path.resolve(__dirname, "/test.vue"), "utf-8", (error, result) => {
  console.log("error", error);
  console.log("result", result);
});
