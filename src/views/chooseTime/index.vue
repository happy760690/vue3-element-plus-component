<template>
  <m-choose-time
    :startOptions="startOptions"
    @startChange="startChange"
    @endChange="endChange"
  ></m-choose-time>
  <br />
  <m-choose-date
    :disableToday="false"
    @startChange="dateStartChange"
    :startOptions="startOptions"
    @endChange="dateEndChange"
  ></m-choose-date>
</template>
  
<script setup lang='ts'>
interface endValue {
  startTime: string;
  endTime: string;
}
interface dateEndValue {
  startDate: Date;
  endDate: Date;
}

let startChange = (val: string) => {
  console.log(val);
};

let endChange = (val: endValue) => {
  console.log(val);
};

let dateStartChange = (val: Date) => {
  console.log(val);
};

let dateEndChange = (val: dateEndValue) => {
  console.log(val);
};

let startOptions = {
  // size: "mini",
  // clearable: false,
};
</script>
  
<style>
</style>