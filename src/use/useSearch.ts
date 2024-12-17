import { ref, watch, onMounted, nextTick } from "vue";
import SearchBarCreator from "../components/SearchBar/SearchBar";

import { debounce } from "../utils/debounce";

export type SearchModelType = "filename" | "content";

const searchBar = new SearchBarCreator(); // 生成一个全局的搜索框，全局唯一
const searchKeyword = ref<string>(""); // 搜索的关键词
const searchModel = ref<SearchModelType>("filename"); // 搜索的模式:1.按照文件名 2.按照内容搜索
const searchHistroyLists = ref<Array<string>>([]);

//打开搜索框
function openSearchBar() {
  searchBar.present();
}
//关闭搜索框
function closeSearchBar() {
  searchBar.dismiss();
}
//清空搜索的关键词
function cleanSearchKeyword() {
  searchKeyword.value = "";
}

function hdlSearchBtn() {
  const _keyword = searchKeyword.value.trim();
  if (!_keyword) return;
  switch (searchModel.value) {
    case "filename":
      console.log("我执行了", _keyword);
      break;
    case "content":
      break;
  }
}

function getSeach() {
  console.log("我想后端发请求了");
}

watch(searchKeyword, getSeach);

export default {
  openSearchBar, //打开搜索框
  closeSearchBar, //关闭搜索框
  searchKeyword, //搜索的关键词
  searchModel, //搜索的模式:1.按文件名 2.按文件内容
  cleanSearchKeyword, //清除搜索关键字
  hdlSearchBtn, //按下搜索按钮==> 开始搜索

  //<------------------- 搜索记录相关  ------------------->
  searchHistroyLists //搜索记录数组
};
