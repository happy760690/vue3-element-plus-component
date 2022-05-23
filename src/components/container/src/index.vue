<template>
  <el-container>
    <el-aside width="auto">
      <nav-slide v-model:collapse="isCollapse"></nav-slide>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
  
<script setup lang='ts'>
import { ref } from "vue";
import NavHeader from "./navHeader/index.vue";
import NavSlide from "./navSlide/index.vue";
let isCollapse = ref(false);
</script>
  
<style lang="scss" scoped>
.el-main {
  padding: 0;
}
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>