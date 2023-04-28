<template>
	<div>
		<div class="navbartitle">
			<!-- <uni-nav-bar leftIcon="back" @clickLeft="back" left-span="交易所" :border="false" statusBar="true" backgroundColor="transparent" color="#fff" :leftWidth="90" ></uni-nav-bar> -->
            <van-nav-bar fixed left-text="返回" :safe-area-inset-top="true"  :border="false" left-arrow
  @click-left="onClickLeft"/>
		</div>
		<div class="namebuy" style="text-align: center;font-weight: 600;">
			<span style="font-size:15px;">我要买入</span>
		</div>
		<div class="applycardall">
			<div class="formitem">
				<span class="formname">商家名称</span>
				<div class="inputbox disabledasd">
					<input type="text" v-model="formData.name" placeholder="同城花点金融" placeholder-style="color:#7889A6;font-size:13px" disabled="true"> 
				</div>
			</div>
			<div class="formitem">
				<span class="formname">代币名称</span>
				<div class="inputbox flex2">
					<input type="text" v-model="formData.coin_name" placeholder="请输入货币名称" placeholder-style="color:#C8C8C8;font-size:13px" disabled="true"> 
					<div style="font-size: 14px;">
						<span style="padding-right: 5px;">{{chooseCoinname}}</span>
                        <van-icon name="arrow-down" v-if="!showcoindown" @click="showcoindown=!showcoindown"/>
                        <van-icon name="arrow-up" v-if="showcoindown"  @click="showcoindown=!showcoindown"/>
						<!-- <uni-icons type="bottom" size="12" v-if="!showcoindown" @click="showcoindown=!showcoindown"></uni-icons>
						<uni-icons type="top" size="12" v-if="showcoindown"  @click="showcoindown=!showcoindown"></uni-icons> -->
						<div class="downlistcoin"  v-if="showcoindown">
							<div class="boxboadssad" v-for="(item,index) in cointypelist" :key="index" :style="selectedcoinIndex==index?'background:#F7FAFF':'background:#fff'" @click="selectedCoinType(index,item.name)">{{item.name}}</div>
						</div>
					</div>
				</div>
			</div>
			
			
			
			<div class="formitem">
				<span class="formname">买入数量</span>
				<div class="inputbox">
					<input v-model="formData.number" placeholder="请输入数量" placeholder-style="color:#C8C8C8;font-size:13px" type="number"> 
				</div>
			</div>
			
			
			
			<div class="formitem">
				<span class="formname">价格</span>
				<div class="inputbox flex2">
					<input v-model="formData.price" placeholder="请输入价格" placeholder-style="color:#C8C8C8;font-size:13px" type="number"> 
					<div style="font-size: 14px;">
						<span style="padding-right: 5px;">{{chooseTypename}}</span>
                        <van-icon name="arrow-down" v-if="!showdown" @click="showdown=!showdown"/>
                        <van-icon name="arrow-up" v-if="showdown"  @click="showdown=!showdown"/>
						<div class="downlist"  v-if="showdown">
							<div class="boxboadssad" v-for="(item,index) in paytypelist" :key="index" :style="selectedIndex==index?'background:#F7FAFF':'background:#fff'" @click="selectedPriceType(index,item.name)">{{item.name}}</div>
						</div>
					</div>
				</div>
			</div>
			
			
			
			<div class="formitem">
				<span class="formname">交易方式</span>
				<div class="inputbox">
					<input type="text" v-model="formData.contact" placeholder="数字货币交易" placeholder-style="color:#7889A6;font-size:13px" disabled="true"> 
				</div>
			</div>
			<div class="formitem">
				<span class="formname">限额</span>
				<div class="inputbox flex2">
					<input v-model="formData.low_price " placeholder="请输入最低金额" placeholder-style="color:#C8C8C8;font-size:13px" type="number"> 
					<span style="color: #7889A6;font-size: 20px;">——</span>
					<input v-model="formData.high_price" placeholder="请输入最高金额" placeholder-style="color:#C8C8C8;font-size:13px" type="number" style="padding-left: 30px;"> 
				</div>
			</div>
			<div class="submit" @click="submit">
				<span>发布广告</span>
			</div>
            <div class="stats_bottom"></div>
		</div>
	</div>
</template>

<script>
	let  _this
	export default {
		data() {
			return {
				hobby:'',
				formData:{
					name:'',
					coin_name:'',
					coin_id:0,
					price:'',
					number:'',
					price_type:'',
					low_price:'',
					high_price :'',
					type:"sell",
					contact:"",
					status:"enable"
				},
				merchant:{},
				chooseTypename:'请选择货币类型',
				chooseCoinname:'请选择代币名称',
				selectedIndex:null,
				selectedcoinIndex:null,
				numtxt:0,
				showdown:false,
				showcoindown:false,
				cointypelist:[{
					coin_id:1,
					name:'BTC',
				},
				{
					coin_id:2,
					name:'ETH'
				},
				{
					coin_id:3,
					name:'EOS'
				},
				{
					coin_id:4,
					name:'USDT'
				}
				],
				paytypelist:[{
					name:'CNY',
				},
				{
					name:'USD'
				}]
			}
		},
		mounted() {
			 _this=this
			this.load()
		},
		methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
			load(){
                this.$api.myInfo().then((res)=>{
					if(res.code==0){
						let data
						data=res.data.merchant
						this.formData.price_type=data.pay_type
						this.formData.name=data.name
						this.formData.contact=data.pay_type
					}
					
				})
				// _this.$post('/api/user/account',{
				// 	success: (res)=>{
				// 		if(res.code==0){
				// 			let data
				// 			data=res.data.merchant
				// 			// this.formData.price_type=data.pay_type
				// 			this.formData.name=data.name
				// 			this.formData.contact=data.pay_type
				// 		}
				// 	},
				// 	error:(err)=>{
				// 		_this.$toast("err")
				// 	},
				// 	},
				// )
			},
			selectedCoinType(index,name){
				this.selectedcoinIndex=index
				this.chooseCoinname=""
				this.showcoindown=false
				this.formData.coin_name=name
				console.log(this.cointypelist[index],996)
				this.formData.coin_id=this.cointypelist[index].coin_id
			},
			 selectedPriceType(index,name){
				this.selectedIndex=index
				this.chooseTypename=name
				this.showdown=false
				this.formData.price_type=name
			},
			sumfontnum(e) {
							this.numtxt = e.detail.value.length
			},
			submit(){
				if (this.formData.coin_name == '') {
					_this.$toast('请选择货币名')
					return
				}
				
				if (this.formData.number == '') {
					_this.$toast('请输入买入数量')
					return
				}
				if (this.formData.low_price == '') {
					_this.$toast('请输入价格')
					return
				}
				if (this.formData.high_price == '') {
					_this.$toast('请输入最高价格')
					return
				}
				if (this.formData.low_price == '') {
					_this.$toast('请输入最低价格')
					return
				}
				let data=this.formData
				data.high_price=parseInt(data.high_price)
				data.low_price=parseInt(data.low_price)
				data.price=parseInt(data.price)
				data.number=parseInt(data.number)
                this.$api.submitBuy(data).then((res)=>{
                    if(res.code==0){
                        _this.$toast("提交成功")
                    setTimeout(()=>{
                        this.$router.push({
					name:'MyAd',
			
                    })
                   
				    },400)
                    }else{
                        _this.$toast(res.error)
                    }
					
				})
				// _this.$post('/api/user/merchant/advertising/create',{
				// 	data:_this.formData,
				// 	success: (res)=>{
				// 		if(res.code==0){
				// 			this.$toast("发布成功")
				// 			setTimeout(()=>{
				// 				uni.navigateTo({
				// 					url:"/pages/myAd/myAd"
				// 				})
				// 			})
				// 		}
				// 	},
				// 	error:(err)=>{
				// 		_this.$toast(err.error)
				// 	},
				// 	},
				// )
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
		background: linear-gradient(180deg, rgba(247, 250, 255, 1) 0%, rgba(247, 250, 255, 1) 100%);
	}
	.navbartitle {
		position: fixed;
		color: rgba(16, 16, 16, 1);
		width: 100%;
		height: 45px;
		opacity: 1;
		background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
		z-index: 999;
	}
	.namebuy{
		padding: 13px 0;
		padding-top: 70px;
	}
	.applycardall{
		
		background-color: #fff;
		border-radius: 10px 10px 0 0;
		width:340px;
		margin: 0 auto;
		height: calc(100vh  - var(--status-bar-height) );
		padding: 0 20px;
		box-sizing: border-box;
		overflow: auto;
		.formitem{
			padding: 15px 0;
			font-size: 14px;
			border-bottom: 1px solid #F0F4FA;
			position: relative;
			.downlist{
				position: absolute;
				width: 300px;
				height: 68px;
				border-radius: 10px;
				background: #FFFFFF;
				border: 1px solid #E6E6E6; 
				overflow: hidden;
				 right: 0;
				 bottom: -70px;
				 z-index: 999;
				 .boxboadssad{	
					 width: 100%;
					line-height: 34px;
					 text-align: center;
					 height: 34px;
					 font-size: 10px;
				 }
				 .bordermiddle{
					 border-top: 1px solid;
				 }
			}
			.downlistcoin{
				position: absolute;
				width: 300px;
				height: 138px;
				border-radius: 10px;
				background: #FFFFFF;
				border: 1px solid #E6E6E6; 
				overflow: hidden;
				 right: 0;
				 bottom: -140px;
				 z-index: 999;
				 .boxboadssad{	
					 width: 100%;
					line-height: 34px;
					 text-align: center;
					 height: 34px;
					 font-size: 10px;
				 }
				 .bordermiddle{
					 border-top: 1px solid;
				 }
			}
		}
		.inputbox{
           
            color: rgba(16, 16, 16, 1);
			margin-top: 20px;
			input::-webkit-input-placeholder{
	         color:rgba(207, 207, 207, 1);
         }	
         input{
            border: none;
            font-size: 14px;
            width: 120px;
            background: #fff;
         }
		}
	}
	.inputboxeara{
		margin-top: 13px;
		background-color: #F7FAFF;
		height: 298px;
		padding: 15px;
		box-sizing: border-box;
		position: relative;
		border-radius: 10px;
		left:0;
		top: 0;
		// display: flex;
		.editiconimg{
			width: 12px;
			height: 15px;
			position: absolute;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.sear{
			padding-left:20px;
			margin-top: -3px;
			font-size: 7px;
			box-sizing: border-box;
			color:#C8C8C8;
			width: 272px;
			height: 240px;
		}
	}
	.submit{
		width: 225px;
		height: 40px;
		opacity: 1;
		border-radius: 20px;
		background: linear-gradient(90deg, rgba(55, 124, 247, 1) 0%, rgba(103, 155, 255, 1) 100%);
		font-size: 16px;
		font-weight: 400;
		color: rgba(252, 238, 217, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		margin-top: 50px;
	}
</style>
