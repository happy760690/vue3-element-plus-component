<template>
  <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="(item, i) in data" :key="i">
      <el-menu-item
        v-if="!item[children] || !item[children].length"
        :index="item.index"
      >
        <component v-if="item[icon]" :is="item[icon]"></component>
        <span>{{ item[name] }}</span>
      </el-menu-item>
      <el-sub-menu
        v-if="item[children] && item[children].length > 0"
        :index="item.index"
      >
        <template #title>
          <component v-if="item[icon]" :is="item[icon]"></component>
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item v-for="(item1, index1) in data" :key="index1">
          <component v-if="item1[icon]" :is="item1[icon]"></component>
          <span>{{ item1[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>
  
<script setup lang='ts'>
import { PropType } from "vue";
// import { MenuItem } from "./types";

let props = defineProps({
  // 导航菜单的数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default: "",
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },
  // 键名
  // 菜单标题的键名
  name: {
    tnameype: String,
    default: "name",
  },
  // 菜单标识的键名
  index: {
    type: String,
    default: 'index'
  },
  // 图标的键名
  icon: {
    type: String,
    default: 'icon'
  },
  // 子菜单的键名
  children: {
    type: String,
    default: 'children'
  }
});

</script>
  
<style lang="scss" scoped>
svg {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
}
</style>