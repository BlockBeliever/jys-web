<template>
	<div>
		<div class="navbartitle">
			<!-- <div class="status_bar"></div> -->
            <van-nav-bar left-text="返回"  :safe-area-inset-top="true" :border="false" left-arrow
  @click-left="onClickLeft"/>
			<!-- <uni-nav-bar left-text="返回" :border="false" statusBar="true" backgroundColor="transparent" color="#fff"
				leftIcon="back" @clickLeft="back"></uni-nav-bar> -->

		</div>
		<div class="order">
			<div style="margin-bottom: 15px;font-size: 16px;color: rgba(240, 38, 69, 1);font-weight: 600;">订单已生成
			</div>
			<div class="ordercard">
				<div class="contract" @click="moveContact">
						<div class="iconimg">
						<img src="../../assets/img/chant.png" alt="" srcset=""/>
					</div>
					<span style="padding-left:2px" v-if="order.type == 'buy'&&merchantid==order.merchant_id" @click="moveContact(order.user_id)">联系买家</span>
          <span style="padding-left:2px" v-if="order.type == 'buy'&&merchantid!=order.merchant_id" @click="moveContact(order.merchant_id)">联系卖家</span>
          <span style="padding-left:2px" v-if="order.type == 'sell'&&merchantid==order.merchant_id" @click="moveContact(order.user_id)">联系买家</span>
          <span style="padding-left:2px" v-if="order.type == 'sell'&&merchantid!=order.merchant_id" @click="moveContact(order.merchant_id)">联系卖家</span>
					


				</div>
				<div class="allcard">
					<span v-if="order.type == 'buy'&&merchantid==order.merchant_id">买家</span>
					<span v-if="order.type == 'buy'&&merchantid!=order.merchant_id">卖家</span>
					<span v-if="order.type == 'sell'&&merchantid==order.merchant_id">买家</span>
					<span v-if="order.type == 'sell'&&merchantid!=order.merchant_id">卖家</span>
					<span class="tetorder">信息</span>
				</div>
				<div class="order">
					<span style="color: rgba(112, 169, 229, 1);">*</span>
					<span v-if="order.type == 'buy'&&merchantid==order.merchant_id">买家</span>
          <span v-if="order.type == 'buy'&&merchantid!=order.merchant_id">卖家</span>
          <span v-if="order.type == 'sell'&&merchantid==order.merchant_id">买家</span>
          <span v-if="order.type == 'sell'&&merchantid!=order.merchant_id">卖家</span>
					<span>已通过平台实名及视频认证</span>
				</div>
				<div class="order">
					<span style="color: rgba(112, 169, 229, 1);">*</span>
					<span>平台7*24小时客服在线，保证您与</span>
					<span v-if="order.type == 'buy'&&merchantid==order.merchant_id">买家</span>
					<span v-if="order.type == 'buy'&&merchantid!=order.merchant_id">卖家</span>
					<span v-if="order.type == 'sell'&&merchantid==order.merchant_id">买家</span>
					<span v-if="order.type == 'sell'&&merchantid!=order.merchant_id">卖家</span>
					<span>的交易安全</span>
				</div>

			</div>
			<div class="boxorderdetail">
				<div class="flex1 saddwq">
					<div class="usdtimg"><img src="../../assets/img/usdticon.png" alt=""></div>
					<span class="butusdtt" v-if="order.type=='buy'">购买{{ coin.en_name.toUpperCase()}}</span>
					<span class="butusdtt" v-else>出售{{ coin.en_name.toUpperCase()}}</span>
				</div>
				<div class="boxdetailsa">
					<div class="flex2 adsawq">
						<span>订单编号</span>
						<div class="flex">
							<span>{{order.order_id}}</span>
							<div class="copybox" @click="copyorder"><img src="../../assets/img/copy.png" alt=""></div>
						</div>
					</div>
					<div class="flex2 adsawq">
						<span>单价</span>
						<div class="flex">
							<span>{{order.price}} {{ order.price_type }}</span>
						</div>
					</div>
					<div class="flex2 adsawq">
						<span>数量</span>
						<div class="flex">
							<span>{{ order.number }} {{ coin.en_name.toUpperCase()}}</span>
						</div>
					</div>
					<div class="flex2 adsawq">
						<span>总金额</span>
						<div class="flex">
							<span>{{Number(order.total_price).toFixed(0)}} {{ order.price_type }}</span>
							
						</div>
					</div>

					<div class="flex2 adsawq">
						<span>卖家收款方式</span>
						<div class="flex" style="align-items: center;">
							<div class="rightbore"></div>
							<span>{{merchant.pay_type}}</span>
						</div>	
					</div>
					<div class="flex2 adsawq">
						<span>下单时间</span>
						<div class="flex">
							<span>{{order.create_time | fomarTime}}</span>
						</div>
					</div>
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
import Clipboard from 'clipboard'
	export default {
		data() {
			return {
				order:{},
				merchant:{},
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
            // console.log(this.$route.query.order,998)
			this.merchantid=localStorage.getItem("merchantid")
				this.merchant=this.$route.query.order.data.merchant
				this.order=this.$route.query.order.data.order
				this.coin=this.$route.query.order.data.coin
				this.getkefu()
		},
		filters:{
			
			fomarTime(value){
				 let date = new Date(parseInt(value) * 1000);
				      let y = date.getFullYear();
				      let m = date.getMonth() + 1;
				      m = m < 10 ? "0" + m : m;
				      let d = date.getDate();
				      d = d < 10 ? "0" + d : d;
				      let h = date.getHours();
				      h = h < 10 ? "0" + h : h;
				      let minute = date.getMinutes();
				      let second = date.getSeconds();
				      minute = minute < 10 ? "0" + minute : minute;
				      second = second < 10 ? "0" + second : second;
				      return y + '-' + m + '-' + d +' '+h+':'+minute+':'+second;
			}
		},
		methods: {
			getkefu(){
				this.$api.getConfigValue(this.filters).then(res => {
					if (res.code == 0) {
						_this.serveId = res.data.data
					}
				})
			},
			moveContact(val){
				window.chatView({uid:this.order.user_id,contact_id:Number(val)})
			},
            onClickLeft(){
                this.$router.push({ name:'List'})
            },
			copyorder() {
				// uni.setClipboardData({
				//        data:this.order.order_id, // 必须字符串
				//        success: function () {
				//        }
				//    });
                const clipboard = new Clipboard('.copybox', {
						text: () => this.order.order_id
					})
					clipboard.on('success', e => {
						this.$toast('复制成功')
					})
					clipboard.on('error', e => {
						this.$toast('复制失败')
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	// .page {
	// 	background: linear-gradient(180deg, rgba(247, 250, 255, 1) 0%, rgba(247, 250, 255, 1) 100%);
	// 	color: rgba(51, 51, 51, 1);
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
		top: 0;
		position: fixed;
	}

	.order {
		
		padding: 25px 20px;
		box-sizing: border-box;
		font-size: 15px;
		padding-bottom: 0;
		padding-top:80px;
	}

	.ordercard {
		width: 340px;
		height: 126px;
		border-radius: 10px;
		// background: linear-gradient(180deg, rgba(204, 222, 255, 1) 0%, rgba(255, 255, 255, 0.01) 100%);
		background: url("../../assets/img/bg.png");
		background-size: 100% 100%;
		position: relative;
		.contract{
			background-color: rgba(255, 255, 255, 1);
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

		.tetorder {
			font-size: 15px;
			color: rgba(51, 51, 51, 1);
		}

		.order {

			color: rgba(168, 168, 168, 1);
			font-size: 13px;
			padding: 15px;
			padding-top: 0;

		}

		.contract {}
	}

	.boxorderdetail {
		width: 340px;
		margin: 0 auto;
		background-color: #fff;
		height: calc(100vh - 505px - var(--status-bar-height));
		margin-top: 10px;

		.saddwq {
			padding: 15px;
			box-sizing: border-box;

			.saddwq {}

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
				font-size:14px;
			}
		}

		.boxdetailsa {
			font-size: 12px;
			padding: 20px 20px;
			padding-top: 0;
			color: rgba(128, 128, 128, 1);
		}

		.copybox {
			width: 12px;
			height: 12px;
			margin-left: 8px;

			img {
				width: 100%;
				height: 100%;
			}
		}
		.rightbore{
			border-radius: 3px;
			border: 1px solid rgba(102, 200, 255, 1);
			margin-right: 5px;
			height: 10px;
		}
		.adsawq {
			padding-bottom: 10px;
		}
	}
</style>
