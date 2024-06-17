<template>
  <div class="scroll-box">
    <Empty v-if="showEmpty"/>
    <van-pull-refresh v-else v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :immediate-check="true" :finished="finished" :finished-text="'没有更多了'"
        @load="onLoad">
        <OrderCard v-for="item in orders" :data="item"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { showToast } from "vant";
import OrderCard from "./orderCard.vue";
import { orderList } from "@/api/order";
import Empty from "@/components/empty/index.vue";
onActivated(() => {
  onRefresh()
})
// 加载分页数据
const orders = ref([] as any);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
let params = {
  page_num: 1,
  limit: 10,
  is_my_shop: false,
  // 1线上订单 2线下 3 纠纷
  order_type: 3,
}
const showEmpty = ref(false)
const onLoad = async () => {
  const { code, data } = await orderList(params)
  if (code !== 0) {
    showToast('加载失败！')
    return
  }
  if (refreshing.value) {
    orders.value = []
    refreshing.value = false
  }
  data.list && data.list.forEach((item: any) => {
    orders.value.push(item)
  });
  showEmpty.value = orders.value.length ? false : true
  loading.value = false
  params.page_num++
  if (orders.value.length >= data.count) {
    finished.value = true
  }
};

const onRefresh = () => {
  params.page_num = 1
  finished.value = false
  loading.value = true
  refreshing.value = true
  onLoad()
};
</script>

<style lang="scss" scoped>
@import './scss/order.scss';
</style>