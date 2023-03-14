export {};

const todo = false;

try {
  setTimeout(() => {
    todo = true;
  }, 1000);
} catch (err) {
  console.log("err", err);
}
