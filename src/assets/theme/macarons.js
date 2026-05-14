import * as echarts from 'echarts'

const theme = {
  color: [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
  ],
  backgroundColor: 'rgba(0,0,0,0)',
  textStyle: {},
  title: {
    textStyle: { fontWeight: 'normal', color: '#008acd' },
    subtextStyle: { color: '#aaaaaa' }
  },
  line: {
    itemStyle: { borderWidth: 1 },
    lineStyle: { width: 2 },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: true
  },
  radar: {
    itemStyle: { borderWidth: 1 },
    lineStyle: { width: 2 },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: true
  },
  bar: {
    itemStyle: { barBorderWidth: 0, barBorderColor: '#ccc' }
  },
  pie: {
    itemStyle: { borderWidth: 0, borderColor: '#ccc' }
  },
  scatter: {
    itemStyle: { borderWidth: 0, borderColor: '#ccc' }
  },
  boxplot: {
    itemStyle: { borderWidth: 0, borderColor: '#ccc' }
  },
  parallel: {
    itemStyle: { borderWidth: 0, borderColor: '#ccc' }
  },
  sankey: {
    itemStyle: { borderWidth: 0, borderColor: '#ccc' }
  },
  funnel: {
    itemStyle: { borderWidth: 0, borderColor: '#ccc' }
  },
  gauge: {
    itemStyle: { borderWidth: 0, borderColor: '#ccc' }
  },
  candlestick: {
    itemStyle: {
      color: '#d87a80', color0: '#2ec7c9',
      borderColor: '#d87a80', borderColor0: '#2ec7c9', borderWidth: 1
    }
  },
  graph: {
    itemStyle: { borderWidth: 0, borderColor: '#ccc' },
    lineStyle: { width: 1, color: '#aaaaaa' },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: true,
    color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80'],
    label: { color: '#eeeeee' }
  },
  map: {
    itemStyle: {
      areaColor: '#dddddd', borderColor: '#eeeeee',
      borderWidth: 0.5
    },
    label: { color: '#d87a80' },
    emphasis: {
      itemStyle: { areaColor: 'rgba(254,153,78,1)', borderColor: '#444', borderWidth: 1 },
      label: { color: 'rgb(100,0,0)' }
    }
  },
  geo: {
    itemStyle: {
      areaColor: '#dddddd', borderColor: '#eeeeee', borderWidth: 0.5
    },
    label: { color: '#d87a80' },
    emphasis: {
      itemStyle: { areaColor: 'rgba(254,153,78,1)', borderColor: '#444', borderWidth: 1 },
      label: { color: 'rgb(100,0,0)' }
    }
  },
  categoryAxis: {
    axisLine: { show: true, lineStyle: { color: '#aaaaaa' } },
    axisTick: { show: false, lineStyle: { color: '#333' } },
    axisLabel: { show: true, color: '#999999' },
    splitLine: { show: true, lineStyle: { color: ['#e6e6e6'] } },
    splitArea: { show: false, areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'] } }
  },
  valueAxis: {
    axisLine: { show: true, lineStyle: { color: '#aaaaaa' } },
    axisTick: { show: false, lineStyle: { color: '#333' } },
    axisLabel: { show: true, color: '#999999' },
    splitLine: { show: true, lineStyle: { color: ['#e6e6e6'] } },
    splitArea: { show: false, areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'] } }
  },
  logAxis: {
    axisLine: { show: true, lineStyle: { color: '#aaaaaa' } },
    axisTick: { show: false, lineStyle: { color: '#333' } },
    axisLabel: { show: true, color: '#999999' },
    splitLine: { show: true, lineStyle: { color: ['#e6e6e6'] } },
    splitArea: { show: false, areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'] } }
  },
  timeAxis: {
    axisLine: { show: true, lineStyle: { color: '#aaaaaa' } },
    axisTick: { show: false, lineStyle: { color: '#333' } },
    axisLabel: { show: true, color: '#999999' },
    splitLine: { show: true, lineStyle: { color: ['#e6e6e6'] } },
    splitArea: { show: false, areaStyle: { color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'] } }
  },
  toolbox: {
    iconStyle: { borderColor: '#2ec7c9' },
    emphasis: { iconStyle: { borderColor: '#18a4a6' } }
  },
  legend: {
    textStyle: { color: '#999999' }
  },
  tooltip: {
    axisPointer: {
      lineStyle: { color: '#008acd', width: 1 },
      crossStyle: { color: '#008acd', width: 1 }
    }
  },
  timeline: {
    lineStyle: { color: '#008acd', width: 1 },
    itemStyle: { color: '#008acd', borderWidth: 1 },
    controlStyle: {
      color: '#008acd', borderColor: '#008acd', borderWidth: 0.5
    },
    checkpointStyle: { color: '#2ec7c9', borderColor: '#2ec7c9' },
    label: { color: '#008acd' },
    emphasis: {
      itemStyle: { color: '#a9334c' },
      controlStyle: { color: '#008acd', borderColor: '#008acd', borderWidth: 0.5 },
      label: { color: '#008acd' }
    }
  },
  visualMap: {
    color: ['#5ab1ef', '#e0ffff']
  },
  dataZoom: {
    backgroundColor: 'rgba(47,69,84,0)',
    dataBackgroundColor: 'rgba(239,246,255,0.3)',
    fillerColor: 'rgba(167,183,204,0.4)',
    handleColor: '#a7b7cc',
    handleSize: '100%',
    textStyle: { color: '#333' }
  },
  markPoint: {
    label: { color: '#eeeeee' },
    emphasis: { label: { color: '#eeeeee' } }
  }
}

echarts.registerTheme('macarons', theme)
