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
    value: "admin",
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
    value: "pd",
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
  },
  {
    type: "select",
    value: "3",
    placeholder: "请选择职位",
    prop: 'role',
    label: '职位',
    attrs: {
      style: {
        width: "100%",
      },
    },
    rules: [
      {
      required: true,
      message: "职位不能为空",
      trigger: 'blur'
    }],
    children: [
      {
        type: "option",
        label: '经理',
        value: '1'
      },
      {
        type: "option",
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
      },
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    rules: [{
      required: true,
      message: "爱好不能为空",
      trigger: 'blur',
    }],
    children: [{
      type: 'checkbox',
      value: '1',
      label: '足球',
    },{
      type: 'checkbox',
      value: '2',
      label: '篮球',
    },{
      type: 'checkbox',
      value: '3',
      label: '橄榄球',
    }]
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    rules: [{
      required: true,
      message: "性别不能为空",
      trigger: 'blur',
    }],
    children: [{
      type: 'radio',
      value: 'female',
      label: '女',
    },{
      type: 'radio',
      value: 'male',
      label: '男',
    }]
  }
];
</script>
  
<style>
</style>