import { createRouter, createWebHashHistory } from 'vue-router'
import OrderDashboard from '../views/OrderDashboard.vue'
import VehicleDashboard from '../views/VehicleDashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/order'
  },
  {
    path: '/order',
    name: 'OrderDashboard',
    component: OrderDashboard,
    meta: { title: '今日订单大屏' }
  },
  {
    path: '/vehicle',
    name: 'VehicleDashboard',
    component: VehicleDashboard,
    meta: { title: '车联网情况大屏' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Dashboard'
})

export default router
