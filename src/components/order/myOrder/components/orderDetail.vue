<template>
  <div class="container" v-if="!loading">
    <!-- // 0 全部 1待支付 2 完成 3 取消 4 待确认 5 确认转账 6 买家待确认 order_type 1线上 2线下-->
    <div v-if="detail.dispute_symbol === 1">
      <div v-if="detail.order_status === 1" class="status">待支付</div>
      <div v-if="detail.order_status === 2" class="status">已完成</div>
      <div v-if="detail.order_status === 3" class="status">已取消</div>
      <div v-if="[4, 5].includes(detail.order_status)" class="status">待商家确认</div>
      <div v-if="detail.order_status === 6" class="status">待确认</div>
    </div>
    <div v-else>
      <div class="status">订单申诉中</div>
    </div>
    <div class="head">
      <img class="check" src="@/assets/img/order/check.png" alt="">
      <div class="top">
        <span class="text">商家信息</span>
        <div class="contact" @click="contactChat">
          <img class="logo" src="@/assets/img/order/chat.png" alt="">
          <span>联系商家</span>
        </div>
      </div>
      <div class="desc">
        <img src="@/assets/img/order/star.png" alt="">
        <span>商家已通过平台实名及视频认证</span>
      </div>
      <div class="desc mt8">
        <img src="@/assets/img/order/star.png" alt="">
        <span>平台7*24小时客服在线，保证您与卖家的交易安全</span>
      </div>
    </div>
    <div class="order">
      <div class="top">
        <img :src="detail.goods_coin_icon" alt="">
        <span>{{ detail.goods_type === 1 ? '出售' : '买入' }}{{ detail.goods_coin }}</span>
      </div>
      <section>
        <div class="item">
          <span class="left">订单编号</span>
          <div class="right">
            <span class="text">{{ detail.order_id }}</span>
            <img class="copy" src="@/assets/img/order/copy.png" alt="" @click="copyCode(detail.order_id)">
          </div>
        </div>
        <div class="item">
          <span class="left">单价</span>
          <div class="right">
            <span class="text">{{ detail.goods_price }} {{ detail.goods_pay_coin }}/个</span>
          </div>
        </div>
        <div class="item">
          <span class="left">数量</span>
          <div class="right">
            <span class="text">{{ divide(detail.order_num) }}</span>
          </div>
        </div>
        <div class="item">
          <span class="left">总金额</span>
          <div class="right">
            <span class="text2">{{ divide(detail.order_amount) }} {{ detail.goods_pay_coin }}</span>
          </div>
        </div>
        <div class="item">
          <span class="left">支付方式</span>
          <div class="right">
            <div class="divider"></div>
            <span class="text2">{{ payWay }}</span>
          </div>
        </div>
        <div class="item">
          <span class="left">下单时间</span>
          <div class="right">
            <span class="text">{{ moment(detail.created_at * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
        </div>
        <div class="item" v-if="detail.order_status === 2">
          <span class="left">完成时间</span>
          <div class="right">
            <span class="text">{{ moment(detail.updated_at * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
        </div>
        <div class="item" v-if="detail.order_type === 2 && [2, 5, 6].includes(detail.order_status)">
          <span class="left">支付截图</span>
          <div class="right">
            <img class="voucher" v-for="(img, index) in detail.order_picture" :src="img" alt=""
              @click="sceneImg(detail.order_picture, index)">
          </div>
        </div>
      </section>
      <div class="btn-box" v-if="detail.order_type === 1">
        <div class="botton" v-if="detail.order_status === 1" @click="payClick">支付</div>
        <div class="cancel" v-if="detail.order_status === 1" @click="cancelClick">取消订单</div>
      </div>
      <div class="btn-box" v-else>
        <div class="botton" v-if="detail.order_status === 1 && detail.goods_type === 1 && detail.dispute_symbol !== 2"
          @click="payClick">支付</div>
        <div class="botton" v-if="detail.order_status === 1 && detail.goods_type === 2 && detail.dispute_symbol !== 2"
          @click="uploadClick">上传支付截图</div>
        <div class="cancel"
          v-if="(detail.order_status === 4 && detail.goods_type === 2) || (detail.order_status === 1 && detail.goods_type === 1) && detail.dispute_symbol !== 2"
          @click="cancelClick">取消订单</div>
        <div class="botton" v-if="detail.order_status === 6 && detail.dispute_symbol !== 2" @click="sureClick">确认订单
        </div>
        <div class="cancel"
          v-if="((detail.order_status !== 4 && detail.goods_type === 2) || (detail.order_status !== 1 && detail.goods_type === 1)) && detail.dispute_symbol !== 2 && ![2, 3].includes(detail.order_status)"
          @click="appealClick">申诉订单</div>
        <div class="botton" v-if="detail.dispute_symbol === 2 && store.getUid === detail.dispute_user"
          @click="appealCancelClick">取消申诉</div>
      </div>
      <div class="service">
        <span>遇到问题?</span>
        <span @click="contactService">联系客服</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { divide } from "@/utils/formart";
import { orderDetail, refreshOrder, cancelOrder, confirmOrder, appealCancel } from "@/api/order";
import moment from "moment-timezone";
import { setupWebViewJavascriptBridge } from '@/utils/bridge'
moment.locale("zh-cn");
import { coinTypes } from "@/enum";
import { showConfirmDialog, showToast } from "vant";
import { imagePreview } from "@/utils/preview";
import { copyText } from '@/utils/copy'
import contactIm from '@/utils/contactIm'
import router from "@/router";
import { useAppStore } from '@/store'

const store = useAppStore()
const route = useRoute()
const loading = ref(true)
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
      await refreshOrder({ order_id_buyer: detail.value.order_id_buyer })
      getDetail()
    }
    bridge.registerHandler('responsePayDapp', responsePayDapp);
  });
  payWay.value = ''
  loading.value = true
  getDetail()
})
const detail = ref({} as any)
const payWay = ref('')
const getDetail = async () => {
  const { data } = await orderDetail({
    id: Number(route.query.id)
  })
  loading.value = false
  detail.value = data
  payWay.value = data.transaction_ways.filter((item: any) => item.symbol === data.order_transaction_way)[0].name
}

// 支付
const payClick = () => {
  (window as any).WebViewJavascriptBridge.callHandler('payDapp', {
    order_id: detail.value.order_id_buyer,
    amount: divide(detail.value.order_num),
    price: detail.value.pay_amount,
    token_id: coinTypes[detail.value.pay_coin],
    symbol: detail.value.pay_coin
  }, function (responseData: any) {
  });
}
// 取消订单
const cancelClick = async () => {
  showConfirmDialog({
    message: '您是否取消该订单?',
  }).then(async () => {
    const { code, error } = await cancelOrder({
      id: detail.value.id
    })
    if (code === 0) {
      showToast('取消成功')
      getDetail()
    } else {
      showToast(error)
    }
  }).catch(() => {
    // on cancel
  });
}
// 上传支付截图
const uploadClick = () => {
  router.push({
    path: '/order/upload',
    query: {
      id: detail.value.id
    }
  })
}

// 申诉订单
const appealClick = () => {
  router.push({
    path: '/order/appeal',
    query: {
      id: detail.value.id
    }
  })
}
// 图片预览
const sceneImg = (images: any, index: number) => {
  imagePreview(images, index)
}

// 确认订单
const sureClick = async () => {
  const { code, error } = await confirmOrder({
    id: detail.value.id
  })
  if (code === 0) {
    showToast('确认成功')
    getDetail()
  } else {
    showToast(error)
  }
}

// 复制订单号
const copyCode = (val: string) => {
  copyText('.copy', val)
}
// 联系客服
const contactService = () => {
  // contactIm(store.getUid, store.getServiceId)
  router.push('/service')
}
// 联系商家 、 买家
const contactChat = () => {
  contactIm(store.getUid, detail.value.order_seller)
}
// 取消申述
const appealCancelClick = async () => {
  const { code, error } = await appealCancel({
    id: detail.value.id
  })
  if (code === 0) {
    showToast('取消成功')
    history.back()
  } else {
    showToast(error)
  }
}
</script>

<style lang="scss" scoped>
@import './scss/orderDetail.scss';
</style>