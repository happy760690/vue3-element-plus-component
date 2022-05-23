<template>
    <div>
      <el-button @click="handleClick" type="primary">
        <slot></slot>
      </el-button>
      <el-dialog :title="title" v-model="dialogVisible">11111</el-dialog>
    </div>
</template>
  
<script setup lang='ts'>
import { watch, ref } from 'vue'
let props = defineProps<{
  // 弹出框的标题
  title: string,
  // 控制弹出框的显示与隐藏
  visible: boolean,
}>();

let emits = defineEmits(["update:visible"]);
// 拷贝一份父组件传递过来的visible
let dialogVisible = ref<boolean>(props.visible)

let handleClick = () => {
  // 需 要修改父组件数据
  emits("update:visible", !props.visible)
}

// 监听visible变化
watch(() => props.visible, val => {
  dialogVisible.value = val
})
// 监听组件内部的dialogVisible变化
watch(() => dialogVisible.value, val => {
  emits('update:visible', val)
})
</script>
  
<style>
  
</style>