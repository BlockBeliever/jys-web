import { t } from '@/plugins/i18n'
const serviceRoutes = [
  {
    path: '/service',
    component: () => import('@/components/service/index.vue'),
    meta: {
      title: '客服',
      isTab: false,
      isNav: false
    }
  }
];
export default serviceRoutes;