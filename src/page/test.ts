import { ref } from "vue";

function useTimeoutPoll<T = any>(fn: () => Promise<T>, delay = 1000) {
  const data = ref<T>();
  const isActive = ref<boolean>(false);

  function sleep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, delay);
    });
  }

  async function pollFn() {
    if (!isActive.value) return;
    data.value = await fn();
    console.log("data.value", data.value);
    await sleep();
    pollFn();
  }

  async function resume() {
    if (isActive.value) return;
    isActive.value = true;
    pollFn();
  }

  function pause() {
    if (!isActive.value) return;
    isActive.value = false;
  }

  return {
    data,
    resume,
    pause
  };
}

export { useTimeoutPoll };
