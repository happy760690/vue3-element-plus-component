<template>
    <div>
      <!-- <div class="flex">
        <m-trend text="营业额"></m-trend>
        <m-trend text="销售额" type="down"></m-trend>
      </div>
      <br>
      <div class="flex">
        <m-trend text="营业额" upIconColor="red"></m-trend>
        <m-trend text="销售额" type="down" downIconColor="#abedef"></m-trend>
      </div> -->
      <!-- <m-trend>营业额
      </m-trend>
      <m-trend text="销售业绩"></m-trend> -->
      <!-- <m-trend text="销售额" reverseColor="true"></m-trend>
      <m-trend text="营业额"  reverseColor="true" type="down"></m-trend> -->
      <!-- <m-trend text="营业额" upTextColor="blue"></m-trend>
      <m-trend text="销售额" downTextColor="yellow" type="down"></m-trend> -->
        <m-trend text="营业额" upIcon="Avatar"></m-trend>
        <m-trend text="销售额" type="down"></m-trend>
    </div>
</template>
  
<script setup lang='ts'>
</script>
  
<style lang="scss" scoped>
  .flex{
    display: flex;
    div{
      margin-right: 10px;
    }
  }

</style>