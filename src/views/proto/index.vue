<template>
  <keep-alive>
    <component :is="currentComp"></component>
  </keep-alive>
</template>
<script>
export default {
  components: {
    authTag: () => import('./components/proto_auth.vue')
  },
  data () {
    return {
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
      let loadTag = `${this.$route.query.proto}Tag`
      this.currentComp = loadTag
      this.$toast.clear()
    }, 300)
  }
}
</script>
