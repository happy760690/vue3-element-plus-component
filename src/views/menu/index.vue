<template>
  <div style="width: 200px; ">
    <m-menu :data="data1" defaultActive="1" active-text-color="red"></m-menu>
    <!-- <m-infinite-menu :data="data2" defaultActive="1" background-color="yellow" active-text-color="red"></m-infinite-menu> -->
  </div>
</template>
  
<script setup lang='ts'>
let data1 = [
  {
    name: "导航1",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
      },
    ],
  },
];

let data2 = [
  {
    name: "导航1",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
        children: [
          {
            name: "导航3-1-1",
            index: "3-1-1",
            icon: "Document",
            children: [
              {
                name: "导航3-1-1-1",
                index: "3-1-1-1",
                icon: "Document",
              }
            ]
          }
        ]
      },
    ],
  },
];
</script>
  
<style>
</style>