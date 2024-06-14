<template>
  <div class="container">
    <van-pull-refresh  v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :immediate-check="false" :finished="finished" :finished-text="'没有更多了'"
        @load="onLoad">
        <AdCard v-for="item in adList" :data="item" @refresh="onRefresh"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { myAdvertisement } from "@/api/advertisement";
import AdCard from "@/components/advertisement/components/adCard.vue";
import { showToast } from "vant";
onActivated(() => {
  onRefresh()
})
// 加载分页数据
const adList = ref([] as any);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const params = {
  page_num: 1,
  limit: 10,
}
const onLoad = async () => {
  const { code, data } = await myAdvertisement(params)
  if (code !== 0) {
    showToast('加载失败！')
    return
  }
  if (refreshing.value) {
    adList.value = []
    refreshing.value = false
  }
  data.list && data.list.forEach((item: any) => {
    adList.value.push(item)
  });
  // showEmpty.value = recordList.value.length ? false : true
  loading.value = false
  params.page_num++
  if (adList.value.length >= data.count) {
    finished.value = true
  }
};

const onRefresh = () => {
  params.page_num = 1
  finished.value = false
  loading.value = true
  refreshing.value = true
  onLoad()
};

</script>

<style lang="scss" src="./scss/myAd.scss" scoped>

</style>