<template>
  <el-form
    v-if="model"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, index) in options" :key="index">
      <!-- 单个组件构成 -->
      <el-form-item
        v-if="!item.children || !item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        ></component>
      </el-form-item>
      <!-- 有多组件构成 -->
      <el-form-item
        v-if="item.children && item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          >
          </component>
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>
  
<script setup lang='ts'>
import { PropType, ref, onMounted, watch } from "vue";
import { FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";

let props = defineProps({
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});

let model = ref<any>(null);
let rules = ref<any>(null);

// 初始化表单
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
    });

    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
    console.log(model.value, ":::", rules.value);
  }
};

onMounted(() => {
  initForm();
});
// 监听父组件传递进来的Options
watch(() => props.options, () => {
    initForm();
}, {
    deep: true
})
</script>
  
<style>
</style>