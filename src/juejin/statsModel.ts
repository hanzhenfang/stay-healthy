class EventEmiter {
  handler: Record<string, Array<Function>>;
  constructor() {
    this.handler = {};
  }

  emit(event: string, ...args: any) {
    if (this.handler[event]) {
      this.handler[event].forEach((cb) => {
        cb(...args);
      });
    }
  }

  on(event: string, cb: Function) {
    if (!this.handler[event]) {
      this.handler[event] = [];
    }
    this.handler[event].push(cb);
  }
}

const emiter = new EventEmiter();

function IteratorGenerator(obj: {} = this) {
  const keys = Object.keys(obj);
  if (!keys.length) return;
  let cur = 0,
    len = keys.length;
  return {
    next() {
      let done = cur >= len;
      return {
        value: !done ? obj[keys[cur++]] : undefined,
        done
      };
    }
  };
}

Object.prototype[Symbol.iterator] = IteratorGenerator;

const obj = { name: "韩振方", age: 10 };

const i = obj[Symbol.iterator]();
const k = i.next();
const y = i.next();
const z = i.next();
console.log("k", k);
console.log("y", y);
console.log("z", z);

const [a, b] = { a: 10, b: 11 };
console.log("a", a);
console.log("b", b);
