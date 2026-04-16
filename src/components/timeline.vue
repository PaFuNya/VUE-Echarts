<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      title: { text: '时间线图表', subtext: '数据趋势变化' },
      timeline: {
        axisType: 'category',
        autoPlay: true,
        playInterval: 1500,
        data: ['2019', '2020', '2021', '2022', '2023']
      },
      options: [
        { title: { text: '2019年数据' }, xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] }, yAxis: { type: 'value' }, series: [{ name: '数值', type: 'bar', data: [120, 200, 150, 80, 70] }] },
        { title: { text: '2020年数据' }, xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] }, yAxis: { type: 'value' }, series: [{ name: '数值', type: 'bar', data: [180, 250, 190, 120, 110] }] },
        { title: { text: '2021年数据' }, xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] }, yAxis: { type: 'value' }, series: [{ name: '数值', type: 'bar', data: [220, 300, 240, 160, 140] }] },
        { title: { text: '2022年数据' }, xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] }, yAxis: { type: 'value' }, series: [{ name: '数值', type: 'bar', data: [280, 350, 290, 210, 190] }] },
        { title: { text: '2023年数据' }, xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] }, yAxis: { type: 'value' }, series: [{ name: '数值', type: 'bar', data: [320, 400, 340, 260, 230] }] }
      ]
    }
    chartInstance.setOption(option)
  }
})

onUnmounted(() => {
  chartInstance?.dispose()
})
</script>

<template>
  <div ref="chartRef" class="chart"></div>
</template>

<style scoped>
.chart { width: 100%; height: 100%; }
</style>
