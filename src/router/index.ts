import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAppStore } from "@/store";
import { removeToken } from "@/utils/auth";
// routes
import orderRoutes from "./modules/order";
import businessRoutes from "./modules/business";
import advertisementRoutes from "./modules/advertisement";
import serviceRoutes from "./modules/service";
// image
import home from "@/assets/img/tabbar/home.png";
import home_sel from "@/assets/img/tabbar/home-sel.png";
import order from "@/assets/img/tabbar/order.png";
import order_sel from "@/assets/img/tabbar/order-sel.png";
import my from "@/assets/img/tabbar/my.png";
import my_sel from "@/assets/img/tabbar/my-sel.png";
import { t } from "@/plugins/i18n";
import { changeLocale } from "@/plugins/i18n";
import { getToken, setToken } from "@/utils/auth";
import { codeToToken } from "@/api/auth";
import { showToast } from 'vant';

export const tabbar: Array<RouteRecordRaw> = [
  {
    path: "/home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: t("myOrder.home"),
      icon: home,
      active_icon: home_sel,
      isTab: true,
    },
  },
  {
    path: "/order",
    component: () => import("@/views/order/index.vue"),
    meta: {
      title: t("myOrder.merchantOrder"),
      icon: order,
      active_icon: order_sel,
      isTab: true,
    },
  },
  {
    path: "/center",
    component: () => import("@/views/center/index.vue"),
    meta: {
      title: t("myOrder.myAccount"),
      icon: my,
      active_icon: my_sel,
      isTab: true,
    },
  },
];

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layout/Index.vue"),
    redirect: "/home",
    children: [
      ...tabbar,
      ...orderRoutes,
      ...businessRoutes,
      ...advertisementRoutes,
      ...serviceRoutes,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由白名单
const whiteList = [""];

router.beforeEach( async (to, from, next) => {
  const store = useAppStore()
  const title = (to.meta.title as string) || 'App'
  document.title = title
  store.setState({ title })
  const token = getToken()
  if (token) {
    next()
  } else {
    let code: string = localStorage.getItem('code') ?? 'MZIXODQXZWYTY2VMYI0ZOTI4LTLMZWQTY2YYNJRKOTAZNMQX'
    const { code: mCode, data, message, error } = await codeToToken({ code })
    if (mCode === 0) {
      setToken(data.auth.access)
    } else {
      showToast(error)
    }
    next()
  }
})


export default router;
