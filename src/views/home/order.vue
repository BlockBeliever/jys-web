<template>
	<div>
		<div class="navbartitle">
			<div class="status_bar"></div>
            <van-nav-bar left-text="返回"  :safe-area-inset-top="true" :border="false" left-arrow
  @click-left="onClickLeft"/>
			<!-- <uni-nav-bar left-text="返回" :border="false" statusBar="true" backgroundColor="transparent" color="#fff"
				leftIcon="back" @clickLeft="back"></uni-nav-bar> -->

		</div>
		<div class="order">
			<div style="margin-bottom: 15px;font-size: 16px;color: rgba(240, 38, 69, 1);font-weight: 600;">订单已生成
			</div>
			<div class="ordercard">
				<div class="allcard">
					<span class="tetinfo">卖家信息</span>
					<div class="contract">

					</div>
				</div>
				<div class="info">
					<span style="color: rgba(112, 169, 229, 1);">*</span>
					<span>卖家已通过平台实名及视频认证</span>
				</div>
				<div class="info">
					<span style="color: rgba(112, 169, 229, 1);">*</span>
					<span>平台7*24小时客服在线，保证您与卖家的交易安全</span>
				</div>

			</div>
			<div class="boxorderdetail">
				<div class="flex1 saddwq">
					<div class="usdtimg"><img src="../../assets/img/usdticon.png" alt=""></div>
					<span class="butusdtt">购买USTD</span>
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
							<span>￥{{order.price}}</span>
						</div>
					</div>
					<div class="flex2 adsawq">
						<span>数量</span>
						<div class="flex">
							<span>478.98 USDT</span>
						</div>
					</div>
					<div class="flex2 adsawq">
						<span>总金额</span>
						<div class="flex">
							<span>￥{{order.total_price}}</span>
							
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

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				order:{},
				merchant:{}
			}
		},
		mounted() {
            console.log(this.$route.query.order)
				this.merchant=this.$route.query.order.merchant
				this.order=this.$route.query.order.order
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
            onClickLeft(){
                this.$router.push({ name:'List'})
            },
			copyorder() {
				// uni.setClipboardData({
				//        data:this.order.order_id, // 必须字符串
				//        success: function () {
				//        }
				//    });
                this.$copyText(this.order.order_id).then(
                    e=>{
                        console.log('复制成功：', e);
                    },
                    e=>{
                        console.log('复制失败：', e);
                    }
                )
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: linear-gradient(180deg, rgba(247, 250, 255, 1) 0%, rgba(247, 250, 255, 1) 100%);
		color: rgba(51, 51, 51, 1);
	}

	.navbartitle {
		color: rgba(16, 16, 16, 1);
		width: 100%;
		height: 60px;
		opacity: 1;
		background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
		position: fixed;
		top: 0;
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
