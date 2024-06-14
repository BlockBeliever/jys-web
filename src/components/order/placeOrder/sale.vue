<template>
  <van-form @submit="submitOrder" ref="form">
    <div class="container">
      <van-nav-bar class="navBar" :fixed="true" title="下单" :border="false" @click-left="onClickLeft">
        <template #left>
          <van-icon name="arrow-left" size="18" color="black" />
        </template>
      </van-nav-bar>
      <div class="head">
        <span>自由理财 每日收益 随买随卖</span>
      </div>
      <img class="circle" src="@/assets/img/order/circle.png" alt="">
      <div class="opacity-bg">
        <!-- 单价 -->
        <div class="coin">
          <img src="@/assets/img/coin/usdt.png" alt="">
          <span>{{ detailData.goods_coin }}</span>
        </div>
        <div class="price">
          <span class="number">{{ detailData.goods_price }}</span>
          <span class="currency">{{ detailData.goods_pay_coin }}/个</span>
        </div>
      </div>
      <div class="buy-box">
        <!-- 切换 -->
        <div class="top">
          <van-tabs v-model:active="active" @change="inputNum = null">
            <van-tab title="按金额出售"></van-tab>
            <van-tab title="按数量出售"></van-tab>
          </van-tabs>
        </div>
        <!-- 输入框 -->
        <div class="field">
          <div class="field-left">
            <van-field v-model="inputNum" center clearable label="" placeholder="0.00"
              :rules="[{ validator: validatorMessage }]">
              <template #extra>
              </template>
            </van-field>
          </div>
          <div class="field-right">
            <span class="coin">{{ active === 0 ? detailData.goods_pay_coin : detailData.goods_coin }}</span>
            <div class="divider"></div>
            <span class="all" @click="maximumAction">最大</span>
          </div>
        </div>
        <div class="line"></div>
        <!-- 限额 -->
        <div class="limit">
          <img src="@/assets/img/order/x.png" alt="">
          <span class="text">限额</span>
          <span class="number">{{ `${divide(detailData.goods_min)}-${divide(detailData.goods_max)}` }}{{
            detailData.goods_pay_coin }}</span>
        </div>
        <!-- 可得 -->
        <div class="obtainable">
          <span class="text">{{ active === 1 ? '可得' : '应付' }}</span>
          <span class="number" v-if="inputNum">{{ resultNum }} {{ active !== 0 ? detailData.goods_pay_coin :
            detailData.goods_coin
            }}</span>
        </div>
      </div>
      <img class="tip-logo" src="@/assets/img/order/tip-logo.png" alt="">
      <!-- 支付方式 -->
      <div class="payment">
        <div class="text" @click="showSheet = true">
          <span>支付方式</span>
          <img src="@/assets/img/order/arrow.png" alt="">
        </div>
        <div class="line"></div>
        <div class="pay">
          <span class="pay-type">{{ paymentName }}</span>
          <!-- <div class="tag">及时付款</div> -->
        </div>
      </div>
      <!-- 商家信息 -->
      <div class="business">
        <div class="text">支付方式</div>
        <div class="business-info">
          <span>商家昵称</span>
          <div class="right">
            <span>{{ detailData.shop_name }}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="message">
          <span>商家留言</span>
          <div class="info">记录房间打扫了空间分厘卡立刻就法律的法律打卡机放大没办法看大势空间家乐福的卡上JFK老大</div>
        </div>
      </div>
      <div class="tip">
        <span>如果您同意与凤凰进行C2C交易，即标识您接受</span>
        <span>凤凰C2C交易法律免责声明。</span>
      </div>
      <van-button class="botton" block type="primary" native-type="submit">
        出售{{ detailData.goods_coin }}
      </van-button>
    </div>
  </van-form>
  <van-action-sheet @select="selectPay" v-model:show="showSheet" :actions="actions" cancel-text="取消" description="支付方式"
    close-on-click-action />
</template>

<script setup lang="ts">
import { advertisementDetail } from "@/api/advertisement";
import { createOrder, refreshOrder } from "@/api/order";
import { setupWebViewJavascriptBridge } from '@/utils/bridge'
import { showToast } from "vant";
import { multiply, divide } from "@/utils/formart";
import { coinTypes } from "@/enum";
const route = useRoute()
const router = useRouter()

const form = ref()
onActivated(() => {
   // flutter交互
   setupWebViewJavascriptBridge(function (bridge: any) {
    async function defaultHandler(message: any) {
      return new Promise(resolve => {
        let data = {
          'Javascript Responds': 'defaultHandler Wee!'
        };
        setTimeout(() => resolve(data), 0);
      });
    }
    bridge.init(defaultHandler);
    async function responsePayDapp(data: any) {
      // 关闭支付窗口回调
      router.push('/order/paySuccess')
      await refreshOrder({order_id_buyer: saleOrder.value.order_id_buyer})
    }
    bridge.registerHandler('responsePayDapp', responsePayDapp);
  });
  getAdDetail()
  nextTick(() => {
    inputNum.value = null
    paymentName.value = ''
    paymentId.value = ''
    active.value = 0
    form.value.resetValidation()
  })
})
// 选择器
const showSheet = ref(false)
const actions = ref()
const paymentName = ref()
const paymentId = ref()
const selectPay = (val: any) => {
  paymentName.value = val.name
  paymentId.value = val.id
  showSheet.value = false
}
// 获取当前广告详情
const detailData = ref({} as any)
const getAdDetail = async () => {
  const { data } = await advertisementDetail({ id: Number(route.query.id) })
  detailData.value = data
  actions.value = data.transaction_ways
}
// 切换购买方式
const active = ref(0)
const inputNum = ref()
const resultNum = computed(() => {
  if (inputNum.value) {
    if (!regex.test(inputNum.value + '')) {
      return ''
    } else {
      return active.value === 0 ? (inputNum.value / (detailData.value.goods_price )).toFixed(5) : multiply(inputNum.value , detailData.value.goods_price)
    }
  } else {
    return ''
  }
})
// 最大
const maximumAction = () => {
  inputNum.value = active.value === 0 ? divide(detailData.value.goods_max) : Math.floor(divide(detailData.value.goods_max / detailData.value.goods_price))
}
// 校验输入框
const regex = /^(0|([1-9][0-9]*))(\.[\d]+)?$/
const validatorMessage = (val: number) => {
  if (!regex.test(val + '')) {
    return '请输入数字'
  }
  if (active.value === 0) {
    if (val >  divide(detailData.value.goods_max)) {
      return '已超过限额'
    }
    if (val < divide(detailData.value.goods_min)) {
      return `${divide(detailData.value.goods_min)}${detailData.value.goods_pay_coin}起买`
    }
  } else {
    if (val * detailData.value.goods_price > divide(detailData.value.goods_max)) {
      return '已超过限额'
    }
    if (val * detailData.value.goods_price  < divide(detailData.value.goods_min)) {
      return `${divide(detailData.value.goods_min)}${detailData.value.goods_pay_coin}起买`
    }
  }
};
const saleOrder = ref({} as any)
const submitOrder = async () => {
  if (!paymentId.value) {
    showToast('请选择支付方式')
    return
  }
  const { code, data, error } = await createOrder({
    goods_id: detailData.value.id,
    pay_way_id: paymentId.value,
    number: active.value ? multiply(inputNum.value) : multiply(resultNum.value)
  })
  if (code === 0) {
    saleOrder.value = data
    // 调起键盘支付 order_type 1线上 2线下
    // if (data.order_type === 1) {
      handlePayMent(data)
    // }
  } else {
    showToast(error)
  }
}
const handlePayMent = (order: any) => {
  (window as any).WebViewJavascriptBridge.callHandler('payDapp', {
    order_id: order.order_id_buyer,
    amount: divide(order.order_num),
    price: order.order_num,
    token_id: coinTypes[order.pay_coin],
    symbol: order.pay_coin
  }, function (responseData: any) {
  });
}
const onClickLeft = () => {
  if (route.meta.backTo) {
    router.push(route.meta.backTo)
  } else {
    history.go(-1)
  }
}
</script>

<style lang="scss" scoped>
@import './scss/index.scss';

.navBar {
  --van-nav-bar-background: transparent;
}
</style>