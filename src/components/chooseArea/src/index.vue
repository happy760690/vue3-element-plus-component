<template>
    <div>
      <el-select placeholder="请选择省份" v-model="province">
        <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
      </el-select>
      <el-select :disabled="!province" style="margin: 0 10px;" placeholder="请选择城市" v-model="city">
        <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name"></el-option>
      </el-select>
      <el-select :disabled="!province || !city" placeholder="请选择区域" v-model="area">
        <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name"></el-option>
      </el-select>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, watch } from 'vue'
  import allArea from '../lib/pca-code.json'
  console.log(allArea);
  
  // 下拉框选择省份的值
  let province = ref<string>('')
  // 下拉框选择城市的值
  let city = ref<string>('')
  // 下拉框选择区域的值
  let area = ref<string>('')
  // 所有的省市区数据
  let areas = ref(allArea)

  // 城市下拉框的所有的值
  let selectCity = ref<any>([])
  // let selectCity = computed(() => {
  //   if (!province.value) return []
  //   else {
  //     let cities = areas.value.find(item => item.code === province.value)?.children
  //     return cities || []
  //   }
    
  // })
  // 区域下拉框的所有的值
  let selectArea = ref<any>([])
  // let selectArea = computed(() => {
  //   if (!city.value) return []
  //   else {
  //     let area = selectCity.value.find(item => item.code === city.value)!.children
  //     return area
  //   }
  // })

  watch(() => 
    province.value, val => {
      if (val) {
        let cities = areas.value.find(item => item.code === province.value)?.children
        selectCity.value = cities
        // return cities || []
      }
    }
  )

  watch(() => 
    province.value, val => {
      if (val) {
        let area = areas.value.find(item => item.code === province.value)?.children
        selectArea.value = area
        // return cities || []
      }
    }
  )

</script>
  
<style>
  
</style>