<script lang="ts" setup>
const obj = {
  from: 0,
  to: 5,
  [Symbol.asyncIterator]: function () {
    let current = this.from;
    const last = this.to;
    return {
      async next() {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve("");
          }, 1000);
        });
        return {
          done: current > last ? true : false,
          value: current++
        };
      }
    };
  }
};

// 生成器
function* generateSequence() {
  yield 1;
}

const generator = generateSequence();

console.log("generator", generator);
</script>

<template>
  <div class="w-full h-full bg-blue">
    <div class="flex flex-col bg-red">
      <div class="inline-block">韩</div>
    </div>
  </div>
</template>
