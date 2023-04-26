/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('@/views/home/list'),
        meta: { title: '列表', keepAlive: false }
      },
      {
        path: '/goodDetail',
        name: 'goodDetail',
        component: () => import('@/views/home/goodDetail'),
        meta: { title: '商品详情', keepAlive: true,showTab:false }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/home/order'),
        meta: { title: '订单提交', keepAlive: false,showTab:false  }
      },
      {
        path: '/vant',
        name: 'Vant',
        component: () => import('@/views/home/vant'),
        meta: { title: 'vant组件', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('@/views/pages/pages1'),
        meta: { title: '列表', keepAlive: false }
      }
    ]
  }
]
