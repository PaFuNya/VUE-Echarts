<template>
  <div class="app-wrapper">
    <ParticleBackground />

    <header class="top-nav">
      <div class="nav-brand">
        <span class="brand-icon">📊</span>
        <span class="brand-title">数据可视化平台</span>
      </div>

      <nav class="nav-links">
        <button
          class="nav-btn"
          :class="{ active: $route.path === '/order' }"
          @click="$router.push('/order')"
        >
          <span class="btn-icon">🛒</span>
          今日订单大屏
        </button>
        <button
          class="nav-btn"
          :class="{ active: $route.path === '/vehicle' }"
          @click="$router.push('/vehicle')"
        >
          <span class="btn-icon">🚗</span>
          车联网情况大屏
        </button>
      </nav>

      <div class="nav-right">
        <button class="theme-btn" @click="toggleTheme" :title="isDark ? '切换浅色主题' : '切换暗色主题'">
          <span class="theme-icon">{{ isDark ? '🌙' : '☀️' }}</span>
          <span class="theme-label">{{ isDark ? 'Dark' : 'Light' }}</span>
          <span class="theme-arrow">⇄</span>
        </button>
        <div class="divider"></div>
        <span class="time-display">{{ currentTime }}</span>
        <div class="status-dot"></div>
      </div>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <transition name="global-toast">
      <div v-if="globalToast" class="global-toast">
        <span class="global-toast-icon">📌</span>
        {{ globalToast }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted, watch } from 'vue'
import ParticleBackground from './components/ParticleBackground.vue'

const currentTime = ref('')
function updateTime() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  currentTime.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}
let timer = null
onMounted(() => { updateTime(); timer = setInterval(updateTime, 1000) })
onUnmounted(() => clearInterval(timer))

const isDark = ref(false)
const chartTheme = ref('macarons')
provide('chartTheme', chartTheme)

function applyTheme(dark) {
  const html = document.documentElement
  if (dark) {
    html.classList.remove('theme-light')
    html.classList.add('theme-dark')
    chartTheme.value = 'dark'
  } else {
    html.classList.remove('theme-dark')
    html.classList.add('theme-light')
    chartTheme.value = 'macarons'
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
  try { localStorage.setItem('theme', isDark.value ? 'dark' : 'light') } catch (e) {}
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') { isDark.value = true }
  } catch (e) {}
  applyTheme(isDark.value)
})

const globalToast = ref('')
let toastTimer = null
function showGlobalToast(msg) {
  globalToast.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { globalToast.value = '' }, 3000)
}
provide('showToast', showGlobalToast)
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background: transparent;
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: var(--bg-nav);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border-bottom: 1px solid var(--divider);
  box-shadow: var(--shadow-card);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.5s ease, border-color 0.5s ease;
}

@keyframes navSlideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}
.top-nav { animation: navSlideDown 0.4s ease-out; }

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon { font-size: 22px; }

.brand-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-primary);
  transition: color 0.5s ease;
}

.nav-links { display: flex; gap: 16px; }

.nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border: 1px solid var(--border-card);
  border-radius: 24px;
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 1px;
}

.nav-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  color: var(--color-accent);
  transform: translateY(-1px);
  box-shadow: var(--shadow-hover);
}

.nav-btn.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.25);
}

html.theme-dark .nav-btn.active {
  box-shadow: 0 4px 16px rgba(46, 199, 201, 0.3);
}

.btn-icon { font-size: 16px; }

.theme-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--border-card);
  border-radius: 20px;
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.5px;
}

.theme-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  color: var(--text-primary);
  transform: translateY(-1px);
}

.theme-btn:active { transform: scale(0.96) translateY(0); }

.theme-icon { font-size: 15px; }
.theme-label { font-weight: 500; }

.theme-arrow {
  font-size: 14px;
  opacity: 0.5;
  transition: transform 0.4s;
}
.theme-btn:hover .theme-arrow { transform: rotate(180deg); opacity: 1; }

.divider {
  width: 1px;
  height: 20px;
  background: var(--divider);
  transition: background 0.5s ease;
}

.nav-right { display: flex; align-items: center; gap: 10px; }

.time-display {
  font-size: 13px;
  color: var(--text-dim);
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  transition: color 0.5s ease;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dot-color);
  transition: background 0.5s ease;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
}

.main-content { flex: 1; overflow: hidden; position: relative; }

.page-fade-enter-active,
.page-fade-leave-active { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.page-fade-enter-from { opacity: 0; transform: translateX(30px); }
.page-fade-leave-to   { opacity: 0; transform: translateX(-30px); }

.global-toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  background: var(--toast-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--toast-border);
  border-radius: 12px;
  color: var(--toast-text);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-card);
  z-index: 9999;
  max-width: 360px;
  word-break: break-all;
  transition: background 0.5s ease, border-color 0.5s ease, color 0.5s ease;
}

.global-toast-icon { font-size: 16px; flex-shrink: 0; }

.global-toast-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.global-toast-leave-active { transition: all 0.3s ease-in; }
.global-toast-enter-from { opacity: 0; transform: translateX(60px) scale(0.85); }
.global-toast-leave-to   { opacity: 0; transform: translateX(60px) scale(0.9); }
</style>
