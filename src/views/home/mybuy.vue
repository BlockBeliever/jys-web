<template>
	<div>
		<div class="navbartitle">
			<van-nav-bar fixed :left-text="$t('back')" :safe-area-inset-top="true" :border="false" left-arrow
				@click-left="onClickLeft" />
		</div>
		<div class="namebuy" style="text-align: center;font-weight: 600;">
			<span style="font-size:15px;">{{ $t("to_buy") }}</span>
		</div>
		<div class="applycardall">
			<FormInput @update:modelValue="value => formData.name = value" :placeholder="$t('my_order.city')"
				:label="$t('my_order.business_name')" type="text" disabled />
			<FormInputWithDropdown @update:modelValue="value => formData.coin_name = value"
				:placeholder="$t('my_order.token_name')" :label="$t('my_order.token')" :chooseTypename="chooseCoinname"
				:typeList="cointypelist" :selectedIndex="selectedIndex"
				@change="(index, name) => selectedCoinType(index, name)" :showdown="showcoindown"
				@toggle-showdown="(identifier) => toggleShowdown(identifier)" :identifier="1" disabled hidden />

			<FormInput @update:modelValue="value => formData.number = value" :placeholder="$t('my_order.input_amount')"
				:label="$t('my_order.buy_amount')" type="text" />

			<FormInputWithDropdown @update:modelValue="value => formData.price = value"
				:placeholder="$t('my_order.input_price')" :label="$t('my_order.price')" :chooseTypename="chooseTypename"
				:typeList="paytypelist" :selectedIndex="selectedIndex"
				@change="(index, name) => selectedPriceType(index, name)" :showdown="showdown"
				@toggle-showdown="toggleShowdown" />

			<FormInput @update:modelValue="value => formData.contact = value" :placeholder="$t('my_order.c2c')"
				:label="$t('my_order.payment')" type="text" disabled />

			<div class="formitem">
				<span class="formname">{{ $t("range") }}</span>
				<div class="inputbox flex2">
					<input v-model="formData.low_price" :placeholder="$t('my_order.input_min_amount')" type="number">
					<span style="color: #7889A6;font-size: 20px;">——</span>
					<input v-model="formData.high_price" :placeholder="$t('my_order.input_max_amount')" type="number"
						style="padding-left: 30px;">
				</div>
			</div>
			<div class="submit" @click="submit">
				<span>{{ $t("my_order.publish") }}</span>
			</div>
			<div class="stats_bottom"></div>
		</div>
	</div>
</template>

<script>
import FormInput from '../../components/FormInput.vue'
import FormInputWithDropdown from '../../components/FormInputWithDropdown.vue'
let _this
export default {
	components: {
		FormInput,
		FormInputWithDropdown
	},
	data() {
		return {
			hobby: '',
			formData: {
				name: '',
				coin_name: '',
				coin_id: 0,
				price: '',
				number: '',
				price_type: '',
				low_price: '',
				high_price: '',
				type: "buy",
				contact: "",
				status: "enable"
			},
			merchant: {},
			chooseTypename: this.$t('my_order.select_currency'),
			chooseCoinname: this.$t('my_order.select_token'),
			selectedIndex: null,
			numtxt: 0,
			showdown: false,
			showcoindown: false,
			cointypelist: [],
			paytypelist: [
				{ name: 'CNY', },
				{ name: 'USD', }
			],
		}
	},
	mounted() {
		_this = this
		this.load()
		this.getcoinList()
	},
	methods: {
		getcoinList() {
			this.$api.coinList(this.filters).then((res) => {
				if (res.code == 0) {
					_this.cointypelist = res.data.coins
				}

			})
		},
		onClickLeft() {
			this.$router.go(-1)
		},
		load() {
			this.$api.myInfo().then((res) => {
				if (res.code == 0) {
					let data
					data = res.data.merchant
					// this.formData.price_type=data.pay_type
					this.formData.name = data.name
					this.formData.contact = data.pay_type
				}

			})
		},
		selectedCoinType(index, name) {
			this.selectedIndex = index
			this.chooseCoinname = name.toUpperCase()
			this.showcoindown = false
			this.formData.coin_name = name.toUpperCase()
			this.formData.coin_id = this.cointypelist[index].id
		},
		selectedPriceType(index, name) {
			this.selectedIndex = index
			this.chooseTypename = name
			this.showdown = false
			this.formData.price_type = name
		},
		toggleShowdown(identifier) {
			if (identifier == 1) {
				this.showcoindown = !this.showcoindown
				return
			}
			this.showdown = !this.showdown
		},
		sumfontnum(e) {
			this.numtxt = e.detail.value.length
		},
		submit() {
			const requiredFields = [
				{ field: 'coin_name', message: 'my_order.select_currency_name' },
				{ field: 'number', message: 'my_order.input_buy_amount' },
				{ field: 'price_type', message: 'my_order.select_currency_type' },
				{ field: 'price', message: 'my_order.input_price' },
				{ field: 'low_price', message: 'my_order.input_min_price' },
				{ field: 'high_price', message: 'my_order.input_max_price' },
			];

			for (const { field, message } of requiredFields) {
				if (this.formData[field] == '') {
					_this.$toast(_this.$t(message));
					return;
				}
			}
			let data = this.formData
			data.high_price = Number(data.high_price)
			data.low_price = Number(data.low_price)
			data.price = Number(data.price)
			data.number = Number(data.number)
			this.$api.submitBuy(data).then((res) => {
				if (res.code == 0) {
					_this.$toast(_this.$t('my_order.buy_success'))
					setTimeout(() => {
						this.$router.push({
							name: 'MyAd',

						})

					}, 400)
				} else {
					_this.$toast(this.$t(res.error))
				}

			})
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
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

.namebuy {
	padding: 13px 0;
	padding-top: 70px;
}

.applycardall {

	background-color: #fff;
	border-radius: 10px 10px 0 0;
	width: 340px;
	margin: 0 auto;
	height: calc(100vh - var(--status-bar-height));
	padding: 0 20px;
	box-sizing: border-box;
	overflow: auto;

	.formitem {
		padding: 15px 0;
		font-size: 14px;
		border-bottom: 1px solid #F0F4FA;
		position: relative;
	}

	.inputbox {

		color: rgba(16, 16, 16, 1);
		margin-top: 20px;

		input::-webkit-input-placeholder {
			color: rgba(207, 207, 207, 1);
		}

		input {
			border: none;
			font-size: 14px;
			width: 120px;
			background: #fff;
		}
	}
}

.submit {
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
