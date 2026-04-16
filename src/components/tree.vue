<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      title: { text: '树图' },
      tooltip: { trigger: 'item', triggerOn: 'mousemove' },
      series: [{
        type: 'tree',
        data: [{
          name: '根节点',
          children: [
            {
              name: '分支一',
              children: [
                { name: '叶子1-1' },
                { name: '叶子1-2' }
              ]
            },
            {
              name: '分支二',
              children: [
                { name: '叶子2-1' },
                { name: '叶子2-2' },
                { name: '叶子2-3' }
              ]
            },
            {
              name: '分支三',
              children: [
                { name: '叶子3-1' }
              ]
            }
          ]
        }],
        top: '10%',
        left: '15%',
        bottom: '10%',
        right: '20%',
        symbolSize: 12,
        label: { position: 'left', verticalAlign: 'middle', align: 'right' },
        leaves: {
          label: { position: 'right', verticalAlign: 'middle', align: 'left' }
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
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
