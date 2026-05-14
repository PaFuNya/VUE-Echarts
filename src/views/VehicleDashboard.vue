<template>
  <div class="dashboard vehicle-dashboard">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-decoration">◈</span>
        车联网情况大屏
        <span class="title-decoration">◈</span>
      </h1>
      <div class="title-line"></div>
    </div>

    <!-- 顶部数据面板（6个统计卡片，纯 HTML 渲染） -->
    <section class="stats-section">
      <div
        v-for="(stat, i) in statsData"
        :key="stat.label"
        class="stat-card"
        :style="{ animationDelay: i * 80 + 'ms' }"
      >
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-info">
          <div class="stat-value">
            <CountUp :target="stat.value" />
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
        <div class="stat-glow"></div>
      </div>
    </section>

    <!-- 图表区域 2×2 网格 -->
    <section class="charts-section">
      <!-- 车辆类型统计（饼图） -->
      <PieChart
        title="车辆类型统计"
        :series-data="vehicleTypePieData"
        :delay="100"
        class="chart-item"
      />

      <!-- 车辆报警统计（饼图） -->
      <PieChart
        title="车辆报警统计"
        :series-data="alarmPieData"
        :delay="200"
        class="chart-item"
      />

      <!-- 车辆状态统计（堆积条形图） -->
      <StackedBarChart
        title="车辆状态统计"
        :categories="vehicleStateCategories"
        :series="vehicleStateSeries"
        :delay="300"
        class="chart-item"
      />

      <!-- 车辆行驶数量（折线图） -->
      <LineChart
        title="车辆行驶数量（24h 趋势）"
        :x-data="hoursLabels"
        :y-data="vehicleDrivingData"
        y-unit=" 辆"
        :delay="400"
        class="chart-item"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PieChart         from '../components/charts/PieChart.vue'
import StackedBarChart  from '../components/charts/StackedBarChart.vue'
import LineChart        from '../components/charts/LineChart.vue'

/* ── 顶部统计卡片数据 ── */
const statsData = [
  { label: '车辆总数 (辆)',       value: 34220, icon: '🚗' },
  { label: '车辆行驶数 (辆)',     value: 34220, icon: '🛣️' },
  { label: '行驶里程总数 (km)',   value: 34220, icon: '📏' },
  { label: '行驶里程平均数 (km)', value: 34220, icon: '📊' },
  { label: '行驶时长总数 (h)',    value: 34220, icon: '⏱️' },
  { label: '行驶时长平均数 (h)',  value: 34220, icon: '⏰' }
]

/* ── 图表1：车辆类型统计饼图 ── */
const vehicleTypePieData = [
  { name: '客运车',       value: 1032  },
  { name: '危险品运输车', value: 10096 },
  { name: '网约车',       value: 1240  },
  { name: '校车',         value: 15098 },
  { name: '私家车',       value: 4098  }
]

/* ── 图表2：车辆报警统计饼图 ── */
const alarmPieData = [
  { name: '超速', value: 512 },
  { name: 'SOS',  value: 302 },
  { name: '偏移', value: 743 },
  { name: '其他', value: 205 }
]

/* ── 图表3：车辆状态统计（堆积条形图） ── */
const vehicleStateCategories = ['客运车', '危险品运输车', '网约车', '校车', '私家车']
const vehicleStateSeries = [
  { name: '停车', data: [312, 2801, 380, 4200, 1102], isLast: false },
  { name: '行驶', data: [520, 4896, 610, 7340, 1890], isLast: false },
  { name: '熄火', data: [140, 1850, 180, 2680,  780], isLast: false },
  { name: '离线', data: [ 60,  549,  70,  878,  326], isLast: true  }
]

/* ── 图表4：车辆行驶数量折线图（24小时） ── */
const hoursLabels = Array.from({ length: 24 }, (_, i) => `${i}时`)
const vehicleDrivingData = [
  1200, 980, 750, 620, 580, 640, 1050, 2380, 3620, 4100,
  4350, 4480, 4200, 3980, 4100, 4250, 4480, 4300, 3820, 3200,
  2650, 2100, 1700, 1380
]

/* ── 数字滚动组件（内联实现） ── */
import { defineComponent, h, reactive } from 'vue'

const CountUp = defineComponent({
  props: { target: Number },
  setup(props) {
    const state = reactive({ current: 0 })
    onMounted(() => {
      const duration = 1600
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        state.current = Math.round(ease * props.target)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    return () => h('span', state.current.toLocaleString())
  }
})
</script>

<style scoped>
.dashboard {
  min-height: calc(100vh - 64px);
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.vehicle-dashboard {
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
  font-size: 22px;
  font-weight: 700;
  color: var(--stat-value);
  line-height: 1;
  font-family: 'Courier New', monospace;
  transition: color 0.5s ease;
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

.charts-section {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  min-height: 0;
}

.chart-item { min-height: 280px; }
</style>
