import { t } from '@/plugins/i18n'
const addressRoutes = [
  {
    path: '/address/management',
    component: () => import('@/components/address/index.vue'),
    meta: {
      title: '收款账户管理',
      isTab: false,
      isNav: false
    }
  },
  {
    path: '/address/crypto/add',
    component: () => import('@/components/address/components/addChainAddress.vue'),
    meta: {
      title: '添加链地址',
      isTab: false,
      isNav: true
    }
  },
  {
    path: '/address/currency/add',
    component: () => import('@/components/address/components/addCurrencyAddress.vue'),
    meta: {
      title: '添加账户',
      isTab: false,
      isNav: true
    }
  }
];
export default addressRoutes;