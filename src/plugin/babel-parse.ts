import parse from "@babel/parser";

const code = "let b = a +b*2";

const ast = parse.parse(code, {
  sourceType: "module"
});

console.log("ast", JSON.stringify(ast));
