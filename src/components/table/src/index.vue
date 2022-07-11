<template>
  <el-table
    v-bind="$attrs"
    :data="tableData"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    :element-loading-background="elementLoadingBackground"
    @row-click="rowClick"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop]"></el-input>
          </template>
          <template v-else>
          <!-- 编辑状态 -->
          <template v-if="scope.$index + scope.column.id === currentEdit">
            <div class="edit-wrap">
              <el-input size="small" v-model="scope.row[item.prop]"></el-input>
              <div class="edit-action-wrap" @click.stop="clickEditCell">
                <slot
                  v-if="$slots.editCell"
                  :scope="scope"
                  name="editCell"
                ></slot>
                <template v-else>
                  <Check class="check edit" @click="check(scope)"></Check>
                  <Close class="close edit" @click="close(scope)"></Close>
                </template>
              </div>
            </div>
          </template>
          <!-- 原状态 -->
          <template v-else>
            <div class="normal-warp">
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop] }}</span>
              <component
                v-if="item.editable"
                :is="editIcon"
                class="edit"
                @click.stop="clickEdit(scope)"
              />
            </div>
          </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :label="actionOptions?.label"
      :align="actionOptions?.align"
      :width="actionOptions?.width"
    >
      <template #default="scope">
        <slot v-if="scope.row.rowEdit" name="editRow"></slot>
        <slot v-else name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="pagination" class="pagination" :style="{justifyContent: paginationAlignJustify}">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    />
  </div>
</template>
  
<script setup lang='ts'>
import { PropType, computed, ref, onMounted, watch } from "vue";
import { TableOptions } from "./type";
import cloneDeep from 'lodash/cloneDeep';

let props = defineProps({
  // 表格的配置
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
  },
  // 加载方案
  elementLoadingText: {
    type: String,
  },
  // 加载图标名
  elementLoadingSpinner: {
    type: String,
  },
  // 加载背景颜色
  elementLoadingBackground: {
    type: String,
  },
  // 加载svg
  elementLoadingSvg: {
    type: String,
  },
  // 加载svg的配置
  elementLoadingSvgViewBox: {
    type: String,
  },
  // 可编辑单元格显示的图标
  editIcon: {
    type: String,
    default: "edit",
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  // 编辑行的标识
  editRowType: {
    type: String,
    default: "",
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: false,
  },
  // 当前是第几页的数据
  currentPage: {
    type: Number,
    default: 1,
  },
  // 每页数据选项
  pageSizes: {
    type: Array as PropType<Number[] >,
    default: [10, 20, 30, 100],
  },
  // 当前一页多少数据
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
  },
  // 分页的排列方式
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
  }
});

// 分发事件
let emits = defineEmits(["confirm", "cancel", "update:editRowType", "sizeChange", "currentChange"]);
// 当前点击的单元格
let currentEdit = ref<string>("");

// 拷备一份表格数据
let tableData = ref<any[]>(cloneDeep(props.data!))

// 监听父组件传递过来的数据
watch(() => props.data, (val) => {
  tableData.value = cloneDeep(val)!
  tableData.value.map(item => {
    // 代表当前是否是可编辑的状态
    item.rowEdit = false
  })
}, {
  deep: true,
})

onMounted(() => {
  tableData.value.map(item => {
    // 代表当前是否是可编辑的状态
    item.rowEdit = false
  })
})

// 点击编辑图标
const clickEdit = (scope: any) => {
  // 唯一标识
  currentEdit.value = scope.$index + scope.column.id;
};

const clickEditCell = (scope: any) => {
  console.log(11)
  currentEdit.value = "";
}

// 点击勾选
const check = (scope: any) => {
  emits("confirm", scope);
};
// 点击叉
const close = (scope: any) => {
  emits("cancel", scope);
};
// 点击每一行的事件
const rowClick = (row: any, column: any) => {
  console.log(row, column);
  // 判断当前点击的是否是操作项的内容(是否为操作列)
  if(column.label === actionOptions!.value!.label!) {
    // 编辑操作
    console.log(props.editRowType)
    if (props.isEditRow && props.editRowType === 'edit') {
      // 表示点击的按钮是做可编辑操作
      row.rowEdit = !row.rowEdit
      // 重置其它数据的rowEdit属性
      tableData.value.map(item => {
        if (item !== row) item.rowEdit = false;
      })
    }
  }
}

// 分页的条数改变
const handleSizeChange = (val: number) => {
  emits('sizeChange', val)
}
// 分页的页数改变
const handleCurrentChange = (val: number) => {
  emits('currentChange', val)
}

// 过滤操作选项之后的配置
let tableOptions = computed(() => props.options.filter((item) => !item.action));
let actionOptions = computed(() => props.options.find((item) => item.action));
// 表格是否在加载中
let isLoading = computed(() => !props.data || !props.data.length);
// 与flex结合的布局方式
let paginationAlignJustify = computed(() => {
  if(props.paginationAlign === 'left') return 'flex-start'
  else if( props.paginationAlign === 'center') return 'center'
  else return 'flex-end'
})
</script>
  
<style lang="scss" scoped>
.edit {
  width: 1.1em;
  height: 1.1em;
  position: relative;
  // top: 2px;
  left: 4px;
  cursor: pointer;
}
.edit-wrap {
  display: flex;
  align-items: center;
  .edit-action-wrap{
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}
.normal-warp {
  display: flex;
  align-items: center;
}

.pagination{
  display: flex;
  align-items: center;
  margin-top: 16px;
}
</style>