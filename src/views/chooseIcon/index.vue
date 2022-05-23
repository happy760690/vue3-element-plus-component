<template>
    <div> {{ visible }} 
      <choose-icon title="选择图标" v-model:visible="visible">
      选择图标
      </choose-icon>
    </div>
</template>
  
<script setup lang='ts'>
  import chooseIcon from '../../components/chooseIcon/src/index.vue'
  import { ref } from 'vue'

  let visible = ref<boolean>(false)
</script>
  
<style lang="scss" scoped>
  
</style>