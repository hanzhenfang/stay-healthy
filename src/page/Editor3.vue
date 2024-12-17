<template>
  <div class="editor-page">
    <a-layout-header class="header">
      <div
        class="w-full flex flex-col justify-between px-10px"
        :class="{ 'h-150px': !isExpanded, 'h-320px': isExpanded }">
        <!-- 标题和展开按钮区域 -->
        <div class="flex flex-col items-center w-full relative">
          <!-- 标题输入框 -->
          <div class="w-full flex justify-center relative">
            <a-input
              v-model:value="articleTitle"
              :bordered="false"
              class="w-400px text-30px font-500"
              placeholder="请输入文章标题"
              @focus="titleFocused = true"
              @blur="handleTitleBlur"
              :class="{ 'title-focused': titleFocused }" />
            <!-- 展开按钮 -->
            <div
              class="absolute right-0 top-1/2 transform -translate-y-1/2 flex">
              <a-button type="primary" @click="publishArticle">
                发布文章
              </a-button>
            </div>

            <a-space class="absolute right-400px top-10px flex items-center">
              <a-button
                type="text"
                @click="toggleExpand"
                class="flex items-center">
                <template v-if="!isExpanded">
                  <!-- <down-outlined class="mr-1" /> -->
                  <div class="rotate-270deg">
                    <doubleLeft-outlined />
                  </div>
                </template>
                <template v-else>
                  <div class="rotate-90deg">
                    <doubleLeft-outlined />
                  </div>
                </template>
              </a-button>
              <!-- <span class="save-status absolute right-100px bottom--10px">
                {{ saveStatus }}
              </span> -->
            </a-space>
          </div>

          <!-- 展开的标签和描述区域 -->
          <div
            v-show="isExpanded"
            class="w-full flex flex-col items-center gap-12px mt-16px">
            <!-- 标签输入区域 -->
            <div class="flex items-center gap-8px justify-center">
              <div class="flex items-center gap-4px flex-wrap">
                <a-tag
                  v-for="(tag, index) in tags"
                  :key="index"
                  :closable="true"
                  @close="handleTagClose(index)">
                  {{ tag }}
                </a-tag>

                <a-input
                  v-if="inputVisible"
                  ref="inputRef"
                  v-model:value="inputValue"
                  type="text"
                  size="small"
                  class="tag-input"
                  :style="{ width: '78px' }"
                  @blur="handleInputConfirm"
                  @keyup.enter="handleInputConfirm" />
                <a-tag v-else class="add-tag-button" @click="showInput">
                  <plus-outlined />
                  添加标签
                </a-tag>
              </div>
            </div>

            <!-- 描述输入区域 -->
            <div class="flex items-start gap-8px">
              <a-textarea
                v-model:value="articleDescription"
                placeholder="输入文章描述（建议100字以内）..."
                :auto-size="{ minRows: 5, maxRows: 9 }"
                :maxLength="200"
                class="article-description" />
            </div>
          </div>
        </div>

        <!-- 工具栏 -->
        <div class="w-full">
          <Toolbar
            class="toolbar"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode" />
        </div>
      </div>
    </a-layout-header>

    <!-- 编辑器区域 -->
    <div class="editor-wrapper">
      <div class="editor-container">
        <Editor
          class="editor"
          v-model="editorContent"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange="handleChange" />
      </div>
    </div>

    <!-- 发布确认对话框 -->
    <a-modal
      v-model:open="publishModalVisible"
      title="发布文章"
      @ok="handlePublishConfirm"
      okText="确认发布"
      cancelText="取消">
      <p>确认要发布这篇文章吗？</p>
      <p>标题：{{ articleTitle || "未命名文章" }}</p>
      <p>描述：{{ articleDescription || "无" }}</p>
      <p>标签：{{ tags.length ? tags.join(", ") : "无" }}</p>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { ref, shallowRef, onBeforeUnmount, nextTick } from "vue";
import { message } from "ant-design-vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import {
  PlusOutlined,
  TagOutlined,
  FileTextOutlined,
  DoubleLeftOutlined
} from "@ant-design/icons-vue";

import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

// 添加展开控制变量
const isExpanded = ref(false);

// 添加展开切换方法
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
// 编辑器实例
const editorRef = shallowRef();

// 文章内容和标题
const articleTitle = ref("");
const articleDescription = ref("");
const editorContent = ref("<p>开始编写你的文章...</p>");
const titleFocused = ref(false);

// 标签相关
const tags = ref<string[]>([]);
const inputVisible = ref(false);
const inputValue = ref("");
const inputRef = ref();

// 显示控制
const showTags = ref(false);
const showDescription = ref(false);

// 保存状态
const saveStatus = ref("文章未保存");
const lastSaveTime = ref(new Date());

// 发布对话框
const publishModalVisible = ref(false);

// 编辑器配置
const mode = ref("default");
const toolbarConfig = {
  excludeKeys: [
    "group-video",
    "group-image",
    "insertLink",
    "insertTable",
    "fullScreen",
    "divider",
    "codeBlock",
    "group-more-style"
  ]
};

const editorConfig = {
  placeholder: "开始编写你的文章...",
  autoFocus: false,
  MENU_CONF: {}
};

// 切换标签显示
const toggleTags = () => {
  showTags.value = !showTags.value;
  if (showTags.value) {
    showDescription.value = false;
  }
  if (!showTags.value) {
    inputVisible.value = false;
  }
};

// 切换描述显示
const toggleDescription = () => {
  showDescription.value = !showDescription.value;
  if (showDescription.value) {
    showTags.value = false;
  }
};

// 编辑器事件处理
const handleCreated = (editor: any) => {
  editorRef.value = editor;
  console.log("editorRef.value", editorRef.value);
  const result = editorRef.value.getAllMenuKeys();
  console.log("result", result);
};

// 内容变化处理
const handleChange = () => {
  saveStatus.value = "正在保存...";
  // 这里可以添加自动保存逻辑
  setTimeout(() => {
    saveStatus.value = "已保存 " + new Date().toLocaleTimeString();
    lastSaveTime.value = new Date();
  }, 1000);
};

// 标题失焦处理
const handleTitleBlur = () => {
  titleFocused.value = false;
  if (!articleTitle.value.trim()) {
    articleTitle.value = "未命名文章";
  }
};

// 标签相关方法
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value && !tags.value.includes(inputValue.value)) {
    if (tags.value.length >= 5) {
      message.warning("最多添加5个标签");
      return;
    }
    tags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const handleTagClose = (index: number) => {
  tags.value.splice(index, 1);
};

// 发布相关方法
const publishArticle = () => {
  if (!articleTitle.value.trim()) {
    message.warning("请先输入文章标题");
    return;
  }
  if (editorContent.value === "<p>开始编写你的文章...</p>") {
    message.warning("请先编写文章内容");
    return;
  }
  publishModalVisible.value = true;
};

const handlePublishConfirm = () => {
  // 这里添加发布逻辑
  message.success("文章发布成功！");
  publishModalVisible.value = false;
};

// 组件销毁时清理编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>
<style scoped>
.editor-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

.header {
  background: white;
  padding: 0;
  line-height: normal;
  height: auto !important; /* 覆盖 ant-design-vue 默认样式 */
  box-shadow: rgba(100, 100, 100, 0.15) 0px 2px 3px 0px;
}

.title-focused {
  background: #f1f3f4;
  border-radius: 4px;
}

/* 标签相关样式 */
.add-tag-button {
  background: transparent;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  height: 23px;
  transition: all 0.3s;
}

.add-tag-button:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.tag-input {
  width: 78px;
  margin-right: 8px;
  vertical-align: top;
}

/* 描述输入框样式 */
.article-description {
  width: 800px;
  height: 1000px;
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 12px;
  resize: none;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.article-description:hover {
  background-color: #f1f3f4;
}

.article-description:focus {
  background-color: #ffffff;
  border-color: #e8e8e8;
}

/* 保存状态样式 */
.save-status {
  color: #8c8c8c;
  font-size: 14px;
}

/* 编辑器相关样式 */
.editor-wrapper {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.editor-container {
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.toolbar {
  width: 100%;
  border-top: 1px solid #e8e8e8;
  background-color: white;
  padding: 8px 2px;
}

.editor {
  height: 100%;
  padding: 20px;
}

/* 自定义过渡效果 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* 主题色相关 */
.text-primary {
  color: #1890ff;
}

.hover\:text-primary:hover {
  color: #1890ff;
}

/* 编辑器覆盖样式 */
:deep(.w-e-toolbar) {
  border: none !important;
}

:deep(.w-e-text-container) {
  border: none !important;
}

/* 响应式布局相关 */
@media (max-width: 768px) {
  .article-description {
    width: 100%;
  }

  .editor-container {
    margin: 0;
    border-radius: 0;
  }
}

/* Ant Design Vue 组件样式覆盖 */
:deep(.ant-tag) {
  margin: 2px;
}

:deep(.ant-input-borderless) {
  background-color: transparent;
}

:deep(.ant-input-borderless:hover) {
  background-color: #f1f3f4;
}

/* 修改文章描述输入框宽度 */
.article-description {
  width: 800px;
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  resize: none;
  border: 1px solid transparent;
  transition: all 0.3s;
}

/* 确保标题居中 */
:deep(.ant-input) {
  text-align: center;
}

/* 展开/收起按钮样式 */
.ant-btn-text {
  color: #666;
  transition: all 0.3s;
}

.ant-btn-text:hover {
  color: #1890ff;
  background: transparent;
}

/* 确保展开区域的过渡动画流畅 */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
