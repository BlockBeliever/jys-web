<template>
  <div>
    <div class="navbartitle">
      <van-nav-bar
        fixed
        left-text="返回"
        :safe-area-inset-top="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
      <!-- <div class="status_bar"></div> -->
      <!-- <uni-nav-bar
        left-text="返回"
        :border="false"
        statusBar="true"
        backgroundColor="transparent"
        color="#fff"
        leftIcon="back"
        @clickLeft="back"
      ></uni-nav-bar> -->
    </div>
    <div class="order">
      <div
        style="margin-bottom: 15px; font-size: 16px; color: rgba(240, 38, 69, 1); font-weight: 600"
        v-if="info.status == 'wait'"
      >
        订单进行中
      </div>
      <div
        style="margin-bottom: 15px; font-size: 16px; color: rgba(240, 38, 69, 1); font-weight: 600"
        v-if="info.status == 'done'"
      >
        订单已完成
      </div>
      <div class="ordercard">
        <div class="allcard">
          <span class="tetinfo">卖家信息</span>
          <div class="contract"></div>
        </div>
        <div class="info">
          <span style="color: rgba(112, 169, 229, 1)">*</span>
          <span>卖家已通过平台实名及视频认证</span>
        </div>
        <div class="info">
          <span style="color: rgba(112, 169, 229, 1)">*</span>
          <span>平台7*24小时客服在线，保证您与卖家的交易安全</span>
        </div>
      </div>
      <div class="boxorderdetail">
        <div class="flex1 saddwq">
          <div class="usdtimg"><img src="../../../static/img/usdticon.png" alt="" /></div>
          <span class="butusdtt">购买USTD</span>
        </div>
        <div class="boxdetailsa">
          <div class="flex2 adsawq">
            <span>订单编号</span>
            <div class="flex">
              <span>{{ info.order_id }}</span>
              <div class="copybox" @click="copyorder"><img src="../../../static/img/copy.png" alt="" /></div>
            </div>
          </div>
          <div class="flex2 adsawq">
            <span>单价</span>
            <div class="flex">
              <span>￥{{ info.price }}</span>
            </div>
          </div>
          <div class="flex2 adsawq">
            <span>数量</span>
            <div class="flex">
              <span>{{ info.number }} USDT</span>
            </div>
          </div>
          <div class="flex2 adsawq">
            <span>总金额</span>
            <div class="flex">
              <span>￥{{ info.total_price }}</span>
            </div>
          </div>

          <div class="flex2 adsawq">
            <span>卖家收款方式</span>
            <div class="flex" style="align-items: center">
              <div class="rightbore"></div>
              <span>{{ merchant.pay_type }}</span>
            </div>
          </div>
          <div class="flex2 adsawq">
            <span>下单时间</span>
            <div class="flex">
              <span>{{ info.create_time | fomarTime }}</span>
            </div>
          </div>
        </div>
        <div class="submit" @click="submit" v-if="info.status == 'wait'">
          <span>完成订单</span>
        </div>
        <div class="stats_bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
let _this
import Clipboard from 'clipboard'
export default {
  data() {
    return {
      id: 1,
      info: {},
      merchant: {}
    }
  },
  mounted() {
    let id = this.$route.query.id
    console.log('id', id)
    _this = this
    if (id) {
      this.id = parseInt(id)
    }
    this.loadDetail()
  },
  filters: {
    fomarTime(value) {
      let date = new Date(parseInt(value) * 1000)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let minute = date.getMinutes()
      let second = date.getSeconds()
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: 'List' })
    },
    copyorder() {
      const clipboard = new Clipboard('.copybox', {
        text: () => this.info.order_id
      })
      clipboard.on('success', e => {
        this.$toast('复制成功')
      })
      clipboard.on('error', e => {
        this.$toast('复制失败')
      })
    },
    submit() {
      _this = this
      _this.$api
        .orderEnd(_this.id)
        .then(res => {
          _this.loadDetail()
        })
        .catch(err => {
          _this.$toast('err')
        })
    },
    loadDetail() {
      _this = this
      this.$api
        .orderDetail(_this.id)
        .then(res => {
          console.log('res', res)
          if (res.code == 0) {
            _this.info = res.data.order
            _this.merchant = res.data.merchant
          }

          console.log('info', _this.info)
          console.log('merchant', _this.merchant)
        })
        .catch(err => {
          _this.$toast('err')
        })
    }
  }
}
</script>

<style lang="scss">
// page {
//   background: linear-gradient(180deg, rgba(247, 250, 255, 1) 0%, rgba(247, 250, 255, 1) 100%);
//   color: rgba(51, 51, 51, 1);
// }

.navbartitle {
  color: rgba(16, 16, 16, 1);
  width: 100%;
  height: 60px;
  opacity: 1;
  background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
  position: relative;
}

.order {
  padding: 25px 20px;
  // padding-top: calc(var(--status-bar-height) + 80px);
  box-sizing: border-box;
  font-size: 15.5px;
  padding-bottom: 0;
}

.ordercard {
  width: 340px;
  height: 126px;
  border-radius: 10px;
  // background: linear-gradient(180deg, rgba(204, 222, 255, 1) 0%, rgba(255, 255, 255, 0.01) 100%);
  background: url('../../../static/img/bg.png');
  background-size: 100% 100%;

  .allcard {
    padding: 15px;
    box-sizing: border-box;
  }

  .tetinfo {
    font-size: 15px;
    color: rgba(51, 51, 51, 1);
  }

  .info {
    color: rgba(168, 168, 168, 1);
    font-size: 13px;
    padding: 15px;
    padding-top: 0;
  }

  .contract {
  }
}

.boxorderdetail {
  width: 340px;
  margin: 0 auto;
  background-color: #fff;
  height: calc(100vh - 310px);
  margin-top: 10px;

  .saddwq {
    padding: 15px;
    box-sizing: border-box;

    .saddwq {
    }

    .usdtimg {
      width: 22px;
      height: 22px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .butusdtt {
      padding-left: 10px;
      font-size: 14px;
    }
  }

  .boxdetailsa {
    font-size: 12px;
    padding: 20px;
    padding-top: 0;
    color: rgba(128, 128, 128, 1);
  }

  .copybox {
    width: 12px;
    height: 11.5px;
    margin-left: 7.5px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .rightbore {
    border-radius: 6px;
    border: 1px solid rgba(102, 200, 255, 1);
    margin-right: 5px;
    height: 10px;
  }
  .adsawq {
    padding-bottom: 10px;
  }
}
.submit {
  width: 225px;
  height: 40px;
  opacity: 1;
  border-radius: 40px;
  // background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
  background: linear-gradient(90deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
  font-size: 16px;
  font-weight: 400;
  color: rgba(252, 238, 217, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 30px;
}
</style>
