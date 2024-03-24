<template>
	<div class="body">
		<div class="navbartitle">
			<!-- <div class="status_bar"></div> -->
			<!-- <uni-nav-bar left-text="我的" :border="false" statusBar="true" backgroundColor="transparent" color="#fff"></uni-nav-bar> -->
			<van-nav-bar fixed :left-text="$t('exchange')" :safe-area-inset-top="true" :border="false" />
		</div>
		<div class="cardin">
			<div class="flex1">
				<div class="myheadbox" v-if="account.head">
					<!-- <img src="../../assets/img/head.png" alt="" srcset="" v-if="!account.head"> -->
					<img :src="$IMGURL + account.head" alt="" srcset="">
				</div>
				<span style="font-size:16px;color: rgba(16, 16, 16, 1);padding-left: 7px;">{{ account.name }}</span>
			</div>
			<div class="flex2">
				<div class="cardbuy" @click="moveBuy">
					<span style="font-weight: 600;font-size: 13px;">{{ $t("to_buy") }}</span>
					<span style="color: rgba(254, 66, 74, 1);font-size: 11px;">{{ $t("profile_detail.free_money") }}</span>
				</div>
				<div class="cardsale" @click="moveSale">
					<span style="font-weight: 600;font-size: 13px;">{{ $t("profile_detail.to_sell") }}</span>
					<span style="color: rgba(254, 66, 74, 1);font-size: 11px;">{{ $t("profile_detail.easy_to_sell") }}</span>
				</div>
			</div>
		</div>
		<div class="cardbt">
			<div class="cardalls flex2" @click="moveAd()">
				<span>{{ $t("my_ad") }}</span>
				<van-icon name="arrow" />
				<!-- <uni-icons type="forward" color="#CFCFCF" size="14"></uni-icons> -->
			</div>
			<div class="cardalls flex2" @click="applySupplier">
				<span>{{ $t("apply_merchant") }}</span>
				<van-icon name="arrow" />
				<!-- <uni-icons type="forward" color="#CFCFCF" size="14"></uni-icons> -->
			</div>
			<!-- <div class="cardalls flex2">
				<span>退出登录</span>
        <van-icon name="arrow" />
				<uni-icons type="forward" color="#CFCFCF" size="14"></uni-icons>
			</div> -->
		</div>
		<TabBar :data="tabbars" @change="handleChange" />
	</div>
</template>

<script>

import TabBar from '@/components/TabBar'
export default {
	components: {
		TabBar
	},
	data() {
		return {
			tabbars: [
				{
					title: this.$t('home'),
					to: {
						name: 'Home'
					},
					icon: 'home-o'
				},
				{
					title: this.$t('transaction_order'),
					to: {
						name: 'List'
					},
					icon: 'newspaper-o'
				},
				{
					title: this.$t('profile'), // 菜单标题
					to: {
						name: 'About'
					},
					icon: 'user-o'
				}
			],
			path: "",
			status: '',
			account: {},
			$IMGURL: ''
		}
	},
	created() {
		this.$IMGURL = process.env.VUE_APP_IMGURL
		this.getInfo()
	},
	methods: {
		cover(val) {
			let arr = val.split("/")
			if (arr[0] == "http:" || arr[0] == "https:") {
				return val
			} else {
				if (val.indexOf("thumb2.jpg") != -1) {
					return this.$IMGURL + '/' + val
				} else {
					return this.$IMGURL + val
				}
			}
		},
		handleChange(v) {
			console.log('tab value:', v)
		},
		getInfo() {
			this.$api.getAccount().then((res) => {
				if (res.code == 0) {
					this.account = res.data.user
				}
			})
			this.$api.merchantInfo().then((res) => {
				if (res.code == 0) {
					this.status = res.data.info.status
				}
			})
		},
		moveAd() {
			this.$router.push({
				name: 'MyAd',
			})
			// uni.navigateTo({
			// 	url:"/pages/myAd/myAd"
			// })
		},
		moveBuy() {
			if (this.status == '') {
				this.$toast("请申请成为商家")
			} else if (this.status == 'agree') {
				this.$router.push({
					name: 'Mybuy',
				})
			} else if (this.status == 'refuse') {
				this.$toast("申请被拒绝，请重新申请")
			}

			// uni.navigateTo({
			// 	url:"/pages/mybuy/mybuy"
			// })
		},
		applySupplier() {
			this.$router.push({
				name: 'ApplyMerchant',
			})
			// uni.navigateTo({
			// 	url:"/pages/applyMerchant/applyMerchant"
			// })
		},
		moveSale() {
			if (this.status == '') {
				this.$toast("请申请成为商家")
			} else if (this.status == 'agree') {
				this.$router.push({
					name: 'Mysale',
				})
			} else if (this.status == 'refuse') {
				this.$toast("申请被拒绝，请重新申请")
			}

			// uni.navigateTo({
			// 	url:"/pages/mysale/mysale"
			// })
		}
	}
}
</script>

<style lang="scss" scoped>
.body {
	box-sizing: border-box;

}

.navbartitle {
	color: rgba(16, 16, 16, 1);
	width: 100%;
	height: 60px;
	opacity: 1;
	background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);

}

.cardin {
	// width:340px;
	width: 90%;
	margin: 10px 15px;
	// box-sizing: border-box;
	box-sizing: border-box;
	border-radius: 10px;
	margin: 0 auto;
	margin-top: 15px;
	padding: 15px 20px;
	background-color: #fff;
}

.myheadbox {
	width: 43px;
	height: 43px;
	border-radius: 50%;
	overflow: hidden;

	img {
		// width: 100%;
		height: 100%;
	}
}

.cardbuy {
	width: 48%;
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

.cardsale {
	width: 48%;
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

.cardbt {
	font-size: 14px;
	width: 90%;
	background-color: #fff;
	margin: 0 auto;
	margin-top: 10px;
	height: calc(100vh - 120px - var(--status-bar-height) - 86px - 40px - 50px - 40px - 130px - 60px - 60px);
	border-radius: 10px 10px 0 0;
}

.cardbt {
	color: rgba(112, 112, 112, 1);
	padding: 0 22px;
	box-sizing: border-box;

	.cardalls {
		padding: 18px 0;
		border-bottom: 1px solid rgba(240, 244, 250, 1);
	}
}
</style>
