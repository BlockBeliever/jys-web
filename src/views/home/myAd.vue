<template>
	<div>
		<div class="navbartitle">
			<van-nav-bar :left-text="$t('back')" :safe-area-inset-top="true" :border="false" left-arrow
				@click-left="onClickLeft" />
		</div>
		<div style="text-align: center;padding: 13px 0;font-weight: 600;padding-top: 65px;">
			<span style="font-size: 15px;">{{ $t('my_ad') }}</span>
		</div>
		<van-list :loading="loading" :finished="finished" :finished-text="$t('no_more')" @load="getList">
			<div class="cardbox" v-for="(item, index) in list" :key="index">
				<div class="biaoqian">
					<img src="../../assets/img/mybuy.png" alt="" v-if="item.type == 'buy'">
					<img src="../../assets/img/maysale.png" alt="" v-if="item.type == 'sell'">
				</div>
				<div class="fontname">
					<span>{{ $t("my_advertising.adv_number") }}{{ item.id }}</span>
					<span style="color: #2E6BDB;font-size: 12px;font-weight: 600;" v-if="item.status == 'enable'">{{
				$t("my_advertising.on_shelf") }}</span>
					<span style="color:rgba(209, 209, 209, 1);font-size: 12px;font-weight: 600;" v-else>{{
				$t("my_advertising.off_shelf") }}</span>
				</div>
				<div class="pricead">
					<div>
						<span>{{ item.price }}</span>
						<span style="font-size: 12px;" v-if="item.price_type == 'CNY'">￥</span>
						<span style="font-size: 12px;" v-else>$</span>
					</div>
					<div class="boxtype">
						{{ item.en_name.toUpperCase() }}
					</div>
				</div>
				<div class="detialcard">
					<div class="addetail" style="color:rgba(120, 137, 166, 1)">
						<span>{{ $t("quantity") }}</span>
						<span style="padding-left: 8px;">{{ item.number }} {{ item.en_name.toUpperCase() }}</span>
					</div>
					<div class="addetail">
						<span style="color:rgba(120, 137, 166, 1)">{{ $t("range") }} </span>
						<span style="padding-left: 8px;color: #333333;">{{ item.low_price }}-{{ item.high_price }}
							{{ item.price_type.toUpperCase() }}</span>
					</div>
					<div class="addetail">
						<span style="color:rgba(120, 137, 166, 1)">{{ $t("payment_method") }}</span>
						<span style="padding-left: 8px;color: #333333;">{{ item.contact }}</span>
					</div>

				</div>
				<div class="btncaozuo">
					<div class="downall" @click="downStatus(item.id, 'disable')" v-if="item.status == 'enable'">{{
				$t("my_advertising.off") }}</div>
					<div class="downall" @click="downStatus(item.id, 'enable')" v-else>{{ $t("my_advertising.on") }}
					</div>
					<div class="delall" @click="delAd(item.id)">{{ $t("my_advertising.delete") }}</div>
				</div>
			</div>
		</van-list>
		<div class="listnone" v-if="list.length == 0">
			<div class="imgiconbox">
				<img src="../../assets/img/indexnonw.png" alt="" srcset="">
			</div>
			<div style="padding-top: 12px;"><span>{{ $t('empty_exchange_list') }}</span></div>
			<div style="padding: 12px;"><span>{{ $t('empty_exchange_list_label') }}</span></div>
		</div>
		<div class="stats_bottom"></div>
	</div>
</template>

<script>
let _this
export default {
	data() {
		return {
			loading: false,
			finished: false,
			filters: {
				page: 1,
				limit: 10,
			},
			list: []
		}
	},
	mounted() {
		_this = this
		// this.getList()
	},
	methods: {
		onClickLeft() {
			this.$router.push({ name: 'About' })
		},
		delAd(id) {
			this.$api.delAd({ id: id }).then((res) => {
				if (res.code == 0) {
					_this.$toast(_this.$t("my_advertising.delete_success"))
					this.getList()
				} else {
					_this.$toast(this.$t(res.error))
				}

			})
		},
		downStatus(id, val) {
			let data = {
				id: id,
				status: val
			}
			this.$api.upAd(data).then((res) => {
				if (res.code == 0) {
					if (val == 'enable') {
						_this.$toast(_this.$t("my_advertising.on_shelf_success"))
					} else {
						_this.$toast(_this.$t("my_advertising.off_shelf_success"))
					}
					this.getList()
				} else {
					_this.$toast(this.$t(res.error))
				}

			})
		},
		getList() {
			this.$api.adList(_this.filters).then((res) => {
				if (res.code == 0) {
					let all = res.data.list
					this.loading = false;
					if (all.length == 10) {
						this.filters.page = Number(this.filters.page) + 1
						// this.finished = true;
						all.forEach(item => {
							_this.list.push(item)

						})
					} else if (all.length < 10 && !this.finished) {
						this.finished = true;
						all.forEach(item => {
							_this.list.push(item)
						})

					}
				} else {
					_this.$toast(this.$t(res.error))
				}

			})
		},
	}
}
</script>

<style lang="scss" scoped>
.page {
	background: linear-gradient(180deg, rgba(247, 250, 255, 1) 0%, rgba(247, 250, 255, 1) 100%);
}

.listnone {
	display: flex;
	flex-direction: column;
	font-size: 13px;
	color: rgba(120, 137, 166, 1);
	align-items: center;

	.imgiconbox {
		margin: 0 auto;
		margin-top: 42px;

		width: 132px;
		height: 144px;

		img {
			width: 100%;
			height: 100%;
		}
	}
}

.navbartitle {
	color: rgba(16, 16, 16, 1);
	width: 100%;
	height: 45px;
	opacity: 1;
	background: linear-gradient(180deg, rgba(46, 107, 219, 1) 0%, rgba(85, 136, 220, 1) 100%);
	position: fixed;
	z-index: 100;
}

.cardbox {

	padding: 19px 20px;
	background-color: #fff;
	border-radius: 10px;
	width: 340px;
	box-sizing: border-box;
	margin: 0 auto;
	margin-bottom: 10px;
	box-shadow: 0px 5px 8px 0px #E6ECF7;
	position: relative;

	.biaoqian {
		position: absolute;
		width: 50px;
		height: 50px;
		z-index: 99;
		left: 0px;
		top: 0;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.fontname {
		font-size: 11px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 9px;
		border-bottom: 1px solid #F0F4FA;
	}

	.pricead {
		font-size: 23px;
		font-weight: 700;
		padding-top: 13px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.boxtype {
		width: 58px;
		height: 18px;
		opacity: 0.3;
		border-radius: 17.5px;
		color: #fff;
		font-size: 19px;
		text-align: center;
		line-height: 19px;
		font-weight: 300;
		background: rgba(120, 137, 166, 1);
	}

	.detialcard {
		padding-top: 5px;
		border-bottom: 1px solid #F0F4FA;
		padding-bottom: 15px;
	}

	.addetail {
		font-size: 12px;
		color: #808080;
	}

	.btncaozuo {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;

		.downall {
			width: 84px;
			height: 35px;
			border-radius: 18px;
			border: 1px solid #D1D1D1;
			font-size: 14px;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.delall {
			margin-left: 15px;
			width: 84px;
			height: 35px;
			border-radius: 18px;
			border: 1px solid #FC4D2A;
			color: #FC4D2A;
			font-size: 14px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
