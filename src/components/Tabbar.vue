<template>
  <van-tabbar class="tabbar" route active-color="#4281F5" inactive-color="#C5CAD4">
    <template v-for="item in tabbar" :key="item.path">
      <van-tabbar-item replace :to="item.path" :name="item.meta.title">
        <span>{{ item.meta.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.meta.active_icon : item.meta.icon" />
        </template>
      </van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<script setup lang="ts">
import { tabbar } from '@/router'
</script>

<style lang="scss" scoped>
.tabbar{
  height: 56px;
  z-index: 9999;
}
</style>
