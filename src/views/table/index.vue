
<template>
  <m-table
    :data="tableData"
    :options="options"
    stripe
    isEditRow
    pagination
    elementLoadingText="加载中..."
    elementLoadingBackground="rgba(0,0,0, .6)"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    v-model:editRowType="editRowType"
    paginationAlign="right"
    :total="total"
    :currentPage="current"
    @confirm="confirm"
    @sizeChange="sizeChange"
    @currentChange="currentChange"
  >
    <template #date="{ scope }">
      <timer />
      <span style="margin-left: 10px">{{ scope.row.date }}</span>
    </template>
    <template #name="{ scope }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <template #action="{ scope }">
      <el-button type="primary" @click="edit(scope)" size="small"
        >编辑</el-button
      >
      <el-button type="danger" size="small" @click="del(scope)" >删除</el-button>
    </template>
    <template #editCell="{ scope }">
      <el-button size="small" type="primary" @click="confirm(scope)">确认</el-button>
      <el-button size="small" type="primary">取消</el-button>
    </template>
    <template #editRow="{ scope }">
      <el-button size="small" type="primary" @click="confirm(scope)">确认</el-button>
      <el-button size="small" type="primary">取消</el-button>
    </template>
  </m-table>
</template>
  
<script setup lang='ts'>
import { onMounted, ref } from "vue";
import { TableOptions } from "../../components/table/src/type";
import axios from 'axios'
import '../../mock'

interface TableData {
  date: string;
  name: string;
  address: string;
}

let tableData = ref<TableData[]>([]);

let current = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)

let getData = () => {
  axios.post('/api/list', {
    current,
    pageSize,
  }).then((res: any) => {
    const { code, data } = res.data
    tableData.value = data.rows
    total.value = data.total
    console.log(data)
  })
}

onMounted(() => {
  getData()
})


let editRowType = ref<string>('')

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

let options: TableOptions[] = [
  {
    label: "日期333",
    prop: "date",
    slot: "date",
    align: "center",
    editable: true,
  },
  {
    label: "姓名",
    prop: "name",
    slot: "name",
    align: "center",
  },
  {
    label: "地址",
    prop: "address",
    align: "center",
    editable: true,
  },
  {
    label: "操作",
    prop: '',
    align: "center",
    action: true,
  },
];

const edit = (scope: any) => {
  editRowType.value = 'edit'
};

const del = (scope: any) => {
  editRowType.value = 'del'
}

// 点击勾选
const confirm = (scope: any) => {
  console.log('父组件', scope); 
}

const sizeChange = (val: number) => {
  console.log('sizeChange', val);
  pageSize.value = val
  getData()
}
const currentChange = (val: number) => {
  console.log('currentChange', val);
  current.value = val
  getData()
}
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>