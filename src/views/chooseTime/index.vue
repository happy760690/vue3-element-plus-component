<template>
    <m-choose-time :startOptions="startOptions" @startChange="startChange" @endChange="endChange"></m-choose-time>
</template>
  
<script setup lang='ts'>
  interface endValue {
    startTime: string,
    endTime: string
  }

  let startChange = (val: string) => {
    console.log(val)
  }

  let endChange = (val: endValue) => {
    console.log(val)
  }

  let startOptions = {
    // size: 'mini',
    // clearable: false,
  }
</script>
  
<style>
  
</style>