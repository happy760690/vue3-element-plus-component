<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom-start"
    :width="430"
    trigger="click"
  >
    <template #reference>
      <div @click="visible = !visible" class="result">
        <div>{{ result }}</div>
        <ArrowDown :class="{ rotate: visible }"></ArrowDown>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市">按城市</el-radio-button>
            <!-- <el-radio-button label="按省份" >按省份</el-radio-button> -->
          </el-radio-group>
        </el-col>
        <el-col :offset="1" :span="15">
          <el-select
            @change="changeSelect"
            size="small"
            v-model="selectValue"
            filterable
            placeholder="请搜索"
            :filter-method="filterMethod"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <div class="city">
        <!-- 字母区域 -->
        <div
          class="city-item"
          v-for="(value, index) in Object.keys(cities)"
          @click="clickChat(value)"
          :key="index"
        >
          {{ value }}
        </div>
      </div>
      <el-scrollbar max-height="300px">
        <template v-for="(value, key) in cities" :key="key">
          <el-row style="margin-bottom: 10px" :id="key">
            <el-col :span="2">{{ key }}：</el-col>
            <el-col :span="22" class="city-name">
              <div
                v-for="item in value"
                @click="clickItem(item)"
                class="city-name-item"
                :key="item.id"
              >
                {{ item.name }}
              </div>
            </el-col>
          </el-row>
        </template>
      </el-scrollbar>
    </div>
  </el-popover>
</template>
  
<script setup lang='ts'>
import { ref, onMounted, watch } from "vue";
import city from "../lib/city";
import { City } from "./types";

// 分发事件
let emits = defineEmits(['changeValue'])
// 最终选择的结果
let result = ref<string>("请选择");
// 控制弹出层的显示
let visible = ref<boolean>(false);
// 单选框的值 按城市还是按省份选择
let radioValue = ref<string>("按城市");
// 下拉框的值 搜索下拉框
let selectValue = ref<string>("");
// 下拉框显示城市的数据
const options = ref<City[]>([]);
// 搜索输入框的值
let searchValue = ref<string>("")

// 所有的城市数据
let cities = ref(city.cities);

// 点击每个城市
let clickItem = (item: City) => {
  // 给结果赋值
  result.value = item.name
  // 关闭弹出层 
  visible.value = false

  emits('changeValue', item)
}
// 点击字母区域
let clickChat = (item: string) => {
  let el = document.getElementById(item)
  if (el) el.scrollIntoView()
}

// 监听输入框的值
watch(() => searchValue.value, val => {
  filterMethod
})

onMounted(() => {
  let values = Object.values(cities.value).flat(2)
  options.value = values
})

let filterMethod = (val: string) => {
  let values = Object.values(cities.value).flat(2)
  searchValue.value = val
  options.value = values.filter(item => {
    return item.name.includes(val)
  })
}

let changeSelect = (val: City) => {
  let allCities = Object.values(cities.value).flat(2)
  let city = allCities.find(item => item.id === val)
  console.log(city)
  result.value = city?.name + ''
  visible.value = false

  emits('changeValue', city?.name)
}
// let radioChange = (data: any) => {
//   radioValue.value = data
//   console.log(data, '====数据====');
// }

</script>
  
<style lang="scss" scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
}
.rotate {
  transform: rotate(180deg);
}
svg {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  margin-left: 4px;
  transition: all 0.25s linear;
}
.container {
}
.city {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  .city-item {
    padding: 3px 6px;
    margin-right: 8px;
    margin-bottom: 8px;
    border: 1px solid #eee;
    cursor: pointer;
  }
}
.city-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }
}
</style>