function sum(...arg) {
  let result = 0;
  result += arg.reduce((pre, curr) => pre + curr);
  function add(...arg) {
    result += arg.reduce((pre, curr) => pre + curr);
    return add;
  }
  add.valueOf = () => result;
  return add;
}

const data = [
  {
    name: "han",
    age: 18,
    children: [
      {
        name: "hansong",
        age: 11,
      },
    ],
  },

  {
    name: "han",
    age: 12,
    children: [
      {
        name: "hansong",
        age: 8,
      },
    ],
  },
];

function find(data, age) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].age === age) return data[i].name;
    if (data[i].children) {
      const result = find(data[i].children, age);
      if (result !== "没找到") return result;
    }
  }
  return "没找到";
}

// const result = find(data, 8);

const data2 = [
  {
    name: "han",
    age: 18,
    children: [
      {
        name: "hansong",
        age: 11,
      },
    ],
  },

  {
    name: "han",
    age: 12,
    children: [
      {
        name: "hansong",
        age: 8,
      },
    ],
  },
];

function sum(...arg) {
  let result;
  result = arg.reduce((pre, curr) => pre + curr);
  function add(...arg) {
    result += arg.reduce((pre, curr) => pre + curr);
  }
  add.valueOf = () => result;
  return add;
}
