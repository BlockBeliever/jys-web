<template>
  <div class="container">
    <div class="head">
    </div>
    <div class="user">
      <van-image class="avatar" v-if="avatar.startsWith('data:')" :src="avatar"></van-image>
      <van-image class="avatar" v-else :src="`${baseUrl}${avatar}`"></van-image>
      <div class="info">
        <div class="name">{{ user.nickname }}</div>
        <div class="middle">
          <span>授权日期：{{ moment(user.created_at * 1000).format('YYYY/MM/DD') }}</span>
        </div>
        <div class="bottom">
          <div>
            <img src="@/assets/img/center/id-card.png" alt="">
            <span>身份认证</span>
          </div>
          <div>
            <img src="@/assets/img/center/phone.png" alt="">
            <span>手机</span>
          </div>
          <div>
            <img src="@/assets/img/center/email.png" alt="">
            <span>电子邮件</span>
          </div>
        </div>
      </div>
    </div>
    <img class="image" src="@/assets/img/center/bus.png" alt="" @click="pushToApply">
    <div class="items">
      <div class="text">常用功能</div>
      <div class="box">
        <div class="item" @click="pushToBuyAd">
          <img src="@/assets/img/center/buy.png" alt="">
          <span class="title">我要买入</span>
        </div>
        <div class="item" @click="pushToSaleAd">
          <img src="@/assets/img/center/sale.png" alt="">
          <span class="title">我要卖出</span>
        </div>
        <div class="item" @click="pushToMyOrder">
          <img src="@/assets/img/center/order.png" alt="">
          <span class="title">我的订单</span>
        </div>
        <div class="item" @click="pushToMyAd">
          <img src="@/assets/img/center/ad.png" alt="">
          <span class="title">我的广告</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { urlToBase64OfList } from '@/utils/EnAndDeFile.js'
import { userInfo } from "@/api/auth";
import moment from "moment-timezone";
moment.locale("zh-cn");
import { showToast } from "vant";

const baseUrl = import.meta.env.VITE_BASE_IMG || 'https://pic.flct.io'

const router = useRouter()
onActivated(() => {
  getUserInfo()
})
const user = ref({} as any)
const avatar = ref('')
const getUserInfo = async () => {
  const { data } = await userInfo({})
  user.value = data
  avatar.value = await urlToBase64OfList(user.value.avatar)
}
const pushToApply = () => {
  router.push('/business/apply')
}
const pushToBuyAd = () => {
  if (!user.value.have_shop) {
    showToast('您还不是商家,请点击商家中心进行申请!')
    return
  }
  router.push('/advertisement/buy')
}
const pushToSaleAd = () => {
  if (!user.value.have_shop) {
    showToast('您还不是商家,请点击商家中心进行申请!')
    return
  }
  router.push('/advertisement/sale')
}
const pushToMyAd = () => {
  if (!user.value.have_shop) {
    showToast('您还不是商家,请点击商家中心进行申请!')
    return
  }
  router.push('/advertisement/my')
} 
const pushToMyOrder = () => {
  router.push('/order/myOrder')
}
</script>

<style lang="scss" src="./scss/index.scss" scoped></style>