<template>
  <div class="contanier">
    <img src="@/assets/img/order/success.png" alt="" srcset="">
    <span>下单成功，请等待确认</span>
    <div class="btn" @click="finish">完成</div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const finish = () => {
  router.push({
    path: '/order/myOrder'
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.contanier{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img{
    margin-top: 150px;
    width: 110px;
    height: 110px;
  }
  span{
    margin-top: 10px;
    color: $color-101;
    font: $font16-400;
  }
  .btn{
    margin-top: 100px;
    width: 225px;
    height: 45px;
    border-radius: 23px;
    background: $btn-color-blue;
    color: $color-FFF;
    text-align: center;
    font: $font16-400;
    line-height: 45px;
  }
}
</style>