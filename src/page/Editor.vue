<template>
  <div class="document-editor">
    <!-- 顶部导航栏 -->
    <a-layout-header class="header">
      <div class="header-left"></div>

      <div class="header-center">
        <a-input
          v-model:value="documentTitle"
          class="doc-title"
          :bordered="false"
          @focus="titleFocused = true"
          @blur="handleTitleBlur"
          :class="{ 'title-focused': titleFocused }" />
      </div>

      <div class="header-right"></div>
    </a-layout-header>

    <!-- 编辑器容器 -->
    <div class="editor-wrapper">
      <div class="editor-container">
        <div class="editor-content">
          <Toolbar
            class="toolbar"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode" />
          <Editor
            class="editor"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
            @onChange="handleChange" />
        </div>
      </div>
    </div>

    <!-- 协作模态框 -->
    <a-modal
      v-model:visible="collaborateModalVisible"
      title="协作设置"
      @ok="handleCollaborateOk">
      <a-form :model="collaborateForm">
        <a-form-item label="邀请用户">
          <a-select
            v-model:value="collaborateForm.users"
            mode="multiple"
            placeholder="请选择协作者">
            <a-select-option value="user1">用户1</a-select-option>
            <a-select-option value="user2">用户2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="权限">
          <a-radio-group v-model:value="collaborateForm.permission">
            <a-radio value="edit">可编辑</a-radio>
            <a-radio value="comment">可评论</a-radio>
            <a-radio value="view">仅查看</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onBeforeUnmount } from "vue";
import { message } from "ant-design-vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

// 编辑器实例
const editorRef = shallowRef();

// 编辑器内容
const valueHtml = ref("<p>请输入内容</p>");

// 状态管理
const documentTitle = ref("无标题文档");
const titleFocused = ref(false);
const autoSaveText = ref("所有更改已保存");
const lastSavedTime = ref("最后保存于 " + new Date().toLocaleString());
const canUndo = ref(false);
const canRedo = ref(false);

// 模态框状态
const collaborateModalVisible = ref(false);
const shareModalVisible = ref(false);
const collaborateForm = ref({
  users: [],
  permission: "edit"
});
const shareForm = ref({
  link: "https://example.com/doc/123",
  permission: "private"
});

// 编辑器配置
const mode = ref("default");
const toolbarConfig = {
  excludeKeys: [""]
};

const editorConfig = {
  placeholder: "开始输入正文...",
  autoFocus: false
};

// 编辑器事件处理
const handleCreated = (editor) => {
  editorRef.value = editor;
  // 初始化撤销重做状态
  updateUndoRedoState();
};

const handleChange = (editor) => {
  autoSaveText.value = "正在保存...";
  updateUndoRedoState();

  // 模拟自动保存
  setTimeout(() => {
    autoSaveText.value = "所有更改已保存";
    lastSavedTime.value = "最后保存于 " + new Date().toLocaleString();
  }, 1000);
};

// 更新撤销重做状态
const updateUndoRedoState = () => {
  if (editorRef.value) {
    console.log("editorRef.value", editorRef.value);
    canUndo.value = editorRef.value.isDisabled("redo");
    canRedo.value = editorRef.value.isDisabled("undo");
  }
};

// 标题相关
const handleTitleBlur = () => {
  titleFocused.value = false;
  if (!documentTitle.value.trim()) {
    documentTitle.value = "无标题文档";
  }
  // 这里可以添加保存标题的逻辑
};

const handleCollaborateOk = () => {
  collaborateModalVisible.value = false;
  message.success("协作设置已更新");
};

const handleShareOk = () => {
  shareModalVisible.value = false;
  message.success("分享设置已更新");
};

const copyLink = () => {
  navigator.clipboard
    .writeText(shareForm.value.link)
    .then(() => message.success("链接已复制"))
    .catch(() => message.error("复制失败"));
};

// 组件销毁时清理
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 自动保存提示更新
let saveTimer = -1;
onMounted(() => {
  // 定时更新自动保存状态
  saveTimer = window.setInterval(() => {
    if (autoSaveText.value === "正在保存...") {
      autoSaveText.value = "所有更改已保存";
    }
  }, 2000);
});

onBeforeUnmount(() => {
  if (saveTimer) {
    clearInterval(saveTimer);
  }
});
</script>

<style scoped>
.document-editor {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  height: 64px;
  line-height: 64px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header-center {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-group,
.title-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-button {
  width: 40px;
  height: 40px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button:hover:not(:disabled) {
  background: #f1f3f4;
  border-radius: 50%;
}

.nav-button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.starred {
  color: #f8c131;
}

.doc-title {
  max-width: 300px;
  margin: 0 8px;
  font-size: 18px;
  height: 40px;
  border-radius: 4px;
}

.title-focused {
  background: #f1f3f4;
}

.auto-save-text {
  color: #5f6368;
  font-size: 14px;
  cursor: default;
}

.history-btn,
.collaborate-btn {
  height: 36px;
  border-radius: 18px;
}

.share-btn {
  height: 36px;
  border-radius: 18px;
  background: #c2e7ff;
  color: #001d35;
  border: none;
}

.share-btn:hover {
  background: #afd9f7 !important;
  color: #001d35 !important;
}

.user-avatar {
  cursor: pointer;
  background: #1890ff;
}

.editor-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 12px;
  overflow-y: auto;
}

.editor-container {
  width: 816px;
  margin-top: 12px;
}

.editor-content {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.toolbar {
  border-bottom: 1px solid #ccc;
  padding: 8px;
}

.editor {
  min-height: 1056px;
  padding: 72px 72px;
}

:deep(.w-e-toolbar) {
  flex-wrap: wrap;
  background: white !important;
  border: none !important;
}

:deep(.w-e-bar-item) {
  border-radius: 4px;
}

:deep(.w-e-bar-item:hover) {
  background-color: #f1f3f4 !important;
}

:deep(.w-e-text-container) {
  background: white !important;
  border: none !important;
}

/* 提示框样式 */
:deep(.ant-tooltip-inner) {
  font-size: 12px;
}

/* 下拉菜单样式 */
:deep(.ant-dropdown-menu) {
  border-radius: 8px;
}

/* 模态框样式 */
:deep(.ant-modal-content) {
  border-radius: 8px;
}

:deep(.ant-modal-header) {
  border-radius: 8px 8px 0 0;
}
</style>
