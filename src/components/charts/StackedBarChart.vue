<template>
  <div class="chart-card" :style="{ animationDelay: delay + 'ms' }">
    <div class="chart-title">{{ title }}</div>
    <div ref="chartRef" class="chart-body"></div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title:      { type: String, default: '堆积条形图' },
  categories: { type: Array,  default: () => [] },
  series:     { type: Array,  default: () => [] },
  delay:      { type: Number, default: 0 }
})

const chartTheme = inject('chartTheme', ref('macarons'))

const chartRef = ref(null)
let chartInstance = null

function initChart() {
  if (!chartRef.value) return
  if (chartInstance) { chartInstance.dispose(); chartInstance = null }
  chartInstance = echarts.init(chartRef.value, chartTheme.value)

  const option = {
    backgroundColor: 'transparent',
    animation: true,
    animationDuration: 1300,
    animationEasing: 'elasticOut',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e4e7ed',
      textStyle: { color: '#303133' }
    },
    legend: {
      top: 4,
      textStyle: { color: '#606266', fontSize: 11 },
      icon: 'roundRect',
      itemWidth: 12, itemHeight: 8
    },
    grid: { left: '3%', right: '5%', bottom: '3%', top: '36px', containLabel: true },
    xAxis: {
      type: 'value',
      axisLine:  { show: false },
      axisLabel: { color: '#909399', fontSize: 11 },
      splitLine: { lineStyle: { color: '#ebeef5', type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: props.categories,
      axisLine:  { lineStyle: { color: '#dcdfe6' } },
      axisLabel: { color: '#606266', fontSize: 11 },
      axisTick:  { show: false }
    },
    series: props.series.map(s => ({
      name: s.name,
      type: 'bar',
      stack: 'total',
      barMaxWidth: 28,
      data: s.data,
      itemStyle: {
        borderRadius: s.isLast ? [0, 4, 4, 0] : 0
      },
      emphasis: {
        focus: 'series',
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' }
      },
      label: {
        show: false
      }
    }))
  }

  chartInstance.setOption(option)
}

function resizeChart() {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose()
})

watch([() => props.categories, () => props.series], () => {
  chartInstance?.setOption({
    yAxis: { data: props.categories },
    series: props.series.map(s => ({ name: s.name, data: s.data }))
  })
}, { deep: true })

watch(chartTheme, () => { initChart() })
</script>

<style scoped>
.chart-card {
  position: relative;
  background: var(--bg-card);
  backdrop-filter: blur(16px) saturate(1.5);
  -webkit-backdrop-filter: blur(16px) saturate(1.5);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: cardSlideUp 0.6s ease-out both;
  transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s, background 0.5s ease;
}

.chart-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-hover);
  background: var(--bg-card-hover);
  transform: translateY(-2px);
}

@keyframes cardSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.chart-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 1px;
  margin-bottom: 8px;
  padding-left: 8px;
  border-left: 3px solid var(--color-accent);
  transition: color 0.5s ease, border-color 0.5s ease;
}

.chart-body {
  flex: 1;
  min-height: 240px;
}
</style>
