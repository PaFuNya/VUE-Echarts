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
  title:    { type: String, default: '折线图' },
  xData:    { type: Array,  default: () => [] },
  yData:    { type: Array,  default: () => [] },
  yUnit:    { type: String, default: '' },
  delay:    { type: Number, default: 0 }
})

/* 注入主题和全局 Toast */
const chartTheme = inject('chartTheme', ref('macarons'))
const showToast  = inject('showToast', (msg) => console.log(msg))

const chartRef = ref(null)
let chartInstance = null

function initChart() {
  if (!chartRef.value) return
  if (chartInstance) { chartInstance.dispose(); chartInstance = null }
  chartInstance = echarts.init(chartRef.value, chartTheme.value)

  const option = {
    backgroundColor: 'transparent',
    animation: true,
    animationDuration: 1400,
    animationEasing: 'quarticOut',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e4e7ed',
      textStyle: { color: '#303133' },
      axisPointer: {
        type: 'cross',
        lineStyle: { color: '#c0c4cc' }
      }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: props.xData,
      boundaryGap: false,
      axisLine:  { lineStyle: { color: '#dcdfe6' } },
      axisLabel: { color: '#909399', fontSize: 11 },
      axisTick:  { show: false }
    },
    yAxis: {
      type: 'value',
      name: props.yUnit,
      nameTextStyle: { color: '#909399' },
      axisLine:  { show: false },
      axisLabel: { color: '#909399', fontSize: 11 },
      splitLine: { lineStyle: { color: '#ebeef5', type: 'dashed' } }
    },
    series: [
      {
        type: 'line',
        data: props.yData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#409eff', borderWidth: 2, borderColor: '#fff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0,   color: 'rgba(64,158,255,0.25)' },
            { offset: 0.7, color: 'rgba(64,158,255,0.05)' },
            { offset: 1,   color: 'rgba(64,158,255,0)' }
          ])
        },
        emphasis: {
          itemStyle: { color: '#fff', borderColor: '#409eff', borderWidth: 3 }
        }
      }
    ]
  }

  chartInstance.setOption(option)

  /* ★ 绑定点击事件 → 全局 Toast + console.log */
  chartInstance.on('click', (params) => {
    const msg = `【${params.name}】的数值为 ${params.value}${props.yUnit}`
    console.log('[折线图点击]', msg)
    showToast(msg)
  })
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

watch([() => props.xData, () => props.yData], () => {
  chartInstance?.setOption({
    xAxis: { data: props.xData },
    series: [{ data: props.yData }]
  })
}, { deep: true })

/* 监听主题变化 → 重新初始化 */
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
  min-height: 220px;
}

</style>
