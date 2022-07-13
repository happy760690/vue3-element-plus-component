<template>
  <div class="header">
    <span @click="toggle">
      <expand v-if="collapse"></expand>
      <fold v-else></fold>
    </span>
  </div>
</template>
  
<script setup lang='ts'>
let props = defineProps<{
  collapse: boolean;
}>();
let emits = defineEmits(["update:collapse"]);
let toggle = () => {
  emits("update:collapse", !props.collapse);
};
</script>
  
<style lang="scss" scoped>
.header{
  height:60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>