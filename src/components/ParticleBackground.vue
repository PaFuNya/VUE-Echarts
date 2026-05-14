<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let ctx = null
let width = 0
let height = 0
let particles = []
let mouse = { x: -9999, y: -9999 }
let animationId = null

const PARTICLE_COUNT = 75
const CONNECT_DIST = 140
const MOUSE_REPEL_DIST = 120
const MOUSE_REPEL_FORCE = 0.6

function random(min, max) {
  return Math.random() * (max - min) + min
}

function createParticles() {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: random(0, width),
      y: random(0, height),
      vx: random(-0.4, 0.4),
      vy: random(-0.4, 0.4),
      radius: random(1.2, 2.8)
    })
  }
}

function draw() {
  if (!ctx) return
  const isDark = document.documentElement.classList.contains('theme-dark')

  ctx.clearRect(0, 0, width, height)

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    p.x += p.vx
    p.y += p.vy

    if (p.x < 0) p.x = width
    if (p.x > width) p.x = 0
    if (p.y < 0) p.y = height
    if (p.y > height) p.y = 0

    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const distToMouse = Math.sqrt(dx * dx + dy * dy)

    if (distToMouse < MOUSE_REPEL_DIST && mouse.x > 0) {
      const force = (MOUSE_REPEL_DIST - distToMouse) / MOUSE_REPEL_DIST
      const angle = Math.atan2(dy, dx)
      p.x -= Math.cos(angle) * force * MOUSE_REPEL_FORCE
      p.y -= Math.sin(angle) * force * MOUSE_REPEL_FORCE
    }

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = isDark ? 'rgba(46, 199, 201, 0.5)' : 'rgba(64, 158, 255, 0.35)'
    ctx.fill()

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j]
      const pdx = p.x - q.x
      const pdy = p.y - q.y
      const dist = Math.sqrt(pdx * pdx + pdy * pdy)

      if (dist < CONNECT_DIST) {
        const alpha = (1 - dist / CONNECT_DIST) * 0.18
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(q.x, q.y)
        ctx.strokeStyle = isDark
          ? `rgba(46, 199, 201, ${alpha})`
          : `rgba(64, 158, 255, ${alpha})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }
    }
  }

  animationId = requestAnimationFrame(draw)
}

function resize() {
  if (!canvasRef.value) return
  width = window.innerWidth
  height = window.innerHeight
  canvasRef.value.width = width
  canvasRef.value.height = height
  createParticles()
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onMouseLeave() {
  mouse.x = -9999
  mouse.y = -9999
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  resize()
  draw()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
