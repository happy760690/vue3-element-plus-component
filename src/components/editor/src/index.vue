<template>
  <div style="border: 1px solid #ccc; margin-top: 10px">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="modelValue"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onChange="handleChange"
      @onCreated="handleCreated"
    />
  </div>
</template>
  
<script setup lang='ts'>
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { defineEmits, onMounted, ref, shallowRef } from "vue";
import { IDomEditor } from "@wangeditor/editor";

let props = defineProps({
  placeholder: String,
  modelValue: String,
})

let emits = defineEmits(['update:modelValue'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const editorConfig = { placeholder: props.placeholder! };
// 编辑器内容 HTML
// const valueHtml = ref("");
const toolbarConfig = {};
const mode = "default";


// 创建编辑器回调函数
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  // editorRef.value.setHtml(`${props.modelValue}`);
};

const handleChange = (editor: IDomEditor) => {
  // editor changed
  console.log('content', editor.getHtml())
  emits("update:modelValue", editor.getHtml())
  // emits('changeValue', editor.getHtml())
}

// 模拟 ajax 异步获取内容
onMounted(() => {
});

</script>
  
<style>
</style>