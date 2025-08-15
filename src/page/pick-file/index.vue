<script lang="ts" setup>
function request({ url, method = "post", data, headers = {}, requestList }) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send(data);
    xhr.onload = (e) => {
      resolve({
        data: e.target.response
      });
    };
  });
}

function hdlChange(e: Event) {
  const el = e.target as HTMLInputElement;
  console.log("e", e.target.files);
}

function createChunk(file: File, size = 10 * 1024 * 1024) {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({
      file: file.slice(cur, cur + size)
    });
    cur += size;
  }
  return fileChunkList;
}
</script>
<template>
  <div class="w-100vw h-100vh bg-blue">
    <input type="file" @change="hdlChange" />
  </div>
</template>
