<template>
  <div style="padding: 40px; background: #fff; color: #333;">
    <h2>堆叠柱状图</h2>
    <div id="stackBar" style="width: 600px; height: 400px"></div>

    <h2 style="margin-top:30px">关系图</h2>
    <div id="graph" style="width: 800px; height: 600px"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from "echarts";
export default {
  mounted() {
    this.initStackBar();
    this.initGraph();
  },
  methods: {
    initStackBar() {
      var el = document.getElementById("stackBar");
      if (!el) return;
      var myChart = echarts.init(el);
      myChart.setOption({
        tooltip: { axisPointer: { type: 'shadow' } },
        legend: { data: ['Direct','Email','Union Ads','Video Ads','Search Engine'] },
        xAxis: { type: 'category', data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
        yAxis: { type: 'value' },
        series: [
          { name: 'Direct', type: 'bar', stack: 'x', data: [320,332,301,334,390,330,320] },
          { name: 'Email', type: 'bar', stack: 'x', data: [120,132,101,134,90,230,210] },
          { name: 'Union Ads', type: 'bar', stack: 'x', data: [220,182,191,234,290,330,310] },
          { name: 'Video Ads', type: 'bar', stack: 'x', data: [150,232,201,154,190,330,410] },
          { name: 'Search Engine', type: 'bar', stack: 'x', data: [820,932,901,934,1290,1330,1320] }
        ]
      });
    },
    initGraph() {
      var el = document.getElementById("graph");
      if (!el) return;
      var myChart = echarts.init(el);
      myChart.setOption({
        title: { text: "关系图" },
        legend: { x: "center", top: "20%", data: ["男性", "女性"] },
        series: [{
          type: "graph",
          layout: "force",
          symbolSize: 50,
          focusNodeAdjacency: true,
          categories: [
            { name: "男性", itemStyle: { color: "#009800" } },
            { name: "女性", itemStyle: { color: "#4592ff" } }
          ],
          label: {},
          force: { repulsion: 1000 },
          edgeLabel: { show: true, textStyle: { fontSize: 10 }, formatter: "{c}" },
          data: [
            { name: "A", category: 0, draggable: true },
            { name: "B", category: 1, draggable: true },
            { name: "C", category: 0, draggable: true },
            { name: "D", category: 1, draggable: true },
            { name: "E", category: 0, draggable: true },
            { name: "F", category: 1, draggable: true },
            { name: "G", category: 1, draggable: true },
            { name: "H", category: 1, draggable: true }
          ],
          links: [
            { source: 0, target: 1, value: "夫妻" },
            { source: 0, target: 3, value: "父子" },
            { source: 0, target: 5, value: "朋友" },
            { source: 4, target: 5, value: "同事" },
            { source: 2, target: 7, value: "夫妻" },
            { source: 1, target: 7, value: "朋友" },
            { source: 1, target: 4, value: "朋友" },
            { source: 1, target: 6, value: "朋友" }
          ],
          lineStyle: { opacity: 0.9, width: 3, curveness: 0.3 }
        }]
      });
    }
  }
}
</script>

<style scoped></style>
