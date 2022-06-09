<template>
    <m-progress isAnimation
      :text-inside="true"
      :stroke-width="24"
      status="success"
     :percentage="60"></m-progress>
    <m-progress isAnimation
      type="circle"
     :percentage="60"></m-progress>
</template>
  
<script setup lang='ts'>
  
</script>
  
<style lang="scss" scoped>
  svg { 
    width: 126px;
    height: 126px;
  }
</style>