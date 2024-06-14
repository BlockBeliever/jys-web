<template>
  <div class="container">
    <van-form v-if="status === 0" class="form" @submit="onSubmit">
      <van-cell-group inset>
        <van-field class="identity" v-model="identity" readonly label-align="top" name="商家身份" label="商家身份"/>
        <van-field v-model="name" label-align="top" name="商家名称" label="商家名称" placeholder="请输入商家名称" :rules="[{ validator: validatorName }]"/>
        <van-field class="textarea" v-model="message" label-align="top" type="textarea" name="商家留言" label="商家留言"
          placeholder="请输入商家留言" autosize maxlength="300" show-word-limit :rules="[{ validator: validatorMsg }]"/>
      </van-cell-group>
      <van-button class="button" block native-type="submit">
        提交申请
      </van-button>
    </van-form>
    <Apply v-else :data="business" @reset="status = 0"/>
  </div>
</template>

<script setup lang="ts">
import { showToast } from "vant";
import Apply from "./apply.vue";
import { applyBusiness, businessInfo } from "@/api/business";

const identity = ref('发布广告')
const name = ref('')
const message = ref('')

onActivated(() => {
  name.value = ''
  message.value = ''
  getBusinessInfo()
})
const status = ref()
const business = ref({} as any)
const getBusinessInfo = async () => {
  const { data } = await businessInfo({})
  business.value = data
  status.value = data.status
}
// 校验 
const validatorName = (val: any) => {
  if (val === '') {
    return '请输入名称'
  }
};
const validatorMsg = (val: any) => {
  if (val === '') {
    return '请输入留言'
  }
};
const onSubmit = async () => {
  const { code, message: msg } = await applyBusiness({
    shop_name: name.value,
    comment: message.value
  })
  if (code === 0) {
    showToast('申请成功,请耐心等待~')
    history.back()
  } else {
    showToast(msg)
  }
}
</script>

<style lang="scss" src="./scss/applyBusiness.scss" scoped></style>