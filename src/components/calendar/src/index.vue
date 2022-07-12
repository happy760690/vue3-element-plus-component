<template>
  <div id="calendar"></div>
</template>
  
<script setup lang='ts'>
import '@fullcalendar/core/vdom' // solves problem with Vite
import { Calendar } from "@fullCalendar/core";
import daygrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { onMounted, ref } from "vue";

let props = defineProps({
  // 语言
  locale: {
    type: String,
    default: "zh-cn",
  },
  // 视图模式
  initialView: {
    type: String,
    default: "dayGridMonth",
  },
  // 按钮文字
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: "今天",
        month: "月",
        week: "周",
        day: "日",
        prevYear: "上一年",
        nextYear: "下一年",
        prev: "上一月",
        next: "下一月",
      };
    },
  },
  // 头部工具栏
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: "title",
        center: "",
        end: "prev today next",
      };
    },
  },
  // 底部工具栏
  footerToolbar: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

// 日历实例
let calendar = ref<Calendar>();
// 渲染日历的方法
let renderCalendar = () => {
  let el = document.getElementById("calendar");
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygrid, interaction],
      locale: props.locale,
      initialView: props.initialView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
    });
    calendar.value.render()
  }
};

onMounted(() => {
  renderCalendar();
});
</script>
  
<style>
</style>