<template>
  <div id="calendar"></div>
</template>
  
<script setup lang='ts'>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import { Calendar, EventClickArg, EventContentArg } from "@fullCalendar/core";
import daygrid from "@fullcalendar/daygrid";
import interaction, { DateClickArg } from "@fullcalendar/interaction";
import { onMounted, PropType, ref, watch } from "vue";
import { EventItem } from "./types";

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
  // 事件源
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => [],
  },
  // 为日历添加结束时间
  displayEventEnd: {
    type: Boolean,
    default: false,
  },
  // 自定义日历渲染内容
  eventContent: {
    type: Function,
  },
});

// 分发事件
let emits = defineEmits(["dateClick", "eventClick"]);
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
      eventSources: [
        {
          // 渲染日历的事件
          events(e, callback) {
            if (props.events.length) {
              callback(props.events);
            } else {
              callback([]);
            }
          },
        },
      ],
      // 点击日历上的某一天
      dateClick: (info: DateClickArg) => {
        emits("dateClick", info);
      },
      eventClick(info: EventClickArg) {
        emits("eventClick", info);
      },
      displayEventEnd: props.displayEventEnd,
      eventContent: props.eventContent,
    });
    calendar.value.render();
  }
};

onMounted(() => {
  renderCalendar();
});

// 监听父组件传递的事件源
watch(
  () => props.events,
  (val) => {
    renderCalendar();
  },
  {
    deep: true,
  }
);
</script>
  
<style>
</style>