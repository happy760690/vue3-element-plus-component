<template>
  <div>
    <m-form
      label-width="100px"
      multiple
      :options="options"
      @on-change="handleChange"
      @onPreview="handlePreview"
      @onRemove="handleRemove"
      @beforeRemove="beforeRemove"
      @onExceed="handleExceed"
      @onError="handleError"
      @onSuccess="handleSuccess"
    >
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px">
          jpg/png files with a size less than 500kb
        </div>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="onSubmit(scope)">提交</el-button>
        <el-button @click="resetForm(scope)">重置</el-button>
      </template>
    </m-form>
  </div>
</template>
  
<script setup lang='ts'>
import { ElMessage, ElMessageBox, FormInstance, UploadProps } from "element-plus";
import { FormOptions } from "../../components/form/src/types/types";

interface Scope{
  form: FormInstance,
  model: any,
}

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
  {
    type: "upload",
    label: "上传",
    uploadAttrs: {
      action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
      multiple: true,
      showFileList: true,
      // autoUpload: false,
      limit: 3,
    },
    rules: [
      {
        required: true,
        message: "上传不能为空",
        trigger: "blur",
      },
    ],
    prop: "pic",
  },
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

let onSubmit= (scope: Scope)=> {
  console.log(scope)
  scope.form.validate((valid) => {
    if(valid){
      console.log(scope.model)
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('表单填写有误，请检查')
    }
  })
}

let resetForm= (scope: Scope)=> {
  console.log(scope)
  scope.form.resetFields()
}

const handleChange: UploadProps["onChange"] = (file, uploadFiles) => {
  console.log("onChange");
  console.log(file, uploadFiles);
};

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log("onRemove=");

  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log("onPreview=");
  console.log(uploadFile);
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  console.log("beforeRemove=");
  console.log(uploadFile, uploadFiles);
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  console.log("onExceed=");
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};
const handleError: UploadProps["onError"] = (error, file, fileList) => {
  console.log("onError");
  console.log(error, file, fileList);
};
const handleSuccess: UploadProps["onSuccess"] = (error, file, fileList) => {
  console.log("onSuccess");
  console.log(error, file, fileList);
};
</script>
  
<style>
</style>