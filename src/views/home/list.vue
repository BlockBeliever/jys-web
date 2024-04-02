<template>
  <div>
    <div class="navbartitle">
      <!-- <van-nav-bar left-text="订单" safe-area-inset-top :border="false" /> -->
      <!-- <div class="status_bar"></div> -->
      <!-- <vant-nav-bar left-text="订单" :border="false" statusBar="true" backgroundColor="transparent" color="#fff" @clickLeft="back"></vant-nav-bar> -->
      <van-nav-bar fixed :left-text="$t('exchange')" :safe-area-inset-top="true" :border="false" />
    </div>
    <div class="">
      <div style="width: 100%; text-align: center; padding-top: 90px; padding-bottom: 10px">
        <span style="font-size: 18px">{{ $t("transaction_order") }}</span>
      </div>

      <van-list v-model="loading" :finished="finished" :finished-text="$t('no_more')" :loading-text="$t('loading')" @load="getList()">
        <div class="listcard" v-for="(item, index) in list" :key="index" @click="moveGoodsDetail(item.id)">
          <div class="flex2">
            <div style="font-size: 16px">
              <span style="color: rgba(242, 39, 68, 1)" v-if="item.type == 'sell' && merchantid == item.merchant_id">{{
        $t("buy") }}</span>
              <span style="color:rgba(46, 107, 219, 1) "
                v-if="item.type == 'sell' && merchantid != item.merchant_id">{{ $t("sell") }}</span>
              <span style="color:  rgba(46, 107, 219, 1)"
                v-if="item.type == 'buy' && merchantid == item.merchant_id">{{ $t("sell") }}</span>
              <span style="color:rgba(242, 39, 68, 1)" v-if="item.type == 'buy' && merchantid != item.merchant_id">{{
        $t("buy") }}</span>
              <span style="color: rgba(51, 51, 51, 1)"> {{ item.coin_en_name.toUpperCase() }}</span>
            </div>
            <div>
              <span style="font-size: 12px; color: rgba(242, 39, 68, 1)" v-if="item.status == 'wait'">{{
        $t("order_list.wait") }}</span>
              <span style="font-size: 12px; color: rgba(46, 107, 219, 1)" v-if="item.status == 'done'">{{
        $t("order_list.done") }}</span>
            </div>
          </div>
          <div class="owbprice flex2">
            <div>
              <span>{{ $t("unit_price") }} {{ item.price }}{{ item.price_type }}</span>
            </div>
            <div class="asdawq"> >
            </div>
          </div>
          <div class="flex2 nametime">
            <div class="flex1">
              <div class="headimgbox" v-if="merchantid == item.user_id">
                <img v-if="item.user_head == ''" src="../../../static/img/head.png" alt="" srcset="" />
                <img :src="$IMGURL + item.merchant_head" alt="" v-else />
              </div>
              <div class="headimgbox" v-if="merchantid != item.user_id">
                <img v-if="item.user_head == ''" src="../../../static/img/head.png" alt="" srcset="" />
                <img :src="$IMGURL + item.user_head" alt="" v-else />
              </div>
              <span style="margin-left: 8.5px" v-if="merchantid == item.user_id">{{ item.merchant_name }}</span>
              <span style="margin-left: 8.5px" v-if="merchantid != item.user_id">{{ item.username }}</span>
            </div>
            <div>
              <span>{{ item.create_time | dateFormat("yyyy-MM-dd hh:mm:ss") }}</span>
            </div>
          </div>
          <div class="boxboads flex2">
            <div class="flex">
              <div class="iconusnam"><img src="../../../static/img/cardsa.png" alt="" srcset="" /></div>
              <span style="padding-left: 2.5px">{{ item.number }} {{ item.coin_en_name.toUpperCase() }}</span>
            </div>
            <div>
              <span style="font-size: 11px" v-if="item.type == 'sell' && merchantid != item.merchant_id">{{ $t("avaliable") }}</span>
              <span style="font-size: 11px" v-if="item.type == 'buy' && merchantid == item.merchant_id">{{ $t("avaliable") }}</span>
              <span style="font-size: 11px" v-if="item.type == 'sell' && merchantid == item.merchant_id">{{
        $t("order_list.paid") }}</span>
              <span style="font-size: 11px" v-if="item.type == 'buy' && merchantid != item.merchant_id">{{
        $t("order_list.paid") }}</span>
              <span style="padding-left: 2.5px; font-weight: 600">{{ (item.number * Number(item.price)).toFixed(0) }}{{
                item.price_type }} </span>
            </div>
          </div>
        </div>

      </van-list>

      <!-- <div class="listcard" v-for="(item, index) in list" :key="index" @click="moveGoodsDetail(item.id)">
        <div class="flex2">
          <div style="font-size: 16px">
            <span style="color: rgba(242, 39, 68, 1)" v-if="item.type == 'sell'&&merchantid==item.merchant_id">购买</span>
            <span style="color:rgba(46, 107, 219, 1) " v-if="item.type == 'sell'&&merchantid!=item.merchant_id">出售</span>
            <span style="color:  rgba(46, 107, 219, 1)" v-if="item.type == 'buy'&&merchantid==item.merchant_id">出售</span>
            <span style="color:rgba(242, 39, 68, 1)" v-if="item.type == 'buy'&&merchantid!=item.merchant_id">购买</span>
            <span style="color: rgba(51, 51, 51, 1)">{{ item.coin_en_name.toUpperCase() }}</span>
          </div>
          <div>
            <span style="font-size: 12px; color: rgba(242, 39, 68, 1)" v-if="item.status == 'wait'">进行中</span>
            <span style="font-size: 12px; color: rgba(46, 107, 219, 1)" v-if="item.status == 'done'"
              >交易完成</span
            >
          </div>
        </div>
        <div class="owbprice flex2">
          <div>
            <span>单价 {{ item.price }}{{ item.price_type }}</span>
          </div>
          <div class="asdawq"> >
          </div>
        </div>
        <div class="flex2 nametime">
          <div class="flex1">
            <div class="headimgbox" v-if="merchantid==item.user_id">
              <img  v-if="item.user_head==''"  src="../../../static/img/head.png" alt="" srcset="" />
              <img :src="$IMGURL+ item.merchant_head" alt="" v-else />
            </div>
            <div class="headimgbox" v-if="merchantid!=item.user_id">
              <img  v-if="item.user_head==''"  src="../../../static/img/head.png" alt="" srcset="" />
              <img :src="$IMGURL+ item.user_head" alt="" v-else />
            </div>
            <span style="margin-left: 8.5px" v-if="merchantid==item.user_id">{{ item.merchant_name }}</span>
            <span style="margin-left: 8.5px" v-if="merchantid!=item.user_id">{{ item.username }}</span>
          </div>
          <div>
            <span>{{ item.create_time | fomarTime }}</span>
          </div>
        </div>
        <div class="boxboads flex2">
          <div class="flex">
            <div class="iconusnam"><img src="../../../static/img/cardsa.png" alt="" srcset="" /></div>
            <span style="padding-left: 2.5px">{{item.number}}{{ item.coin_en_name.toUpperCase() }}</span>
          </div>
          <div>
            <span style="font-size: 11px" v-if="item.type == 'sell'&&merchantid!=item.merchant_id">可得</span>
            <span style="font-size: 11px" v-if="item.type == 'buy'&&merchantid==item.merchant_id">可得</span>
            <span style="font-size: 11px" v-if="item.type == 'sell'&&merchantid==item.merchant_id">实付</span>
            <span style="font-size: 11px" v-if="item.type == 'buy'&&merchantid!=item.merchant_id">实付</span>
            <span style="padding-left: 2.5px; font-weight: 600">{{(item.number * Number(item.price)).toFixed(0)}}{{ item.price_type }} </span>
          </div>
        </div>
      </div> -->
      <div class="listnone" v-if="list.length == 0">
        <div class="imgiconbox">
          <img src="../../assets/img/indexnonw.png" alt="" srcset="" />
        </div>
        <div style="padding-top: 24px"><span>{{ $t("empty_exchange_list") }}</span></div>
        <div style="padding: 12px"><span>{{ $t("empty_exchange_list_label") }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
let _this
// import { orderList } from '../../api/index'
export default {
  data() {
    return {
      path: "",
      filters: {
        page: 1,
        limit: 10
      },
      list: [],
      merchantid: 0,
      $IMGURL: '',
      loading: false,
      finished: false,
    }
  },
  mounted() {
    this.$IMGURL = process.env.VUE_APP_IMGURL
    this.getMerchant()
  },
  methods: {
    moveGoodsDetail(id) {
      this.$router.push({
        path: '/orderDetail',
        query: { id }
      })
    },
    getList() {
      _this = this
      this.$api.orderList(this.filters).then(res => {
        let all = res.data.order
        this.loading = false;
        all.forEach(item => {
          _this.list.push(item)
        })
        if (_this.list.length < res.data.cnt) {
          this.filters.page = Number(this.filters.page) + 1
        } else {
          this.finished = true;
        }

      }).catch((_) => {
        this.finished = true;
      })
    },
    getMerchant(){
      this.$api.getAccount().then((res) => {
        this.merchantid = res.data.user.user_id
        localStorage.setItem('merchantid', this.merchantid)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbartitle {
  color: rgba(16, 16, 16, 1);
  width: 100%;
  height: 60px;
  opacity: 1;
  background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
  position: fixed;
  z-index: 999;
}

.listcard {
  padding: 22px 25px 17px;

  box-sizing: border-box;
  width: 95%;
  height: 180px;
  border-radius: 10px;
  background-color: #fff;
  margin: 0 auto;
  position: relative;
  background: url('../../../static/img/bglistcard.png');
  background-size: 100% 100%;
}

.owbprice {
  padding: 11.5px 0;
  font-size: 12px;
  color: rgba(120, 137, 166, 1);
}

.asdawq {
  color: #fff;
  padding-left: 2px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  opacity: 1;
  border-radius: 50%;
  background: linear-gradient(90deg, rgba(46, 107, 219, 1) 0%, rgba(84, 135, 220, 1) 100%);
  box-shadow: 0px 4px 8px 0px rgba(171, 199, 255, 1);
}

.headimgbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

.nametime {
  font-size: 12px;
  color: rgba(120, 137, 166, 1);
}

.boxboads {
  margin-top: 32.5px;
  font-size: 12px;
}

.listnone {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: rgba(120, 137, 166, 1);
  align-items: center;

  .imgiconbox {
    margin: 0 auto;
    margin-top: 88px;

    width: 132px;
    height: 143px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.iconusnam {
  width: 16px;
  height: 17px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
