<script lang="ts" setup>
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    if (window.isSecureContext && navigator.clipboard) {
      const clipboardAPI = navigator.clipboard; //获取 clipboard 对象
      setTimeout(() => {
        clipboardAPI.read().then((result) => {});
      }, 1000);
    } else {
      console.log("不支持 clipboard");
    }
  }
});

document.addEventListener("paste", () => {
  if (window.isSecureContext && navigator.clipboard) {
    const clipboardAPI = navigator.clipboard; //获取 clipboard 对象
    setTimeout(() => {
      clipboardAPI.read().then((result) => {
        result[0].getType("image/png").then((blob) => {
          console.log("blob", blob);
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = (e) => {
            const img = document.createElement("img");
            //@ts-ignore
            img.src = e.target?.result;
            const wrapper = document.getElementById("han");
            //@ts-ignore
            wrapper.appendChild(img);
          };
        });
      });
    }, 1000);
  } else {
    console.log("不支持 clipboard");
  }
});
</script>
<template>
  <div id="han" class="w-full h-full bg-blue">
    <textarea class="w-300px h-300px"></textarea>
  </div>
</template>
