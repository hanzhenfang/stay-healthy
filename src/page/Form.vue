<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center overflow-scroll">
    <div>
      <form-create :rule="rulerJSON" v-model:api="originApi" />
    </div>

    <div class="flex items-center border-1px border-solid border-blue">
      <form-create :rule="rule" v-model:api="fApi" :option="options" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import formCreate from "@form-create/ant-design-vue";
import type { Api } from "@form-create/ant-design-vue";
import RuleJson from "./form.json";

const originApi = ref<Api>({});

const rulerJSON = ref(RuleJson);
const count = ref(1);

const fApi = ref<Api>({});
const options = ref({
  form: {
    layout: "horizontal",
    labelCol: {
      span: 4
    }
  },
  submitBtn: {
    show: true,
    click: (formData) => {
      const result = fApi.value.formData();
      const { type, required, field, title, placeholder } = result;
      const rule: any = {
        type,
        title,
        field,
        validate: [
          {
            type: "string",
            required,
            message: "该项为必填项"
          }
        ],
        props: {
          placeholder
        },
        ...(type === "select" && {
          options: Object.keys(result)
            .filter((key) => key.startsWith("option"))
            .map((optionKey) => ({
              label: result[optionKey],
              value: result[optionKey]
            }))
        })
      };
      console.log("最终的结果", rule);
      rulerJSON.value.push(rule);
    }
  }
});

const rule = ref([
  {
    type: "radio",
    field: "type",
    title: "字段类型",
    value: "input",
    validate: [
      {
        required: true,
        message: "该项为必填项"
      }
    ],
    options: [
      {
        label: "输入框",
        value: "input"
      },

      {
        label: "选择框",
        value: "select"
      },

      {
        label: "长文本输入框",
        value: "textarea"
      }
    ],
    on: {
      change() {
        const currentValue = fApi.value.formData("type").type;
        console.log("currentValue", currentValue);
        if (currentValue === "select") {
          fApi.value.rule.push(defaultoption());
          count.value++;
        } else {
          const currentRule = fApi.value.formData();
          for (const key in currentRule) {
            if (key.startsWith("option")) {
              fApi.value.removeField(key);
            }
          }
          count.value = 1;
        }
      }
    }
  },
  {
    type: "input",
    field: "title",
    name: "表单名称",
    title: "表单名称",
    props: {
      placeholder: "请输入表单名称"
    },
    validate: [
      {
        required: true,
        message: "该字段为必填项"
      }
    ]
  },
  {
    type: "input",
    field: "field",
    title: "英文名称(或拼音)",
    props: {
      placeholder: "请输入表单名称的英文或者汉语拼音"
    },
    validate: [
      {
        type: "pattern",
        required: true,
        pattern: "^[a-zA-Z0-9]+$",
        message: "只允许输入字母数字组合"
      }
    ]
  },
  {
    type: "radio",
    field: "required",
    title: "是否必填项",
    value: false,
    options: [
      {
        label: "是",
        value: true
      },
      {
        label: "否",
        value: false
      }
    ],
    validate: [
      {
        required: true
      }
    ]
  },
  {
    type: "input",
    field: "placeholder",
    title: "提示",
    props: {
      placeholder: "可以为之后表单填写者提供一些填写提示"
    }
  }
]);

function defaultoption() {
  const field = `option${count.value}`;
  console.log("field", field);
  return {
    type: "input",
    field,
    col: {
      span: 18,
      offset: 1
    },
    title: `选项${count.value}`,
    props: {
      placeholder: "请输入选项值"
    },
    control: [
      {
        handle: (_, api) => {
          const options = api.getRule(field);
          if (!options) return false;
          else return options.field === `option${count.value - 1}`;
        },
        rule: [
          {
            type: "Button",
            children: ["追加选项"],
            col: { span: 3 },
            props: {
              onClick: () => {
                console.log("fApi.value", fApi.value);
                const typeRuler = fApi.value.getRule("type");
                if (!typeRuler) return;
                typeRuler.on?.change?.();
                // console.log("tt", tt.on.change());
              }
            }
          }
        ]
      }
    ]
    // suffix: {
    //   type: "Button",
    //   children: ["追加选项"],
    //   props: {
    //     onClick: () => {
    //       console.log("fApi.value", fApi.value);
    //       const tt = fApi.value.getRule("type");
    //       console.log("tt", tt.on.change());
    //     }
    //   }
    // }
  };
}
</script>
