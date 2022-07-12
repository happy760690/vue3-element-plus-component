<template>
  <m-calendar 
  :events="events"
  @dateClick="dateClick"
  @eventClick="eventClick"
  ></m-calendar>
</template>
  
<script setup lang='ts'>
import { EventClickArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventItem } from "../../components/calendar/src/types";
import { ref, watch } from 'vue';

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
        start: info.dateStr + ' 12:00',
        end: info.dateStr + ' 18:00',
        title: '学习',
    })
}
let eventClick = (info: EventClickArg) => {
    console.log(info);  
}

</script>
  
<style>
</style>