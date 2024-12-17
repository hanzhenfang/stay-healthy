<script setup lang="ts">
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      console.log("target", target);
      console.log("key", key);
      console.log("target[key]", target[key]);
      console.log("receiver", receiver);
      return target[key];
    }
  });
}

function ref(target) {
  let _value;

  _value = reactive(target);

  const obj = {
    get value() {
      return _value;
    },
    set value(value) {}
  };
  return obj;
}

const arr = ref([1, 2, 3]);
window.arr = arr;
console.log("arr", arr.value);
</script>
<template>
  <div class="w-full h-full bg-blue">
    <span class="w-20px text-black">
      <!-- {{ arr }} -->
    </span>
  </div>
</template>
