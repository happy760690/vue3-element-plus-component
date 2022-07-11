<template>
  <el-table
    :data="data"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    :element-loading-background="elementLoadingBackground"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <!-- 编辑状态 -->
          <template v-if="scope.$index + scope.column.id === currentEdit">
            <div class="edit-wrap">
              <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
              <div class="edit-action-wrap" @click="clickEditCell">
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
              <span v-else>{{ scope.row[item.prop!] }}</span>
              <component
                v-if="item.editable"
                :is="editIcon"
                class="edit"
                @click="clickEdit(scope)"
              />
            </div>
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
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script setup lang='ts'>
import { PropType, computed, ref } from "vue";
import { TableOptions } from "./type";

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
});

// 分发事件
let emits = defineEmits(["confirm", "cancel"]);
// 当前点击的单元格
let currentEdit = ref<string>("");

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
// 过滤操作选项之后的配置
let tableOptions = computed(() => props.options.filter((item) => !item.action));
let actionOptions = computed(() => props.options.find((item) => item.action));
// 表格是否在加载中
let isLoading = computed(() => !props.data || !props.data.length);
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
</style>