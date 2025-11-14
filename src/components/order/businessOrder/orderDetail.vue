<template>
  <loading :loading-show="loading" />
  <div class="container">
    <!-- Notice -->
    <div class="notice-box">
      <p style="margin: 0 0 8px 0;">
        请认真核对付款人信息，若付款人信息与商家信息不匹配请停止付款并联系客服
      </p>
      <p style="margin: 0;">
        买家已通过平台实名及视频认证平台7*24小时客服在线保证您的交易安全
      </p>
    </div>
    <!-- Order Status -->
    <div class="order-status">
      <div>订单状态</div>
      <!-- // 0 全部 1待支付 2 完成 3 取消 4 待确认 5 确认转账 6 买家待确认 order_type 1线上 2线下-->
      <div v-if="detail.dispute_symbol === 1">
        <div v-if="detail.order_status === 1" class="status">
          待买家支付
        </div>
        <div v-if="detail.order_status === 2" class="status">
          {{ $t("myOrder.completed") }}
        </div>
        <div v-if="detail.order_status === 3" class="status">
          {{ $t("myOrder.cancelled") }}
        </div>
        <div v-if="[4, 5].includes(detail.order_status)" class="status">
          {{ $t("myOrder.toBeconfirmed") }}
        </div>
        <div v-if="detail.order_status === 6" class="status">
          待买家确认
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
          <img src="@/assets/img/order/order.png" width="18" />
          <span>
            {{ detail.goods_type === 1 ? '卖家信息' : '买家信息' }}
          </span>
          <img src="@/assets/img/order/abnormal.png" width="18" v-if="detail.is_abnormal"/>
        </div>
        <button class="contact-btn" @click="contactChat">
          {{ detail.goods_type === 1 ? '联系卖家' : '联系买家' }}
        </button>
      </div>
      <template v-if="detail.goods_type == 1">
        <template v-if="otherPaymentMethods.includes(detail.buyer_address.paymentMethod)">
          <div class="info-item">
            <span class="info-label">{{ $t("myOrder.recipient") }}</span>
            <span class="info-value">{{ detail.buyer_address.accountName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t("myOrder.recipientAccount") }}</span>
            <span class="info-value">{{ detail.buyer_address.paymentAccount }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t("myOrder.openingBank") }}</span>
            <span class="info-value">{{ detail.buyer_address.bankAccount }}</span>
          </div>
        </template>
        <template v-else-if="paymentMethods.includes(detail.buyer_address.paymentMethod)">
          <div class="info-item">
            <span class="info-label">{{ $t("myOrder.recipient") }}</span>
            <span class="info-value">{{ detail.buyer_address.accountName }}</span>
          </div>
          <div class="info-item" style="border: none;">
            <span class="info-label">{{ $t("myOrder.recipientAccount") }}</span>
            <span class="info-value">{{ detail.buyer_address.paymentAccount }}</span>
          </div>
          <div style="text-align: center; margin-top: 20px" v-if="detail.buyer_address.paymentCode">
            <img :src="detail.buyer_address.paymentCode" width="180"/>
            <div style="margin-top: 10px; color: #666;">收款二维码</div>
          </div>
        </template>
        <template v-else>
          <div class="info-item">
            <span class="info-label">收款网络</span>
            <span class="info-value">{{ detail.buyer_address.currencyType }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">收款地址</span>
            <span class="info-value">
              {{ detail.buyer_address.paymentAccount }}
              <img class="copy" src="@/assets/img/order/blue_copy.png" alt="" @click="copyCode(detail.buyer_address.paymentAccount)" width="14" height="14" />
            </span>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="info-item">
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
            {{ detail.goods_type === 2 ? $t("myOrder.sell") : $t("myOrder.buy") }}{{ detail.goods_coin }}
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
          <img class="voucher" v-for="(img, index) in detail.order_picture" :src="img"
            @click="sceneImg(detail.order_picture, index)" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="btn-box" v-if="detail.order_type === 1">
        <div
          v-if="
            detail.order_status === 4 &&
            detail.goods_type === 2 &&
            detail.dispute_symbol !== 2
          "
          class="botton"
          @click="handlePayMent"
        >
          {{ $t("myOrder.authorize") }}
        </div>
        <div
          v-if="
            detail.order_status === 4 &&
            detail.goods_type === 1 &&
            detail.dispute_symbol !== 2
          "
          class="botton"
          @click="payClick"
        >
          {{ $t("myOrder.payment") }}
        </div>
        <div
          v-if="detail.order_status === 5 && detail.goods_type === 2 && detail.dispute_symbol !== 2"
          class="botton"
          @click="releaseToken"
        >
          {{ $t("myOrder.confirmOrder") }}
        </div>
        <div
          class="cancel"
          v-if="
            ((detail.order_status !== 4 && detail.goods_type === 2) ||
              (detail.order_status !== 1 && detail.goods_type === 1)) &&
            detail.dispute_symbol !== 2 &&
            ![2, 3].includes(detail.order_status)
          "
          @click="appealClick"
        >
          {{ $t("myOrder.orderComplaint") }}
        </div>
        <div
          class="botton"
          v-if="
            detail.dispute_symbol === 2 && store.getUid === detail.dispute_user
          "
          @click="appealCancelClick"
        >
          {{ $t("myOrder.cancelComplaint") }}
        </div>
      </div>
      <div v-else class="btn-box">
        <div
          v-if="detail.order_status === 4 && detail.goods_type === 2 && detail.dispute_symbol !== 2"
          class="botton"
          @click="handlePayMent"
        >
          {{ $t("myOrder.authorize") }}
        </div>
        <div
          v-if="detail.order_status === 4 && detail.goods_type === 1 && detail.dispute_symbol !== 2"
          class="botton"
          @click="uploadClick"
        >
          {{ $t("myOrder.uploadPaymentImage") }}
        </div>
        <div
          v-if="detail.order_status === 4 && detail.goods_type === 1 && detail.dispute_symbol !== 2"
          class="cancel"
          @click="handleOrderCancel"
        >
          {{ $t("myOrder.cancelOrder") }}
        </div>
        <div
          v-if="detail.order_status === 5 && detail.goods_type === 2 && detail.dispute_symbol !== 2"
          class="botton"
          @click="releaseToken"
        >
          {{ $t("myOrder.confirmOrder") }}
        </div>
        <template v-if="((detail.order_status !== 4 && detail.goods_type === 2) || (detail.order_status !== 1 && detail.goods_type === 1)) && detail.dispute_symbol !== 2 && ![2, 3].includes(detail.order_status)">
          <div class="cancel" style="background: none; border: none;" v-if="detail.order_status === 4 && detail.goods_type === 1">
            <el-tooltip placement="top-end" effect="light">
              <template #content>
                <div @click="appealClick" style="padding: 2px 10px; color: #666; font: 400 14px PingFang SC-Bold, PingFang SC;">{{ $t("myOrder.orderComplaint") }}</div>
              </template>
              <img src="@/assets/img/order/dot.png" width="42"/>
            </el-tooltip>
          </div>
          <div v-else class="cancel" @click="appealClick">
            {{ $t("myOrder.orderComplaint") }}
          </div>
        </template>
        <div
          class="botton"
          v-if="detail.dispute_symbol === 2 && store.getUid === detail.dispute_user"
          @click="appealCancelClick"
        >
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
  <van-popup v-model:show="showCancelPopup" position="bottom" round @close="changeCancelChecked">
    <div style="margin: 20px; text-align: center; font-weight: bold;">
      选择取消原因
    </div>
    <div>
      <van-radio-group v-model="cancelChecked">
        <van-cell-group inset>
          <van-cell v-for="item in cancelReasonList">
            <template #title>
              <div class="left">
                <div class="name">
                  <div>{{ item.name }}</div>
                </div>
              </div>
            </template>
            <template #right-icon>
              <van-radio :name="item.name" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div style="margin: 20px; text-align: center;">
      <el-button type="primary" @click="confirmCancel">确认取消</el-button>
    </div>
  </van-popup>
  <van-popup v-model:show="abnormalShowPopup" class="abnormal-popup">
    <img src="@/assets/img/order/abnormal.png" width="80"/>
    <div class="abnormal-title">
      此账号为地址异常账号! 请谨慎交易!
    </div>
    <div class="abnormal-btn" @click="abnormalShowPopup = false">
      我已知晓! 继续交易
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { divide } from "@/utils/formart";
import {
  orderDetail,
  refreshOrder,
  cancelOrder,
  confirmOrder,
  appealCancel,
  orderNotificationUpdate,
} from "@/api/order";
import { setupWebViewJavascriptBridge } from "@/utils/bridge";
import { coinTypes } from "@/enum";
import moment from "moment-timezone";
import { showConfirmDialog, showToast } from "vant";
import { imagePreview } from "@/utils/preview";
import { copyText } from "@/utils/copy";
import contactIm from "@/utils/contactIm";
import router from "@/router";
moment.locale("zh-cn");
import { useAppStore } from "@/store";
import { t } from "@/plugins/i18n";
import Loading from "@/components/loading/index.vue";

const paymentMethods = ["支付宝", "微信", "汇旺", "ABA"]
const otherPaymentMethods = ["银行卡", "VISA"]
const store = useAppStore();
const route = useRoute();
const loading = ref<boolean>(false);
const abnormalShowPopup = ref<boolean>(false)
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
      locked.value = false;
      router.push("/order/authSuccess");
      await refreshOrder({ order_id_seller: detail.value.order_id_seller });
    }
    bridge.registerHandler("responseTransferDapp", responseTransferDapp);
    async function responseReleaseToken(data: any) {
      locked.value = false
      await sureOrder()
    }
    bridge.registerHandler("responseReleaseToken", responseReleaseToken);
  });
  payWay.value = "";
  loading.value = true;
  getDetail();
});
const cancelReasonList = ref<Array<any>>([
  {
    id: 1,
    name: "不想买/不想卖了",
  },
  {
    id: 2,
    name: "支付限制了",
  },
  {
    id: 3,
    name: "与买家/卖家协商取消",
  },
  {
    id: 4,
    name: "选择其他币种",
  },
]);
const showCancelPopup = ref<boolean>(false);
const cancelChecked = ref<string>("");
const detail = ref<any>({});
const payWay = ref<string>("");
const getDetail = async () => {
  try {
    const { data } = await orderDetail({
      id: Number(route.query.id),
    });
    detail.value = data;
    payWay.value = data.transaction_ways.filter(
      (item: any) => item.symbol === data.order_transaction_way
    )[0].name;
    if (!detail.value.is_abnormal && !detail.value.is_notification) {
      const { data } = await orderNotificationUpdate({
        id: Number(route.query.id),
      });
      abnormalShowPopup.value = true
    }
  } catch (e) {
    console.log("business order detail error: ", e)
  } finally {
    loading.value = false;
  }
};
const locked = ref<boolean>(false)
const releaseToken = () => {
  if (locked.value) return
  showConfirmDialog({
    message: t("myOrder.confirmPaymentAddress"),
    confirmButtonText: "是",
    cancelButtonText: "否"
  }).then(async () => {
    locked.value = true;
    (window as any).WebViewJavascriptBridge.callHandler(
      "releaseTokenDapp",
      {
        order_id: detail.value.order_id_seller,
        amount: divide(detail.value.order_num - detail.value.goods_fee),
        price: detail.value.pay_amount - detail.value.goods_fee,
        token_id: coinTypes[detail.value.goods_coin],
        symbol: detail.value.goods_coin,
        buyer_wallet_address: detail.value.buyer_wallet_address,
        buyer_wallet_name: detail.value.buyer_wallet_name,
        seller_wallet_address: detail.value.seller_wallet_address,
        seller_wallet_name: detail.value.seller_wallet_name
      },
      function (responseData: any) {}
    );
  }).catch(() => {    
    router.push({
      path: "/order/appeal",
      query: {
        id: detail.value.id,
        matched_address: 1
      },
    });
  });
}

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

const handlePayMent = (order: any) => {
  // if (locked.value) return
  locked.value = true;
  (window as any).WebViewJavascriptBridge.callHandler(
    "transferDapp",
    {
      order_id: detail.value.order_id_seller,
      amount: divide(detail.value.order_num - detail.value.goods_fee),
      price: detail.value.pay_amount - detail.value.goods_fee,
      token_id: coinTypes[detail.value.goods_coin],
      symbol: detail.value.goods_coin,
      buyer_wallet_address: detail.value.buyer_wallet_address,
      buyer_wallet_name: detail.value.buyer_wallet_name,
      seller_wallet_address: detail.value.seller_wallet_address,
      seller_wallet_name: detail.value.seller_wallet_name
    },
    function (responseData: any) {}
  );
};

// 确认订单
const sureOrder = async () => {
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
// 图片预览
const sceneImg = (images: any, index: number) => {
  imagePreview(images, index);
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
  setTimeout(() => {
    router.push({
      path: "/order/appeal",
      query: {
        id: detail.value.id,
        matched_address: 0
      },
    });
  }, 0)
};
// 取消订单
const handleOrderCancel = async () => {
  if (detail.value.order_type == 2) {
    console.log(cancelChecked.value)
    showCancelPopup.value = true
  }
};
const changeCancelChecked = () => {};
const confirmCancel = async () => {
  try {
    showCancelPopup.value = false
    loading.value = true
    const { code, error } = await cancelOrder({
      id: detail.value.id,
      cancelReason: cancelChecked.value
    });
    if (code === 0) {
      showToast(t("myOrder.cancelSuccess"));
      getDetail();
    } else {
      showToast(error);
    }
  } catch(e) {
    console.log("order cancel error", e)
  } finally {
    loading.value = false
  }
}
// 复制订单号
const copyCode = (val: string) => {
  copyText(".copy", val);
};
// 联系客服
const contactService = () => {
  contactIm(store.getUid, store.getServiceId)
  // router.push("/service");
};
// 联系商家 、 买家
const contactChat = () => {
  contactIm(store.getUid, detail.value.order_buyer);
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

.abnormal-popup {
  padding: 16px;
  border-radius: 12px;
  width: 90%;
  text-align: center;
}

.abnormal-title {
  font: $font16-400;
  color: #666;
  margin-top: 8px;
}

.abnormal-btn {
  margin: 30px auto 0 auto;
  width: 160px;
  height: 40px;
  border-radius: 8px;
  background: $btn-color-blue;
  color: $color-FFF;
  text-align: center;
  font: $font16-400;
  line-height: 40px;
}
</style>
