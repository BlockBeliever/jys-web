<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import './api/index.js' // 导入api

export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload //提供数据
    }
  },
  data() {
    return {
      isRouterAlive:true,
    }
  },
	 created(){
			// if(this.$route.query.code){
			// 	this.getAuther(this.$route.query.code)
			// }else if(localStorage.getItem('code')){
			// 		this.getAuther(localStorage.getItem('code'))
			// }
			// 	// setTimeout(()=>{
				// 	this.getAuther(localStorage.getItem('code'))
				// },1000)
			// let code='MZM0NMY5ZWQTNDMWNY0ZNDKZLTLKYZCTM2FLOWMWNGZIZTC3'	
		    // this.getAuther(localStorage.getItem('code'))
		},
		methods: {
			// reload(){
			// this.isRouterAlive=false
			// this.$nextTick(()=>{
			// 	this.isRouterAlive=true
			// 	// console.log("确实刷新了")
			// })
			// },

			getAuther(code){
				this.$api.getAuther({code:code}).then((res)=>{
					let access=res.data.auth.access
					localStorage.setItem('token',access)
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
		padding-bottom: 40px;
	}
</style>
