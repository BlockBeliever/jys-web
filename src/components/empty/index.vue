<template>
  <div class="empty">
    <img src="@/assets/img/empty/empty.png" alt="" srcset="">
    <span class="text">暂无数据</span>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 132px;
    height: 143px;
  }
  .text{
    margin-top: 10px;
    color: #7889A6;
    font: 400 13px PingFang SC-Bold, PingFang SC;
  }
}
</style>