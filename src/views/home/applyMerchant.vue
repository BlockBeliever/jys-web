<template>
	<div>
		<div class="navbartitle">
			<!-- <div class="status_bar"></div> -->
			<!-- <uni-nav-bar leftIcon="back" @clickLeft="back" left-span="交易所" :border="false" statusBar="true"
				backgroundColor="transparent" color="#fff" :leftWidth="90"></uni-nav-bar> -->
			<van-nav-bar :left-text="$t('back')" :safe-area-inset-top="true" :border="false" left-arrow
				@click-left="onClickLeft" />
		</div>
		<div style="text-align: center;padding: 13px 0;font-weight: 600;padding-top: 30px;">
			<span style="font-size: 16px;">{{ $t('apply_merchant')}}</span>
		</div>

		<div class="listnone" v-if="status == 'apply'">
			<div class="imgiconbox">
				<img src="../../assets/img/statusapply.png" alt="" srcset="">
			</div>
			<div style="padding-top: 24px;"><span>{{ $t('my_advertising.submitted')}}【{{ formData.merchant_name }}】<p
						style="color: rgba(46, 107, 219, 1);display: inline-block;">申请正在</p></span></div>
			<div style="padding-top: 5px;"><span>请耐心等待审核结果！</span></div>
		</div>
		<div class="listnone" v-if="status == 'agree'">
			<div class="imgiconbox">
				<img src="../../assets/img/statusapply.png" alt="" srcset="">
			</div>
			<div style="padding-top: 24px;"><span>{{ $t('my_advertising.submitted')}}【{{ formData.merchant_name }}】<p
						style="color: rgba(46, 107, 219, 1);display: inline-block;">{{ $t('my_advertising.approved') }}</p></span></div>
			<div style="padding-top: 5px;"><span>{{ $t('my_advertising.to_start') }}</span></div>
		</div>

		<div class="listnone" v-if="status == 'refuse'">
			<div class="imgiconbox">
				<img src="../../assets/img/statusapply.png" alt="" srcset="">
			</div>
			<div style="padding-top: 24px;"><span>{{ $t('my_advertising.submitted')}}【{{ formData.merchant_name }}】<p
						style="color: rgba(240, 38, 69, 1);display: inline-block;">未通过审核</p></span></div>
			<div style="padding-top: 5x;"><span>被拒原因：{{ reason }}</span></div>

			<div class="bluesubmit" @click="status = 'again'">
				<span>重新申请</span>
			</div>

		</div>

		<div class="applycardall" v-if="status == 'again' || status == ''">
			<div class="formitem">
				<span class="formname">商家身份</span>
				<div class="inputbox">
					<input type="text" v-model="formData.name" placeholder="发布广告"
						placeholder-style="color:#7889A6;font-size:26px" disabled="true">
				</div>
			</div>
			<div class="formitem">
				<span class="formname">商家名称</span>
				<div class="inputbox">
					<input type="text" v-model="formData.merchant_name" placeholder="请输入商家名称"
						placeholder-style="color:rgba(200, 200, 200, 1);font-size:26px">
				</div>
			</div>
			<div class="formitem">
				<span class="formname">交易方式</span>
				<div class="inputbox">
					<input type="text" v-model="formData.pay_type" placeholder="请输入交易方式"
						placeholder-style="color:rgba(200, 200, 200, 1);font-size:26px">
				</div>
			</div>
			<div class="formitem">
				<span class="formname">商家留言</span>
				<div class="inputboxeara">
					<div class="editiconimg">
						<img src="../../assets/img/addtxt.png" alt="" srcset="">
					</div>
					<div>
						<textarea name="" id="" cols="30" rows="10" placeholder-style="font-size: 26px;"
							placeholder="请输入留言内容" class="sear" maxlength="300" @input="sumfontnum"
							v-model="formData.msg" style="color: rgba(200, 200, 200, 1);"></textarea>
					</div>
					<div style="float: right;color: #7889A6;margin-top: 10px">{{ numtxt }}/300</div>
				</div>
				<div class="submit" @click="submit" v-if="status == ''">
					<span>确定</span>
				</div>
				<div class="submit" @click="replysubmit" v-if="status == 'again'">
					<span>确定</span>
				</div>
				<div class="stats_bottom"></div>
			</div>
		</div>
	</div>
</template>

<script>
let _this
export default {
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
			// _this.$post('/api/user/merchant/info',{

			// 	success: (res)=>{
			// 		if(res.code==0){
			// 			this.formData.merchant_name=res.data.info.merchant_name
			// 			this.formData.msg=res.data.info.msg
			// 			this.formData.pay_type=res.data.info.pay_type
			// 			this.status=res.data.info.status
			// 			this.reason=res.data.info.reason
			// 		}
			// 	},
			// 	error:(err)=>{
			// 		_this.$toast("err")
			// 	},
			// 	},
			// )
		},
		replysubmit() {
			if (this.formData.merchant_name == '') {
				_this.$toast('请输入商家名')
				return
			}

			if (this.formData.pay_type == '') {
				_this.$toast('请输入交易方式')
				return
			}
			if (this.formData.msg == '') {
				_this.$toast('请输入商留言')
				return
			}
			this.$api.sumbmitReplyMerchan(this.formData).then((res) => {
				if (res.code == 0) {
					_this.$toast("重新申请成功")
					setTimeout(() => {
						this.getInfo()
						// uni.navigateBack({
						// 	delta: 1
						// })
					})
				} else {
					_this.$toast(res.error)
				}

			})

			// _this.$post('/api/user/merchant/reapply', {
			// 	data: this.formData,
			// 	success: (res) => {
			// 		if (res.code == 0) {
			// 			_this.$toast("新增成功")
			// 			setTimeout(() => {
			// 				uni.navigateBack({
			// 					delta: 1
			// 				})
			// 			})
			// 		}else{
			// 			console.log(res)
			// 			_this.$toast(res.error)
			// 		}
			// 	},
			// 	error: (err) => {
			// 		_this.$toast(err.error)
			// 	},
			// }, )
		},
		submit() {
			if (this.formData.merchant_name == '') {
				_this.$toast('请输入商家名')
				return
			}

			if (this.formData.pay_type == '') {
				_this.$toast('请输入交易方式')
				return
			}
			if (this.formData.msg == '') {
				_this.$toast('请输入商留言')
				return
			}
			this.$api.sumbmitMerchan(this.formData).then((res) => {
				if (res.code == 0) {
					_this.$toast("申请成功")
					setTimeout(() => {
						this.getInfo()
						// this.$router.go(-1)
						// uni.navigateBack({
						// 	delta: 1
						// })
					})
				} else {
					_this.$toast(res.error)
				}

			})

			// _this.$post('/api/user/merchant/apply', {
			// 	data: this.formData,
			// 	success: (res) => {
			// 		if (res.code == 0) {
			// 			_this.$toast("新增成功")
			// 			setTimeout(() => {
			// 				uni.navigateBack({
			// 					delta: 1
			// 				})
			// 			})
			// 		}else{
			// 			console.log(res)
			// 			_this.$toast(res.error)
			// 		}
			// 	},
			// 	error: (err) => {
			// 		_this.$toast(err.error)
			// 	},
			// }, )
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

	.inputbox {
		// color: rgba(200, 200, 200, 1);
		margin-top: 10px;

		input::-webkit-input-placeholder {
			color: rgba(207, 207, 207, 1);
		}

		input {
			border: none;
			font-size: 14px;
			width: 120px;
			color: rgba(200, 200, 200, 1);
			background: #fff;
		}
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
