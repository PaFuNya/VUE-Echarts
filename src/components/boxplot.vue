<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      title: { text: '箱线图' },
      tooltip: { trigger: 'item' },
      grid: { left: '10%', right: '10%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: ['实验组A', '实验组B', '实验组C'],
        boundaryGap: true
      },
      yAxis: { type: 'value', splitNumber: 3 },
      series: [{
        name: '箱线图',
        type: 'boxplot',
        data: [
          [650, 900, 1195, 1450, 1600],
          [500, 800, 1150, 1300, 1550],
          [600, 850, 1250, 1400, 1700]
        ]
      }]
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
