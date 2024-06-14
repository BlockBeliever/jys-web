<template>
  <div class="container">
    <img src="@/assets/img/business/pending.png" alt="">
    <div class="tip">
      <span class="text1">您提交的【{{ props.data.shop_name }}】申请</span>
      <span class="text2" v-if="props.data.status === 1">正在审核中</span>
      <span class="text2" v-if="props.data.status === 2">已通过审核</span>
      <span class="text3" v-if="props.data.status === 3">未通过审核</span>
      <div class="text1" v-if="props.data.status === 1">请耐心等待审核结果</div>
      <div class="text1" v-if="props.data.status === 2">开启商家之旅吧</div>
      <div class="text1" v-if="props.data.status === 3">被拒原因:{{ props.data.approve_comment }}</div>
    </div>
    <div class="apply" v-if="props.data.status === 3" @click="resetApply">重新申请</div>
  </div>
</template>

<script setup lang="ts">
import { businessInfo } from "@/api/business";
const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})
const emits = defineEmits(['reset'])
const resetApply = async () => {
  const { code } = await businessInfo({
    status: 0
  })
  if (code === 0) {
    emits('reset')
  }
}
</script>

<style lang="scss" scoped>
@import "./scss/apply.scss" ;
</style>