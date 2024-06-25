import { t } from "@/plugins/i18n";
const orderRoutes = [
  {
    path: "/order/placeOrder/buy",
    component: () => import("@/components/order/placeOrder/buy.vue"),
    meta: {
      title: "",
      isTab: false,
      isNav: false,
    },
  },
  {
    path: "/order/placeOrder/sale",
    component: () => import("@/components/order/placeOrder/sale.vue"),
    meta: {
      title: "",
      isTab: false,
      isNav: false,
    },
  },
  {
    path: "/order/myOrder",
    component: () => import("@/components/order/myOrder/index.vue"),
    meta: {
      title: t("my.myOrder"),
      isTab: false,
      isNav: true,
      backTo: "/center",
    },
  },
  {
    path: "/order/myOrder/detail",
    component: () =>
      import("@/components/order/myOrder/components/orderDetail.vue"),
    meta: {
      title: t("myOrder.orderDetails"),
      isTab: false,
      isNav: true,
    },
  },
  {
    path: "/order/businessOrder/detail",
    component: () => import("@/components/order/businessOrder/orderDetail.vue"),
    meta: {
      title: t("myOrder.orderDetails"),
      isTab: false,
      isNav: true,
    },
  },
  {
    path: "/order/paySuccess",
    component: () =>
      import("@/components/order/placeOrder/components/paySuccess.vue"),
    meta: {
      title: t("placeOrder.paymentSuccessful"),
      isTab: false,
      isNav: false,
    },
  },
  {
    path: "/order/authSuccess",
    component: () =>
      import("@/components/order/placeOrder/components/authSuccess.vue"),
    meta: {
      title: t("placeOrder.authorizationSuccessful"),
      isTab: false,
      isNav: false,
    },
  },
  {
    path: "/order/buySuccess",
    component: () =>
      import("@/components/order/placeOrder/components/buySuccess.vue"),
    meta: {
      title: t("placeOrder.successfullyOrdered"),
      isTab: false,
      isNav: false,
    },
  },
  {
    path: "/order/upload",
    component: () =>
      import("@/components/order/placeOrder/components/upload.vue"),
    meta: {
      title: t("myOrder.uploadPaymentImage"),
      isTab: false,
      isNav: true,
    },
  },
  {
    path: "/order/appeal",
    component: () =>
      import("@/components/order/placeOrder/components/appeal.vue"),
    meta: {
      title: t("myOrder.orderComplaint"),
      isTab: false,
      isNav: true,
    },
  },
];
export default orderRoutes;
