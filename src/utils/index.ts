export async function sleep(delay: number) {
  return new Promise((res) => {
    setTimeout(() => {
      console.log("结束");
      res(true);
    }, delay);
  });
}
