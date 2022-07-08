<template>
{{ value }}
  <el-upload
    v-bind="itemOptions.uploadAttrs"
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
    <slot name="uploadArea"></slot>
    <slot name="uploadTip"></slot>
  </el-upload>
</template>
  
<script setup lang='ts'>
import { UploadFile, UploadFiles } from 'element-plus';
import { PropType } from 'vue';
import { FormOptions } from '../../form/src/types/types';

let props = defineProps({
  // 表单的配置项
  itemOptions: {
    type: Object as PropType<FormOptions>,
    required: true,
  },
  value: {
    type: Object
  },
  httpRequest: {
    type: Function,
  },
});

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
  
// 上传组件的所有方法
let onPreview = (file: UploadFile) => {
  emits("on-preview", file);
};
let onRemove = (file: UploadFile, fileList: UploadFiles) => {
  emits("on-remove", file, fileList);
};
let onSuccess = (response: any, file: UploadFile, fileList: UploadFiles) => {
  // 上传成功后给表单上传项赋值
  // let uploadItem = props.options.find((item) => item.type === "upload")!;
  // value[uploadItem.prop!] = { response, file, fileList };
  // value = { response, file, fileList };
  emits("on-success", response, file, fileList);
};
let onError = (error: any, file: UploadFile) => {
  emits("on-error", error, file);
};
let onProgress = (event: any, file: UploadFile, fileList: UploadFiles) => {
  emits("on-progress", event, file, fileList);
};
let onChange = (file: UploadFile, fileList: UploadFiles) => {
  // let uploadItem = props.options.find((item) => item.type === "upload")!;
  // model.value[uploadItem.prop!] = { file, fileList };
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