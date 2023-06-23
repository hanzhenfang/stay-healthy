export {};
import path from "node:path";
import fs from "node:fs/promises";
//tips: 做一些复制操作,把桌面上的图片复制到当前目录下
//1.我要读取那个文件,首先获取图片的路径

const picturePath = path.resolve("/Users/ffffang/Desktop/WechatIMG182.jpeg");
async function getRootFilesList() {
  const picBuffer = await fs.readFile(picturePath);
  await fs.appendFile(path.resolve(__dirname, "AA.jpg"), picBuffer);
  console.log("picBuffer", picBuffer);
}

getRootFilesList();

const datax1 = [
  {
    data: [
      { time: "2023-01-01", value: "510" },
      { time: "2023-01-02", value: "450" },
      { time: "2023-01-03", value: "459" },
      { time: "2023-01-04", value: "350" },
    ],
    name: "万全一站",
  },
  {
    data: [
      { time: "2023-01-01", value: "530" },
      { time: "2023-01-02", value: "450" },
      { time: "2023-01-03", value: "459" },
      { time: "2023-01-04", value: "350" },
    ],
    name: "怀来二站",
  },
  {
    data: [
      { time: "2023-01-01", value: "510" },
      { time: "2023-01-02", value: "450" },
      { time: "2023-01-03", value: "459" },
      { time: "2023-01-04", value: "350" },
    ],
    name: "张北三站",
  },
  {
    data: [
      { time: "2023-01-01", value: "510" },
      { time: "2023-01-02", value: "450" },
      { time: "2023-01-03", value: "459" },
      { time: "2023-01-04", value: "350" },
    ],
    name: "市区一站",
  },
];

function modifyData(initData: any[]) {
  let result: any[] = [];
  initData.forEach((item) => {
    let valueArr: any[] = [];
    item.data.forEach((value: any) => {
      valueArr.push(value.value);
    });
    result.push({ name: item.name, value: valueArr });
  });
  console.log("result", result);
  return result;
}

modifyData(datax1);
