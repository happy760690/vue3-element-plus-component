
<template>
  <el-button type="primary" @click="open">open</el-button>
  <m-modal-form 
    width="50%"
    title="编辑用户信息" 
    v-model:visible="visible"
    :options="options"
    >
    <template #footer="{ form }">
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="confirm(form)"> 确定 </el-button>
    </template>
  </m-modal-form>
</template>
  
<script setup lang='ts'>
import { ElMessage, FormInstance } from "element-plus";
import { ref } from "vue";
import { FormOptions } from "../../components/form/src/types/types";

let visible = ref<boolean>(false);

const open = () => {
  visible.value = true;
};

let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    prop: "username",
    label: "用户名",
    attrs: {
      placeholder: '请输内容呀！',
    },
    rules: [
      {
        required: true,
        message: "用户名不能不空",
        trigger: "blur",
      },
      {
        required: true,
        min: 2,
        max: 6,
        message: "用户名在2-6位之间",
        trigger: "blur",
      },
    ],
  },
  {
    type: "input",
    value: "",
    prop: "password",
    label: "密码",
    rules: [
      {
        required: true,
        message: "密码不能不空",
        trigger: "blur",
      },
      {
        required: true,
        min: 6,
        max: 12,
        message: "用户名在6-12位之间",
        trigger: "blur",
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: "select",
    value: "",
    prop: "role",
    label: "职位",
    attrs: {
      placeholder: "请选择职位",
      style: {
        width: "100%",
      },
    },
    rules: [
      {
        required: true,
        message: "职位不能为空",
        trigger: "blur",
      },
    ],
    children: [
      {
        type: "option",
        label: "经理",
        value: "1",
      },
      {
        type: "option",
        label: "主管",
        value: "2",
      },
      {
        type: "option",
        label: "员工",
        value: "3",
      },
    ],
  },
  {
    type: "checkbox-group",
    value: [],
    prop: "like",
    label: "爱好",
    rules: [
      {
        required: true,
        message: "爱好不能为空",
        trigger: "blur",
      },
    ],
    children: [
      {
        type: "checkbox",
        value: "1",
        label: "足球",
      },
      {
        type: "checkbox",
        value: "2",
        label: "篮球",
      },
      {
        type: "checkbox",
        value: "3",
        label: "橄榄球",
      },
    ],
  },
  {
    type: "radio-group",
    value: "",
    prop: "gender",
    label: "性别",
    rules: [
      {
        required: true,
        message: "性别不能为空",
        trigger: "blur",
      },
    ],
    children: [
      {
        type: "radio",
        value: "female",
        label: "女",
      },
      {
        type: "radio",
        value: "male",
        label: "男",
      },
    ],
  },
  // {
  //   type: "upload",
  //   label: "上传",
  //   uploadAttrs: {
  //     action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
  //     multiple: true,
  //     showFileList: true,
  //     // autoUpload: false,
  //     limit: 3,
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       message: "上传不能为空",
  //       trigger: "blur",
  //     },
  //   ],
  //   prop: "pic",
  // },
  {
    type: "editor",
    value: '<p>试试管用吗？</p>',
    label: "描述",
    prop: "desc",
    attrs: {
      placeholder: '请输内容呀！！！！！'
    },
    rules: [{
      required: true,
      message: "描述不能为空",
      
    }],
  },
];

// 点击确认
let confirm = (form: any) => {
  console.log(form);
  const validate = form.validate();
  // 表单验证
  validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('验证成功')
      console.log(form.getFormData())
    } else {
      ElMessage.error('验证失败')
    }
  })
}
// 点击取消
let cancel = (form: FormInstance) => {
  console.log(cancel)
}
</script>
  
<style>
</style>