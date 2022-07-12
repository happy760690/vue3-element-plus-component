<template>
  <m-calendar
    :events="events"
    :eventContent="eventContent"
    displayEventEnd
    @dateClick="dateClick"
    @eventClick="eventClick"
  ></m-calendar>
</template>
  
<script setup lang='ts'>
import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventItem } from "../../components/calendar/src/types";
import { ref, watch } from "vue";

let events = ref<EventItem[]>([
  {
    title: "购物",
    start: "2022-07-15 08:00",
    end: "2022-07-15 12:00",
    editable: true,
  },
  {
    title: "写代码",
    start: "2022-07-16 11:00",
    end: "2022-07-16 18:00",
  },
]);

let dateClick = (info: DateClickArg) => {
  console.log(info);
  events.value.push({
    start: info.dateStr + " 12:00",
    end: info.dateStr + " 18:00",
    title: "学习",
  });
};
let eventClick = (info: EventClickArg) => {
  console.log(info);
};

let eventContent = (arg: EventContentArg) => {
  let el = document.createElement("div");
  console.log(arg);
  let timeText = arg.timeText.split("-");
  let start = timeText[0]
    .replace("上午", "")
    .replace("下午", "")
    .replace("时", "");
  let end = timeText[1]
    .replace("上午", "")
    .replace("下午", "")
    .replace("时", "");
  el.innerHTML = `
        <img src="src/assets/logo.png" style="width:30px;height:30px;"></>
        <div>开始时间：${start},</div>
        <div>结束时间：${end},</div>
        <div>标题：${arg.event._def.title}</div>
        `;
  return {
    domNodes: [el],
  };
};
</script>
  
<style>
</style>