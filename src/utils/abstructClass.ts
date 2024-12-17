abstract class Person {
  name: string = "韩振方";
  age: number;
}

type K = typeof Person;

class PPP extends Person {
  protected value: number;
  name: string;
  constructor() {
    super();
  }

  say() {
    console.log("名字", this.name);
  }
}

class YY extends PPP {
  constructor() {
    super();
  }
}

const a = new PPP();
const b = new YY();

interface Han {
  name: string;
  age: number;
  say: () => void;
}

class CC implements Han {
  name: string;
  age: number;
  say: () => void;
  constructor() {}
}

// const p = new PPP("喊");
// p.say();

export {};
