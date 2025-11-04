<template>
  <loading :loading-show="isLoading" />
  <div class="container">
    <!-- Navigation Bar -->
    <van-nav-bar
      title="收款账户管理"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-popover v-model:show="showPopover" :actions="addActions" @select="onSelect" actions-direction="vertical" class="action-right">
          <template #reference>
            <van-icon name="plus" size="20" />
            <!-- <img src="@/assets/img/address/add.png" width="20"/> -->
          </template>
        </van-popover>
      </template>
    </van-nav-bar>

    <!-- Notice -->
    <div class="notice-box">
      <p style="margin: 0 0 8px 0;">
        买家将直接使用你选择的收款方式付款。交易时，请拍给检查你的收款软件已确认你已收到全额付款
      </p>
      <p style="margin: 0;">
        请确保您设置的账户为本人账户，非本人账户可能会导致订单失败或者账户被冻结
      </p>
    </div>

    <!-- Tabs -->
    <van-tabs v-model:active="activeTab" color="#0080E4" title-active-color="#323233" sticky>
      <van-tab title="法币地址" name="fiat_currency">
        <div class="tab-content-wrapper" v-if="currencyAddressList.length > 0">
          <!-- Currency Address List -->
          <div
            v-for="item in currencyAddressList"
            :key="item.id"
            class="payment-item"
          >
            <!-- Header -->
            <div class="payment-header">
              <div style="display: flex; align-items: center; flex: 1;">
                <div :class="['payment-icon']">
                  <img :src="paymentIcons[item.paymentMethod]" width="28"/>
                </div>
                <div class="payment-name">
                  <span style="font-size: 14px; font-weight: bold;">{{ item.paymentMethod }}</span>
                </div>
              </div>
              <van-icon name="arrow" color="#c8c9cc" @click="goToCurrencyDetail(item.id)"/>
            </div>

            <!-- Currency -->
            <div class="payment-detail">
              <span class="currency-label">{{ item.currencyType }}</span>
              <span class="badge-content">
                <span :class="item.isCertified ? 'badge-verified' : 'badge-unverified'">
                  {{ item.isCertified ? '已验证' : '未认证' }}
                </span>
              </span>
            </div>

            <!-- Account Details -->
            <div class="detail-label">详情</div>

            <!-- Account Details -->
            <div class="payment-detail">
              <div class="account-section">
                <span class="account-label">{{ item.accountName }}</span>
                <span class="account-number">{{ item.paymentAccount }}</span>
              </div>
              <img src="@/assets/img/address/delete.png" alt="" @click="onDelete(item.id)" width="16"/>
            </div>
          </div>
        </div>
        <div class="tab-content-wrapper" v-else>
          <div style="padding: 40px 20px; text-align: center; color: #0080E4;">
            <img src="@/assets/img/address/empty.png" width="200"/>
            <p style="opacity: 50%; margin-top:8px">空空如也~</p>
          </div>
        </div>
      </van-tab>

      <van-tab title="链地址" name="chain">
        <div class="tab-content-wrapper" v-if="chainAddressList.length > 0">
          <!-- Chain Address List -->
          <div
            v-for="item in chainAddressList"
            :key="item.id"
            class="chain-item"
          >
            <!-- Header -->
            <div class="chain-header">
              <div style="display: flex; align-items: center; flex: 1;">
                <div class="chain-name">
                  <span style="font-size: 14px; font-weight: bold;">{{ item.currencyType }}</span>
                </div>
              </div>
              <van-icon name="arrow" color="#c8c9cc" @click="goToCryptoDetail(item.id)"/>
            </div>

            <!-- Account Details -->
            <div class="account-detail">
              <div class="chain-label">{{ item.paymentAccount }}</div>
              <img src="@/assets/img/address/delete.png" alt="" @click="onDelete(item.id)" width="16"/>
            </div>
          </div>
        </div>
        <div class="tab-content-wrapper" v-else>
          <div style="padding: 40px 20px; text-align: center; color: #0080E4;">
            <img src="@/assets/img/address/empty.png" width="200"/>
            <p style="opacity: 50%; margin-top:8px">空空如也~</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import VisaIcon from "@/assets/img/address/visa.png"
import AlipayIcon from "@/assets/img/address/alipay.png"
import AbaIcon from "@/assets/img/address/aba.png"
import BankIcon from "@/assets/img/address/bank.png"
import WechatIcon from "@/assets/img/address/wechat.png"
import HuiwangIcon from "@/assets/img/address/huiwang.png"
import CurrencyIcon from "@/assets/img/address/currency.png"
import ChainIcon from "@/assets/img/address/chain.png"
import EthIcon from "@/assets/img/address/eth.png"
import TrxIcon from "@/assets/img/address/trx.png"
import USDTIcon from "@/assets/img/address/USDT.png"
import { addressList, deleteAddress } from "@/api/address"
import Loading from "@/components/loading/index.vue";
import { showToast } from "vant"

const paymentIcons = {
  "银行卡" : BankIcon,
  "支付宝" : AlipayIcon,
  "微信" : WechatIcon,
  "VISA" : VisaIcon,
  "汇旺" : HuiwangIcon,
  "ABA" : AbaIcon,
} as any

const chainIcons = {
  "ERC20" : EthIcon,
  "TRC20" : TrxIcon,
  "USDT" : USDTIcon,
} as any

const router = useRouter()

const activeTab = ref<string>("fiat_currency")
const currencyAddressList = ref<Array<any>>([])

const chainAddressList = ref<Array<any>>([])
const isLoading = ref<boolean>(false)

const currencyType = ref<number>(0)

const onClickLeft = () => {
  router.back();
}

const showPopover = ref(false);
const addActions = [
  { text: '法币地址', icon: CurrencyIcon },
  { text: '链地址', icon: ChainIcon },
];
const onSelect = (action: any) => {
  console.log(action.text);
  if (action.text == '链地址') {
    router.push('/address/crypto/add')
  } else {
    router.push('/address/currency/add')
  }
};

const onDelete = async (id: number) => {
  isLoading.value = true
  const {code, error} = await deleteAddress({id})
  if (!code) {
    showToast("删除成功！")
    const {code, data, error} = await addressList({
      type: currencyType.value
    })
    isLoading.value = false
    if (!code) {
      if (currencyType.value == 0) {
        currencyAddressList.value = data.list
      } else {
        chainAddressList.value = data.list
      }
    } else {
      showToast(error)
    }
  } else {
    showToast(error)
  }
  isLoading.value = false
}

const goToCurrencyDetail = (id: number) => {
  router.push(`/address/currency/detail/${id}`)
}

const goToCryptoDetail = (id: number) => {
  router.push(`/address/crypto/detail/${id}`)
}

watch(activeTab, async (val) => {
  currencyType.value = val == "fiat_currency" ? 0 : 1
  isLoading.value = true
  try {
    const {code, data, error} = await addressList({
      type: currencyType.value
    })
    isLoading.value = false
    if (!code) {
      if (val == "fiat_currency") {
        currencyAddressList.value = data.list
      } else {
        chainAddressList.value = data.list
      }
    } else {
      showToast(error)
    }
  } catch (e) {
    console.log("addressList Error ==========================> ", e)
  } finally {
    isLoading.value = false
  }
})

onActivated(async () => {
  isLoading.value = true
  try {
    const {code, data, error} = await addressList({
      type: currencyType.value
    })
    if (!code) {
      if (currencyType.value == 0) {
        currencyAddressList.value = data.list
      } else {
        chainAddressList.value = data.list
      }
    } else {
      showToast(error)
    }
  } catch (e) {
    console.log("addressList Error ==========================> ", e)
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.action-right {
  left: unset !important;
  right: 12px !important;

  :deep(.van-popover__arrow) {
    display: none !important;
  }
}

:deep(.van-tabs) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

:deep(.van-tabs__wrap) {
  flex-shrink: 0;
  margin: 0px 12px;
  height: 34px;
}

:deep(.van-tabs__nav) {
  background: unset !important;
}

:deep(.van-tab) {
  flex: unset !important;
  margin-right: 20px;
  font-size: 16px;
}

:deep(.van-tabs__line) {
  width: 16px;
  height: 4px;
}

:deep(.van-tabs__content) {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
}

.tab-content-wrapper {
  padding: 8px 12px;
}

.notice-box {
  margin: 12px;
  padding: 12px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.6;
  color: #0080E4;
  background: url(@/assets/img/address/background.png);
  background-size: cover;
  flex-shrink: 0;
}

.payment-item {
  padding: 4px;
  border-bottom: 1px solid #DEDEDE;
  margin-bottom: 8px;
  padding-bottom: 10px;
}

.payment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.payment-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 4px;
}

.chain-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 4px;
}

.payment-name {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.badge-verified {
  padding: 2px 8px;
  background-color: #e8f4ff;
  color: #1989fa;
  border-radius: 4px;
  font-size: 12px;
}

.badge-unverified {
  padding: 2px 8px;
  background-color: #f7f8fa;
  color: #969799;
  border-radius: 4px;
  font-size: 12px;
}

.payment-detail {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }

  .currency-label {
    padding: 2px 8px;
    background-color: #F5F5F5;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    margin-right: 8px;
  }

  .badge-content {
    flex: 1;
    font-size: 12px;
    color: #323233;
  }
}

.detail-label {
  color: #969799;
  font-size: 11px;
  margin-bottom: 4px;
}

.account-detail {
  display: flex;
  align-items: center;
  gap: 12px;

  .chain-label {
    flex: 1;
    font-size: 14px;
    color: #323233;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  img {
    flex-shrink: 0;
    cursor: pointer;
  }
}

.account-section {
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 14px;
  font-weight: 600;

  .account-label {
    color: #999999;
    margin-right: 8px;
  }

  .account-number {
    color: #333333;
  }
}

.chain-item {
  padding: 4px;
  border-bottom: 1px solid #DEDEDE;
  margin-bottom: 8px;
  padding-bottom: 10px;

  .chain-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .chain-name {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    color: #333333;
    font-size: 16px;
  }
}
</style>