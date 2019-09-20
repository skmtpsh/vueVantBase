<template>
<div>
  <!-- <van-nav-bar
    class="navBar"
    left-arrow
    text="协议"
    @click-left="handleBackHome"
  /> -->
  <div class="docPage mglr0">
    <van-collapse v-model="activeNames" :border="false">
      <van-collapse-item title="什么是服务费预先支付？" name="1">
        <p>服务费预先支付指平台审核通过后，用户需先支付服务费费用。服务费支付成功后，我司将主动放款并提醒用户提现。</p>
        <p>用户正常还款时仅需还款借款金额及产生的息费，无需另行支付服务费等其他费用。</p>
      </van-collapse-item>
      <van-collapse-item title="什么是服务费还款时支付？" name="2">
        <p>服务费还款时支付指平台审核通过后直接放款给用户，不在借款审批流程中预先支付服务费费用。</p>
        <p>用用户正常还款时除支付应还本息之外，还需支付服务费费用。</p>
      </van-collapse-item>
      <van-collapse-item title="预先支付比还款时支付有何好处？" name="3">
        <p>借款预先支付与还款时支付为我司开设的两种不同借款方式，配置不同审核通道及审核人员。
故预先支付方式整体审核时间更短，放款速度更快，通道配置审核人员更多，且预先支付服务费一般小于还款时支付服务费。</p>
        <p>预先支付无构成逾期行为，还款时支付若按期未支付，将会计算服务费相应的逾期罚息。</p>
      </van-collapse-item>
    </van-collapse>
  </div>
  </div>
</template>
<script>
export default {
  name: 'ylbserverTag',
  data () {
    return {
      activeNames: ['1']
    }
  },
  methods: {
    handleBackHome () {
    }
  }
}
</script>
