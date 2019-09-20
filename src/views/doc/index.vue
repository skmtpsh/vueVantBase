<template>
  <keep-alive>
    <component :is="currentComp"></component>
  </keep-alive>
</template>
<script>
export default {
  components: {
    serverTag: () => import('./components/doc_server.vue')
  },
  data () {
    return {
      currentComp: 'serverTag'
    }
  },
  created () {
    // 测试协议，如写正式协议及时调整
    this.$toast.loading({
      mask: false,
      message: '加载中...'
    })
    setTimeout(() => {
      let loadTag = `${this.$route.query.doc}Tag`
      this.currentComp = loadTag
      this.$toast.clear()
    }, 300)
  }
}
</script>
