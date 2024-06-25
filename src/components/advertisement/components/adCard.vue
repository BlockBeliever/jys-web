<template>
  <div class="card">
    <img
      v-if="props.data.goods_type === 1"
      class="logo"
      src="@/assets/img/advertisement/buy.png"
      alt=""
    />
    <img v-else class="logo" src="@/assets/img/advertisement/sale.png" alt="" />
    <!-- top -->
    <div class="top">
      <span class="code"></span>
      <span v-if="props.data.goods_status === 1" class="online">{{
        $t("ad.upcoming")
      }}</span>
      <span v-else class="offline">{{ $t("ad.removed") }}</span>
    </div>
    <div class="line"></div>
    <!-- middle -->
    <div class="middle">
      <div class="price-coin">
        <div>
          <span class="price">{{ props.data.goods_price }}</span>
          <span>{{ props.data.goods_pay_coin }}/个</span>
        </div>
        <span class="coin">{{ props.data.goods_coin }}</span>
      </div>
      <div class="number">
        <span>{{ $t("ad.quantity") }}</span>
        <span class="num"
          >{{ divide(props.data.goods_num) }} {{ props.data.goods_coin }}</span
        >
      </div>
      <div class="number">
        <span>{{ $t("ad.limit") }}</span>
        <span class="num"
          >{{
            `${divide(props.data.goods_min)}-${divide(props.data.goods_max)}`
          }}
          {{ props.data.goods_pay_coin }}</span
        >
      </div>
      <div class="number">
        <span>{{ $t("ad.paymentMethod") }}</span>
        <span class="num">{{ payment(props.data.transaction_ways) }}</span>
      </div>
    </div>
    <div class="line"></div>
    <!-- bottom -->
    <div class="bottom">
      <div
        class="onOff"
        v-if="props.data.goods_status === 1"
        @click="changeStatus(2)"
      >
        {{ $t("ad.remove") }}
      </div>
      <div v-else class="onOff" @click="changeStatus(1)">
        {{ $t("ad.upcome") }}
      </div>
      <div class="delete" @click="deleteAd">{{ $t("ad.delete") }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { editAdvertisement, deleteAdvertisement } from "@/api/advertisement";
import {
  closeToast,
  showConfirmDialog,
  showLoadingToast,
  showToast,
} from "vant";
import { multiply, divide } from "@/utils/formart";
import { t } from "@/plugins/i18n";
const emits = defineEmits(["refresh"]);
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const changeStatus = async (val: any) => {
  showLoadingToast({});
  const { code, error } = await editAdvertisement({
    id: props.data.id,
    goods_status: val,
  });
  closeToast();
  if (code === 0) {
    props.data.goods_status = val;
    setTimeout(() => {
      showToast(
        `${val === 1 ? t("ad.uploadSuccessful") : t("ad.removedSuccessfully")}`
      );
    }, 500);
  } else {
    showToast(error);
  }
};
const payment = computed(() => {
  return (data: any) => {
    return data.map((item: any) => item.name).join(" | ");
  };
});
const deleteAd = () => {
  showConfirmDialog({
    message: t("ad.sureDeleteAd"),
  })
    .then(async () => {
      const { code } = await deleteAdvertisement({
        id: props.data.id,
      });
      if (code === 0) {
        showToast(t("ad.deleteSuccessful"));
        emits("refresh");
      }
    })
    .catch(() => {
      // on cancel
    });
};
</script>

<style lang="scss" src="./scss/adCard.scss" scoped></style>
