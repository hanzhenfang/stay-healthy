<template>
  <div class="editor-page">
    <!-- 顶部导航栏 -->
    <a-layout-header class="header">
      <div class="w-full min-h-180px flex flex-col justify-between px-10px">
        <div class="flex grow w-full items-center">
          <!-- 文章标题 -->
          <div class="flex w-full justify-between">
            <a-input
              v-model:value="articleTitle"
              :bordered="false"
              class="text-center w-700px text-30px font-500"
              placeholder="请输入文章标题"
              @focus="titleFocused = true"
              @blur="handleTitleBlur"
              :class="{ 'title-focused': titleFocused }" />
            <div class="flex grow items-center gap-4px">
              <!-- 新增文章描述区域 -->
              <!-- 新增可折叠的文章描述区域 -->

              <!-- 文章标签 -->
              <div class="ml-auto">
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

              <a-collapse
                v-model:activeKey="activeKey"
                :bordered="false"
                class="description-collapse">
                <a-collapse-panel key="1">
                  <template #header>
                    <span class="text-gray-500 text-14px text-center">
                      <template v-if="!articleDescription">
                        <plus-outlined />
                        添加文章描述
                      </template>
                      <template v-else>
                        文章描述 ({{ articleDescription.length }}/200字)
                      </template>
                    </span>
                  </template>
                  <a-textarea
                    v-model:value="articleDescription"
                    placeholder="请输入文章描述（建议100字以内）..."
                    :auto-size="{ minRows: 2, maxRows: 3 }"
                    :maxLength="200"
                    class="article-description" />
                </a-collapse-panel>
              </a-collapse>
            </div>

            <a-space class="relative flex items-center">
              <!-- <span class="save-status absolute right-100px bottom--10px">
                {{ saveStatus }}
              </span> -->
              <a-button type="primary" @click="publishArticle">
                发布文章
              </a-button>
            </a-space>
          </div>
        </div>

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
      <p>标签：{{ tags.length ? tags.join(", ") : "无" }}</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onBeforeUnmount, nextTick } from "vue";
import { message } from "ant-design-vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons-vue";

// 编辑器实例
const editorRef = shallowRef();
// 添加文章描述相关的响应式变量
const articleDescription = ref("");
const activeKey = ref<string[]>([]);

// 文章内容和标题
const articleTitle = ref("");
const editorContent = ref("<p>开始编写你的文章...</p>");
const titleFocused = ref(false);

// 标签相关
const tags = ref<string[]>([]);
const inputVisible = ref(false);
const inputValue = ref("");
const inputRef = ref();

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
  box-shadow: rgba(100, 100, 100, 0.15) 0px 2px 3px 0px;
}

.header-left {
  width: 200px;
}

.header-center {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 8px;
}

.header-right {
  width: 200px;
  text-align: right;
}

.back-button {
  width: 40px;
  height: 40px;
}

.title-focused {
  background: #f1f3f4;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.add-tag-button {
  background: transparent;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  height: 23px;
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

.save-status {
  color: #8c8c8c;
  font-size: 14px;
}

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
  padding: 16px 2px;
}

.editor {
  height: 100%;
  padding: 20px;
}

/* 折叠面板样式 */
.description-collapse {
  width: 400px;
  background: transparent;
  display: flex;
  justify-content: center;
}

.description-collapse :deep(.ant-collapse-header) {
  padding: 4px 8px !important;
  color: #666 !important;
}

.description-collapse :deep(.ant-collapse-content-box) {
  padding: 8px 0 !important;
}

.description-collapse :deep(.ant-collapse-item) {
  border-bottom: none !important;
  width: 100%;
}

/* 文章描述输入框样式 */
.article-description {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
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

:deep(.w-e-toolbar) {
  border: none !important;
}

:deep(.w-e-text-container) {
  border: none !important;
}
</style>
