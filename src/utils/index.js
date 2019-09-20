import qs from 'qs'
// import request from '@/utils/request'
// import commonQuery from '@/utils/commonQuery'

// const ajx = (apiUrl, data = {}, ver = 'V2') => {

//   return request({
//     baseURL: process.env.VUE_APP_BASE_API_V1,
//     url: apiUrl,
//     method: 'post',
//     data: Object.assign(
//       {},
//       data,
//       commonQuery(ver)
//     )
//   })
// }
/**
 * @param {*} 获取参数
 */
const getParam = (name) => {
  var search = document.location.search
  var pattern = new RegExp('[?&]' + name + '\\=([^&]+)', 'g')
  var matcher = pattern.exec(search)
  var items = null
  if (matcher !== null) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]))
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1])
      } catch (e) {
        items = matcher[1]
      }
    }
  }
  return items
}
export default {
  qs,
  getParam
}
