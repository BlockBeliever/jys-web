<template>
  <div class="card" @click="pushToDetail">
    <!-- 0 全部 1待支付 2 完成 3 取消 4 待确认 5 确认转账 6 买家待确认-->
    <div v-if="props.data.dispute_symbol === 1">
      <img v-if="props.data.order_status === 1" class="status" src="@/assets/img/order/toBePay.png" alt="">
      <img v-if="props.data.order_status === 2" class="status" src="@/assets/img/order/sure.png" alt="">
      <img v-if="props.data.order_status === 3" class="status" src="@/assets/img/order/cancel.png" alt="">
      <img v-if="[4, 5, 6].includes(props.data.order_status)" class="status" src="@/assets/img/order/toBeSure.png"
        alt="">
    </div>
    <div v-else>
      <img class="status" src="@/assets/img/order/service.png" alt="">
    </div>
    <div class="top">
      <img :src="props.data.goods_coin_icon" alt="">
      <span>{{ props.data.goods_type === 1 ? '售出' : '买入' }}{{ props.data.goods_coin }}</span>
    </div>
    <div class="info">
      <span>价格</span>
      <span>{{ props.data.goods_price }} {{ props.data.goods_pay_coin }}</span>
    </div>
    <div class="info">
      <span>数量</span>
      <span>{{ divide(props.data.order_num) }}</span>
    </div>
    <div class="info">
      <span>总金额</span>
      <span>{{ divide(props.data.order_amount) }} {{ props.data.goods_pay_coin }}</span>
    </div>
    <div class="bottom">
      <div class="name van-ellipsis">{{ props.data.shop_name }}</div>
      <span>{{ moment(props.data.created_at * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { orderDetail } from "@/api/order";
import { divide } from "@/utils/formart";
import moment from "moment-timezone";
moment.locale("zh-cn");
const router = useRouter()
const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})
const pushToDetail = () => {
  router.push({
    path: '/order/myOrder/detail',
    query: {
      id: props.data.id
    }
  })
}
</script>

<style lang="scss" scoped>
@import './scss/orderCard.scss';
</style>