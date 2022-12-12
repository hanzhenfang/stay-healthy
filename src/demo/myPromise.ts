function addUserAge(age: number, callBackFn: Function) {
  setTimeout(() => {
    const result = age + 1;
    callBackFn(result);
  }, 1000);
}

const result = addUserAge(1, (result: number) => {
  console.log("result", result);
});

export {};
