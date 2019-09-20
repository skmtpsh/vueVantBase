import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'

async function ajx (apiUrl, data = {}, v = 'v1.1') {
  return request({
    url: apiUrl,
    method: 'post',
    data: Object.assign(
      {},
      data,
      commonQuery(v)
    )
  })
}
const creditApi = {
  // 贷超信用报告模块查询接口
  async getModule ({
    userId = ''
  }) {
    return ajx('credit', {
      userId
    })
  }
}
export default creditApi
