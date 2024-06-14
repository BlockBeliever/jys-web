import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/store'
import { removeToken } from '@/utils/auth'
// routes
import orderRoutes from './modules/order';
import businessRoutes from './modules/business';
import advertisementRoutes from './modules/advertisement';
// image
import home from '@/assets/img/tabbar/home.png';
import home_sel from '@/assets/img/tabbar/home-sel.png';
import order from '@/assets/img/tabbar/order.png';
import order_sel from '@/assets/img/tabbar/order-sel.png';
import my from '@/assets/img/tabbar/my.png';
import my_sel from '@/assets/img/tabbar/my-sel.png';
import { t } from '@/plugins/i18n'

export const tabbar: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      icon: home,
      active_icon: home_sel,
      isTab: true
    }
  },
  {
    path: '/order',
    component: () => import('@/views/order/index.vue'),
    meta: {
      title: '我的订单',
      icon: order,
      active_icon: order_sel,
      isTab: true
    }
  },
  {
    path: '/center',
    component: () => import('@/views/center/index.vue'),
    meta: {
      title: '我的',
      icon: my,
      active_icon: my_sel,
      isTab: true
    }
  }
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    redirect: '/home',
    children: [...tabbar, ...orderRoutes, ...businessRoutes, ...advertisementRoutes],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由白名单
const whiteList = ['']

router.beforeEach((to, from, next) => {
  const store = useAppStore()
  const title = (to.meta.title as string) || 'App'
  document.title = title
  // const token = getToken()
  // if (to.path === '/login' || whiteList.includes(to.path)) {
  //   if (token) {
  //     next('/')
  //   } else {
  //     next()
  //   }
  // } else {
  //   const store = useAppStore()
  //   if (!token) {
  //     store.setState({ title })
  //     return next('/login')
  //   }

  //   store.setState({ title, token })
  //   next()
  // }
  store.setState({ title })
  next()
})

export default router
