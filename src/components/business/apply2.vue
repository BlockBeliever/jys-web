<template>
  <div class="container">
    <img src="@/assets/img/business/pending.png" alt="">
    <div class="tip">
      <span class="text1">您还不是商家,成为商家后在这里查看商家订单。</span>
      <div class="text1">您可以在"我的-我的订单"中查看您的交易订单。</div>
    </div>
    <div class="button" @click="pushToApply">申请成为商家</div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const props = defineProps({
  status: {
    type: Number,
    default: 0
  }
})
const pushToApply = () => {
  router.push('/business/apply')
}
</script>

<style lang="scss" src="./scss/apply.scss" scoped></style>