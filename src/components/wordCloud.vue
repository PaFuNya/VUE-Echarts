<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    const option = {
      title: { text: '词云图' },
      tooltip: { show: false },
      series: [{
        type: 'wordCloud',
        shape: 'circle',
        keepAspect: true,
        left: 'center',
        top: 'center',
        width: '90%',
        height: '90%',
        right: null,
        bottom: null,
        sizeRange: [14, 60],
        rotationRange: [-45, 45],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function () {
            const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
            return colors[Math.floor(Math.random() * colors.length)]
          }
        },
        emphasis: { textStyle: { shadowBlur: 10, color: '#333' } },
        data: [
          { name: 'Vue.js', value: 10000 }, { name: 'React', value: 9000 },
          { name: 'Angular', value: 8000 }, { name: 'TypeScript', value: 7000 },
          { name: 'JavaScript', value: 6500 }, { name: 'Node.js', value: 6000 },
          { name: 'Python', value: 5500 }, { name: 'Go', value: 5000 },
          { name: 'Rust', value: 4500 }, { name: 'Docker', value: 4000 },
          { name: 'Kubernetes', value: 3800 }, { name: 'AWS', value: 3600 },
          { name: 'GraphQL', value: 3200 }, { name: 'Redis', value: 3000 },
          { name: 'MongoDB', value: 2800 }, { name: 'PostgreSQL', value: 2600 },
          { name: 'Webpack', value: 2400 }, { name: 'Vite', value: 2200 },
          { name: 'TailwindCSS', value: 2000 }, { name: 'Sass', value: 1800 }
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
