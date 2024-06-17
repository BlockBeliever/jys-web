<template>
  <!-- 头部背景 -->
  <div class="head-bg">
    <span>C2C交易</span>
  </div>
  <!-- 切换tabs -->
  <div class="tabs">
    <div :class="type === 2 ? 'item' : 'item opacity'" @click="changeType(2)">
      <img src="@/assets/img/home/buy-icon.png" alt="">
      <div class="text-box">
        <div>快捷购买</div>
        <span>高效率 快支付</span>
      </div>
    </div>
    <div class="line"></div>
    <div :class="type === 1 ? 'item' : 'item opacity'" @click="changeType(1)">
      <img src="@/assets/img/home/sale-icon.png" alt="">
      <div class="text-box">
        <div>快捷出售</div>
        <span>快速挂单卖出</span>
      </div>
    </div>
  </div>
  <!-- list -->
  <div class="container">
    <div class="list">
      <div class="header">
        <div class="left">
          <span class="text">{{ type === 2 ? '我要购买' : '我要出售' }}</span>
          <div class="currency" @click="showPopup = true">
            <span class="coin">{{ checked }}</span>
            <img src="@/assets/img/home/top.png" alt="">
          </div>
        </div>
        <div class="right" @click="showPopup2 = true">
          <span>{{ checked2 }}</span>
          <img src="@/assets/img/home/icon.png" alt="">
        </div>
      </div>
      <!-- card -->
      <div class="scroll-box">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model:loading="loading" :immediate-check="false" :finished="finished" :finished-text="'没有更多了'"
            @load="onLoad">
            <ListCard v-for="item in adList" :item="item" />
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
  <!-- 货币选择 购买 -->
  <van-popup v-model:show="showPopup" position="bottom" round @close="changeChecked">
    <div class="search">
      <van-search v-model="key" shape="round" placeholder="搜索" />
    </div>
    <div class="currency-list">
      <van-radio-group v-model="checked">
        <van-cell-group inset>
          <van-cell v-for="item in coinList">
            <template #title>
              <div class="left">
                <van-image v-if="item.symbol !== '全部'" class="icon" :src="item.icon" alt=""></van-image>
                <div class="name">
                  <div>{{ item.symbol }}</div>
                  <div>{{ item.name }}</div>
                </div>
              </div>
            </template>
            <template #right-icon>
              <van-radio :name="item.symbol" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </van-popup>
  <!-- 货币选择 付款 -->
  <van-popup v-model:show="showPopup2" position="bottom" round @close="changeChecked2">
    <div class="search">
      <van-search v-model="key2" shape="round" placeholder="搜索" />
    </div>
    <div class="currency-list">
      <van-radio-group v-model="checked2">
        <van-cell-group inset>
          <van-cell v-for="item in coinList2">
            <template #title>
              <div class="left">
                <van-image v-if="item.symbol !== '全部'" class="icon" :src="item.icon" alt=""></van-image>
                <div class="name">
                  <div>{{ item.symbol }}</div>
                  <div>{{ item.name }}</div>
                </div>
              </div>
            </template>
            <template #right-icon>
              <van-radio :name="item.symbol" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { advertisementList } from "@/api/advertisement";
import { codeToToken, getCustomerService, userInfo } from "@/api/auth";
import { setToken, getToken } from "@/utils/auth";
import ListCard from "@/components/home/listCard/index.vue";
import { coinGet } from "@/api/home";
import { showToast } from "vant";
import { useAppStore } from '@/store'
const store = useAppStore()
onMounted(() => {
  const token = getToken()
  if (token) {
    getCoinData(1)
    getCoinData(2)
    getService()
    getUid()
  } else {
    // User auth
    userAuth()
  }
})
onActivated(() => { })
// 授权
const userAuth = async (): Promise<void> => {
  let code: string = localStorage.getItem('code') ?? 'MZIXODQXZWYTY2VMYI0ZOTI4LTLMZWQTY2YYNJRKOTAZNMQX'
  const { code: mCode, data, message, error } = await codeToToken({ code })
  if (mCode === 0) {
    setToken(data.auth.access)
    getCoinData(1)
    getCoinData(2)
    getService()
    getUid()
  } else {
    showToast(error)
  }
}
// 获取客服信息
const getService = async () => {
  const { data } = await getCustomerService({})
  store.setServiceId(data)
}
// 获取当前uid
const getUid = async () => {
  const { data } = await userInfo({})
  store.setUid(data.user_id)
}
// 切换购买和出售
const type = ref(2)
const changeType = (val: number) => {
  type.value = val
  params.goods_type = type.value
  adList.value = []
  onRefresh()
}
// 货币选择
const key = ref('')
const showPopup = ref(false)
const checked = ref('')
const coinList = ref([] as any)

const key2 = ref('')
const showPopup2 = ref(false)
const checked2 = ref('')
const coinList2 = ref([] as any)

const getCoinData = async (val: number) => {
  const { data } = await coinGet({
    kind: val,
    page_num: 1,
    limit: 50
  })
  data.list.length && data.list.unshift({
    icon: '',
    name: '全部',
    symbol: '全部'
  })
  if (val === 1) {
    coinList.value = data.list || []
    checked.value = coinList.value.length ? coinList.value[0].symbol : null
  } else {
    coinList2.value = data.list || []
    checked2.value = coinList2.value.length ? coinList2.value[0].symbol : null
  }
  if (checked.value && checked2.value) {
    params.goods_coin = checked.value === '全部' ? '' : checked.value
    params.goods_pay_coin = checked2.value === '全部' ? '' : checked2.value
    onLoad()
  }
}
const changeChecked = () => {
  params.goods_coin = checked.value === '全部' ? '' : checked.value
  adList.value = []
  onRefresh()
}
const changeChecked2 = () => {
  params.goods_pay_coin = checked2.value === '全部' ? '' : checked2.value
  adList.value = []
  onRefresh()
}
// 加载分页数据
const adList = ref([] as any);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
let params = {
  page_num: 1,
  limit: 10,
  goods_pay_coin: '', // 支付币
  goods_coin: '', // 交易币
  goods_type: type.value
}
const onLoad = async () => {
  const { code, data } = await advertisementList(params)
  if (code !== 0) {
    showToast('加载失败！')
    return
  }
  if (refreshing.value) {
    adList.value = []
    refreshing.value = false
  }
  data.list && data.list.forEach((item: any) => {
    adList.value.push(item)
  });
  // showEmpty.value = recordList.value.length ? false : true
  loading.value = false
  params.page_num++
  if (adList.value.length >= data.count) {
    finished.value = true
  }
};

const onRefresh = () => {
  params.page_num = 1
  finished.value = false
  loading.value = true
  refreshing.value = true
  onLoad()
};


</script>

<style lang="scss" scoped>
@import './scss/index.scss';

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