<template>
  <div class="container" v-if="!loading">
    <!-- Notice -->
    <div class="notice-box">
      <p style="margin: 0 0 8px 0;">
        请认真核对付款人信息，若付款人信息与商家信息不匹配请停止付款并联系客服
      </p>
      <p style="margin: 0;">
        商家已通过平台实名及视频认证平台7*24小时客服在线保证您的交易安全
      </p>
    </div>
    <!-- Order Status -->
    <div class="order-status">
      <div>订单状态</div>
      <!-- // 0 全部 1待支付 2 完成 3 取消 4 待确认 5 确认转账 6 买家待确认 order_type 1线上 2线下-->
      <div v-if="detail.dispute_symbol === 1">
        <div v-if="detail.order_status === 1" class="status">
          {{ $t("myOrder.unpaid") }}
        </div>
        <div v-if="detail.order_status === 2" class="status">
          {{ $t("myOrder.completed") }}
        </div>
        <div v-if="detail.order_status === 3" class="status">
          {{ $t("myOrder.cancelled") }}
        </div>
        <div v-if="[4, 5].includes(detail.order_status)" class="status">
          {{ $t("myOrder.toBeConfirmedByMerchant") }}
        </div>
        <div v-if="detail.order_status === 6" class="status">
          {{ $t("myOrder.toBeconfirmed") }}
        </div>
      </div>
      <div v-else>
        <div class="status">{{ $t("myOrder.orderComplaintInProgress") }}</div>
      </div>
    </div>
    <!-- Buyer/Seller Information -->
    <div class="info-card" v-if="detail.order_type === 2">
      <div class="info-header">
        <div class="info-title">
          <div class="check-icon">
            <img src="@/assets/img/order/order.png" width="18" />
          </div>
          <span>
            {{ detail.goods_type === 2 ? '卖家信息' : '买家信息' }}
          </span>
        </div>
        <button class="contact-btn" @click="contactChat">
          {{ detail.goods_type === 2 ? '联系卖家' : '联系买家' }}
        </button>
      </div>

      <template v-if="detail.goods_type == 2">
        <template v-if="otherPaymentMethods.includes(detail.seller_address.paymentMethod)">
          <div class="info-item">
            <span class="info-label">{{ $t("myOrder.recipient") }}</span>
            <span class="info-value">{{ detail.seller_address.accountName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t("myOrder.recipientAccount") }}</span>
            <span class="info-value">{{ detail.seller_address.paymentAccount }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t("myOrder.openingBank") }}</span>
            <span class="info-value">{{ detail.seller_address.bankAccount }}</span>
          </div>
        </template>
        <template v-else-if="paymentMethods.includes(detail.seller_address.paymentMethod)">
          <div class="info-item">
            <span class="info-label">{{ $t("myOrder.recipient") }}</span>
            <span class="info-value">{{ detail.seller_address.accountName }}</span>
          </div>
          <div class="info-item" style="border: none;">
            <span class="info-label">{{ $t("myOrder.recipientAccount") }}</span>
            <span class="info-value">{{ detail.seller_address.paymentAccount }}</span>
          </div>
          <div style="text-align: center; margin-top: 20px" v-if="detail.seller_address.paymentCode">
            <img :src="detail.seller_address.paymentCode" width="180"/>
            <div style="margin-top: 10px; color: #666;">收款二维码</div>
          </div>
        </template>
        <template v-else>
          <div class="info-item">
            <span class="info-label">收款网络</span>
            <span class="info-value">{{ detail.seller_address.currencyType }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">收款地址</span>
            <span class="info-value">
              {{ detail.seller_address.paymentAccount }}
              <img class="copy" src="@/assets/img/order/blue_copy.png" alt="" @click="copyCode(detail.seller_address.paymentAccount)" width="14" height="14" />
            </span>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="info-item">
          <!-- <span class="info-label">商家名称</span>
          <span class="info-value">{{ detail.shop_name }}</span> -->
          <span class="info-label">用户昵称</span>
          <span class="info-value">{{ detail.buyer_address.nickname }}</span>          
        </div>
        <div class="info-item">
          <span class="info-label">付款人</span>
          <span class="info-value">{{ detail.buyer_address.accountName }}</span>
        </div>
      </template>
    </div>    
    <!-- Order Information -->
    <div class="order-card">
      <div class="order-item">
        <div class="order-label">订单类型</div>
        <div class="order-value">
          <img :src="detail.goods_coin_icon" alt="" width="22" height="22" />
          <span style="color: #FD412BFF; margin-left: 4px;">
            {{ detail.goods_type === 1 ? $t("myOrder.sell") : $t("myOrder.buy") }}{{ detail.goods_coin }}
          </span>
        </div>
      </div>
      <div class="order-item">
        <div class="order-label">{{ $t("myOrder.orderNumber") }}</div>
        <div class="order-value">
          <span>{{ detail.order_id }}</span>
          <img class="copy" src="@/assets/img/order/red_copy.png" alt="" @click="copyCode(detail.order_id)" width="14" height="14" />
        </div>
      </div>
      <div class="order-item">
        <div class="order-label">{{ $t("myOrder.unitPrice") }}</div>
        <div class="order-value">
          <span>{{ detail.goods_price }} {{ detail.goods_pay_coin }}/个</span>
        </div>
      </div>
      <div class="order-item">
        <div class="order-label">{{ $t("myOrder.quantity") }}</div>
        <div class="order-value">
          <span>{{ divide(detail.order_num) }}</span>
        </div>
      </div>
      <div class="order-item">
        <div class="order-label">{{ $t("myOrder.totalAmount") }}</div>
        <div class="order-value">
          <span>
            {{ divide(detail.order_amount) }}
            {{ detail.goods_pay_coin }}
          </span>
        </div>
      </div>
      <div class="order-item">
        <div class="order-label">{{ $t("myOrder.paymentMethod") }}</div>
        <div class="order-value">
          <span>{{ payWay }}</span>
        </div>
      </div>
      <div class="order-item">
        <div class="order-label">手续费</div>
        <div class="order-value">
          <span>
            {{ divide(detail.goods_fee) | 0 }}            
            {{ detail.goods_coin }}
          </span>
        </div>
      </div>
      <div class="order-item">
        <div class="order-label">{{ $t("myOrder.orderTime") }}</div>
        <div class="order-value">
          <span>{{ moment(detail.created_at * 1000).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </div>
      </div>
      <div class="order-item" v-if="detail.order_status === 2">
        <div class="order-label">{{ $t("myOrder.finishTime") }}</div>
        <div class="order-value">
          <span>{{ moment(detail.updated_at * 1000).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </div>
      </div>
      <div class="order-item" v-if="detail.order_type === 2 && [2, 5, 6].includes(detail.order_status)">
        <div class="order-label">{{ $t("myOrder.paymentImage") }}</div>
        <div class="order-value">
          <img class="voucher" v-for="(img, index) in detail.order_picture" :src="img" @click="sceneImg(detail.order_picture, index)" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="btn-box">
        <div class="botton" v-if="
          detail.order_status === 1 &&
          detail.goods_type === 1 &&
          detail.dispute_symbol !== 2" @click="handlePayMent">
          {{ $t("myOrder.payment") }}
        </div>
        <template v-if="detail.order_type === 1">
          <div class="botton" v-if="
            detail.order_status === 1 &&
            detail.goods_type === 2 &&
            detail.dispute_symbol !== 2
          " @click="payClick">
            {{ $t("myOrder.payment") }}
          </div>
        </template>
        <template v-else>
          <div class="botton" v-if="
            detail.order_status === 1 &&
            detail.goods_type === 2 &&
            detail.dispute_symbol !== 2
          " @click="uploadClick">
            {{ $t("myOrder.uploadPaymentImage") }}
          </div>
        </template>
        <div class="cancel" v-if="
          (detail.order_status === 4 && detail.goods_type === 2) ||
          (detail.order_status === 1 &&
            detail.goods_type === 1 &&
            detail.dispute_symbol !== 2)
        " @click="cancelClick">
          {{ $t("myOrder.cancelOrder") }}
        </div>
        <div class="botton" v-if="detail.order_status === 6 && detail.dispute_symbol !== 2" @click="releaseToken">
          {{ $t("myOrder.confirmOrder") }}
        </div>
        <div class="cancel" v-if="
          ((detail.order_status !== 4 && detail.goods_type === 2) ||
            (detail.order_status !== 1 && detail.goods_type === 1)) &&
          detail.dispute_symbol !== 2 &&
          ![2, 3].includes(detail.order_status)
        " @click="appealClick">
          {{ $t("myOrder.orderComplaint") }}
        </div>
        <div class="botton" v-if="
          detail.dispute_symbol === 2 && store.getUid === detail.dispute_user
        " @click="appealCancelClick">
          {{ $t("myOrder.cancelComplaint") }}
        </div>
      </div>
      <div class="service">
        <span>{{ $t("myOrder.anyProblems") }}</span>
        <span @click="contactService">
          {{ $t("myOrder.contactHelpCenter") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { divide } from "@/utils/formart";
import {
  orderDetail,
  refreshOrder,
  cancelOrder,
  confirmOrder,
  appealCancel,
} from "@/api/order";
import moment from "moment-timezone";
import { setupWebViewJavascriptBridge } from "@/utils/bridge";
moment.locale("zh-cn");
import { coinTypes } from "@/enum";
import { showConfirmDialog, showToast } from "vant";
import { imagePreview } from "@/utils/preview";
import { copyText } from "@/utils/copy";
import contactIm from "@/utils/contactIm";
import router from "@/router";
import { useAppStore } from "@/store";
import { t } from "@/plugins/i18n";

const paymentMethods = ["支付宝", "微信", "汇旺", "ABA"]
const otherPaymentMethods = ["银行卡", "VISA"]

const store = useAppStore();
const route = useRoute();
const loading = ref(true);
onActivated(() => {
  // flutter交互
  setupWebViewJavascriptBridge(function (bridge: any) {
    async function defaultHandler(message: any) {
      return new Promise((resolve) => {
        let data = {
          "Javascript Responds": "defaultHandler Wee!",
        };
        setTimeout(() => resolve(data), 0);
      });
    }
    bridge.init(defaultHandler);
    async function responsePayDapp(data: any) {
      const { code, error } = await confirmOrder({
        id: detail.value.id,
        pictures: [],
      });
      if (code === 0) {
        showToast(t("myOrder.orderConfirmedSuccessfully"));
        getDetail();
      } else {
        showToast(error);
      }
    }
    bridge.registerHandler("responsePayDapp", responsePayDapp);
    async function responseTransferDapp(data: any) {
      // 关闭支付窗口回调
      await refreshOrder({ order_id_buyer: detail.value.order_id_buyer });
      getDetail();
    }
    bridge.registerHandler("responseTransferDapp", responseTransferDapp);
    async function responseReleaseToken(data: any) {
      await sureClick()
      locked.value = false
    }
    bridge.registerHandler("responseReleaseToken", responseReleaseToken);
  });
  payWay.value = "";
  loading.value = true;
  getDetail();
});
const detail = ref({} as any);
const payWay = ref("");
const getDetail = async () => {
  const { data } = await orderDetail({
    id: Number(route.query.id),
  });
  loading.value = false;
  detail.value = data;
  payWay.value = data.transaction_ways.filter(
    (item: any) => item.symbol === data.order_transaction_way
  )[0].name;
};

const handlePayMent = () => {
  // if (locked.value) return
  // locked.value = true;
  (window as any).WebViewJavascriptBridge.callHandler(
    "transferDapp",
    {
      order_id: detail.value.order_id_buyer,
      amount: divide(detail.value.order_num),
      price: detail.value.order_num,
      token_id: coinTypes[detail.value.goods_coin],
      symbol: detail.value.goods_coin,
      buyer_wallet_address: detail.value.buyer_wallet_address,
      buyer_wallet_name: detail.value.buyer_wallet_name,
      seller_wallet_address: detail.value.seller_wallet_address,
      seller_wallet_name: detail.value.seller_wallet_name
    },
    function (responseData: any) { }
  );
};

// 支付
const payClick = () => {
  (window as any).WebViewJavascriptBridge.callHandler(
    "payDapp",
    {
      order_id: detail.value.order_id_buyer,
      amount: divide(detail.value.order_amount),
      price: detail.value.pay_amount,
      token_id: coinTypes[detail.value.goods_pay_coin],
      symbol: detail.value.goods_pay_coin,
      buyer_wallet_address: detail.value.seller_wallet_address,
      buyer_wallet_name: detail.value.seller_wallet_name,
      seller_wallet_address: detail.value.buyer_wallet_address,
      seller_wallet_name: detail.value.buyer_wallet_name
    },
    function (responseData: any) { }
  );
};
// 取消订单
const cancelClick = async () => {
  showConfirmDialog({
    message: t("myOrder.cancelThisOrder"),
  })
    .then(async () => {
      const { code, error } = await cancelOrder({
        id: detail.value.id,
      });
      if (code === 0) {
        showToast(t("myOrder.cancelSuccess"));
        getDetail();
      } else {
        showToast(error);
      }
    })
    .catch(() => {
      // on cancel
    });
};
// 上传支付截图
const uploadClick = () => {
  router.push({
    path: "/order/upload",
    query: {
      id: detail.value.id,
    },
  });
};

// 申诉订单
const appealClick = () => {
  router.push({
    path: "/order/appeal",
    query: {
      id: detail.value.id,
    },
  });
};
// 图片预览
const sceneImg = (images: any, index: number) => {
  imagePreview(images, index);
};

const locked = ref<boolean>(false)
const releaseToken = () => {
  if (locked.value) return
  locked.value = true;
  (window as any).WebViewJavascriptBridge.callHandler(
    "releaseTokenDapp",
    {
      order_id: detail.value.order_id_buyer,
      amount: divide(detail.value.order_num + detail.value.goods_fee),
      price: detail.value.pay_amount + detail.value.goods_fee,
      token_id: coinTypes[detail.value.goods_coin],
      symbol: detail.value.goods_coin,
      buyer_wallet_address: detail.value.buyer_wallet_address,
      buyer_wallet_name: detail.value.buyer_wallet_name,
      seller_wallet_address: detail.value.seller_wallet_address,
      seller_wallet_name: detail.value.seller_wallet_name
    },
    function (responseData: any) { }
  );
}

// 确认订单
const sureClick = async () => {
  const { code, error } = await confirmOrder({
    id: detail.value.id,
  });
  if (code === 0) {
    showToast(t("myOrder.confirmSuccess"));
    getDetail();
  } else {
    showToast(error);
  }
};

// 复制订单号
const copyCode = (val: string) => {
  copyText(".copy", val);
};
// 联系客服
const contactService = () => {
  contactIm(store.getUid, store.getServiceId)
};
// 联系商家 、 买家
const contactChat = () => {
  contactIm(store.getUid, detail.value.order_seller);
};
// 取消申述
const appealCancelClick = async () => {
  const { code, error } = await appealCancel({
    id: detail.value.id,
  });
  if (code === 0) {
    showToast(t("myOrder.cancelSuccess"));
    history.back();
  } else {
    showToast(error);
  }
};
</script>

<style lang="scss" scoped>
@import "./scss/orderDetail.scss";
</style>
