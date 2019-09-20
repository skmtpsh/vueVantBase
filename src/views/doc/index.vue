<template>
  <keep-alive>
    <van-skeleton
      title
      title-width="100%"
      :row="6"
      :loading="loading"
    >
      <component :is="currentComp"></component>
    </van-skeleton>
  </keep-alive>
</template>
<script>
export default {
  components: {
    ylbserverTag: () => import('./components/doc_ylb_server.vue')
  },
  data () {
    return {
      loading: true,
      currentComp: ''
    }
  },
  created () {
    // 测试协议，如写正式协议及时调整
    this.$toast.loading({
      mask: false,
      message: '加载中...'
    })
    setTimeout(() => {
      let loadTag = `${this.$route.query.dt}Tag`
      this.currentComp = loadTag
      this.loading = false
      this.$toast.clear()
    }, 300)
  }
}
</script>
