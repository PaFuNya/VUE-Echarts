<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      title: { text: '折线图' },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月']
      },
      yAxis: { type: 'value' },
      series: [{
        name: '销量',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110],
        smooth: true,
        itemStyle: { color: '#91cc75' }
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
