import { t } from '@/plugins/i18n'
const businessRoutes = [
  {
    path: '/business/apply',
    component: () => import('@/components/business/applyBusiness.vue'),
    meta: {
      title: t('business.applyMerchant'),
      isTab: false,
      isNav: true,
      backTo: '/center'
    }
  }
];
export default businessRoutes;