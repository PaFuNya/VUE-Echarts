<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      title: { text: '堆叠面积图' },
      tooltip: { trigger: 'axis' },
      legend: {},
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { boundaryGap: false, type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
      yAxis: { type: 'value' },
      series: [
        { name: '邮件营销', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: [120, 132, 101, 134, 90, 230, 210] },
        { name: '联盟广告', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: [220, 182, 191, 234, 290, 330, 310] },
        { name: '视频广告', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: [150, 232, 201, 154, 190, 330, 410] },
        { name: '直接访问', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: [320, 332, 301, 334, 390, 330, 320] },
        { name: '搜索引擎', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: [820, 932, 901, 934, 1290, 1330, 1320] }
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
