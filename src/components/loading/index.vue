<template>
    <van-overlay :show="loadingShow" style="display: flex; align-items: center; justify-content: center;z-index:999">
        <van-loading type="spinner" color="#1989fa" />
    </van-overlay>
</template>

<script lang="ts" setup>
const props = defineProps<{ loadingShow: boolean }>()
</script>