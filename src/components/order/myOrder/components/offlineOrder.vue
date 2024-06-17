<template>
  <div class="head-tab">
    <div :class="item.value === activeVal ? 'select' : 'normal'" v-for="item in items"
      @click="changeActive(item.value)">{{ item.title }}</div>
  </div>
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
const activeVal = ref(0)
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
  order_type: 2,
  // 0 全部 1待支付 2 完成 3 取消 4 待确认
  order_status: activeVal.value === 0 ? [] : activeVal.value === 4? [4,5,6] : [activeVal.value]
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

// 按钮组
const items = [
  {
    title: '全部',
    value: 0
  },
  {
    title: '待确认',
    value: 4
  },
  {
    title: '待支付',
    value: 1
  },
  {
    title: '已确认',
    value: 2
  },
  {
    title: '已取消',
    value: 3
  }
]

const changeActive = (val: number) => {
  activeVal.value = val
  params.order_status = activeVal.value === 0 ? [] : activeVal.value === 4? [4,5,6] : [activeVal.value]
  onRefresh()
}
</script>

<style lang="scss" scoped>
@import './scss/order.scss';
</style>