<template>
	<div>
		<div class="navbartitle">
			<van-nav-bar :left-text="$t('back')" :safe-area-inset-top="true" :border="false" left-arrow
				@click-left="onClickLeft" />
		</div>
		<div style="text-align: center;padding: 13px 0;font-weight: 600;padding-top: 30px;">
			<span style="font-size: 16px;">{{ $t('apply_merchant') }}</span>
		</div>

		<div class="listnone" v-if="status == 'apply'">
			<div class="imgiconbox">
				<img src="../../assets/img/statusapply.png" alt="" srcset="">
			</div>
			<div style="padding-top: 24px;"><span>{{ $t('my_advertising.submitted') }}【{{ formData.merchant_name }}】
					<p style="color: rgba(46, 107, 219, 1);display: inline-block;">{{ $t('my_advertising.pending') }}
					</p>
				</span>
			</div>
			<div style="padding-top: 5px;"><span>{{ $t('my_advertising.waiting') }}</span></div>
		</div>
		<div class="listnone" v-if="status == 'agree'">
			<div class="imgiconbox">
				<img src="../../assets/img/statusapply.png" alt="" srcset="">
			</div>
			<div style="padding-top: 24px;"><span>{{ $t('my_advertising.submitted') }}【{{ formData.merchant_name }}】
					<p style="color: rgba(46, 107, 219, 1);display: inline-block;">{{ $t('my_advertising.approved') }}
					</p>
				</span>
			</div>
			<div style="padding-top: 5px;"><span>{{ $t('my_advertising.to_start') }}</span></div>
		</div>

		<div class="listnone" v-if="status == 'refuse'">
			<div class="imgiconbox">
				<img src="../../assets/img/statusapply.png" alt="" srcset="">
			</div>
			<div style="padding-top: 24px;"><span>{{ $t('my_advertising.submitted') }}【{{ formData.merchant_name }}】
					<p style="color: rgba(240, 38, 69, 1);display: inline-block;">{{ $t('my_advertising.rejected') }}
					</p>
				</span>
			</div>
			<div style="padding-top: 5x;"><span>{{ $t('my_advertising.rejected_reason') }}{{ reason }}</span></div>

			<div class="bluesubmit" @click="status = 'again'">
				<span>{{ $t('my_advertising.reapply') }}</span>
			</div>

		</div>

		<div class="applycardall" v-if="status == 'again' || status == ''">
			<FormInput @update:modelValue="value => formData.name = value" :placeholder="$t('my_order.identity')"
				:label="$t('my_order.identity')" type="text" disabled />
			<FormInput @update:modelValue="value => formData.merchant_name = value"
				:placeholder="$t('my_advertising.input_name')" :label="$t('my_order.business_name')" type="text" />
			<FormInput @update:modelValue="value => formData.pay_type = value"
				:placeholder="$t('my_advertising.input_method')" :label="$t('my_order.payment')" type="text" />
			<div class="formitem">
				<span class="formname">{{ $t("advertising_detail.message") }}</span>
				<div class="inputboxeara">
					<div class="editiconimg">
						<img src="../../assets/img/addtxt.png" alt="" srcset="">
					</div>
					<div>
						<textarea name="" id="" cols="30" rows="10" placeholder-style="font-size: 26px;"
							:placeholder="$t('my_order.input_message')" class="sear" maxlength="300" @input="sumfontnum"
							v-model="formData.msg" style="color: rgba(200, 200, 200, 1);"></textarea>
					</div>
					<div style="float: right;color: #7889A6;margin-top: 10px">{{ numtxt }}/300</div>
				</div>
				<div class="submit" @click="submit" v-if="status == ''">
					<span>{{ $t("my_advertising.confirm") }}</span>
				</div>
				<div class="submit" @click="replysubmit" v-if="status == 'again'">
					<span>{{ $t("my_advertising.confirm") }}</span>
				</div>
				<div class="stats_bottom"></div>
			</div>
		</div>
	</div>
</template>

<script>
import FormInput from '../../components/FormInput.vue'
let _this
export default {
	components: {
		FormInput
	},
	data() {
		return {
			hobby: '',
			formData: {
				name: '',
				merchant_name: '',
				msg: '',
				pay_type: '',
			},
			numtxt: 0,
			status: "",
			reason: ""
		}
	},
	mounted() {
		_this = this
		this.getInfo()
	},
	methods: {
		onClickLeft() {
			this.$router.push({ name: 'Home' })
		},
		sumfontnum(e) {
			this.numtxt = this.formData.msg.length
		},
		getInfo() {
			this.$api.merchantInfo().then((res) => {
				if (res.code == 0) {
					this.formData.merchant_name = res.data.info.merchant_name
					this.formData.msg = res.data.info.msg
					this.formData.pay_type = res.data.info.pay_type
					this.status = res.data.info.status
					this.reason = res.data.info.reason
				}

			})
		},
		handleFormSubmission() {
			const requiredFields = [
				{ field: 'merchant_name', message: 'my_advertising.input_business_name' },
				{ field: 'pay_type', message: 'my_advertising.input_method' },
				{ field: 'msg', message: 'my_advertising.input_message' }
			];

			for (const { field, message } of requiredFields) {
				if (this.formData[field] === '') {
					this.$toast(this.$t(message));
					return false;
				}
			}
			return true;
		},
		replysubmit() {
			if (this.handleFormSubmission()) {
				this.$api.sumbmitReplyMerchan(this.formData).then((res) => {
					if (res.code == 0) {
						_this.$toast(_this.$t('my_advertising.reapply_success'))
						setTimeout(() => {
							this.getInfo()
							// uni.navigateBack({
							// 	delta: 1
							// })
						})
					} else {
						_this.$toast(this.$t(res.error))
					}
				})
			}
		},
		submit() {
			if (this.handleFormSubmission()) {
				this.$api.sumbmitMerchan(this.formData).then((res) => {
					if (res.code == 0) {
						_this.$toast(_this.$t('my_advertising.apply_success'))
						setTimeout(() => {
							this.getInfo()
							// this.$router.go(-1)
							// uni.navigateBack({
							// 	delta: 1
							// })
						})
					} else {
						_this.$toast(this.$t(res.error))
					}

				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
page {
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
		margin-top: 85px;

		width: 150px;
		height: 135px;

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

}

.applycardall {
	background-color: #fff;
	border-radius: 10px 10px 0 0;
	width: 90%;
	margin: 0 auto;
	height: calc(100vh - 40px - 75px);
	padding: 0 20px;
	box-sizing: border-box;
	overflow: auto;

	.formitem {
		padding: 15px 0;
		font-size: 12px;
		border-bottom: 1px solid #F0F4FA;
	}
}

.inputboxeara {
	margin-top: 12px;
	background-color: #F7FAFF;
	height: 298px;
	padding: 15px;
	box-sizing: border-box;
	position: relative;
	border-radius: 10px;
	left: 0;
	top: 0;

	textarea::-webkit-input-placeholder {
		color: rgba(207, 207, 207, 1);
	}

	textarea {
		border: none;
		background: transparent;
		color: rgba(200, 200, 200, 1);
		;
	}

	// display: flex;
	.editiconimg {
		width: 12px;
		height: 15px;
		position: absolute;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.sear {
		padding-left: 20px;
		margin-top: -2px;
		font-size: 13px;
		box-sizing: border-box;
		color: #C8C8C8;
		width: 273px;
		height: 240px;
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
	margin-top: 100px;
	margin-bottom: 30px;
}

.bluesubmit {
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
	margin-top: 120px;
	margin-bottom: 30px;
}
</style>
