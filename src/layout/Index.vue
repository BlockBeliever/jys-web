<template>
  <div class="t-layout">
    <van-nav-bar :fixed="true" v-show="route.meta.isNav" :title="(route.meta.title as string)" :border="false" @click-left="onClickLeft">
      <template #left>
        <van-icon  name="arrow-left" size="18" color="black" />
      </template>
    </van-nav-bar>
    <div :class="(!route.meta.isTab && route.meta.isNav) ? 'mt50' : ''">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <tabbar v-show="route.meta.isTab" class="footer" />
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

const route = useRoute()

const onClickLeft = () => {
  if (route.meta.backTo) {
    console.log("onClickLeft ===============================> router.push(route.meta.backTo)")
    router.push(route.meta.backTo)
  } else if (window.history.length > 1) {
    console.log("onClickLeft ===============================> history.go(-1)")
    // history.go(-1)
    router.back();
  } else {
    console.log("onClickLeft ===============================> fallback to home")
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.t-layout{
  --van-nav-bar-background: linear-gradient(180deg, #2E6BDB 0%, #5588DC 100%);
  --van-nav-bar-title-text-color: #FFFFFF !important;
  --van-nav-bar-icon-color: #FFFFFF !important;

  :deep(.van-icon-arrow-left){
    color: #FFFFFF !important;
  }
}
.mt50{
  margin-top: 45px;
}
</style>
