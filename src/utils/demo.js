const todo = false;

try {
  const flag = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

  todo = await flag;
} catch (err) {
  console.log("err", err);
}
