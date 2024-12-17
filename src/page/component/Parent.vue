<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import {
  FlagOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  TableOutlined,
  PlusOutlined
} from "@ant-design/icons-vue";
import dayjs from "dayjs";

const FORMAT_RULE = "YYYY-MM-DD";
const viewMode = ref("table"); // 'table' || 'progress'
console.log("viewMode.value", viewMode);

// 里程碑状态定义
const MILESTONE_STATE = [
  { color: "#1890ff", label: "进行中", value: "open" },
  { color: "#d9d9d9", label: "已完成", value: "closed" }
];

// 弹窗控制
const actionType = ref("add"); // "add" || 'edit' || 'readonly'
const showMilestoneModal = ref(false);

// 模拟项目数据
const mockProjects = [
  {
    id: 1,
    name: "电商平台升级",
    archived: false,
    created_at: "2024-01-01",
    owner: { login: "user1" }
  },
  {
    id: 2,
    name: "移动端APP开发",
    archived: false,
    created_at: "2024-01-15",
    owner: { login: "user2" }
  }
];

// 模拟里程碑数据
const mockMilestones = {
  1: [
    {
      id: 1,
      title: "需求分析",
      description: "完成需求文档和原型设计",
      due_on: "2024-03-01",
      state: "closed"
    },
    {
      id: 2,
      title: "技术架构设计",
      description: "完成系统架构设计文档",
      due_on: "2024-04-15",
      state: "open"
    },
    {
      id: 3,
      title: "功能开发",
      description: "核心功能开发",
      due_on: "2024-06-30",
      state: "open"
    }
  ],
  2: [
    {
      id: 4,
      title: "APP原型设计",
      description: "APP界面原型设计",
      due_on: "2024-02-28",
      state: "open"
    },
    {
      id: 5,
      title: "首期功能开发",
      description: "完成首期功能开发",
      due_on: "2024-05-30",
      state: "open"
    }
  ]
};

const projectList = ref(mockProjects);
const milestoneMap = reactive(new Map());

const currentProject = ref(null);
const currentMilestone = ref(null);

// 月份数据
const months = computed(() => {
  const currentYear = dayjs().year();
  return Array.from({ length: 12 }, (_, i) => ({
    key: `${currentYear}/${String(i + 1).padStart(2, "0")}`,
    label: `${currentYear}/${String(i + 1).padStart(2, "0")}`
  }));
});

// 模态框标题
const modalTitle = computed(() => {
  switch (actionType.value) {
    case "add":
      return "添加里程碑";
    case "edit":
      return "编辑里程碑";
    case "readonly":
      return "里程碑详情";
  }
});

// 计算项目进度
const calculateProgress = (milestones) => {
  if (!milestones || milestones.length === 0) return 0;
  const total = milestones.length;
  const completed = milestones.filter((item) => item.state === "closed").length;
  return Math.round((completed / total) * 100);
};

// 获取项目时间范围
const getProjectTimespan = (milestones) => {
  if (!milestones || milestones.length === 0) return { start: null, end: null };
  const dates = milestones.map((m) => dayjs(m.due_on));
  const sortedDates = dates.sort((a, b) => a.valueOf() - b.valueOf());
  return {
    start: sortedDates[0],
    end: sortedDates[sortedDates.length - 1]
  };
};

// 计算里程碑位置
const calculateMilestonePosition = (milestone, startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const totalDays = endDate.diff(startDate, "day");
  const milestoneDays = dayjs(milestone.due_on).diff(startDate, "day");
  return Math.round((milestoneDays / totalDays) * 100);
};

// 时区转换
const toISOLocal = (d) => {
  var z = (n) => ("0" + n).slice(-2);
  var zz = (n) => ("00" + n).slice(-3);
  var off = d.getTimezoneOffset();
  var sign = off > 0 ? "-" : "+";
  off = Math.abs(off);

  return (
    d.getFullYear() +
    "-" +
    z(d.getMonth() + 1) +
    "-" +
    z(d.getDate()) +
    "T" +
    z(d.getHours()) +
    ":" +
    z(d.getMinutes()) +
    ":" +
    z(d.getSeconds()) +
    "." +
    zz(d.getMilliseconds()) +
    sign +
    z((off / 60) | 0) +
    ":" +
    z(off % 60)
  );
};

const findCurrentState = (state) => {
  return MILESTONE_STATE.find((item) => item.value === state);
};

// 添加里程碑
const addMilestone = (project) => {
  actionType.value = "add";
  currentProject.value = project;
  currentMilestone.value = {
    id: "",
    title: "",
    description: "",
    due_on: null,
    state: "open"
  };
  showMilestoneModal.value = true;
};

// 开始编辑
const startEdit = () => {
  actionType.value = "edit";
};

// 取消操作
const handleCancel = () => {
  if (actionType.value === "edit") {
    actionType.value = "readonly";
  } else {
    showMilestoneModal.value = false;
  }
};

// 保存里程碑
const handleSave = async () => {
  const date = toISOLocal(new Date(currentMilestone.value.due_on.$d));
  const data = { ...currentMilestone.value, due_on: date };

  // 模拟保存操作
  if (actionType.value === "add") {
    const projectMilestones = mockMilestones[currentProject.value.id] || [];
    const newId = Math.max(...projectMilestones.map((m) => m.id), 0) + 1;
    projectMilestones.push({ ...data, id: newId });
    mockMilestones[currentProject.value.id] = projectMilestones;
  } else if (actionType.value === "edit") {
    const projectMilestones = mockMilestones[currentProject.value.id];
    const index = projectMilestones.findIndex(
      (m) => m.id === currentMilestone.value.id
    );
    if (index !== -1) {
      projectMilestones[index] = data;
    }
  }

  await updateMilestoneMap();
  showMilestoneModal.value = false;
};

// 更新里程碑数据
const updateMilestoneMap = async () => {
  // 模拟数据更新
  projectList.value.forEach((project) => {
    milestoneMap.set(project, mockMilestones[project.id] || []);
  });
};

// 删除里程碑
const handleDelete = async () => {
  // 模拟删除操作
  const projectMilestones = mockMilestones[currentProject.value.id];
  const index = projectMilestones.findIndex(
    (m) => m.id === currentMilestone.value.id
  );
  if (index !== -1) {
    projectMilestones.splice(index, 1);
  }
  await updateMilestoneMap();
  showMilestoneModal.value = false;
};

// 禁用过去的日期
const disabledDate = (current) => {
  return current && current < dayjs().startOf("day");
};

// 处理里程碑点击
const hdlMilestone = (project, milestone) => {
  actionType.value = "readonly";
  currentProject.value = project;
  currentMilestone.value = {
    ...milestone,
    due_on: dayjs(milestone.due_on)
  };
  showMilestoneModal.value = true;
};

// 初始化数据
onMounted(async () => {
  // 模拟数据加载
  projectList.value.forEach((project) => {
    milestoneMap.set(project, mockMilestones[project.id] || []);
  });
});
</script>
<template>
  <div class="progress-management">
    <!-- 工具栏 -->
    <a-card class="toolbar-card" :bordered="false">
      <a-space>
        <a-radio-group v-model:value="viewMode" button-style="solid">
          <a-radio-button value="table">
            <TableOutlined />
            表格视图
          </a-radio-button>
          <a-radio-button value="progress">
            <BarChartOutlined />
            进度视图
          </a-radio-button>
        </a-radio-group>
      </a-space>
    </a-card>

    <!-- 表格视图 -->
    <template v-if="viewMode === 'table'">
      <a-card :bordered="false">
        <a-table :dataSource="projectList" :rowKey="(record) => record.id">
          <a-table-column title="项目名称" dataIndex="name" width="200px" />

          <a-table-column title="状态" dataIndex="status" width="100px">
            <template #default="{ record }">
              <a-tag :color="record.archived ? 'gray' : 'blue'">
                {{ record.archived ? "已完成" : "进行中" }}
              </a-tag>
            </template>
          </a-table-column>

          <a-table-column title="创建于" width="300px">
            <template #default="{ record }">
              <div>
                <CalendarOutlined />
                {{ dayjs(record.created_at).format(FORMAT_RULE) }}
              </div>
            </template>
          </a-table-column>

          <a-table-column title="里程碑" dataIndex="milestones">
            <template #default="{ record }">
              <a-timeline>
                <a-timeline-item
                  v-for="milestone in milestoneMap.get(record)"
                  :key="milestone.id"
                  @click="hdlMilestone(record, milestone)">
                  <template #dot>
                    <FlagOutlined
                      :style="{
                        color: findCurrentState(milestone.state).color
                      }" />
                  </template>
                  <div class="milestone-item">
                    <div class="milestone-name">
                      {{ milestone.title }}
                      <a-tag :color="findCurrentState(milestone.state).color">
                        {{ findCurrentState(milestone.state).label }}
                      </a-tag>
                    </div>
                    <div class="milestone-date">
                      <ClockCircleOutlined />
                      {{ dayjs(milestone.due_on).format(FORMAT_RULE) }}
                    </div>
                    <div class="milestone-desc">
                      {{ milestone.description }}
                    </div>
                  </div>
                </a-timeline-item>
              </a-timeline>
            </template>
          </a-table-column>

          <a-table-column title="操作" width="150px" fixed="right">
            <template #default="{ record }">
              <a-space>
                <a-button type="link" @click="addMilestone(record)">
                  <template #icon><PlusOutlined /></template>
                  添加里程碑
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </a-table>
      </a-card>
    </template>

    <!-- 进度视图 -->
    <template v-else>
      <a-card :bordered="false">
        <div class="progress-view">
          <!-- 月份头部 -->
          <div class="month-header">
            <div class="project-column">项目名称</div>
            <div class="timeline-column">
              <div v-for="month in months" :key="month.key" class="month-label">
                {{ month.label }}
              </div>
            </div>
          </div>

          <!-- 项目列表 -->
          <div class="project-list">
            <div
              v-for="project in projectList"
              :key="project.id"
              class="project-row">
              <!-- 项目信息 -->
              <div class="project-column">
                <div class="project-info">
                  <div class="project-name">{{ project.name }}</div>
                  <a-tag :color="project.archived ? 'gray' : 'blue'">
                    {{ project.archived ? "已完成" : "进行中" }}
                  </a-tag>
                  <div class="project-progress">
                    <a-progress
                      :percent="calculateProgress(milestoneMap.get(project))"
                      size="small" />
                  </div>
                  <a-button
                    type="link"
                    size="small"
                    @click="addMilestone(project)">
                    <template #icon><PlusOutlined /></template>
                    添加里程碑
                  </a-button>
                </div>
              </div>

              <!-- 时间轴 -->
              <div class="timeline-column">
                <div class="timeline-container">
                  <div class="timeline-track"></div>
                  <template v-if="milestoneMap.get(project)">
                    <div
                      v-for="milestone in milestoneMap.get(project)"
                      :key="milestone.id"
                      class="milestone-point"
                      :class="milestone.state"
                      :style="{
                        left: `${calculateMilestonePosition(
                          milestone,
                          getProjectTimespan(milestoneMap.get(project)).start,
                          getProjectTimespan(milestoneMap.get(project)).end
                        )}%`
                      }"
                      @click="hdlMilestone(project, milestone)">
                      <a-tooltip :title="milestone.title">
                        <FlagOutlined
                          :style="{
                            color: findCurrentState(milestone.state).color
                          }" />
                      </a-tooltip>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-card>
    </template>

    <!-- 里程碑编辑弹窗 -->
    <a-modal
      v-model:open="showMilestoneModal"
      :title="modalTitle"
      width="500px"
      :footer="null">
      <template v-if="currentMilestone">
        <a-form
          :model="currentMilestone"
          layout="vertical"
          :disabled="actionType === 'readonly'">
          <!-- 里程碑名称 -->
          <a-form-item
            label="里程碑名称"
            required
            :rules="[{ required: true, message: '请输入里程碑名称' }]">
            <a-input
              v-model:value="currentMilestone.title"
              placeholder="请输入里程碑名称"
              :maxLength="50" />
          </a-form-item>

          <!-- 描述 -->
          <a-form-item label="描述">
            <a-textarea
              v-model:value="currentMilestone.description"
              :rows="4"
              placeholder="请输入里程碑描述"
              :maxLength="500" />
          </a-form-item>

          <!-- 日期 -->
          <a-form-item
            label="截止日期"
            required
            :rules="[{ required: true, message: '请选择截止日期' }]">
            <a-date-picker
              v-model:value="currentMilestone.due_on"
              style="width: 100%"
              :format="FORMAT_RULE"
              :disabledDate="disabledDate"
              placeholder="请选择截止日期" />
          </a-form-item>

          <!-- 状态 -->
          <a-form-item label="状态">
            <a-select
              v-model:value="currentMilestone.state"
              :options="MILESTONE_STATE" />
          </a-form-item>
        </a-form>

        <!-- 底部按钮 -->
        <div class="modal-footer">
          <div class="footer-left">
            <template v-if="currentMilestone.id">
              <a-popconfirm
                title="确定要删除这个里程碑吗？"
                @confirm="handleDelete"
                okText="确定"
                cancelText="取消">
                <a-button danger>
                  <template #icon><DeleteOutlined /></template>
                  删除
                </a-button>
              </a-popconfirm>
            </template>
          </div>
          <div class="footer-right">
            <a-space>
              <a-button @click="handleCancel">
                {{ actionType === "edit" ? "取消" : "关闭" }}
              </a-button>

              <template v-if="actionType === 'readonly'">
                <a-button type="primary" @click="startEdit">
                  <template #icon><EditOutlined /></template>
                  编辑
                </a-button>
              </template>

              <template v-else>
                <a-button type="primary" @click="handleSave">
                  <template #icon><EditOutlined /></template>
                  {{ actionType === "add" ? "确定" : "保存" }}
                </a-button>
              </template>
            </a-space>
          </div>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.progress-management {
  padding: 24px;
  background: #f0f2f5;

  .toolbar-card {
    margin-bottom: 24px;
  }

  .progress-view {
    .month-header {
      display: flex;
      border-bottom: 1px solid #f0f0f0;

      .project-column {
        width: 300px;
        padding: 16px;
        font-weight: 500;
        flex-shrink: 0;
      }

      .timeline-column {
        display: flex;
        flex: 1;

        .month-label {
          flex: 1;
          text-align: center;
          padding: 16px 8px;
          font-size: 12px;
          color: #666;
          border-left: 1px solid #f0f0f0;
        }
      }
    }

    .project-list {
      .project-row {
        display: flex;
        border-bottom: 1px solid #f0f0f0;

        &:hover {
          background: #fafafa;
        }

        .project-column {
          width: 300px;
          padding: 16px;
          flex-shrink: 0;

          .project-info {
            .project-name {
              font-weight: 500;
              margin-bottom: 8px;
            }

            .project-progress {
              margin: 8px 0;
            }
          }
        }

        .timeline-column {
          flex: 1;
          padding: 16px;
          position: relative;

          .timeline-container {
            position: relative;
            height: 32px;
            margin-top: 16px;

            .timeline-track {
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              height: 2px;
              background: #f0f0f0;
              transform: translateY(-50%);
            }

            .milestone-point {
              position: absolute;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #fff;
              border-radius: 50%;
              cursor: pointer;
              z-index: 1;
              transition: all 0.3s;

              &:hover {
                background: #f5f5f5;
                transform: translate(-50%, -50%) scale(1.2);
              }

              &.closed {
                opacity: 0.6;
              }
            }
          }
        }
      }
    }
  }

  .milestone-item {
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }

    .milestone-name {
      font-weight: 500;
      margin-bottom: 4px;
    }

    .milestone-date {
      color: #666;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .milestone-desc {
      color: #666;
      font-size: 12px;
    }
  }

  .modal-footer {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .footer-right {
      margin-left: auto;
    }
  }
}
</style>
