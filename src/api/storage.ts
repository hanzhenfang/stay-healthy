export class GlobalStorage {
  static instance: GlobalStorage;
  static getInstance() {
    if (!GlobalStorage.instance) {
      GlobalStorage.instance = new GlobalStorage();
    }
    return GlobalStorage.instance;
  }
  getItem(key: string) {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }
}

const obj = {
  name: "韩振方",
  age: 18,
  class: {
    className: "终极一班"
  }
};
const arr = [1, 2, 3];
console.log("obj", obj);

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function deepClone(obj: any) {
  if (obj === null && !obj) return obj;

  const isArray = Array.isArray(obj);
  const cloned = isArray ? [] : {};

  for (let key in obj) {
    if (Object.hasOwn(obj, key)) {
      const isObj = isObject(obj[key]);
      if (isObj) {
        cloned[key] = deepClone(obj[key]);
      } else {
        cloned[key] = obj[key];
      }
    }
  }
  return cloned;
}
const copy = deepClone(obj);
