<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import './api/index.js' // 导入api

export default {
  name: 'App',
 
		created(){
			// if(this.$route.query.code){
			// 	this.getAuther(this.$route.query.code)
			// 	}else if(localStorage.getItem('code')){
			// 		this.getAuther(localStorage.getItem('code'))
			// 	}
			// 	setTimeout(()=>{
			// 		this.getAuther(localStorage.getItem('code'))
			// 	},500)
			let code='OTE4YJK3MDCTYTHLNS0ZMTKWLTKZYZITMWMXYWY4Y2YZZJQ0'	
			this.getAuther(code)
		},
		methods: {
			getAuther(code){
				console.log(code,9988888888)
				this.$api.getAuther({code:code}).then((res)=>{
					localStorage.setItem('token',res.data.auth.access)
				})
			},
		}
}
</script>
<style lang="scss">
body {
	background: linear-gradient(180deg, rgba(247, 250, 255, 1) 0%, rgba(247, 250, 255, 1) 100%);
}
.van-icon-arrow-left:before{
	color: #fff;
}
.van-nav-bar{
	background: transparent;
	
}
.van-nav-bar__text{
	color: #fff;
}
.form-item {
  .label {
    margin: 10px 16px 5px;
    color: #990030;
    font-size: 14px;
  }
}
.page-box {
  height: 89vh;
  padding: 10px;
  .container {
    padding-bottom: 60px;
  }
}
.flex{
		display: flex;
	}
	.flex1{
		display: flex;
		align-items: center;
	}
	.flex2{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.flex3{
		display: flex;
		align-items: center;
	}
	.flex4{
		display: flex;
		flex-direction: column;
	}
	.status_bar{
		height: var(--status-bar-height);
		width: 100%;
	}
	.stats_bottom{
		padding-bottom: 50px;
	}
</style>
