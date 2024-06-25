<template>
  <div class="container">
    <img src="@/assets/img/business/pending.png" alt="" />
    <div class="tip">
      <span class="text1">{{ $t("business.notMerchant") }}</span>
      <div class="text1">{{ $t("business.viewTradingOrders") }}</div>
    </div>
    <div class="button" @click="pushToApply">
      {{ $t("business.applyForMerchant") }}
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps({
  status: {
    type: Number,
    default: 0,
  },
});
const pushToApply = () => {
  router.push("/business/apply");
};
</script>

<style lang="scss" src="./scss/apply.scss" scoped></style>
