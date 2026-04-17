<template>
  <div id="graph" style="width: 800px; height: 600px"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from 'vue'

const initCharts = () => {
  var myChart = echarts.init(document.getElementById("graph"));
  let option = {
    title: {
      text: "关系图",
    },
    label: {},
    legend: {
      x: "center",
      top: "20%",
      data: ["男性", "女性"],
    },
    series: [
      {
        type: "graph",
        layout: "force", // 使用力导向布局
        symbolSize: 50, // 节点大小
        focusNodeAdjacency: true, // 鼠标悬浮时突出显示相关节点和边
        categories: [
          { name: "男性", itemStyle: { color: "#009800" } },
          { name: "女性", itemStyle: { color: "#4592ff" } },
        ], // 分类数据
        label: {},
        force: {
          repulsion: 1000, // 节点之间的斥力
        },
        edgeLabel: {
          show: true,
          textStyle: {
            fontSize: 10,
          },
          formatter: "{c}",
        }, // 边标签
        data: [
          { name: "A", category: 0, draggable: true },
          { name: "B", category: 1, draggable: true },
          { name: "C", category: 0, draggable: true },
          { name: "D", category: 1, draggable: true },
          { name: "E", category: 0, draggable: true },
          { name: "F", category: 1, draggable: true },
          { name: "G", category: 1, draggable: true },
          { name: "H", category: 1, draggable: true },
        ], // 节点数据
        links: [
          { source: 0, target: 1, value: "夫妻" },
          { source: 0, target: 3, value: "父子" },
          { source: 0, target: 5, value: "朋友" },
          { source: 4, target: 5, value: "同事" },
          { source: 2, target: 7, value: "夫妻" },
          { source: 1, target: 7, value: "朋友" },
          { source: 1, target: 4, value: "朋友" },
          { source: 1, target: 6, value: "朋友" },
        ], // 边数据
        lineStyle: {
          opacity: 0.9, // 边的不透明度
          width: 3, // 边的宽度
          curveness: 0.3, // 边的曲度，支持从 0 到 1 的值，值越大曲度越大
        },
      },
    ],
  };
  myChart.setOption(option);
};

onMounted(() => {
  initCharts();
});
</script>

<style scoped></style>
