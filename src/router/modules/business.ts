import { t } from '@/plugins/i18n'
const businessRoutes = [
  {
    path: '/business/apply',
    component: () => import('@/components/business/applyBusiness.vue'),
    meta: {
      title: '申请商家',
      isTab: false,
      isNav: true,
      backTo: '/center'
    }
  }
];
export default businessRoutes;