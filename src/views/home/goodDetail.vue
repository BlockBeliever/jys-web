<template>
	<div>
		<div class="topall">
			<!-- <uni-nav-bar left-text="返回" :border="false" statusBar="true" backgroundColor="transparent" color="#fff"  leftIcon="back" @clickLeft="back"></uni-nav-bar> -->
            <van-nav-bar left-text="返回" :safe-area-inset-top="true"  :border="false" left-arrow
  @click-left="onClickLeft"/>
			<div class="ontroa"><span>自由理财 每日收益 随买随卖</span></div>
			<div class="sudt">
				<div class="usdttop">
					<div class="rate">
						<div class="allin flex1">
							<div class="imgallin"><img src="../../assets/img/usdticon.png" alt=""></div>
							<span>{{ coin_name.toUpperCase() }}</span>
						</div>
						<div class="ucoasd">
							<span>{{info.price}}</span>
							<span style="font-size: 20px;">{{ usdt_name }}</span>
						</div>

					</div>
					<div class="imgsad"></div>
				</div>
				<div class="usdtbottom">
					<div class="imgall">
						<img src="../../assets/img/save.png" alt="" srcset="">
					</div>
					<div class="tab-box">
						<div class="tab-item" @click="testTabClick(index)" :class="tabIndex == index?'active':''"
							v-for="(item,index) in tabList" :key="index">
							{{item.name}}
						</div>
					</div>
					<div class="priceall">
                        <!-- <van-field v-model="value" label="文本" placeholder="请输入用户名" /> -->
						<input type="number" class=" pricespan " placeholder="0.00" v-model="typein"
							placeholder-style="color: rgba(207, 207, 207, 1);">
						<!-- <span class="pricetext">0.00</span> -->
						<div class="sada">
							<span v-if="tabIndex==0">{{ usdt_name }}</span>
							<span v-if="tabIndex==1">{{ coin_name.toUpperCase() }}</span>
							<span style="padding: 0 9px;padding-bottom: 2px;">|</span>
							<span style="color: rgba(73, 135, 249, 1);padding-bottom: 3px;" @click="maxAll">最大</span>
						</div>
					</div>
					<div class="xiane">
						<span>*</span>
						<span style="padding-right: 13px;padding-left: 5px;">限额</span>
						<span style="color: rgba(255, 32, 64, 1);">{{info.low_price}}-{{info.high_price}} {{ usdt_name }}</span>
					</div>
					<div class="kede flex1" v-if="tabIndex==0">
						<span>可得 </span>
						<span style="color: rgba(207, 207, 207, 1);padding-left: 13px;font-size: 25px;">{{usdtnum}}{{ coin_name.toUpperCase() }}
						</span>
					</div>
					<div class="kede flex1" v-if="tabIndex==1">
						<span>应付 </span>
						<span style="color: rgba(207, 207, 207, 1);padding-left: 13px;font-size: 25px;">{{usdtnum}}{{ usdt_name }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="paytype">
			<div class="paytupetitle"><span>支付方式</span></div>
			<div class="payname">{{ merchant.pay_type }}</div>
		</div>
		<div class="paytop">
			<div>
				<div class="paytupetitle">商家信息</div>
			</div>
			<div class="paytopname">
				<span>商家昵称</span>
				<div >
					<span style="color: rgba(16, 16, 16, 1);">{{merchant.name}}</span>
					<van-icon name="arrow" />
				</div>

			</div>
			<div class="payintro">
				<span>商家留言</span>
				<div style="padding-top: 9px;">
					1、添加付款时不得备注任何信息，如欧意买币-okex货币- USDT买U等敏感字。
					<br/>
					2、黑钱勿扰，否则报警处理！
					<br/>
					3、必须本人实名付款，否则不放币，不退款。
					<br/>
					4、微信付款请使用零钱通付款！
				</div>
			</div>
		</div>
		<div class="remind">
			<span>如果您同意与凤凰进行C2C交易，即标识您接受</span>
			<span style="color: rgba(58, 116, 219, 1);border-bottom:1px solid  rgba(58, 116, 219, 1)">凤凰C2C交易法律免责声明。</span>
		</div>
            <div class="buybtn" @click="orderPay">买入{{ coin_name.toUpperCase() }}</div>
		
		<div style="padding-bottom: 94px;"></div>
	</div>
</template>

<script>
	let _this
	export default {
		data() {
			return {
				tabList: [{
					name: "按金额购买"
				}, {
					name: "按数量购买"
				}],
				tabIndex: 0,
				typein:null,
				id:0,
				info:{},
				merchant:{},
				coin_name:'',
				usdt_name:''
			}
		},
		mounted() {
			_this=this
			console.log(this.$route.query,7878)
            this.id= parseInt(this.$route.query.id)
			this.coin_name=this.$route.query.coin_name
			this.usdt_name=this.$route.query.usdt_name
			this.loadDetail()
		},
		computed:{
			usdtnum(){
				if(this.tabIndex==0){
					let xprice=this.typein/this.info.price
					console.log(this.typein,this.info.high_price,666)
					if(this.typein>this.info.high_price){
						_this.$toast("不能超过最大限额")
					}
					return xprice.toFixed(4)
				}else{
					let yprice=this.typein*this.info.price
					let bprice=Number(_this.info.high_price)
					if(yprice.toFixed(4)>bprice){
						_this.$toast("不能超过最大限额")
					}
					return this.typein?(this.typein*this.info.price).toFixed(4):'0.00'
				}
			}
		},
		methods: {
			maxAll(){
				if(this.tabIndex==0){
					if(this.info.number*this.info.price>=this.info.high_price){
						this.typein=this.info.high_price
					}else{
						this.typein=this.info.number*this.info.price
					}
					
				}else{
					if(this.info.number*this.info.price<=this.info.high_price){
						this.typein=this.info.number
					}else{
						this.typein=(this.info.high_price/this.info.price).toFixed(4)
					}
				}
			},
            onClickLeft(){
                this.$router.push({ name:'Home'})
            },
			loadDetail(){
                this.$api.GoodsInfo({id:this.id}).then((res)=>{
                    if(res.code==0){
						this.info=res.data.info
				        this.merchant=res.data.merchant
					}
					
				}).catch((err)=>{
                })
				// _this.$post('/api/user/advertising/info',{
				// 	data:{id:_this.id},
				// 	success: (res)=>{
				// 		if(res.code==0){
				// 			_this.info=res.data.info
				// 			_this.merchant=res.data.merchant
				// 		}
				// 	},
				// 	error:(err)=>{
				// 		_this.$toast("err")
				// 	},
				// 	},
				// )
			},
			orderPay(){
				let data={
					merchant_advertising_id:this.id,
					number:this.tabIndex==0?this.usdtnum:this.typein
				}
                this.$api.submitOrder(data).then((res)=>{
                    if(res.code==0){
                        _this.$toast("订单提交成功")
                    setTimeout(()=>{
                        this.$router.push({
					name:'order',
					query:{
                        order:res
					}
                    })
                   
				    },400)
                    }else{
                        _this.$toast(res.error)
                    }
					
				})
				// _this.$post('/api/user/advertising/buy',{
				// 	data:data,
				// 	success: (res)=>{
				// 		console.log(res.data)
				// 		if(res.code==0){
				// 			_this.$toast("订单提交成功")
				// 			setTimeout(()=>{
				// 				uni.navigateTo({
				// 					url:"/pages/order/order?order="+JSON.stringify(res.data)
				// 				})
				// 			},400)
								
				// 		}
				// 	},
				// 	error:(err)=>{
				// 		_this.$toast("err")
				// 	},
				// 	},
				// )
					
				
			},
			testTabClick(index) {
				this.typein=""
				this.tabIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: linear-gradient(180deg, rgba(247, 250, 255, 1) 0%, rgba(247, 250, 255, 1) 100%);
	}
    .pricespan{
        border: none;
        font-size: 40px;
        width: 160px;
        color: rgba(16, 16, 16, 1);
    }
	.buybtn{
		width: 223px;
		height: 40px;
		opacity: 1;
		border-radius: 20px;
        border: none;
		background: linear-gradient(90deg, rgba(51, 121, 247, 1) 0%, rgba(104, 156, 255, 1) 100%);
        margin: 0 auto;
		margin-top: 46px;
		margin-bottom: 25px;
		color: #fff;
		font-size:16px;
        display: flex;
        align-items: center;
        justify-content: center;
	}
	.remind{
		padding: 0 25px;
		padding-top: 15px;
		font-size: 10px;
		
	}
	.paytopname {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 13px;
		padding-top: 13px;
		padding-bottom: 9px;
		border-bottom: 1px solid rgba(245, 245, 245, 1);
	}

	.paytop {
		margin-top: 10px;
		border-radius: 10px;
		background-color: #fff;
		margin: 0 auto;
		box-sizing: border-box;
		width: 340px;
		margin-top: 10px;
		padding: 0 20px;
		box-sizing: border-box;
		color: rgba(112, 112, 112, 1);
	}
	.payintro{
		padding-top: 15px;
		color: rgba(112, 112, 112, 1);
		font-size: 13px;
		padding-bottom: 20px;
	}
	.paytupetitle {
		padding-top: 10px;
		font-size: 12px;
		color: rgba(120, 137, 166, 1);
		border-bottom: 1px solid rgba(245, 245, 245, 1);
		padding-bottom: 10px;
		box-sizing: border-box;
	}

	.paytype {
		width: 340px;
		height: 100px;
		border-radius: 10px;
		background-color: #fff;
		margin: 0 auto;
		margin-top: 120px;
		padding: 0 20px;
		box-sizing: border-box;

		.payname {
			color: rgba(16, 16, 16, 1);
			font-size: 14px;
			padding-top: 18px;
			box-sizing: border-box;
		}
	}

	.priceall {
		display: flex;
		margin: 5px 20px;
		padding-bottom: 8px;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid rgba(245, 245, 245, 1);

		.pricetext {
			font-size: 40px;
			color: rgba(207, 207, 207, 1);
			width: 180px;
		}
        input::-webkit-input-placeholder{
	    color:rgba(207, 207, 207, 1);
        }
		.sada {
			// font-weight: bold;
			font-size: 16px;
			display: flex;
			align-items: center;
			color: rgba(207, 207, 207, 1);
		}
	}

	.xiane {
		padding: 8px 20px 6px 20px;
		font-size: 10px;
		color: rgba(120, 137, 166, 1);
	}

	.kede {
		padding: 10px 20px 0 20px;
		font-size:14px;
	}

	.tab-box {
		display: flex;
		font-size:14px;

		.tab-item {
			flex-shrink: 0;
			color: rgba(128, 128, 128, 1);
			padding: 16px;
			padding-left: 22px;
			padding-right: 24px;
			position: relative;
			transition: all 0.2s linear;
			margin-right: 12px;

			&::after {
				transition: all 0.2s linear;
				transform: translateX(-50%) scaleX(0);
				content: '';
				position: absolute;
				left: 50%;
				bottom: 13px;
				width: 22px;
				height: 7px;
				background: linear-gradient(180deg, rgba(57, 117, 219, 1) 0%, rgba(58, 116, 219, 0.01) 100%);
				border-radius: 2px;
			}

			&.active {
				font-weight: bold;
				font-size: 16px;
				color: rgba(51, 51, 51, 1);

				&::after {
					content: '';
					width: 50%;
					position: absolute;
					left: 50%;
					transform: translateX(-50%) scaleX(1);
					bottom: 13px;
					width: 22px;
					height: 7px;
					background: linear-gradient(180deg, rgba(57, 117, 219, 1) 0%, rgba(58, 116, 219, 0.01) 100%);
				}
			}
		}
	}

	.topall {
		width: 100%;
		height: 300px;
		// background-color: #000;
		background: linear-gradient(180deg, rgba(58, 116, 219, 1), rgba(145, 198, 255, 1));

		.ontroa {
			padding: 10px 15px 15px 15px;
			font-size: 12px;
			color: rgba(255, 255, 255, 1);
		}
	}

	.sudt {
		width: 340px;
		height: 223px;
		margin: 0 auto;

		.usdttop {
			height: 100px;
			width: 100%;
			background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(204, 204, 204, 0) 100%);
			position: relative;

			.imgsad {
				position: absolute;
				width: 163px;
				height: 152px;
				top: -23px;
				right: 0;
				background: url("../../assets/img/apply.png");
				background-size: 100% 100%;
			}

			.rate {
				padding-left: 22px;
				padding-top:15px;

				.allin {
					display: flex;
					color: rgba(16, 112, 212, 0.6);
					font-weight: 600;

					.imgallin {
						margin-right: 7px;
						font-size: 15px;
						width: 22px;
						height: 22px;

						img {
							width: 100%;
							height: 100%;
						}
					}
				}

				.ucoasd {
					font-size: 35px;
					color: rgba(58, 116, 219, 1);
					padding-top: 6px;
					font-weight: 500;
				}
			}
		}

		.usdtbottom {
			border-radius: 0 0 10px 10px;
			position: absolute;
			z-index: 99;
			height: 100%;
			width: 340px;
			background-color: #fff;
			position: relative;

			.imgall {
				position: absolute;
				width: 52px;
				height: 50px;
				right: -5px;
				top: -5px;

				img {
					width: 100%;
					height: 100%;

				}
			}
		}
	}
</style>
