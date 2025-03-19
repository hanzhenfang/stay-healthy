function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

@classDecorator
export class Person {
  constructor(public name: string) {
    this.name = name;
  }
}

const p = new Person("喊");
console.log("p.hasDecorator", Person.hasDecorator);
