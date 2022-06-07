<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
        <el-scrollbar max-heigth="300px">
          <div class="container" @click="clickItem(item1, index1)" v-for="(item1, index1) in item.content" :key="index1">
            <div>
              {{ item1.title }}
            </div>
          </div>
        </el-scrollbar>
        <div class="actions">
          <div class="a-item" @click="clickAction(action, i)"
            v-for="(action, i) in actions"
            :key="i"
          >
            <div class="a-icon" v-if="action.icon">
              <component :is="action.icon"></component>
            </div>
            <div class="a-text">
              {{ action.text }}
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  
<script setup lang='ts'>
import { defineEmits, PropType } from 'vue'
import { ListOptions, ActionOptions, ListItem } from './types'
let props = defineProps({
  // 列表的内容
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true
  },
  // 操作的内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})

let emits = defineEmits(['clickItem', 'clickAction'])

let clickItem = (item: ListItem, index: number) => {
  emits('clickItem', {item, index})
}

let clickAction = (item: ActionOptions, index: number) => {
  emits('clickAction', {item, index})
}
</script>
  
<style>
</style>