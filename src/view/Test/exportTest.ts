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
