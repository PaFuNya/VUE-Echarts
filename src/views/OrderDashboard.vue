<template>
  <div class="dashboard order-dashboard">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-decoration">◈</span>
        今日订单大屏
        <span class="title-decoration">◈</span>
      </h1>
      <div class="title-line"></div>
    </div>

    <!-- 顶部统计卡片 -->
    <section class="stats-section">
      <div
        v-for="(stat, i) in statsData"
        :key="stat.label"
        class="stat-card"
        :style="{ animationDelay: i * 80 + 'ms' }"
      >
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-info">
          <div class="stat-value" :class="stat.suffix ? 'has-suffix' : ''">
            <CountUp :target="stat.value" :decimals="stat.decimals" />
            <span class="stat-suffix" v-if="stat.suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
        <div class="stat-glow"></div>
      </div>
    </section>

    <!-- 图表区域：上方3饼图 + 下方1柱1线 -->
    <section class="charts-top">
      <PieChart
        title="购买用户设备分布"
        :series-data="devicePieData"
        :delay="100"
        class="chart-item"
      />
      <PieChart
        title="用户年龄分布"
        :series-data="agePieData"
        :delay="200"
        class="chart-item"
      />
      <PieChart
        title="渠道分布"
        :series-data="channelPieData"
        :delay="300"
        class="chart-item"
      />
    </section>

    <section class="charts-bottom">
      <HBarChart
        title="订单量 TOP10 城市"
        :categories="topCities"
        :data="topCityData"
        y-unit=" 单"
        :delay="400"
        class="chart-item"
      />
      <LineChart
        title="订单量分时段统计（24h）"
        :x-data="hoursLabels"
        :y-data="orderHourData"
        y-unit=" 单"
        :delay="500"
        class="chart-item"
      />
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import PieChart    from '../components/charts/PieChart.vue'
import HBarChart   from '../components/charts/HBarChart.vue'
import LineChart   from '../components/charts/LineChart.vue'

/* ── 顶部统计卡片 ── */
const statsData = [
  { label: '今日订单总金额 (元)', value: 34220,  icon: '💰', decimals: 0 },
  { label: '今日成交率',          value: 93.25, icon: '📈', suffix: '%', decimals: 2 },
  { label: '今日取消订单数',      value: 2310,  icon: '❌', decimals: 0 },
  { label: '今日成交订单数',      value: 8820,  icon: '✅', decimals: 0 },
  { label: '今日新增用户数',      value: 1264,  icon: '👤', decimals: 0 },
  { label: '今日退款订单数',      value: 156,   icon: '↩️', decimals: 0 }
]

/* ── 图表1：设备分布 ── */
const devicePieData = [
  { name: 'Mac',     value: 1032  },
  { name: 'iPhone',  value: 10096 },
  { name: 'iPad',    value: 1240  },
  { name: 'Android', value: 15098 },
  { name: 'Windows', value: 4098  },
  { name: '其他',    value: 2656  }
]

/* ── 图表2：年龄分布 ── */
const agePieData = [
  { name: '小于25岁',  value: 11045 },
  { name: '25岁-40岁', value: 20230 },
  { name: '大于40岁',  value: 2945  }
]

/* ── 图表3：渠道分布 ── */
const channelPieData = [
  { name: '天猫', value: 1851  },
  { name: '淘宝', value: 10234 },
  { name: '京东', value: 14575 },
  { name: '拼多多', value: 7560 }
]

/* ── 图表4：TOP10城市 ── */
const topCities = ['城市10', '城市9', '城市8', '城市7', '城市6', '城市5', '城市4', '城市3', '城市2', '城市1']
const topCityData = [409, 780, 1120, 1565, 1790, 2094, 2304, 3105, 3529, 4320]

/* ── 图表5：分时段订单量 ── */
const hoursLabels = Array.from({ length: 24 }, (_, i) => `${i}时`)
const orderHourData = [
  416, 1382, 1318, 1184, 1215, 1557, 1954, 1627, 1180, 1241,
  2678, 3021, 2100, 1809, 2590, 2300, 2890, 3200, 2980, 2560,
  2100, 1720, 1340, 890
]

/* ── 内联数字滚动组件 ── */
import { defineComponent, h, reactive } from 'vue'

const CountUp = defineComponent({
  props: {
    target:   { type: Number, default: 0 },
    decimals: { type: Number, default: 0 }
  },
  setup(props) {
    const state = reactive({ current: 0 })
    onMounted(() => {
      const duration = 1600
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        state.current = parseFloat((ease * props.target).toFixed(props.decimals))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    return () => h('span', props.decimals > 0
      ? state.current.toFixed(props.decimals)
      : state.current.toLocaleString()
    )
  }
})
</script>

<style scoped>
.dashboard {
  min-height: calc(100vh - 64px);
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.order-dashboard {
  background: transparent;
}

.page-header {
  text-align: center;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 4px;
  color: var(--text-primary);
  margin: 0 0 8px;
  transition: color 0.5s ease;
}

.title-decoration {
  color: var(--title-accent);
  margin: 0 12px;
  opacity: 0.6;
  transition: color 0.5s ease;
}

.title-line {
  height: 1px;
  background: var(--divider);
  margin: 0 auto;
  max-width: 400px;
  transition: background 0.5s ease;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}

@media (max-width: 1200px) {
  .stats-section { grid-template-columns: repeat(3, 1fr); }
}

.stat-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg-card);
  backdrop-filter: blur(16px) saturate(1.5);
  -webkit-backdrop-filter: blur(16px) saturate(1.5);
  border: 1px solid var(--border-card);
  border-radius: 10px;
  overflow: hidden;
  animation: statCardIn 0.5s ease-out both;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s, background 0.5s ease;
  cursor: default;
}

@keyframes statCardIn {
  from { opacity: 0; transform: scale(0.85) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.stat-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-hover);
  background: var(--bg-card-hover);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.stat-info { min-width: 0; }

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--stat-value);
  line-height: 1;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: baseline;
  gap: 2px;
  transition: color 0.5s ease;
}

.stat-suffix {
  font-size: 14px;
  font-weight: 400;
}

.stat-label {
  font-size: 11px;
  color: var(--stat-label);
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s ease;
}

.charts-top {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.chart-item { min-height: 280px; }

.charts-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
