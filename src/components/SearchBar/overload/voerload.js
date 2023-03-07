function test(a = 1) {
  console.log(a);
  function a() {}
  console.log(a);
}
test();
