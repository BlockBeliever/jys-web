<template>
  <div class="container">
    <!-- form -->
    <van-form class="form" ref="form" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          class="field"
          v-model="businessName"
          readonly
          label-align="top"
          name="商家名称"
          :label="$t('ad.merchant')"
        />
        <van-field
          v-model="checkedText"
          label-align="top"
          is-link
          readonly
          name="picker"
          :label="$t('ad.currency')"
          :placeholder="$t('ad.pleaseSelectCurrency')"
          @click="showPopupClick(1)"
          :rules="[{ validator: validatorCoin }]"
        />
        <van-field
          v-model="quantity"
          label-align="top"
          name="出售数量"
          :label="$t('ad.soldQuantity')"
          :placeholder="$t('ad.pleaseEnterQuantity')"
          :rules="[{ validator: validatorQuantity }]"
        />
        <van-field
          v-model="price"
          label-align="top"
          name="价格"
          :label="$t('ad.price')"
          :placeholder="$t('ad.pleaseEnterPrice')"
          :rules="[{ validator: validatorPrice }]"
        >
          <template #extra>
            <div class="field-right" @click="showPopupClick(2)">
              <!-- <span class="coin">{{ checkedText2 }}</span> -->
              <span class="text">
                {{checkedText2 || $t("ad.pleaseSelectThePaymentCurrency")}}
              </span>
              <img src="@/assets/img/home/top.png" alt="" />
            </div>
          </template>
        </van-field>
        <van-field
          v-model="checkedWalletAddress"
          label-align="top"
          is-link
          readonly
          name="picker"
          :label="$t('ad.walletAddress')"
          :placeholder="$t('ad.pleaseSelectAddress')"
          @click="showAddressPopupClick"
        >
        </van-field>
        <van-field
          v-model="tradeType"
          readonly
          label-align="top"
          name="交易方式"
          is-link
          :label="$t('ad.transactionMethod')"
          :placeholder="$t('ad.transactionMethod')"
          @click="showPopupClick(3)"
          :rules="[{ validator: validatorTraType }]"
        >
          <template #right-icon></template>
        </van-field>
        <van-field
          v-model="limitMin"
          label-align="top"
          name="限额"
          :label="$t('ad.minimumLimit')"
          :placeholder="$t('ad.pleaseEnterMinimumLimit')"
          :rules="[{ validator: validatorLimitMin }]"
        >
          <template #extra>
            <div class="field-right">
              <!-- <span class="tip">最大不超过 价格*数量</span> -->
            </div>
          </template>
        </van-field>
        <van-field
          v-model="limitMax"
          label-align="top"
          name="限额"
          :label="$t('ad.maximumLimit')"
          :placeholder="$t('ad.pleaseEnterMaximumLimit')"
          :rules="[{ validator: validatorLimitMax }]"
        >
          <template #extra>
            <div class="field-right">
              <span class="tip">{{ $t("ad.maximumLimitCondition") }}</span>
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <van-button class="button" block native-type="submit">
        {{ $t("ad.postAd") }}
      </van-button>
    </van-form>
  </div>
  <!-- 货币选择 购买 -->
  <van-popup v-model:show="showPopup" position="bottom" round>
    <div class="search">
      <van-search v-model="key" shape="round" :placeholder="$t('ad.search')" />
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
      <van-search v-model="key2" shape="round" :placeholder="$t('ad.search')" />
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
  <van-popup v-model:show="showPopup3" position="bottom" round>
    <div class="currency-list">
      <van-checkbox-group v-model="checked3" @change="checkedResultChange">
        <van-cell-group inset>
          <van-cell
            v-for="(item, index) in transactionWays"
            clickable
            :key="item.id"
            :title="item.name"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox
                :name="item.id"
                :ref="el => checkboxRefs[index] = el"
                @click.stop
              />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </van-popup>
  <van-popup v-model:show="showAddressPopup" position="bottom" round style="max-height: 350px;">
    <van-collapse v-model="activeNames"  style="padding: 0 !important; margin: 0 !important">
      <van-collapse-item :title="item.name" :name="item.name" v-for="item in wallets" style="padding: 0 !important; margin: 0 !important">
        <div class="wallet-currency-list">
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
import { coinGet } from "@/api/home";
import { addAdvertisement } from "@/api/advertisement";
import { myShop } from "@/api/business";
import { BackTopProps, showToast } from "vant";
import { multiply, divide } from "@/utils/formart";
import { t } from "@/plugins/i18n";

const wallets = ref<any[]>([])
const form = ref();
const activeNames  = ref<string[]>([])
onActivated(() => {
  const walletData = localStorage.getItem("pnc_wallets") ?? '[]';
  wallets.value = JSON.parse(walletData);
  activeNames.value = wallets.value.map(item => item.name)
  // 初始化数据
  getMyShopInfo();
  getCoinData(1);
  getCoinData(2);
  nextTick(() => {
    checkedText.value = "";
    checkedText2.value = "";
    quantity.value = "";
    price.value = "";
    limitMin.value = "";
    limitMax.value = "";
    tradeType.value = "";
    form.value.resetValidation();
  });
});
const businessName = ref("");
const getMyShopInfo = async () => {
  const { data } = await myShop({});
  businessName.value = data.shop_name;
};
// form
const quantity = ref();
const price = ref();
const limitMin = ref();
const limitMax = ref();
// 获取币种 选择货币
// 交易方式
const tradeType = ref("");

const key = ref("");
const showPopup = ref(false);
const checked = ref();
const coinList = ref([] as any);

const showAddressPopup = ref<boolean>(false)
const showAddressChecked = ref<any>(null)
const checkedWalletAddress = ref<string>("")
const selectedAccountName = ref<string>("");
const checkedWalletName = ref<string>("")
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

const key2 = ref("");
const showPopup2 = ref(false);
const checked2 = ref();
const coinList2 = ref([] as any);

const checkboxRefs = ref<Array<any>>([]);
const checked3 = ref<Array<any>>([]);
const showPopup3 = ref(false);
const transactionWays = ref<Array<any>>([])

const toggle = (index: any) => {
  checkboxRefs.value[index].toggle();
};

onBeforeUpdate(() => {
  checkboxRefs.value = [];
});

const showPopupClick = (val: number) => {
  if (val === 1) {
    showPopup.value = true;
    checked.value = null; // 重置勾选
  } else if (val === 2) {
    showPopup2.value = true;
    checked2.value = null; // 重置勾选
  } else {
    showPopup3.value = true;
  }
};
const getCoinData = async (val: number) => {
  const { data } = await coinGet({
    kind: val,
    page_num: 1,
    limit: 50,
  });
  if (val === 1) {
    coinList.value = data.list || [];
  } else {
    coinList2.value = data.list || [];
  }
};
const checkedText = ref("");
const checkedText2 = ref("");
const changeChecked = () => {
  checkedText.value = coinList.value.filter(
    (item: any) => Number(checked.value) === item.id
  )[0]?.symbol;
};

const changeChecked2 = () => {
  const obj = coinList2.value.filter(
    (item: any) => Number(checked2.value) === item.id
  )[0];
  checkedText2.value = obj?.symbol;
  transactionWays.value = obj?.transaction_way
};

const checkedResultChange = (value: string[]) => {
  console.log(value);
  
  // Convert value array to numbers for comparison
  const valueIds = value.map(v => parseInt(v));
  
  tradeType.value = transactionWays.value
    .filter((item: any) => valueIds.includes(item.id))
    .map((item: any) => item.name)
    .join(" | ");
}

// 校验输入框
const regex = /^[1-9]\d*$/;
const validatorCoin = (val: any) : any => {
  if (val === "") {
    return t("ad.pleaseSelectCurrency");
  }
  if (val) {
    if (checkedText.value === checkedText2.value) {
      return t("ad.paymentCurrencyCondition");
    }
  }
};
const validatorQuantity = (val: any) : any => {
  if (val === "") {
    return t("ad.pleaseEnterQuantity");
  }
  if (!regex.test(val + "")) {
    return t("ad.pleaseEnterNumber");
  }
};
const regex2 = /^(0|([1-9][0-9]*))(\.[\d]+)?$/;
const validatorPrice = (val: any) : any => {
  if (val === "") {
    return t("ad.pleaseEnterPrice");
  }
  if (!regex2.test(val + "")) {
    return t("ad.pleaseEnterNumber");
  }
};
const validatorTraType = (val: any) : any => {
  if (val === "") {
    return t("ad.transactionMethodCondition");
  }
  if (val) {
    if (checkedText.value === checkedText2.value) {
      return t("ad.paymentCurrencyCondition");
    }
  }
};
const validatorLimitMin = (val: any) : any => {
  if (val === "") {
    return t("ad.pleaseEnterMinimumLimit");
  }
  val = val * 1;
  if (val === 0) {
    return t("ad.notZero");
  }
  if (limitMax.value * 1 && val >= limitMax.value * 1) {
    return t("ad.minimumLimitCondition");
  }
  if (price.value * 1 && val && val < price.value * 1) {
    return t("ad.notLessUnitPrice");
  }
  if (price.value * 1 && quantity.value * 1 && val) {
    if (val > multiply(price.value * 1, quantity.value * 1)) {
      return t("ad.maximumLimitCondition");
    }
  }
};
const validatorLimitMax = (val: any) : any => {
  if (val === "") {
    return t("ad.pleaseEnterMaximumLimit");
  }
  val = val * 1;
  if (limitMin.value * 1 && limitMin.value * 1 >= val) {
    return t("ad.maximumLimitConditions");
  }
  if (price.value * 1 && quantity.value * 1 && val) {
    if (val > multiply(price.value * 1, quantity.value * 1)) {
      return t("ad.maximumLimitCondition");
    }
  }
};
const onSubmit = async () => {
  if (!showAddressChecked.value) {
    showToast(t("placeOrder.pleaseSelectWalletAddress"));
    return;
  }
  if (!tradeType.value) {
    showToast(t("ad.transactionMethod"));
    return;
  }
  const { code, error } = await addAdvertisement({
    goods_type: 2,
    goods_num: multiply(quantity.value),
    goods_price: price.value + "",
    goods_coin: checked.value * 1,
    goods_pay_coin: checked2.value * 1,
    goods_min: multiply(limitMin.value),
    goods_max: multiply(limitMax.value),
    payment_method: tradeType.value,
    transaction_way: checked3.value,
    wallet_name: checkedWalletName.value,
    wallet_address: checkedWalletAddress.value
  });
  if (code === 0) {
    showToast(t("ad.postSucceed"));
    history.back();
  } else {
    showToast(error);
  }
};
</script>

<style lang="scss" scoped>
@import "./scss/buyAd.scss";

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

.wallet-currency-list {
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
