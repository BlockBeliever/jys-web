import { t } from '@/plugins/i18n'
const orderRoutes = [
  {
    path: '/order/placeOrder/buy',
    component: () => import('@/components/order/placeOrder/buy.vue'),
    meta: {
      title: '',
      isTab: false,
      isNav: false
    }
  },
  {
    path: '/order/placeOrder/sale',
    component: () => import('@/components/order/placeOrder/sale.vue'),
    meta: {
      title: '',
      isTab: false,
      isNav: false
    }
  },
  {
    path: '/order/myOrder',
    component: () => import('@/components/order/myOrder/index.vue'),
    meta: {
      title: '我的订单',
      isTab: false,
      isNav: true,
      backTo: '/center'
    }
  },
  {
    path: '/order/myOrder/detail',
    component: () => import('@/components/order/myOrder/components/orderDetail.vue'),
    meta: {
      title: '订单详情',
      isTab: false,
      isNav: true
    }
  },
  {
    path: '/order/businessOrder/detail',
    component: () => import('@/components/order/businessOrder/orderDetail.vue'),
    meta: {
      title: '订单详情',
      isTab: false,
      isNav: true
    }
  },
  {
    path: '/order/paySuccess',
    component: () => import('@/components/order/placeOrder/components/paySuccess.vue'),
    meta: {
      title: '支付成功',
      isTab: false,
      isNav: false
    }
  },
  {
    path: '/order/authSuccess',
    component: () => import('@/components/order/placeOrder/components/authSuccess.vue'),
    meta: {
      title: '授权成功',
      isTab: false,
      isNav: false
    }
  },
  {
    path: '/order/buySuccess',
    component: () => import('@/components/order/placeOrder/components/buySuccess.vue'),
    meta: {
      title: '下单成功',
      isTab: false,
      isNav: false
    }
  },
  {
    path: '/order/upload',
    component: () => import('@/components/order/placeOrder/components/upload.vue'),
    meta: {
      title: '上传支付截图',
      isTab: false,
      isNav: true
    }
  },
  {
    path: '/order/appeal',
    component: () => import('@/components/order/placeOrder/components/appeal.vue'),
    meta: {
      title: '订单申诉',
      isTab: false,
      isNav: true
    }
  }
];
export default orderRoutes;