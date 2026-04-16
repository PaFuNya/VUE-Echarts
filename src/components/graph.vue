<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// 全量引入 echarts
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
let chartInstance: any = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)

    const option = {
      title: {
        text: '关系图',
        left: 'center',
        top: 10,
        textStyle: { fontSize: 24, color: '#333' }
      },
      legend: {
        data: ['男性', '女性'],
        bottom: 20,
        textStyle: { color: '#333' }
      },
      series: [{
        type: "graph",
        layout: "force",
        symbolSize: 50,
        focusNodeAdjacency: true,
        roam: true,
        categories: [
          { name: "男性", itemStyle: { color: "#009800" } },
          { name: "女性", itemStyle: { color: "#4592ff" } },
        ],
        label: {
          show: true,
          position: "inside",
          textStyle: { fontSize: 14, color: "#fff" }
        },
        force: {
          repulsion: 1000,
          edgeLength: [80, 200]
        },
        edgeLabel: {
          show: true,
          formatter: "{c}",
          textStyle: { fontSize: 12, color: "#333" }
        },
        data: [
          { name: "A", category: 0, draggable: true },
          { name: "B", category: 1, draggable: true },
          { name: "C", category: 0, draggable: true },
          { name: "D", category: 1, draggable: true },
          { name: "E", category: 0, draggable: true },
          { name: "F", category: 1, draggable: true },
          { name: "G", category: 1, draggable: true },
          { name: "H", category: 1, draggable: true },
        ],
        links: [
          { source: 0, target: 1, value: "夫妻" },
          { source: 0, target: 3, value: "父子" },
          { source: 0, target: 5, value: "朋友" },
          { source: 4, target: 5, value: "同事" },
          { source: 2, target: 7, value: "夫妻" },
          { source: 1, target: 7, value: "朋友" },
          { source: 1, target: 4, value: "朋友" },
          { source: 1, target: 6, value: "朋友" },
        ],
        lineStyle: {
          opacity: 0.8,
          width: 3,
          curveness: 0.3,
          color: "#999"
        }
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
  <div class="graph-wrapper">
    <h2 class="title">关系图</h2>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<style scoped>
.graph-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-top: 20px;
  font-size: 24px;
  color: #333333 !important;
}

.chart {
  width: 90%;
  height: calc(100% - 80px);
  margin-top: 16px;
}
</style>
