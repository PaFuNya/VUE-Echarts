<template>
  <div id="stackBar" style="width: 600px; height: 400px"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import "../assets/westeros.js";
import { onMounted } from 'vue'

const initCharts = () => {
  var myChart = echarts.init(document.getElementById("stackBar"), "westeros");
  let option = {
    title: { text: '堆叠柱状图' },
    tooltip: { axisPointer: { type: 'shadow' } },
    legend: {},
    xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五'] },
    yAxis: { type: 'value' },
    series: [
      { name: '直接访问', type: 'bar', stack: 'total', data: [320, 332, 301, 334, 390] },
      { name: '邮件营销', type: 'bar', stack: 'total', data: [120, 132, 101, 134, 190] },
      { name: '联盟广告', type: 'bar', stack: 'total', data: [220, 182, 191, 234, 290] },
      { name: '视频广告', type: 'bar', stack: 'total', data: [150, 232, 201, 154, 190] },
      { name: '搜索引擎', type: 'bar', stack: 'total', data: [862, 1018, 964, 1026, 1670] }
    ]
  };
  myChart.setOption(option);
};

onMounted(() => {
  initCharts();
});
</script>

<style scoped></style>
