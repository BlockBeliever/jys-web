<template>
  <div class="container" v-if="!loading">
    <van-form v-if="status === 0" class="form" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          class="identity"
          v-model="identity"
          readonly
          label-align="top"
          name="商家身份"
          :label="$t('business.merchantIdentity')"
        />
        <van-field
          v-model="name"
          label-align="top"
          name="商家名称"
          :label="$t('business.merchant')"
          :placeholder="$t('business.pleaseEnterMerchantName')"
          :rules="[{ validator: validatorName }]"
        />
        <van-field
          class="textarea"
          v-model="message"
          label-align="top"
          type="textarea"
          name="商家留言"
          :label="$t('business.merchantMessage')"
          :placeholder="$t('business.pleaseEnterMerchantMessage')"
          autosize
          maxlength="300"
          show-word-limit
          :rules="[{ validator: validatorMsg }]"
        />
      </van-cell-group>
      <van-button class="button" block native-type="submit">
        {{ $t("business.submitApply") }}
      </van-button>
    </van-form>
    <Apply v-else :data="business" @reset="status = 0" />
  </div>
</template>

<script setup lang="ts">
import { showToast } from "vant";
import Apply from "./apply.vue";
import { applyBusiness, businessInfo } from "@/api/business";
import { t } from "@/plugins/i18n";

const identity = ref(t("business.postAd"));
const name = ref("");
const message = ref("");

onActivated(() => {
  name.value = "";
  message.value = "";
  loading.value = true;
  getBusinessInfo();
});
const loading = ref(true);
const status = ref();
const business = ref({} as any);
const getBusinessInfo = async () => {
  const { data } = await businessInfo({});
  loading.value = false;
  business.value = data;
  status.value = data.status;
};
// 校验
const validatorName = (val: any) => {
  if (val === "") {
    return t("business.pleaseEnterName");
  }
};
const validatorMsg = (val: any) => {
  if (val === "") {
    return t("business.pleaseEnterMessage");
  }
};
const onSubmit = async () => {
  const { code, message: msg } = await applyBusiness({
    shop_name: name.value,
    comment: message.value,
  });
  if (code === 0) {
    showToast(t("business.applySuccess"));
    history.back();
  } else {
    showToast(msg);
  }
};
</script>

<style lang="scss" src="./scss/applyBusiness.scss" scoped></style>
