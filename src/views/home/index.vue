<template>
	<div class="">
		<div class="navbartitle">
			<van-nav-bar left-text="交易所" :safe-area-inset-top="true" :border="false" />
			<!-- <div class="status_bar"></div> -->
			<!-- <uni-nav-bar left-span="首页" backgroundColor="transparent" :border="false" color="#fff"></uni-nav-bar> -->
			<div class="buyandsale ">
				<div class="allsas flex1" @click="testTabClick(0)">
					<div class="iconbox"><img src="../../assets/img/sale.png" alt="" srcset=""></div>
					<div class="flex4  ">
						<span class="buytitle">快捷购买</span>
						<span class="secondtitle">高效率 快支付</span>
					</div>

				</div>
				<div class="shau"></div>
				<div class="allsas flex1" @click="testTabClick(1)">
					<div class="iconbox"><img src="../../assets/img/buy.png" alt="" srcset=""></div>
					<div class="flex4 alslda">
						<span class="buytitle">挂单出售</span>
						<span class="secondtitle">快速挂单卖出</span>
					</div>

				</div>
			</div>
		</div>
		<div class="content" style="margin-top:165px">
			<div class="status_bar"></div>
			<div class="flex2 ads" >
				<!-- <div class="tab-box">
						<div class="tab-item" @click="testTabClick(index)" :class="tabIndex == index?'active':''" v-for="(item,index) in tabList" :key="index">
							{{item.name}}
						</div>
				</div> -->
				<div class="sadas flex1">
					<span v-if="tabIndex==0">我要购买</span>
				<span v-if="tabIndex==1">我要出售</span>
					<div class="chooseconi" @click="changeCoin()">
						<span >{{chooseCoinname.toUpperCase()}}</span>
						<van-icon name="arrow-down" style="padding-left: 5px;"/>
						<!-- <uni-icons type="bottom" size="14"></uni-icons> -->
					</div>
				</div>
				<div class=" boxqie" @click="changecnyName()">
					<div>{{chooseusdtname}}</div>
					<div class="imgqie"><img src="../../assets/img/qiehuan.png" alt="" srcset=""></div>
				</div>
			</div>

			<van-list
				:loading="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="getList"
				>
					<div  v-for="(item,index) in list" :key="index" >
				<div  class="cardlist">
					<div class="titlename flex1">
					<div class="headbox" v-if="item.user_head==''"><img src="../../assets/img/head.png" alt=""></div>
					<div class="headbox" v-else><img :src="$IMGURL+ item.user_head" alt=""></div>
					<span class="namein">{{item.merchant_name}}</span>
				</div>
				<div class="flex4 xianshi">
					<div class="asdadwq ">
						<span class="price">{{item.price}}</span>
						<span style="font-weight: 600;font-size: 14px;" v-if="item.price_type=='CNY'">￥</span>
						<span style="font-weight: 600;font-size: 14px;" v-else>$</span>
					</div>

					<span class="neirong">数量 {{item.number}} {{ item.coin_en_name.toUpperCase()}}</span>
					<span class="xiane">限额<p style="padding-left: 10px;color: rgba(51, 51, 51, 1);">{{item.low_price}}-{{item.high_price}}
							{{item.price_type}}</p></span>
				</div>
				<div class="buybtn flex2">
					<div>
						<span>支付方式  {{ item.contact }}</span>
					</div>
					<div v-if="tabIndex==0" class="buy" @click="moveDeatil(item)">购买</div>
					<div  v-if="tabIndex==1" class="buyout"  @click="moveDeatil(item)">出售</div>
				</div>
				</div>

			</div>
			
				</van-list>
				<div class="stats_bottom"></div>
			<!-- <div  v-for="(item,index) in list" :key="index" >
				<div  class="cardlist">
					<div class="titlename flex1">
					<div class="headbox" v-if="item.user_head==''"><img src="../../assets/img/head.png" alt=""></div>
					<div class="headbox" v-else><img :src="$IMGURL+ item.user_head" alt=""></div>
					<span class="namein">{{item.merchant_name}}</span>
				</div>
				<div class="flex4 xianshi">
					<div class="asdadwq ">
						<span class="price">{{item.price}}</span>
						<span style="font-weight: 600;font-size: 14px;" v-if="item.price_type=='CNY'">￥</span>
						<span style="font-weight: 600;font-size: 14px;" v-else>$</span>
					</div>

					<span class="neirong">数量 {{item.number}} {{ item.coin_en_name.toUpperCase()}}</span>
					<span class="xiane">限额<p style="padding-left: 10px;color: rgba(51, 51, 51, 1);">{{item.low_price}}-{{item.high_price}}
							{{item.price_type}}</p></span>
				</div>
				<div class="buybtn flex2">
					<div>
						<span>支付方式  {{ item.contact }}</span>
					</div>
					<div v-if="tabIndex==0" class="buy" @click="moveDeatil(item)">购买</div>
					<div  v-if="tabIndex==1" class="buyout"  @click="moveDeatil(item)">出售</div>
				</div>
				</div>

			</div> -->
			<div class="listnone" v-if="list.length==0">
				<div class="imgiconbox">
					<img src="../../assets/img/indexnonw.png" alt="" srcset="">
				</div>
				<div style="padding-top: 24px;"><span>这里空空如也~</span></div>
				<div style="padding-top: 5px;"><span>你是风儿我是沙，出售一单就有啦！</span></div>
			</div>
			
			<div class="stats_bottom"></div>
		</div>
		<van-popup v-model="bookShowPicker" position="bottom">
            <div class="coinList" style="">
				<div class="searchCpon">
					<!-- <uni-icons type="search" size="20" color="#C7C7C7"></uni-icons> -->
					<input type="text" placeholder="搜索" v-model="searchCoin" placeholder-style="color:#C7C7C7" @input="searchCoinInput(searchCoin)">
				</div>
				<div style="padding: 25px 30px;">
					<van-radio-group v-model="checked"  >
					<div class="listcoinall flex2" v-for="(item,index) in listall" :key="index">
										 <div class="flex" style="align-items: center;">
											 <div class="cpongom" v-if="item.en_name!='全部'">
												 <img :src="$APIURL+'/'+item.icon" alt="" srcset="">
											 </div>
											 <div class="tista">
												 <span>{{item.en_name.toUpperCase()}}</span>
												  <span style="color: #B8B8B8;font-size: 12px;">{{item.ch_name}}</span>
											 </div>
										 </div>
										<div>  
												<van-radio :name="index.toString()"  @click="changeCointype(index)"></van-radio>
											

											<!-- <checkbox :value="index" :checked="item.checked" color="#0FBD6C" style="transform:scale(0.7)" @change="changeCointype(e)"/> -->
										 </div>
										 
					</div>

					</van-radio-group>
			</div>
				 
			</div>
        </van-popup>

		<van-popup v-model="fabishow" position="bottom">
			<div class="coinList" style="">
				<div class="searchCpon">
					<!-- <uni-icons type="search" size="20" color="#C7C7C7"></uni-icons> -->
					<input type="text" placeholder="搜索" placeholder-style="color:#C7C7C7">
				</div>
				<div style="padding: 25px 30px;">
					<van-radio-group v-model="checkedusdt"  >
					<div class="listcoinall flex2" v-for="(item,index) in list2" :key="index" >
										 <div class="flex" style="align-items: center;">
											 <div class="cpongom" >
												 <img :src="item.img" alt="" srcset="">
											 </div>
											 <div class="tista">
												 <span>{{item.name}}</span>
												  <span style="color: #B8B8B8;font-size: 12px;">{{item.ch_name}}</span>
											 </div>
										 </div>
										<div>  
												<van-radio :name="index.toString()"  @click="cahgeUsdt(index)"></van-radio>
											

											<!-- <checkbox :value="index" :checked="item.checked" color="#0FBD6C" style="transform:scale(0.7)" @change="changeCointype(e)"/> -->
										 </div>
										 
					</div>

					</van-radio-group>
			</div>
				 
			</div>
		</van-popup>
		<!-- <uni-popup ref="popup" type="bottom">
			<div class="coinList" style="">
				<div class="searchCpon">
					<uni-icons type="search" size="20" color="#C7C7C7"></uni-icons>
					<input type="text" placeholder="搜索" placeholder-style="color:#C7C7C7">
				</div>
				<div style="padding: 50px 60px;">
					<div class="listcoinall flex2" v-for="(item,index) in listall" :key="index">
										 <div class="flex" style="align-items: center;">
											 <div class="cpongom">
												 <img src="/static/img/head.png" alt="" srcset="">
											 </div>
											 <div class="tista">
												 <span>{{item.en_name}}</span>
												  <span style="color: #B8B8B8;font-size: 24px;">{{item.ch_name}}</span>
											 </div>
										 </div>
										<div>
											<checkbox :value="index" :checked="item.checked" color="#0FBD6C" style="transform:scale(0.7)" @change="changeCointype(e)"/>
										 </div>
					</div>
				</div>
				 
			</div>
		</uni-popup> -->

	</div>
</template>

<script>
	let _this
	import loadcode from '../../utils/loadcode.js'
	export default {
		
		data() {
			return {
				loading: false,
      			finished: false,
				tabIndex: 0,
				bookShowPicker: false,
				fabishow:false,
				searchCoin:'',
				checked:"",
				tabList: [{
					name: "购买"
				}, {
					name: "出售"
				}],
				filters:{
					coin_id:0,
					page:1,
					limit:10,
					type:"sell",
					price_type:''
				},
				$IMGURL:'',
				list:[],
				copyList:null,
				chooseCoinname:'',
				chooseusdtname:'',
				checkedusdt:'',
				themeColor:'#33CCCC',
                val:'',
                listall:[],
                list2:[{
                    name:'CNY',
					img:require("../../assets/img/cnypic.png")
                },
                {
                    name:'USD',
					img:require("../../assets/img/usdpic.png")
                }],

			}
		},
	  async	mounted() {
			_this=this
			this.$IMGURL = process.env.VUE_APP_IMGURL
			this.$APIURL = process.env.VUE_APP_BASE_API;
			this.filters.price_type=this.list2[0].name
				this.chooseusdtname=this.list2[0].name
				this.checkedusdt='0'
				// if(this.$route.query.code){
				// this.getAuther(this.$router.query.code)
				// }else if(localStorage.getItem('code')){
				// 	this.getAuther(localStorage.getItem('code'))
				// }
			this.timer = setInterval(()=>{
				location.reload()
				
				this.getAuther(localStorage.getItem('code'))
			}, 200)
			// setTimeout(this.getAuther(localStorage.getItem('code')),2000)	
			// let code='NTHKOWI0NGMTOGQZMS0ZMWFKLTKYYJATM2Y1ODHKMWUWNJU5'	
		    // this.getAuther(code)
			this.getcoinList()
			this.getList()
			
				
			
		},
		methods: {
			// getCode(){

			// },
			searchCoinInput(val){
				let all=[]
				if(val==''){
					this.listall=this.copyList
				}else{
					this.listall=this.copyList
					this.listall.forEach(item => {
						let name=item.en_name
					if(name.indexOf(val.trim()) >= 0 || name.toUpperCase().indexOf(val.trim())>= 0 ){
						console.log(11111)
						all.push(item)
					}
					
						})
					this.listall=all
				}
				
			},
			getAuther(code){
				// var code=""
				// console.log(code,77777)
				// window.WebViewJavascriptBridge.callHandler('getDappCode', '', function (responseData) {
				// 	code=responseData
                // 	console.log("callNativeEcho res ", responseData);
            	// });
				// setTimeout(()=>{
					this.$api.getAuther({code:code}).then((res)=>{
						if(res.code==0){
							clearInterval(timer);
							localStorage.setItem('token',res.data.auth.access)
							this.getcoinList()
							this.getList()
						}
					
						})
				// },500)
				
				
			},
			changeCointype(e){
				this.checked=e.toString()
				this.filters.coin_id=this.listall[e].id
				this.chooseCoinname=this.listall[e].en_name
				this.bookShowPicker=false
				this.list=[]
				this.finished=false
				this.filters.page=1
				this.getList()
				
			},
			cahgeUsdt(e){
				this.checkedusdt=e.toString()
				this.filters.price_type=this.list2[e].name
				this.chooseusdtname=this.list2[e].name
				this.fabishow=false
				this.list=[]
				this.finished=false
				this.filters.page=1
				this.getList()
			},
			testTabClick(index) {
				this.tabIndex = index
				this.list=[]
				this.finished=false
				this.filters.page=1
				this.getList()
			},
			changeCoin(){
				this.bookShowPicker = true;
				//  this.$refs.popup.open('bottom')
			},
			changecnyName(){
				this.fabishow = true;
				//  this.$refs.popup.open('bottom')
			},

		    getcoinList(){
				this.$api.coinList(this.filters).then((res)=>{
					if(res.code==0){
						_this.listall=res.data.coins
						let obj={
							en_name:'全部',
							id:0
						}
						this.listall.unshift(obj)
							this.listall.forEach(item=>{
								item.checked=false
							})
							
							this.listall[0].checked=true
							this.checked='0'
							this.filters.coin_id=this.listall[0].id
							this.chooseCoinname=this.listall[0].en_name
							this.copyList= [].concat(this.listall)
					}
					
				})
			},
			getList() {
				
				// console.log(1111)
				_this=this
				if(this.tabIndex==0){
					this.filters.type="sell"
				}else{
					this.filters.type="buy"
				}
				
				// setTimeout(()=>{
						this.$api.homeList(this.filters).then((res)=>{
						if(res.code==0){
							let all=res.data.list
							this.loading = false;
							if(all.length==10){
								this.filters.page=Number(this.filters.page)+1
								// this.finished = true;
								all.forEach(item=>{
									if(item.status=='enable'){
										_this.list.push(item)
										
										
									}
								})
							}else if(all.length<10&&!this.finished){
								// console.log(1111)
								this.finished = true;
								all.forEach(item=>{
									if(item.status=='enable'){
										_this.list.push(item)
										
									}
								})
								
							}
							
							
						}
						
					})
				// },500)

				
				
				// _this.$post('/api/user/advertising/list',{
				// 	data:_this.filters,
				// 	success: (res)=>{
				// 		if(res.code==0){
				// 			_this.list=res.data.list
				// 		}
				// 	},
				// 	error:(err)=>{
				// 		_this.$toast("err")
				// 	},
				// 	},
				// )
				// _this.$post('/api/user/coins',{
				// 	success: (res)=>{
				// 		if(res.code==0){
				// 			_this.listall=res.data.coins
				// 			this.listall.forEach(item=>{
				// 				item.checked=false
				// 			})
				// 			this.listall[0].checked=true
				// 			this.chooseCoinname=this.listall[0].en_name
				// 		}
				// 	},
				// 	error:(err)=>{
				// 		_this.$toast("err")
				// 	},
				// 	},
				// )
			},
			moveDeatil(val) {
				console.log(val)
				this.$router.push({
					name:'goodDetail',
					query:{
					id:val.id,
					type:this.filters.type,
					coin_name:val.coin_en_name,
					usdt_name:this.chooseusdtname
					}
				})
				// uni.navigateTo({
				// 	url: '/pages/goodsDetail/goodsDetail?id='+id
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>

.adadwq{
}
	.listcoinall{
		margin-bottom: 28px;
		.cpongom{
			width: 28px;
			height: 28px;
			border-radius: 50%;
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.tista{
			display: flex;
			flex-direction: column;
			font-size: 15px;
			padding-left: 10px;
		}
	}
	.coinList{
		width: 100%;
		height: 445px;
		background-color: #fff;
		border-radius: 10px 10px 0 0;
		padding-top: 30px;
		.searchCpon{
			width: 320px;
			height: 40px;
			opacity: 1;
			border-radius: 1.25rem;
			background: #F5F5F5;
			margin: 0 auto;
			padding: 10px 15px;
			box-sizing: border-box;
			display: flex;
			input{
				padding-left: 5px;
				font-size: 14px;
				border: none;
				background: transparent;
			}
		}
	}
	.listnone{
		display: flex;
		flex-direction: column;
		font-size: 13px;
		color: rgba(120, 137, 166, 1);
		align-items: center;
		.imgiconbox{
			margin: 0 auto;
			margin-top: 88px;
			
			width: 132px;
			height: 143px;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.buybtn {
		margin-top: 20px;
		font-size: 12px;
		color: rgba(120, 137, 166, 1);

		.buy {
			border-radius: 18px;
			background: linear-gradient(90deg, rgba(241, 37, 69, 1) 0%, rgba(253, 83, 38, 1) 100%);
			width: 84px;
			height: 35px;
			font-size: 14px;
			color: rgba(255, 255, 255, 1);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.buyout {
			border-radius: 18px;
			background: linear-gradient(90deg, rgba(50, 120, 247, 1) 0%, rgba(105, 157, 255, 1) 100%);
			width: 84px;
			height: 35px;
			font-size: 14px;
			color: rgba(255, 255, 255, 1);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.cardlist {
		margin: 13px;
		padding: 10px 16px;
		box-shadow: 0px 5px 8px 0px rgba(230, 236, 247, 1);
		border-radius: 0px 0px 10px 10px;

		.xianshi {
			.asdadwq {
				padding-top: 11px;
			}

			.price {

				font-size: 23px;
				font-weight: 600;
			}

			.neirong {
				color: rgba(120, 137, 166, 1);
				padding-top: 8px;
				font-size: 12px;
			}

			.xiane {
				display: flex;
				color: rgba(120, 137, 166, 1);
				padding-top: 5px;
				font-size: 12px;
			}
		}

		.titlename {

			.headbox {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
			}

			.namein {
				font-size: 16px;
				padding-left: 4px;
			}

		}
	}

	.content {
		margin: 0 17px;
		// padding: 0 16px;
		margin-top: 58px;
		border-radius: 20px 20px 0 0;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 6px 4px rgba(239, 244, 254, 0.6);
		height: calc(100vh - 210px);
		overflow-y: auto;
	}

	.imgqie {
		width: 18px;
		height: 18px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.navbartitle {
		color: rgba(16, 16, 16, 1);
		width:100%;
		height: 110px;
		opacity: 1;
		background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
		position: fixed;
		top:0;
		z-index: 999;
		.buyandsale {
			padding: 0 17px;
			box-sizing: border-box;
			position: absolute;
			width: 90%;
			height: 78px;
			background: url("../../assets/img/indexbanner.png") no-repeat;
			background-size: 100% 100%;
			bottom: -39px;
			left: 0;
			right: 0;
			margin: 0 auto;
			font-size: 16px;
      display: flex;
	  align-items: center;
      justify-content: space-between;
			.shau {
        		margin: 25px;
				height: 40%;
				border: 0.5px solid rgba(197, 220, 255, 1);
			}

			.allsas {
				.iconbox {
					margin-right: 5px;
					width: 35px;
					height: 30px;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}

			.buytitle {
				font-size:16px;
				font-weight: 600;

			}

			.secondtitle {
				padding-top: 3px;
				font-size: 7px;
				color: rgba(120, 137, 166, 1);
			}

			.alslda {}
		}
	}

	.sadas {
		display: flex;
		padding-left: 26px;
		font-size: 14px;
		font-weight: 600;
		.chooseconi{
			padding-left: 10px;
			color: rgba(73, 135, 249, 1);
		}
	}

	.boxqie {
		width: 96px;
		height: 44px;
		// border-radius: 28px;
		background: rgba(240, 240, 240, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 9px;
		box-sizing: border-box;
		font-size: 14px;
		color: rgba(81, 81, 81, 1);
		background: url("../../assets/img/cny.png");
		background-size: 100% 100%;
	}

	.tab-box {
		display: flex;
		font-size: 44px;

		.tab-item {
			flex-shrink: 0;
			color: rgba(128, 128, 128, 1);
			padding: 16px;
			padding-left: 0;
			padding-right: 24px;
			position: relative;
			transition: all 0.2s linear;

			&::after {
				transition: all 0.2s linear;
				transform: translateX(-50%) scaleX(0);
				content: '';
				width: 50%;
				position: absolute;
				left: 50%;
				bottom: 20px;
				// border-bottom: 6px solid red;
				border-radius: 4px;
			}

			&.active {
				font-weight: bold;
				color: rgba(51, 51, 51, 1);

				&::after {
					// content: '';
					// width: 50%;
					// position: absolute;
					// left: 50%;
					// transform: translateX(-50%) scaleX(1);
					// bottom: 20px;
					// border-bottom: 6px solid red;
				}
			}
		}
	}
</style>
