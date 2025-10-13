<template>
  <div class="container">
    <div class="head"></div>
    <div class="user">
      <van-image
        class="avatar"
        v-if="avatar.startsWith('data:')"
        :src="avatar"
      />
      <van-image class="avatar" v-else :src="`${baseUrl}${avatar}`"/>
      <div class="info">
        <div class="name van-ellipsis">{{ user.nickname }}</div>
        <div class="middle">
          <span>
            {{ $t("my.authorizationDate") }}：{{moment(user.created_at * 1000).format("YYYY/MM/DD")}}
          </span>
        </div>
        <div class="bottom">
          <div>
            <img src="@/assets/img/center/id-card.png" alt="" />
            <span>{{ $t("my.authentication") }}</span>
          </div>
          <div>
            <img src="@/assets/img/center/phone.png" alt="" />
            <span>{{ $t("my.cellPhone") }}</span>
          </div>
          <div>
            <img src="@/assets/img/center/email.png" alt="" />
            <span>{{ $t("my.eMail") }}</span>
          </div>
        </div>
      </div>
    </div>
    <img
      class="image"
      src="@/assets/img/center/bus.png"
      alt=""
      @click="pushToApply"
    />
    <div class="items">
      <div class="text">{{ $t("my.commonFunctions") }}</div>
      <div class="box">
        <div class="item" @click="pushToBuyAd">
          <img src="@/assets/img/center/buy.png" alt="" />
          <span class="title">{{ $t("my.wantToBuy") }}</span>
        </div>
        <div class="item" @click="pushToSaleAd">
          <img src="@/assets/img/center/sale.png" alt="" />
          <span class="title">{{ $t("my.wantToSell") }}</span>
        </div>
        <div class="item" @click="pushToMyOrder">
          <img src="@/assets/img/center/order.png" alt="" />
          <span class="title">{{ $t("my.myOrder") }}</span>
        </div>
        <div class="item" @click="pushToMyAd">
          <img src="@/assets/img/center/ad.png" alt="" />
          <span class="title">{{ $t("my.myAd") }}</span>
        </div>
      </div>
      <div class="box">
        <div class="item" @click="pushToAddressManagement">
          <img src="@/assets/img/center/address.png" alt="" />
          <span class="title">{{ $t("my.address") }}</span>
        </div>
        <div class="item" style="visibility: hidden;">
          <img src="@/assets/img/center/address.png" alt="" />
          <span class="title">{{ $t("my.address") }}</span>
        </div>
        <div class="item" style="visibility: hidden;">
          <img src="@/assets/img/center/address.png" alt="" />
          <span class="title">{{ $t("my.address") }}</span>
        </div>
        <div class="item" style="visibility: hidden;">
          <img src="@/assets/img/center/address.png" alt="" />
          <span class="title">{{ $t("my.address") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { urlToBase64OfList } from "@/utils/EnAndDeFile.js";
import { userInfo } from "@/api/auth";
import moment from "moment-timezone";
moment.locale("zh-cn");
import { showToast } from "vant";
import { t } from "@/plugins/i18n";

const baseUrl = "https://pic.flct.io";

const router = useRouter();
onActivated(() => {
  getUserInfo();
});
const user = ref({} as any);
const avatar = ref("");
const getUserInfo = async () => {
  const { data } = await userInfo({});
  user.value = data;
  avatar.value = await urlToBase64OfList(user.value.avatar);
};
const pushToApply = () => {
  router.push("/business/apply");
};
const pushToBuyAd = () => {
  if (!user.value.have_shop) {
    showToast(t("my.notAMerchant")!);
    return;
  }
  router.push("/advertisement/buy");
};
const pushToSaleAd = () => {
  if (!user.value.have_shop) {
    showToast(t("my.notAMerchant")!);
    return;
  }
  router.push("/advertisement/sale");
};
const pushToMyAd = () => {
  if (!user.value.have_shop) {
    showToast(t("my.notAMerchant")!);
    return;
  }
  router.push("/advertisement/my");
};
const pushToMyOrder = () => {
  router.push("/order/myOrder");
};
const pushToAddressManagement = () => {
  router.push("/address/management");
};
</script>

<style lang="scss" src="./scss/index.scss" scoped></style>
