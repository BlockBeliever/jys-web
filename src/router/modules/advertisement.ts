import { t } from '@/plugins/i18n'
const advertisementRoutes = [
  {
    path: '/advertisement/buy',
    component: () => import('@/components/advertisement/buyAd.vue'),
    meta: {
      title: t('my.wantToBuy'),
      isTab: false,
      isNav: true
    }
  },
  {
    path: '/advertisement/sale',
    component: () => import('@/components/advertisement/saleAd.vue'),
    meta: {
      title: t('my.wantToSell'),
      isTab: false,
      isNav: true
    }
  },
  {
    path: '/advertisement/my',
    component: () => import('@/components/advertisement/myAd.vue'),
    meta: {
      title: t('my.myAd'),
      isTab: false,
      isNav: true
    }
  }
];
export default advertisementRoutes;