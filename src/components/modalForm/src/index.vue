<template>
  <div :class="{'m-choose-icon-dialog-body-height': isScorll}">
    <el-dialog v-model="dialogVisible" width="30%" v-bind="$attrs">
    <template #default>
      <m-form
        label-width="100px"
        ref="form"
        :options="options"
        @on-change="onChange"
        @onPreview="onPreview"
        @onRemove="onRemove"
        @beforeRemove="beforeRemove"
        @onExceed="onExceed"
        @onError="onError"
        @onSuccess="onSuccess"
      >
        <template #uploadArea>
          <slot name="uploadArea"></slot>
        </template>
        <template #uploadTip>
          <slot name="uploadTip"></slot>
        </template>
      </m-form>
    </template>
    <template #footer>
      <slot name="footer" :form="form"></slot>
    </template>
  </el-dialog>
  </div>
</template>
  
<script setup lang='ts'>
import { FormInstance } from "element-plus";
import { PropType, ref, watch } from "vue";
import { FormOptions } from "../../form/src/types/types";

let props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  // 只在屏幕区域滚动
  isScorll: {
    type: Boolean,
    default: false,
  },
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  // 下面全是处理上传的事件
  onChange: {
    type: Function,
  },
  onPreview: {
    type: Function,
  },
  onRemove: {
    type: Function,
  },
  beforeRemove: {
    type: Function,
  },
  onExceed: {
    type: Function,
  },
  onError: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
});

let emits = defineEmits(["update:visible"]);
// 表单实例
let form = ref<FormInstance | null>();
// 弹框的隐藏也显示
let dialogVisible = ref<boolean>(props.visible);

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  },
  {
    immediate: true,
  }
);
watch(
  () => dialogVisible.value,
  (val) => {
    console.log(val);
    emits("update:visible", val);
  }
);
</script>
  
<style>
</style>