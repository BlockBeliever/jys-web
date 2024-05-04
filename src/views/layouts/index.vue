<template>
  <div class="container">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
      <!-- tabBar -->
      <TabBar :data="tabbars" @change="handleChange" v-if="$route.meta.showTab" />

  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: this.$t('home'),
          to: {
            name: 'Home'
          },
          icon: 'home-o'
        },
        {
          title: this.$t('transaction_order'),
          to: {
            name: 'List'
          },
          icon: 'newspaper-o'
        },
        {
          title: this.$t('profile'), // 菜单标题
          to: {
            name: 'About'
          },
          icon: 'user-o'
        }
      ]
    }
  },
  components: {
    TabBar
  },
  methods: {
    handleChange(v) {
    }
  }
}
</script>
