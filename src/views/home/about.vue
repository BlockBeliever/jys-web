<!-- home -->
<template>
  <div class="about-container">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <h2>关于我 ... </h2>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      Toast('按钮')
    }
  }
}
</script>
<style lang="scss" scope>
.about-container {
  h2 {
    padding: 20px;
    font-size: 15px;
  }
}
</style>
