<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      title: { text: '漏斗图' },
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
      legend: { data: ['展示', '点击', '访问', '咨询', '订单'] },
      series: [{
        name: '漏斗图',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 4,
        label: { show: true, position: 'inside' },
        emphasis: { label: { fontSize: 20 } },
        data: [
          { value: 1000, name: '展示', itemStyle: { color: '#5470c6' } },
          { value: 800, name: '点击', itemStyle: { color: '#91cc75' } },
          { value: 600, name: '访问', itemStyle: { color: '#fac858' } },
          { value: 400, name: '咨询', itemStyle: { color: '#ee6666' } },
          { value: 200, name: '订单', itemStyle: { color: '#73c0de' } }
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
