<template>
    <el-menu
    :collapse="collapse"
    default-active="2"
    class="el-menu-vertical-demo"
  >
    <el-menu-item index="1">
      <el-icon><setting /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><location /></el-icon>
      <span>图标选择器</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><document /></el-icon>
      <span>趋势标记</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><document /></el-icon>
      <span>时间选择</span>
    </el-menu-item>
  </el-menu>
</template>
  
<script setup lang='ts'>
let props = defineProps<{
  collapse: boolean
}>()
</script>
  
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
}
  
</style>