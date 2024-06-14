import { t } from '@/plugins/i18n'
const advertisementRoutes = [
  {
    path: '/advertisement/buy',
    component: () => import('@/components/advertisement/buyAd.vue'),
    meta: {
      title: '我要买入',
      isTab: false,
      isNav: true
    }
  },
  {
    path: '/advertisement/sale',
    component: () => import('@/components/advertisement/saleAd.vue'),
    meta: {
      title: '我要卖出',
      isTab: false,
      isNav: true
    }
  },
  {
    path: '/advertisement/my',
    component: () => import('@/components/advertisement/myAd.vue'),
    meta: {
      title: '我的广告',
      isTab: false,
      isNav: true
    }
  }
];
export default advertisementRoutes;