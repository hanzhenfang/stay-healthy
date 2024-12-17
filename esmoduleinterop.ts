import fs from "fs";
fs.open("./", (err, fd) => {
  if (!err) return;
});
