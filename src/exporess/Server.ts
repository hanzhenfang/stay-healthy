import express from "express";

const app = express();

const userInfo = [{ name: "韩振方", age: 18 }];

app.get("/test", (request, response) => {
  response.send("");
});

app.listen(3000);
