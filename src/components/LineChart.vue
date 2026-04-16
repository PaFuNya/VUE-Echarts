<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

// 图表容器引用
const chartRef = ref<HTMLElement | null>(null)
// ECharts实例
let chartInstance: echarts.ECharts | null = null

// 示例数据
const chartData = {
  xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  seriesData: [120, 200, 150, 80, 70, 110, 130]
}

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  
  // 初始化ECharts实例
  chartInstance = echarts.init(chartRef.value)
  
  // 配置项
  const option = {
    title: {
      text: '一周数据统计（柱状图）',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.xAxisData,
      axisLabel: {
        color: '#666'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#666'
      }
    },
    series: [
      {
        name: '数据量',
        type: 'bar',
        data: chartData.seriesData,
        itemStyle: {
          color: '#5470c6',
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '60%',
        emphasis: {
          itemStyle: {
            color: '#3c5ccf'
          }
        }
      }
    ]
  }
  
  // 设置配置项
  chartInstance.setOption(option)
  
  // 响应窗口大小变化
  window.addEventListener('resize', handleResize)
}

// 处理窗口大小变化
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 组件挂载时初始化图表
onMounted(() => {
  initChart()
})

// 组件卸载时清理资源
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="line-chart-container">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<style scoped>
.line-chart-container {
  width: 100%;
  height: 100%;
}

.chart {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>