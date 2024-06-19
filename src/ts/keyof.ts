import { type } from "node:os";

const person = { name: "韩", age: 19 };
export function getValue<T extends object, K extends keyof T>(
  person: T,
  key: K
) {
  return person[key];
}

const name = getValue(person, "age");
console.log("name", name);

type Getdata = {
  (parms: string): string;
  (parms: number): number;
};

const getData: Getdata = (parms) => {
  return parms;
};

const a = getData("1");
const b = getData(1);
