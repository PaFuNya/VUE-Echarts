<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const colorListFi = ["#56c22f", "#8e43ff", "#fa8420", "#27b4b6", "#0f3d5c"];

const productNames = ["高根鞋", "帽子", "雪纺衫", "羊毛衫", "T恤"];

const timelineData = [
  {
    date: "2020-03-10",
    values: [1345, 1045, 626, 643, 343]
  },
  {
    date: "2020-03-11",
    values: [1380, 900, 251, 535, 635]
  },
  {
    date: "2020-03-12",
    values: [1420, 847, 562, 715, 732]
  },
  {
    date: "2020-03-13",
    values: [1455, 745, 647, 238, 151]
  },
  {
    date: "2020-03-14",
    values: [1490, 684, 234, 332, 363]
  }
];

const chartRef = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;

const getSortedProducts = (values: number[]) => {
  const products = productNames.map((name, index) => ({
    name,
    value: values[index],
    index
  }));
  return products.sort((a, b) => b.value - a.value);
};

const initCharts = () => {
  if (!chartRef.value) return;

  myChart = echarts.init(chartRef.value);

  const options = timelineData.map((item) => {
    const sorted = getSortedProducts(item.values);
    const sortedValues = sorted.map((p) => p.value);
    const sortedNames = sorted.map((p) => p.name);

    return {
      title: {
        text: "商品累计销量情况 " + item.date,
        left: "center",
        top: 10,
        textStyle: {
          fontSize: 18,
          color: "#666666",
          fontWeight: "normal"
        }
      },
      grid: {
        left: 0,
        right: "10%",
        top: "18%",
        bottom: "15%",
        containLabel: false,
        backgroundColor: "#ffffff",
        shadowBlur: 10,
        shadowColor: "rgba(0,0,0,0.1)"
      },
      xAxis: {
        type: "value",
        axisLabel: {
          show: true,
          color: "#b2b2b2",
          fontSize: 11,
          margin: 10
        },
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false }
      },
      yAxis: {
        type: "category",
        inverse: true,
        data: sortedNames,
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false }
      },
      series: [
        {
          type: "bar",
          barWidth: 34,
          barGap: "-100%",
          data: sortedValues.map((val: number, index: number) => {
            const originalIndex = sorted[index].index;
            return {
              value: val,
              itemStyle: {
                color: colorListFi[originalIndex % colorListFi.length],
                borderRadius: [0, 4, 4, 0]
              },
              label: {
                show: true,
                position: "right",
                formatter: sorted[index].name + ":" + val,
                color: "#999999",
                fontSize: 12,
                padding: [0, 0, 0, 5]
              }
            };
          }),
          z: 2
        },
        {
          type: "bar",
          barWidth: 34,
          data: sortedValues.map(() => 1500),
          itemStyle: { color: "transparent" },
          markLine: {
            symbol: "none",
            label: {
              show: true,
              position: "end",
              formatter: "1,301.8",
              color: "#999999",
              fontSize: 10
            },
            lineStyle: {
              color: "#999999",
              type: "dashed",
              width: 1
            },
            data: [{ xAxis: 1301.8 }]
          },
          z: 1
        }
      ]
    };
  });

  const option: any = {
    backgroundColor: "#e8e8e8",
    baseOption: {
      timeline: {
        axisType: "category",
        autoPlay: true,
        playInterval: 900,
        data: timelineData.map((item) => item.date.replace("2020-", "")),
        label: {
          formatter: (s: string) => "3-" + s.split("-")[1],
          fontSize: 12,
          color: "#666"
        },
        controlStyle: {
          showPlayBtn: true,
          showNextBtn: true,
          showPrevBtn: true,
          itemSize: 18,
          itemGap: 12,
          color: "#999999",
          borderColor: "#999999"
        },
        checkpointStyle: {
          color: "#56c22f",
          borderColor: "#56c22f",
          borderWidth: 2
        },
        lineStyle: {
          color: "#cccccc"
        },
        progressLineStyle: {
          color: "#56c22f"
        },
        bottom: 5,
        height: 40
      },
      title: options[0].title,
      grid: options[0].grid,
      xAxis: options[0].xAxis,
      yAxis: options[0].yAxis,
      series: options[0].series
    },
    options: options
  };

  myChart.setOption(option);
};

onMounted(() => {
  initCharts();

  window.addEventListener("resize", () => {
    myChart?.resize();
  });
});
</script>

<template>
  <div ref="chartRef" style="width: 700px; height: 450px"></div>
</template>

<style scoped></style>
