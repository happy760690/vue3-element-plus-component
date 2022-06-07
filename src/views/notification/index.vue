<template>
    <!-- <m-notification :value="50"></m-notification>
    <br>
    <br>
    <m-notification :value="50" :max="30"></m-notification>
    <br>
    <br>
    <m-notification :value="50" :max="30" isDot></m-notification>
    <br>
    <br> -->
    <m-notification icon="ChatDotRound" :value="50">
      <template #default>
        <m-list></m-list>
      </template>
    </m-notification>

</template>
  
<script setup lang='ts'>
  
</script>
  
<style>
  
</style>