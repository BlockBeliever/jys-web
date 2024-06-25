<template>
  <div class="container">
    <img src="@/assets/img/business/pending.png" alt="" />
    <div class="tip">
      <span class="text1">
        {{
          `${$t("business.youSubmit")}【${props.data.shop_name}】${$t(
            "business.apply"
          )}`
        }}
      </span>
      <span class="text2" v-if="props.data.status === 1">
        {{ $t("business.underReview") }}
      </span>
      <span class="text2" v-if="props.data.status === 2">
        {{ $t("business.passedReview") }}
      </span>
      <span class="text3" v-if="props.data.status === 3">
        {{ $t("business.reviewNotApproved") }}
      </span>
      <div class="text1" v-if="props.data.status === 1">
        {{ $t("business.waitReviewResults") }}
      </div>
      <div class="text1" v-if="props.data.status === 2">
        {{ $t("business.startBusinessJourney") }}
      </div>
      <div class="text1" v-if="props.data.status === 3">
        {{ `${$t("business.denialReason")}${props.data.approve_comment}` }}
      </div>
    </div>
    <div class="apply" v-if="props.data.status === 3" @click="resetApply">
      {{ $t("business.reApply") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { businessInfo } from "@/api/business";
import { t } from "@/plugins/i18n";
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const emits = defineEmits(["reset"]);
const resetApply = async () => {
  const { code } = await businessInfo({
    status: 0,
  });
  if (code === 0) {
    emits("reset");
  }
};
</script>

<style lang="scss" scoped>
@import "./scss/apply.scss";
</style>
