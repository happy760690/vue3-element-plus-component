<template>
    <div>
      <el-button @click="handleClick" type="primary">
        <slot></slot>
      </el-button>
      <div class="m-choose-icon-dialog-body-height">
        <el-dialog :title="title" v-model="dialogVisible">
        <div class="container">
          <div class="item"
           @click="clickItem(item)"
           v-for="(item, index) in Object.keys(ElIcons)" :key="index">
            <div class="text">
              <component :is="item"></component>
            </div>
            <div class="icon">{{ item }}</div>
          </div>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import * as ElIcons from '@element-plus/icons-vue'
import { watch, ref } from 'vue'
import { useCopy } from '../../../hooks/useCopy';
import { toLine } from '../../../utils';
let props = defineProps<{
  // 弹出框的标题
  title: string,
  // 控制弹出框的显示与隐藏
  visible: boolean,
}>();

let emits = defineEmits(["update:visible"]);
// 拷贝一份父组件传递过来的visible
let dialogVisible = ref<boolean>(props.visible)

// 点击按钮弹出框
let handleClick = () => {
  // 需 要修改父组件数据
  emits("update:visible", !props.visible)
}

// 点击图标
let clickItem = (item: string) => {
  let text = item
  // 复制内容
  useCopy(text)
  // 关闭弹窗
  dialogVisible.value = false
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
  
<style lang="scss" scoped>
  .container{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .text {
    font-size: 14px;
  }
  .icon{
    flex:1;
  }
  svg { 
    width: 2em;
    height:2em;
  }

  .el-dialog__body {
    height: 300px;
    overflow: hidden;
  }
</style>