<template>
	<div>
		<div class="navbartitle">
			<!-- <div class="status_bar"></div> -->
			<!-- <uni-nav-bar left-text="我的" :border="false" statusBar="true" backgroundColor="transparent" color="#fff"></uni-nav-bar> -->
      <van-nav-bar fixed left-text="交易所" :safe-area-inset-top="true"  :border="false" />
		</div>
		<div class="cardin">
			<div class="flex1">
				<div class="myheadbox">
					<img src="../../assets/img/head.png" alt="" srcset="">
				</div>
				<span style="font-size:16px;color: rgba(16, 16, 16, 1);padding-left: 7px;">啦啦啦啦小可爱</span>
			</div>
			<div class="flex2">
				<div class="cardbuy" @click="moveBuy">
					<span style="font-weight: 600;">我要买入</span>
					<span style="color: rgba(254, 66, 74, 1);">实现理财自由</span>
				</div>
				<div class="cardsale" @click="moveSale">
					<span style="font-weight: 600;">我要出售</span>
					<span style="color: rgba(254, 66, 74, 1);">随买随买，高效收益</span>
				</div>
			</div>
		</div>
		<div class="cardbt">
			<div class="cardalls flex2" @click="moveAd()">
				<span>我的广告</span>
        <van-icon name="arrow" />
				<!-- <uni-icons type="forward" color="#CFCFCF" size="14"></uni-icons> -->
			</div>
			<div class="cardalls flex2" @click="applySupplier">
				<span>申请商家</span>
        <van-icon name="arrow" />
				<!-- <uni-icons type="forward" color="#CFCFCF" size="14"></uni-icons> -->
			</div>
			<!-- <div class="cardalls flex2">
				<span>退出登录</span>
        <van-icon name="arrow" />
				<uni-icons type="forward" color="#CFCFCF" size="14"></uni-icons>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {

			}
		},
		methods: {
			moveAd(){
        this.$router.push({
					name:'MyAd',})
				// uni.navigateTo({
				// 	url:"/pages/myAd/myAd"
				// })
			},
			moveBuy(){
        this.$router.push({
					name:'Mybuy',})
				// uni.navigateTo({
				// 	url:"/pages/mybuy/mybuy"
				// })
			},
			applySupplier(){
        this.$router.push({
					name:'ApplyMerchant',})
				// uni.navigateTo({
				// 	url:"/pages/applyMerchant/applyMerchant"
				// })
			},
			moveSale(){
        this.$router.push({
					name:'Mysale',})
				// uni.navigateTo({
				// 	url:"/pages/mysale/mysale"
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: linear-gradient(180deg, rgba(247, 250, 255, 1) 0%, rgba(247, 250, 255, 1) 100%);
	}
	.navbartitle {
		color: rgba(16, 16, 16, 1);
		width: 375px;
		height: 60px;
		opacity: 1;
		background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
	
	}
	.cardin{
		width:340px;
		
		box-sizing: border-box;
		border-radius: 10px;
		margin: 0 auto;
		margin-top: 15px;
		padding: 15px 20px;
		background-color: #fff;
	}
	.myheadbox{
		width: 43px;
		height: 43px;
		border-radius: 50%;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.cardbuy{
		width: 145px;
		height: 65px;
		background: url("../../assets/img/myle.png");
		background-size: 100% 100%;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		font-size: 13px;
		justify-content: space-between;
	}
	.cardsale{
		width: 145px;
		height: 65px;
		background: url("../../assets/img/myri.png");
		background-size: 100% 100%;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		font-size: 13px;
		justify-content: space-between;
	}
	.cardbt{
		font-size: 14px;
		width: 340px;
		background-color: #fff;
		margin: 0 auto;
		margin-top: 10px;
		height: calc(100vh - 120px - var(--status-bar-height) - 86px - 40px - 50px - 40px - 130px - 60px - 60px);
		border-radius: 10px 10px 0 0;
	}
	.cardbt{
		color: rgba(112, 112, 112, 1);
		padding: 0 22px;
		box-sizing: border-box;
		.cardalls{
			padding: 18px 0;
			border-bottom: 1px solid rgba(240, 244, 250, 1);
		}
	}
</style>
