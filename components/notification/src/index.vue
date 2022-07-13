<template>
  <el-popover
    placement="bottom"
    :width="300"
    trigger="click"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge :value="value" :max="max" :is-dot="isDot" style="cursor:pointer;" class="item">
        <component :is="icon"></component>
      </el-badge>
    </template>
  </el-popover>
</template>
  
<script setup lang='ts'>
  let props = defineProps({
    // 显示的图标
    icon: {
      type: String,
      default: 'Bell'
    },
    // 通过数量
    value: {
      type: [String, Number],
      default: ''      
    },
    // 最大值
    max: {
      type: Number,
    },
    // 是否显示小圆点
    isDot: {
      type: Boolean,
      default: false
    },

  })
</script>
  
<style>
  
</style>