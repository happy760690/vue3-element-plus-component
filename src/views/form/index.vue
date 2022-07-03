<template>
  <div>
    <m-form label-width="100px" :options="options"></m-form>
  </div>
</template>
  
<script setup lang='ts'>
import { FormOptions } from "../../components/form/src/types/types";
let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    prop: 'username',
    label: '用户名',
    rules: [{
      required: true,
      message: "用户名不能不空",
      trigger: 'blur'
    },
    {
      required: true,
      min: 2,
      max: 6,
      message: "用户名在2-6位之间",
      trigger: 'blur'
    }]
  },
  {
    type: "input",
    value: "",
    prop: 'password',
    label: '密码',
    rules: [{
      required: true,
      message: "密码不能不空",
      trigger: 'blur'
    },
    {
      required: true,
      min: 6,
      max: 12,
      message: "用户名在6-12位之间",
      trigger: 'blur'
    }],
    attrs: {
      showPassword: true,
      clearable: true,
    }
  }
];
</script>
  
<style>
</style>