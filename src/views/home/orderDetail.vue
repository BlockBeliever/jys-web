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
        <div class="contract">
					<div class="iconimg">
						<img src="../../assets/img/chant.png" alt="" srcset="" />
					</div>
					<span style="padding-left:2px" v-if="info.type == 'buy'&&merchantid==info.merchant_id" @click="moveContact(info.user_id)">联系买家</span>
          <span style="padding-left:2px" v-if="info.type == 'buy'&&merchantid!=info.merchant_id" @click="moveContact(info.merchant_id)">联系卖家</span>
          <span style="padding-left:2px" v-if="info.type == 'sell'&&merchantid==info.merchant_id" @click="moveContact(info.user_id)">联系买家</span>
          <span style="padding-left:2px" v-if="info.type == 'sell'&&merchantid!=info.merchant_id" @click="moveContact(info.merchant_id)">联系卖家</span>


				</div>
        <div class="allcard">
          <span v-if="info.type == 'buy'&&merchantid==info.merchant_id">买家</span>
          <span v-if="info.type == 'buy'&&merchantid!=info.merchant_id">卖家</span>
          <span v-if="info.type == 'sell'&&merchantid==info.merchant_id">买家</span>
          <span v-if="info.type == 'sell'&&merchantid!=info.merchant_id">卖家</span>
          <span class="tetinfo">信息</span>
          <!-- <div class="contract"></div> -->
        </div>
        <div class="info">
          <span style="color: rgba(112, 169, 229, 1)">*</span>
          <span v-if="info.type == 'buy'&&merchantid==info.merchant_id">买家</span>
          <span v-if="info.type == 'buy'&&merchantid!=info.merchant_id">卖家</span>
          <span v-if="info.type == 'sell'&&merchantid==info.merchant_id">买家</span>
          <span v-if="info.type == 'sell'&&merchantid!=info.merchant_id">卖家</span>
          <span>已通过平台实名及视频认证</span>
        </div>
        <div class="info">
          <span style="color: rgba(112, 169, 229, 1)">*</span>
          <span>平台7*24小时客服在线，保证您与</span>
          <span v-if="info.type == 'buy'&&merchantid==info.merchant_id">买家</span>
          <span v-if="info.type == 'buy'&&merchantid!=info.merchant_id">卖家</span>
          <span v-if="info.type == 'sell'&&merchantid==info.merchant_id">买家</span>
          <span v-if="info.type == 'sell'&&merchantid!=info.merchant_id">卖家</span>
          <span>的交易安全</span>
        </div>
      </div>
      <div class="boxorderdetail">
        <div class="flex1 saddwq">
          <div class="usdtimg"><img src="../../../static/img/usdticon.png" alt="" /></div>
          <!-- <span class="butusdtt" v-if="info.type=='buy'">购买{{ coin.en_name.toUpperCase()}}</span>
          <span class="butusdtt" v-else>出售{{ coin.en_name.toUpperCase()}}</span> -->
           <span class="butusdtt" v-if="info.type == 'sell'&&merchantid==info.merchant_id">购买{{ coin.en_name.toUpperCase()}}</span>
            <span class="butusdtt" v-if="info.type == 'sell'&&merchantid!=info.merchant_id">出售{{ coin.en_name.toUpperCase()}}</span>
            <span class="butusdtt" v-if="info.type == 'buy'&&merchantid==info.merchant_id">出售{{ coin.en_name.toUpperCase()}}</span>
            <span class="butusdtt" v-if="info.type == 'buy'&&merchantid!=info.merchant_id">购买{{ coin.en_name.toUpperCase()}}</span>
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
              <span>{{ info.number }} {{ coin.en_name.toUpperCase()}}</span>
            </div>
          </div>
          <div class="flex2 adsawq">
            <span>总金额</span>
            <div class="flex">
              <span>￥{{ Number(info.total_price).toFixed(0) }} {{ info.price_type }}</span>
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
        <div class="submit" @click="submit" v-if="info.status == 'wait'&&info.type == 'sell'&&merchantid!=info.merchant_id">
          <span>完成订单</span>
        </div>
        <div class="submit" @click="submit" v-if="info.status == 'wait'&&info.type == 'buy'&&merchantid==info.merchant_id">
          <span>完成订单</span>
        </div>
        <div class="contactkefy" @click="moveContact(serveId)">
          <span>遇到问题？ </span>
          <span style="color:rgba(97, 151, 254, 1)">联系客服 </span>
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
      merchant: {},
      coin:{},
      merchantid:0,
      serveId:0,
      filters: {
        "config_key":"CustomerService",
          "config_value":"",
      },
    }
  },
  mounted() {
    this.merchantid=localStorage.getItem("merchantid")
    let id = this.$route.query.id
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
    moveContact(val){
      window.chatView({uid:this.info.user_id,contact_id:val})
    },
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
      this.$api.getConfigValue(this.filters).then(res => {
        if (res.code == 0) {
            _this.serveId = res.data.data
          }
      })
      this.$api
        .orderDetail(_this.id)
        .then(res => {
          if (res.code == 0) {
            _this.info = res.data.order
            _this.merchant = res.data.merchant
            _this.coin=res.data.coin
          }

        })
        .catch(err => {
          _this.$toast('err')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
// page {
//   background: linear-gradient(180deg, rgba(247, 250, 255, 1) 0%, rgba(247, 250, 255, 1) 100%);
//   color: rgba(51, 51, 51, 1);
// }
.contactkefy{
  // display: flex;
  width: 100%;
  text-align: center;
  font-size: 13px;
 margin: 0 auto;
 left: 0;
 right: 0;
  position: fixed;
  bottom: 80px;
}
.navbartitle {
  color: rgba(16, 16, 16, 1);
  width: 100%;
  height: 60px;
  opacity: 1;
  background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
  position: fixed;
  z-index: 999;
}

.order {
  padding: 25px 20px;
  padding-top: calc( 80px);
  box-sizing: border-box;
  font-size: 15.5px;
  padding-bottom: 0;
}

.ordercard {
  width:100%;
  height: 126px;
  border-radius: 10px;
  // background: linear-gradient(180deg, rgba(204, 222, 255, 1) 0%, rgba(255, 255, 255, 0.01) 100%);
  background: url('../../../static/img/bg.png');
  background-size: 100% 100%;
  position: relative;
  .contract{
    background-color: rgba(255, 255, 255, 0.8);
			position: absolute;
			display: flex;
			align-items: center;
			font-size: 10px;
			color: rgba(128, 128, 128, 1);
			border-radius: 16px;
			border: 1px solid rgba(103, 199, 255, 1);
			width: 84px;
			height: 27px;
			right: 8.5px;
			top:13px;
			justify-content: center;
			// padding-left: 8px;
			// box-sizing: border-box;
			.iconimg{
				
				width: 18px;
				height: 16.5px;
				img{
				width: 100%;
				height: 100%;
				}
			}
		}
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
  width:100%;
  margin: 0 auto;
  background-color: #fff;
  height: calc(100vh - 302px);
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
  margin-top: 50px;
  margin-bottom: 30px;
}
</style>
