<template>
    <div class="trend">
      <div class="text" :style="{color:textColor}">
        <slot v-if="slots.default"></slot>
        <div v-else>
          {{text}}
        </div>
      </div>
      <div class="icon">
        <component v-if="type === 'up'" :style="{color: !reverseColor?upIconColor:'#f522dd'}"  :is="upIcon"></component>
        <component v-if="type === 'down'" :style="{color: !reverseColor?downIconColor:'green'}"  :is="downIcon"></component>
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import {useSlots, onMounted, computed} from 'vue'
let props = defineProps({
  // 标记当前趋势是上升(up)还是下降(down)的
  type: {
    type: String,
    default: 'up'
  },
  // 趋势显示的文字
  // 1. 从父组件传递过来的数据
  // 2. 插槽
  text: {
    type: String,
    default: '文字'
  },
  // 颜色翻转只在默认颜色下生效，
  reverseColor: {
    type: Boolean,
    default: false
  },
  // 上升趋势图标颜色
  upIconColor: {
    type: String,
    default: '#f522dd'
  },
  // 下降趋势图标颜色
  downIconColor: {
    type: String,
    default: 'green'
  },
  // 上升趋势文字颜色
  upTextColor: {
    type: String,
    default: 'rgb(0,0,0)'
  },
  // 下降趋势文字颜色
  downTextColor: {
    type: String,
    default: 'black'
  },
  // 上升趋势显示图标
  upIcon: {
    type: String,
    default: 'ArrowUp'
  },
  // 下降趋势显示图标
  downIcon: {
    type: String,
    default: 'ArrowDown'
  }
})

onMounted(() => {
  // 如果传递颜色翻转
  if (props.reverseColor) {

  }
})

// 获取插槽内容
let slots = useSlots()

// 文字颜色
let textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor: props.downTextColor
})
// console.log(slots)
</script>
  
<style lang="scss" scoped>
  .trend{
    display: flex;
    align-items: center;
    .text{
      font-size: 14px;
      margin-right: 4px;
    }
    .icon{
      width: 0.8em;
      height: 0.8em;
    }
  }
</style>