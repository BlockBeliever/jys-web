<template>
  <div class="container" ref="container">
    <!-- form validatorTraType-->
    <van-form class="form" ref="form" @submit="onSubmit">
      <van-cell-group inset>
        <van-field class="field" v-model="businessName" readonly label-align="top" name="商家名称" label="商家名称" />
        <van-field v-model="checkedText" label-align="top" is-link readonly name="picker" label="货币"
          placeholder="选择货币类型" @click="showPopupClick(1)" :rules="[{ validator: validatorCoin }]" />
        <van-field v-model="quantity" label-align="top" name="买入数量" label="买入数量" placeholder="请输入数量"
          :rules="[{ validator: validatorQuantity }]" />
        <van-field v-model="price" label-align="top" name="价格" label="价格" placeholder="请输入价格"
          :rules="[{ validator: validatorPrice }]">
          <template #extra>
            <div class="field-right" @click="showPopupClick(2)">
              <span class="coin">{{ checkedText2 }}</span>
              <span class="text">请选择支付货币</span>
              <img src="@/assets/img/home/top.png" alt="">
            </div>
          </template>
        </van-field>
        <van-field class="field" v-model="tradeType" readonly label-align="top" name="交易方式" label="交易方式"
          :rules="[{ validator: validatorTraType }]" />
        <van-field v-model="limitMin" label-align="top" name="限额" label="最小限额" placeholder="请输入最小限额"
          :rules="[{ validator: validatorLimitMin }]" @focus="onfocus">
          <template #extra>
            <div class="field-right">
              <!-- <span class="tip">最大不超过 价格*数量</span> -->
            </div>
          </template>
        </van-field>
        <van-field v-model="limitMax" label-align="top" name="限额" label="最大限额" placeholder="请输入最大限额"
          :rules="[{ validator: validatorLimitMax }]" @focus="onfocus">
          <template #extra>
            <div class="field-right">
              <span class="tip">最大不超过 价格*数量</span>
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <van-button class="button" block native-type="submit">
        发布广告
      </van-button>
    </van-form>
  </div>
  <!-- 货币选择 购买 -->
  <van-popup v-model:show="showPopup" position="bottom" round>
    <div class="search">
      <van-search v-model="key" shape="round" placeholder="搜索" />
    </div>
    <div class="currency-list">
      <van-radio-group v-model="checked" @change="changeChecked">
        <van-cell-group inset>
          <van-cell v-for="item in coinList">
            <template #title>
              <div class="left">
                <van-image class="icon" :src="item.icon" alt=""></van-image>
                <div class="name">
                  <div>{{ item.symbol }}</div>
                  <div>{{ item.name }}</div>
                </div>
              </div>
            </template>
            <template #right-icon>
              <van-radio :name="item.id + ''" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </van-popup>
  <!-- 货币选择 付款 -->
  <van-popup v-model:show="showPopup2" position="bottom" round>
    <div class="search">
      <van-search v-model="key2" shape="round" placeholder="搜索" />
    </div>
    <div class="currency-list">
      <van-radio-group v-model="checked2" @change="changeChecked2">
        <van-cell-group inset>
          <van-cell v-for="item in coinList2">
            <template #title>
              <div class="left">
                <van-image class="icon" :src="item.icon" alt=""></van-image>
                <div class="name">
                  <div>{{ item.symbol }}</div>
                  <div>{{ item.name }}</div>
                </div>
              </div>
            </template>
            <template #right-icon>
              <van-radio :name="item.id + ''" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { coinGet } from "@/api/home";
import { addAdvertisement } from "@/api/advertisement";
import { myShop } from "@/api/business";
import { showToast } from "vant";
import { multiply, divide } from "@/utils/formart";
import { judgeInput } from "@/utils/judgeInput";
const form = ref()
onActivated(() => {
  // 初始化数据
  getMyShopInfo()
  getCoinData(1)
  getCoinData(2)
  nextTick(() => {
    checkedText.value = ''
    checkedText2.value = ''
    quantity.value = ''
    price.value = ''
    limitMin.value = ''
    limitMax.value = ''
    tradeType.value = ''
    form.value.resetValidation()
  })
})
const container = ref()
const onfocus = () => {
  container.value.scrollIntoView(false)
}
const businessName = ref('')
const getMyShopInfo = async () => {
  const { data } = await myShop({})
  businessName.value = data.shop_name
}
// form
const quantity = ref()
const price = ref()
const limitMin = ref()
const limitMax = ref()

// 获取币种 选择货币
// 交易方式
const tradeType = ref('')

const key = ref('')
const showPopup = ref(false)
const checked = ref()
const coinList = ref([] as any)

const key2 = ref('')
const showPopup2 = ref(false)
const checked2 = ref()
const coinList2 = ref([] as any)
const showPopupClick = (val: number) => {
  if (val === 1) {
    showPopup.value = true
    checked.value = null // 重置勾选
    return
  }
  showPopup2.value = true
  checked2.value = null // 重置勾选
}
const getCoinData = async (val: number) => {
  const { data } = await coinGet({
    kind: val,
    page_num: 1,
    limit: 50
  })
  if (val === 1) {
    coinList.value = data.list || []
  } else {
    coinList2.value = data.list || []
  }
}
const checkedText = ref('')
const checkedText2 = ref('')
const changeChecked = () => {
  checkedText.value = coinList.value.filter((item: any) => Number(checked.value) === item.id)[0]?.symbol
}

const changeChecked2 = () => {
  const obj = coinList2.value.filter((item: any) => Number(checked2.value) === item.id)[0]
  checkedText2.value = obj?.symbol
  tradeType.value = obj?.transaction_way.map((item: any) => item.name).join(' | ')
}
// 校验输入框
const regex = /^[1-9]\d*$/
const validatorCoin = (val: any) => {
  if (val === '') {
    return '请选择货币'
  }
  if (val) {
    if (checkedText.value === checkedText2.value) {
      return '支付货币不能与交易货币相同'
    }
  }
};
const validatorQuantity = (val: any) => {
  if (val === '') {
    return '请输入数量'
  }
  if (!regex.test(val + '')) {
    return '请输入数字整数'
  }
};
const regex2 = /^(0|([1-9][0-9]*))(\.[\d]+)?$/
const validatorPrice = (val: any) => {
  if (val === '') {
    return '请输入价格'
  }
  if (!regex2.test(val + '')) {
    return '请输入数字'
  }
};
const validatorTraType = (val: any) => {
  if (val === '') {
    return '请选择支付货币后自动确定交易方式'
  }
  if (val) {
    if (checkedText.value === checkedText2.value) {
      return '支付货币不能与交易货币相同'
    }
  }
};
const validatorLimitMin = (val: any) => {
  if (val === '') {
    return '请输入最小限额'
  }
  val = val * 1
  if (val === 0) {
    return '不能为0'
  }
  if (limitMax.value * 1 && val >= limitMax.value * 1) {
    return '最小限额不能大于等于最大限额'
  }
  if (price.value * 1 && val && val < price.value * 1) {
    return '最小不能小于单价'
  }
  if (price.value * 1 && quantity.value * 1 && val) {
    if (val > multiply(price.value * 1, quantity.value * 1)) {
      return '最小不超过价格*数量'
    }
  }
};
const validatorLimitMax = (val: any) => {
  if (val === '') {
    return '请输入最大限额'
  }
  val = val * 1
  if (limitMin.value * 1 && limitMin.value * 1 >= val) {
    return '最大限额不能小于等于最小限额'
  }
  if (price.value * 1 && quantity.value * 1 && val) {
    if (val > multiply(price.value * 1, quantity.value * 1)) {
      return '最大不超错价格*数量'
    }
  }
};
const onSubmit = async () => {
  const { code, message, error } = await addAdvertisement({
    goods_type: 1,
    goods_num: multiply(quantity.value),
    goods_price: price.value + '',
    goods_coin: checked.value * 1,
    goods_pay_coin: checked2.value * 1,
    goods_min: multiply(limitMin.value),
    goods_max: multiply(limitMax.value),
  })
  if (code === 0) {
    showToast('发布成功')
    history.back()
  } else {
    showToast(error)
  }
}
</script>

<style lang="scss" scoped>
@import './scss/buyAd.scss';

.search {
  width: 340px;
  margin: 0 auto;
}

.currency-list {
  width: 100%;
  margin-bottom: 50px;
  max-height: 400px;
  overflow-y: auto;

  .left {
    height: 50px;
    display: flex;
    align-items: center;

    .icon {
      width: 28px;
      height: 28px;
    }

    .name {
      margin-left: 10px;

      div:nth-child(1) {
        color: $color-101;
        font: $font15-500;
      }

      div:nth-child(2) {
        margin-top: 2px;
        color: $color-B8B;
        font: $font12-400;
      }
    }
  }
}
</style>