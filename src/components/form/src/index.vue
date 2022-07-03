<template>
  <el-form
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <el-form-item
      v-for="(item, index) in options"
      :label="item.label"
      :prop="item.prop"
      :key="index"
    >
      <component
        :is="`el-${item.type}`"
        v-bind="item.attrs"
        v-model="model[item.prop!]"
      ></component>
    </el-form-item>
  </el-form>
</template>
  
<script setup lang='ts'>
import { PropType, ref, onMounted } from "vue";
import { FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";

let props = defineProps({
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});

let model = ref<any>({
  prop: "",
});
let rules = ref<any>({});

onMounted(() => {
  let m: any = {};
  let r: any = {};
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value;
    r[item.prop!] = item.rules;
  });

  model.value = cloneDeep(m);
  rules.value = cloneDeep(r);
  console.log(model.value, ":::", rules.value);
});
</script>
  
<style>
</style>