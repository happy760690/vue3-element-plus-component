<template>
  <el-dialog v-model="dialogVisible" width="30%" v-bind="$attrs">
    <template #default>
      <m-form
        label-width="100px"
        ref="form"
        :options="options"
      ></m-form>
    </template>
    <template #footer>
      <slot name="footer" :form="form"></slot>
    </template>
  </el-dialog>
</template>
  
<script setup lang='ts'>
import { FormInstance } from "element-plus";
import { PropType, ref, watch} from "vue";
import { FormOptions } from "../../form/src/types/types";

let props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});

let emits = defineEmits(['update:visible'])
// 表单实例
let form = ref<FormInstance | null>();
// 弹框的隐藏也显示
let dialogVisible = ref<boolean>(props.visible);

watch(() => props.visible, val => {
  dialogVisible.value = val;
},{
  immediate: true,
})
watch(() => dialogVisible.value, val => {
  console.log(val)
  emits('update:visible', val);
})
</script>
  
<style>
</style>