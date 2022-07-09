
<template>
  <el-button type="primary" @click="open">open</el-button>
  <m-modal-form title="编辑用户信息" v-model:visible="visible">
    <template #footer>
      <el-button @click="visible = false">Cancel</el-button>
      <el-button type="primary" @click="visible = false"
        >Confirm</el-button
      >
    </template>
  </m-modal-form>
</template>
  
<script setup lang='ts'>
import { ref } from "vue";

let visible = ref<boolean>(false);

const open = () => {
  visible.value = true;
};
</script>
  
<style>
</style>