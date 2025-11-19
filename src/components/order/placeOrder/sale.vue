<template>
  <van-form @submit="submitOrder" ref="form">
    <div class="container">
      <van-nav-bar class="navBar" :fixed="true" :title="$t('placeOrder.placeOrder')" :border="false"
        @click-left="onClickLeft">
        <template #left>
          <van-icon name="arrow-left" size="18" color="black" />
        </template>
      </van-nav-bar>
      <div class="head">
        <!-- <span>自由理财 每日收益 随买随卖</span> -->
        <span>
          {{ `${$t("placeOrder.dailyIncome")} ${$t("placeOrder.buyAndSell")}` }}
        </span>
      </div>
      <img class="circle" src="@/assets/img/order/circle.png" alt="" />
      <div class="opacity-bg">
        <!-- 单价 -->
        <div class="coin">
          <img src="@/assets/img/coin/usdt.png" alt="" />
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
            <van-tab :title="$t('placeOrder.amountSold')"></van-tab>
            <van-tab :title="$t('placeOrder.quantitySold')"></van-tab>
          </van-tabs>
        </div>
        <!-- 输入框 -->
        <div class="field">
          <div class="field-left">
            <van-field v-model="inputNum" center clearable label="" placeholder="0.00"
              :rules="[{ validator: validatorMessage }]">
              <template #extra> </template>
            </van-field>
          </div>
          <div class="field-right">
            <span class="coin">
              {{ active === 0 ? detailData.goods_pay_coin : detailData.goods_coin }}
            </span>
            <div class="divider"></div>
            <span class="all" @click="maximumAction">
              {{ $t("placeOrder.maximum") }}
            </span>
          </div>
        </div>
        <div class="line"></div>
        <!-- 限额 -->
        <div class="limit">
          <div style="display: flex; align-items: center;">
            <img src="@/assets/img/order/x.png" alt="" />
            <span class="text">{{ $t("placeOrder.limit") }}</span>
            <span class="number">
              {{ `${divide(detailData.goods_min)}-${divide(detailData.goods_max)}` }} {{ detailData.goods_pay_coin }}
            </span>
          </div>
          <div style="display: flex; align-items: center;" v-if="detailData.goods_fee">
            <img src="@/assets/img/order/x.png" alt="" />
            <span class="text">手续费</span>
            <span class="number">
              {{ divide(detailData.goods_fee) }}{{ detailData.goods_coin }}
            </span>
          </div>
        </div>
        <!-- 可得 -->
        <div class="obtainable">
          <span class="text">
            {{ active === 1 ? $t("placeOrder.available") : $t("placeOrder.actualPay")}}
          </span>
          <span class="number" v-if="inputNum">
            {{ resultNum }} {{ active !== 0 ? detailData.goods_pay_coin : detailData.goods_coin }}
          </span>
        </div>
      </div>
      <img class="tip-logo" src="@/assets/img/order/tip-logo.png" alt="" />
      <!-- 支付方式 -->
      <div class="payment">
        <div class="text" @click="showSheet = true">
          <span>{{ $t("placeOrder.paymentMethod") }}</span>
          <img src="@/assets/img/order/arrow.png" alt="" />
        </div>
        <div class="line"></div>
        <div class="pay">
          <span class="pay-type">{{ paymentName }}</span>
          <!-- <div class="tag">及时付款</div> -->
        </div>
      </div>
      <!------------- wallet address ---------------->
      <div class="payment">
        <van-field style="border-radius: 12px;" v-model="checkedWalletAddress" label-align="top" is-link readonly
          name="picker" :label="$t('ad.walletAddress')" :placeholder="$t('ad.pleaseSelectAddress')"
          @click="showAddressPopupClick">
        </van-field>
      </div>
      <!-- 商家信息 -->
      <div class="business">
        <div class="text">{{ $t("placeOrder.merchantInformation") }}</div>
        <div class="business-info">
          <span>{{ $t("placeOrder.merchant") }}</span>
          <div class="right">
            <span>{{ detailData.shop_name }}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="message">
          <span>{{ $t("placeOrder.merchantMessage") }}</span>
          <div class="info">{{ detailData.shop_comment }}</div>
        </div>
      </div>
      <div class="tip">
        <span>{{ $t("placeOrder.agreePhoenix") }}</span>
        <span>{{ $t("placeOrder.legalDisclaimer") }}</span>
      </div>
      <van-button class="botton" block type="primary" native-type="submit">
        {{ `${$t("placeOrder.sell")}${detailData.goods_coin}` }}
      </van-button>
    </div>
  </van-form>
  <van-action-sheet @select="selectPay" v-model:show="showSheet" :actions="actions"
    :cancel-text="$t('placeOrder.cancel')" :description="$t('placeOrder.paymentMethod')" close-on-click-action />
  <van-popup v-model:show="showAddressPopup" position="bottom" round style="max-height: 350px;">
      <van-collapse v-model="activeNames"  style="padding: 0 !important; margin: 0 !important">
        <van-collapse-item :title="item.name" :name="item.name" v-for="item in wallets" style="padding: 0 !important; margin: 0 !important">
          <div class="currency-list">
            <van-radio-group v-model="showAddressChecked" @change="changeAddressChecked(item.name)">
              <van-cell-group inset>
                <van-cell v-for="accountItem in item.accounts">
                  <template #title>
                    <div class="left">
                      <div class="name">
                        <div>{{ accountItem.name }}</div>
                        <div>{{ accountItem.address }}</div>
                      </div>
                    </div>
                  </template>
                  <template #right-icon>
                    <van-radio :name="accountItem.address" />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
        </van-collapse-item>
      </van-collapse>
  </van-popup>
</template>

<script setup lang="ts">
import { advertisementDetail } from "@/api/advertisement";
import { createOrder, refreshOrder } from "@/api/order";
import { setupWebViewJavascriptBridge } from "@/utils/bridge";
import { showToast } from "vant";
import { multiply, divide } from "@/utils/formart";
import { coinTypes } from "@/enum";
import { t } from "@/plugins/i18n";
const route = useRoute();
const router = useRouter();

const form = ref();
const wallets = ref<any[]>([])
const activeNames  = ref<string[]>([])
onActivated(() => {
  const walletData = localStorage.getItem("pnc_wallets") ?? '[]';
  wallets.value = JSON.parse(walletData);
  activeNames.value = wallets.value.map(item => item.name)
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
    async function responseTransferDapp(data: any) {
      // 关闭支付窗口回调
      locked.value = false;
      router.push("/order/paySuccess");
      await refreshOrder({ order_id_buyer: saleOrder.value.order_id_buyer });
    }
    bridge.registerHandler("responseTransferDapp", responseTransferDapp);
  });
  getAdDetail();
  nextTick(() => {
    inputNum.value = null;
    paymentName.value = "";
    paymentId.value = "";
    active.value = 0;
    form.value.resetValidation();
  });
});
// 选择器
const showSheet = ref(false);
const actions = ref();
const paymentName = ref();
const paymentId = ref();
const selectPay = (val: any) => {
  paymentName.value = val.name;
  paymentId.value = val.id;
  showSheet.value = false;
};
// 获取当前广告详情
const detailData = ref({} as any);
const getAdDetail = async () => {
  const { data } = await advertisementDetail({ id: Number(route.query.id) });
  detailData.value = data;
  actions.value = data.transaction_ways;
};
// 切换购买方式
const active = ref(0);
const inputNum = ref();
const resultNum = computed(() => {
  if (inputNum.value) {
    if (!regex.test(inputNum.value + "")) {
      return "";
    } else {
      return active.value === 0
        ? (inputNum.value / detailData.value.goods_price).toFixed(5)
        : multiply(inputNum.value, detailData.value.goods_price);
    }
  } else {
    return "";
  }
});
// 最大
const maximumAction = () => {
  inputNum.value =
    active.value === 0
      ? divide(detailData.value.goods_max)
      : Math.floor(
        divide(detailData.value.goods_max / detailData.value.goods_price)
      );
};
// 校验输入框
const regex = /^(0|([1-9][0-9]*))(\.[\d]+)?$/;
const validatorMessage = (val: number): any => {
  if (!regex.test(val + "")) {
    return t("placeOrder.pleaseEnterNumber");
  }
  if (active.value === 0) {
    if (val > divide(detailData.value.goods_max)) {
      return t("placeOrder.limitExceeded");
    }
    if (val < divide(detailData.value.goods_min)) {
      return `${t("placeOrder.minimumAmount")}${divide(
        detailData.value.goods_min
      )}${detailData.value.goods_pay_coin}`;
    }
  } else {
    if (
      val * detailData.value.goods_price >
      divide(detailData.value.goods_max)
    ) {
      return t("placeOrder.limitExceeded");
    }
    if (
      val * detailData.value.goods_price <
      divide(detailData.value.goods_min)
    ) {
      return `${t("placeOrder.minimumAmount")}${divide(
        detailData.value.goods_min
      )}${detailData.value.goods_pay_coin}`;
    }
  }
};
const saleOrder = ref({} as any);
const submitOrder = async () => {
  if (!paymentId.value) {
    showToast(t("placeOrder.pleaseSelectPaymentMethod"));
    return;
  }
  if (!showAddressChecked.value) {
    showToast(t("placeOrder.pleaseSelectWalletAddress"));
    return;
  }
  console.log(detailData.value);
  const { code, data, error } = await createOrder({
    goods_id: detailData.value.id,
    pay_way_id: paymentId.value,
    number: active.value ? multiply(inputNum.value) : multiply(resultNum.value),
    seller_wallet_name: checkedWalletName.value,
    seller_wallet_address: checkedWalletAddress.value,
    buyer_wallet_name: detailData.value.wallet_name,
    buyer_wallet_address: detailData.value.wallet_address,
  });
  if (code === 0) {
    saleOrder.value = data;
    handlePayMent(data);
  } else {
    showToast(error);
  }
};

const locked = ref<boolean>(false)
const handlePayMent = (order: any) => {
  // if (locked.value) return
  locked.value = true;
  (window as any).WebViewJavascriptBridge.callHandler(
    "transferDapp",
    {
      order_id: order.order_id_buyer,
      amount: divide(order.order_num + order.goods_fee),
      price: order.order_num + order.goods_fee,
      token_id: coinTypes[order.goods_coin],
      symbol: order.goods_coin,
      buyer_wallet_address: order.buyer_wallet_address,
      buyer_wallet_name: order.buyer_wallet_name,
      seller_wallet_address: order.seller_wallet_address,
      seller_wallet_name: order.seller_wallet_name
    },
    function (responseData: any) { }
  );
};
const onClickLeft = () => {
  if (route.meta.backTo) {
    console.log("onClickLeft ===============================> router.push(route.meta.backTo)")
    router.push(route.meta.backTo)
  } else if (window.history.length > 1) {
    console.log("onClickLeft ===============================> history.go(-1)")
    // history.go(-1)
    router.back();
  } else {
    console.log("onClickLeft ===============================> fallback to home")
    router.push('/')
  }
};

const showAddressPopup = ref<boolean>(false)
const showAddressChecked = ref<any>(null)
const checkedWalletAddress = ref<string>("")
const checkedWalletName = ref<string>("")
const selectedAccountName = ref<string>("");
const showAddressPopupClick = () => {
  if (wallets.value.length == 0) {
    (window as any).WebViewJavascriptBridge.callHandler(
      "goToCreateWalletAccountPage", {},
      function (responseData: any) { }
    );
  } else {
    showAddressPopup.value = true;
    showAddressChecked.value = null;
  }
};
const changeAddressChecked = (name: string) => {
  checkedWalletAddress.value = showAddressChecked.value
  wallets.value.map((item: any) => {
    console.log(item.accounts)
    if (item.accounts) {
      var accounts = item.accounts.filter((item: any) => item.address == checkedWalletAddress.value)
      if (accounts.length > 0) {
        checkedWalletName.value = accounts[0].name
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import "./scss/index.scss";

.navBar {
  --van-nav-bar-background: transparent;
}

:deep(.van-cell__title) {
  color: #4987F9 !important;
}

.currency-list {
  width: 100%;
  margin-bottom: 0px;
  max-height: 400px;
  overflow-y: auto;

  .van-cell-group {
    margin: 0 !important;
    .van-cell {
      padding: 0 !important;
    }
  }

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
