<template>
  <div class="container" v-if="!loading">
    <!-- // 0 全部 1待支付 2 完成 3 取消 4 待确认 5 确认转账 6 买家待确认 order_type 1线上 2线下-->
    <div v-if="detail.dispute_symbol === 1">
      <div v-if="detail.order_status === 1" class="status">
        {{ $t("myOrder.unpaid") }}
      </div>
      <div v-if="detail.order_status === 2" class="status">{{ $t("myOrder.completed") }}</div>
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
    <div class="head">
      <img class="check" src="@/assets/img/order/check.png" alt="" />
      <div class="top">
        <span class="text">{{ $t("myOrder.merchantInformation") }}</span>
        <div class="contact" @click="contactChat">
          <img class="logo" src="@/assets/img/order/chat.png" alt="" />
          <span>{{ $t("myOrder.contactMerchant") }}</span>
        </div>
      </div>
      <div class="desc">
        <img src="@/assets/img/order/star.png" alt="" />
        <span>{{ $t("myOrder.merchantHasPassedAuthentication") }}</span>
      </div>
      <div class="desc mt8">
        <img src="@/assets/img/order/star.png" alt="" />
        <span>{{ $t("myOrder.customerServiceOnline") }}</span>
      </div>
    </div>
    <div class="order">
      <div class="top">
        <img :src="detail.goods_coin_icon" alt="" />
        <span>
          {{ detail.goods_type === 1 ? $t("myOrder.sell") : $t("myOrder.buy")}}{{ detail.goods_coin }}
        </span>
      </div>
      <section>
        <div class="item">
          <span class="left">{{ $t("myOrder.orderNumber") }}</span>
          <div class="right">
            <span class="text">{{ detail.order_id }}</span>
            <img class="copy" src="@/assets/img/order/copy.png" alt="" @click="copyCode(detail.order_id)" />
          </div>
        </div>
        <div class="item">
          <span class="left">{{ $t("myOrder.unitPrice") }}</span>
          <div class="right">
            <span class="text">{{ detail.goods_price }} {{ detail.goods_pay_coin }}/个</span>
          </div>
        </div>
        <div class="item">
          <span class="left">{{ $t("myOrder.quantity") }}</span>
          <div class="right">
            <span class="text">{{ divide(detail.order_num) }}</span>
          </div>
        </div>
        <div class="item">
          <span class="left">{{ $t("myOrder.totalAmount") }}</span>
          <div class="right">
            <span class="text2">
              {{ divide(detail.order_amount) }}
              {{ detail.goods_pay_coin }}
            </span>
          </div>
        </div>
        <div class="item">
          <span class="left">{{ $t("myOrder.paymentMethod") }}</span>
          <div class="right">
            <div class="divider"></div>
            <span class="text2">{{ payWay }}</span>
          </div>
        </div>
        <div class="item">
          <span class="left">{{ $t("myOrder.orderTime") }}</span>
          <div class="right">
            <span class="text">{{
              moment(detail.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </div>
        </div>
        <div class="item" v-if="detail.order_status === 2">
          <span class="left">{{ $t("myOrder.finishTime") }}</span>
          <div class="right">
            <span class="text">
              {{ moment(detail.updated_at * 1000).format("YYYY-MM-DD HH:mm:ss") }}
            </span>
          </div>
        </div>
        <div class="item" v-if="
          detail.order_type === 2 && [2, 5, 6].includes(detail.order_status)
        ">
          <span class="left">{{ $t("myOrder.paymentImage") }}</span>
          <div class="right">
            <img class="voucher" v-for="(img, index) in detail.order_picture" :src="img" alt=""
              @click="sceneImg(detail.order_picture, index)" />
          </div>
        </div>
      </section>
      <!-- <div class="btn-box" v-if="detail.order_type === 1">
        <div class="botton" v-if="detail.order_status === 1" @click="payClick">
          {{ $t("myOrder.payment") }}
        </div>
        <div
          class="cancel"
          v-if="detail.order_status === 1"
          @click="cancelClick"
        >
          {{ $t("myOrder.cancelOrder") }}
        </div>
      </div> -->
      <div class="btn-box">
        <div class="botton" v-if="
          detail.order_status === 1 &&
          detail.goods_type === 1 &&
          detail.dispute_symbol !== 2"
          @click="handlePayMent">
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
      amount: divide(detail.value.order_num),
      price: detail.value.pay_amount,
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
  // router.push("/service");
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
