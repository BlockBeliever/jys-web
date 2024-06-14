<template>
  <div class="card">
    <div class="top">
      <van-image class="avatar" v-if="avatar.startsWith('data:')" :src="avatar"></van-image>
      <van-image class="avatar" v-else :src="`${baseUrl}${avatar}`"></van-image>
      <span>{{ props.item.shop_name }}</span>
    </div>
    <div class="money">
      <span class="number">{{ props.item.goods_price }}</span>
      <span class="currency">{{ props.item.goods_pay_coin }}</span>
    </div>
    <div class="surplus">
      <span>数量：{{ divide(props.item.goods_num) }}</span>
      <span>{{ props.item.goods_coin }}</span>
    </div>
    <div class="limit">
      <span>限制金额：{{ `${divide(props.item.goods_min)}-${divide(props.item.goods_max)}` }}</span>
      <span>{{ props.item.goods_pay_coin}}</span>
    </div>
    <div class="line"></div>
    <div class="bottom">
      <div class="left">
        <span class="text">支付方式</span>
        <div class="divider"></div>
        <span class="pay" v-for="item in props.item.transaction_ways">{{ item.name }}</span>
      </div>
      <div v-if="item.goods_type === 2" class="sale" @click="buyClick(item.id)">购买</div>
      <div v-else class="buy" @click="saleClick(item.id)">出售</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { urlToBase64OfList } from '@/utils/EnAndDeFile.js'
import { multiply, divide } from "@/utils/formart";

const baseUrl = import.meta.env.VITE_BASE_IMG || 'https://pic.flct.io'
const router = useRouter()
const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})
const avatar = ref('')
onMounted(async() => {
  avatar.value = await urlToBase64OfList(props.item.user_avatar)
})
const buyClick = (id: number) => {
  router.push({
    path: '/order/placeOrder/buy',
    query: {
      id
    }
  })
}
const saleClick = (id: number) => {
  router.push({
    path: '/order/placeOrder/sale',
    query: {
      id
    }
  })
}
</script>

<style lang="scss" soped>
@import './scss/index.scss';
</style>