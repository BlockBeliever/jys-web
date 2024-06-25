<template>
  <div class="container">
    <van-tabs v-model:active="activeTab" @change="changeTab">
      <van-tab v-for="(item, index) in tabs" :title="item.title">
        <component :is="item.component" ref="comRef"></component>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import Online from "./components/onlineOrder.vue";
import Offline from "./components/offlineOrder.vue";
import Disputed from "./components/disputedOrder.vue";
import { t } from "@/plugins/i18n";

// tabs
const activeTab = ref(0);
const tabs = [
  {
    title: t("myOrder.onlineOrder"),
    component: Online,
  },
  {
    title: t("myOrder.offlineOrder"),
    component: Offline,
  },
  {
    title: t("myOrder.disputeOrder"),
    component: Disputed,
  },
];
const changeTab = () => {};
</script>

<style lang="scss" scoped>
@import "./scss/index.scss";
</style>
