const person = { name: "韩", age: 19 };
export function getValue<T extends object, K extends keyof T>(
  person: T,
  key: K
) {
  return person[key];
}

const name = getValue(person, "age");
console.log("name", name);
