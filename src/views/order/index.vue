<template>
  <div class="container" v-if="!loading">
    <van-tabs v-if="isShop" v-model:active="activeTab" @change="changeTab">
      <van-tab v-for="(item, index) in tabs" :title="item.title">
        <component :is="item.component" ref="comRef"></component>
      </van-tab>
    </van-tabs>
    <Apply2 v-else />
  </div>
</template>

<script setup lang="ts">
import Online from "@/components/order/businessOrder/onlineOrder.vue"
import Offline from "@/components/order/businessOrder/offlineOrder.vue";
import Disputed from "@/components/order/businessOrder/disputedOrder.vue";
import Apply2 from "@/components/business/apply2.vue";
import { userInfo } from "@/api/auth";
const isShop = ref(false)
const loading = ref(true)
onActivated(async() => {
  const { data } = await userInfo({})
  isShop.value = data.have_shop
  loading.value = false
})
// tabs
const activeTab = ref(0)
const tabs = [
  {
    title: '线上订单',
    component: Online
  },
  {
    title: '线下订单',
    component: Offline
  },
  {
    title: '纠纷订单',
    component: Disputed
  }
]
const changeTab = () => { }
</script>

<style lang="scss" scoped>
@import '@/components/order/myOrder/scss/index.scss';

:deep(.van-tabs__nav) {
  background-color: #FFFFFF !important;
}
:deep(.van-tabs__wrap) {
    height: 40px !important;
  }
</style>