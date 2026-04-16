<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      title: { text: '旭日图' },
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: d% ({c})' },
      visualMap: { show: false, min: 200, max: 600, inRange: { colorLightness: [0.2, 1] } },
      series: [{
        name: '访问来源',
        type: 'sunburst',
        radius: ['15%', '85%'],
        itemStyle: { borderRadius: 6 },
        label: { rotate: 'radial' },
        data: [
          { value: 400, name: '直接访问', children: [{ value: 250, name: '首页' }, { value: 150, name: '搜索页' }] },
          { value: 520, name: '邮件营销', children: [{ value: 350, name: '推广链接' }, { value: 170, name: '邮件内容' }] },
          { value: 400, name: '联盟广告', children: [{ value: 240, name: '图片广告' }, { value: 160, name: '文字广告' }] },
          { value: 550, name: '视频广告', children: [{ value: 300, name: '短视频' }, { value: 250, name: '长视频' }] },
          { value: 450, name: '搜索引擎', children: [{ value: 270, name: '百度' }, { value: 180, name: '谷歌' }] }
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
