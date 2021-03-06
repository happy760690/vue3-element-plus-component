<template>
  <el-form
    v-if="model"
    ref="form"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, index) in options" :key="index">
      <!-- 单个组件构成 -->
      <el-form-item
        v-if="!item.children || !item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-if="item.type !== 'upload'"
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        ></component>
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
        >
          <template #trigger>
            <slot name="uploadArea"></slot>
          </template>
          <template #tip>
            <slot name="uploadTip"></slot>
          </template>
        </el-upload>
      </el-form-item>
      <!-- 有多组件构成 -->
      <el-form-item
        v-if="item.children && item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          >
          </component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>
  
<script setup lang='ts'>
import { PropType, ref, onMounted, watch, shallowRef } from "vue";
import { FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";
import { FormInstance, UploadFile, UploadFiles } from "element-plus";

let emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "on-exceed",
  "before-upload",
  "before-remove",
]);

let props = defineProps({
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  httpRequest: {
    type: Function,
  },
});

let model = ref<any>(null);
let rules = ref<any>(null);
let form = ref<FormInstance | null>();

// 初始化表单
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {}; // 模型对象
    let r: any = {}; // 规则对象
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;

      // 初始化富文本
      //   if (item.type === "editor") {
      //     nextTick(() => {
      //       if (document.getElementById("editor")) {
      //         const editor = new E("#editor");
      //         editor.create();
      //       }
      //     });
      //   }
    });

    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
    console.log(model.value, ":::", rules.value, "----");
  }
};

// 表单验证的方法
let validate = () => {
  return form.value!.validate
}

// 获取表单数据
let getFormData = () => {
  return model.value
}

defineExpose({
  validate,
  getFormData,
})

onMounted(() => {
  initForm();
});
// 监听父组件传递进来的Options
watch(
  () => props.options,
  () => {
    initForm();
  },
  {
    deep: true,
  }
);

// 上传组件的所有方法
let onPreview = (file: UploadFile) => {
  emits("on-preview", file);
};
let onRemove = (file: UploadFile, fileList: UploadFiles) => {
  emits("on-remove", file, fileList);
};
let onSuccess = (response: any, file: UploadFile, fileList: UploadFiles) => {
  // 上传成功后给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploadItem.prop!] = { response, file, fileList };
  emits("on-success", response, file, fileList);
};
let onError = (error: any, file: UploadFile) => {
  emits("on-error", error, file);
};
let onProgress = (event: any, file: UploadFile, fileList: UploadFiles) => {
  emits("on-progress", event, file, fileList);
};
let onChange = (file: UploadFile, fileList: UploadFiles) => {
  let uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploadItem.prop!] = { file, fileList };
  emits("on-change", file, fileList);
};
let onExceed = (file: UploadFile, fileList: UploadFiles) => {
  emits("on-exceed", file, fileList);
};
let beforeUpload = (file: UploadFile) => {
  emits("before-upload", file);
};
let beforeRemove = (file: UploadFile, fileList: UploadFiles) => {
  emits("before-remove", file, fileList);
};
</script>
  
<style>
</style>