<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      title: { text: '堆叠柱状图' },
      tooltip: { axisPointer: { type: 'shadow' } },
      legend: {},
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五']
      },
      yAxis: { type: 'value' },
      series: [
        { name: '直接访问', type: 'bar', stack: 'total', data: [320, 332, 301, 334, 390] },
        { name: '邮件营销', type: 'bar', stack: 'total', data: [120, 132, 101, 134, 190] },
        { name: '联盟广告', type: 'bar', stack: 'total', data: [220, 182, 191, 234, 290] },
        { name: '视频广告', type: 'bar', stack: 'total', data: [150, 232, 201, 154, 190] },
        { name: '搜索引擎', type: 'bar', stack: 'total', data: [862, 1018, 964, 1026, 1670] }
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
