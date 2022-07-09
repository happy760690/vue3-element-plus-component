<template>
  <el-dialog v-model="dialogVisible" width="30%" v-bind="$attrs">
    <template #default>
      表单
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>
  
<script setup lang='ts'>
import { ref, watch} from "vue";

let props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

let emits = defineEmits(['update:visible'])
let dialogVisible = ref<boolean>(props.visible);

watch(() => props.visible, val => {
  dialogVisible.value = val;
},{
  immediate: true,
})
watch(() => dialogVisible.value, val => {
  console.log(val)
  emits('update:visible', val);
})
</script>
  
<style>
</style>