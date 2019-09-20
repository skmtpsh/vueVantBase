import dayjs from 'dayjs'
import md5 from 'js-md5'
import utils from './index'
/**
*
* @param {*} appId
*
*/
export const getAppKey = (appId) => {
  const AppSet = [
    {
      id: 'yipurse123456789',
      key: '123yipurse123'
    },
    {
      id: 'bailian123456789',
      key: 'QsQ43C3HHW2JO4w5'
    },
    {
      id: 'yilaibao12345678',
      key: '123456yilaibao123456'
    },
    {
      id: 'qiandada87654321',
      key: '12d3f103ba163557f49174c367c0fa20'
    }
  ]
  return AppSet.filter(item => {
    if (item.id === appId) {
      return item
    }
  })
}

/**
 * 公用CommonQuery
 */
const defalutVersion = 'v1.1'
export const commonQuery = (ver = defalutVersion) => {
  const version = ver.toLowerCase()
  let AppKey = ''
  // 根据传参获取appId
  let AppID = utils.getParam('appId')
  if (version === defalutVersion) {
    AppID = 'qiandada87654321'
  }
  if (getAppKey(AppID).length === 0) {
    console.log('not find key')
    return false
  }
  AppKey = getAppKey(AppID)[0].key

  let TimeStamp = dayjs(Date.now()).format('YYYYMMDDHHmmss')
  let SignSystem = md5(AppKey + AppID + TimeStamp)
  return Object.assign({}, {
    appId: AppID,
    timestamp: TimeStamp,
    signSystem: SignSystem
  })
  // }, version !== defalutVersion ? {} : { appKey: AppKey })
}

const requestQuery = (ver) => {
  const version = ver.toLowerCase()
  let URL = location.search
  const urlQuery = ({
    token = ''
  } = utils.qs.parse(URL.indexOf('?') !== -1 ? URL.substr(1) : '')) => {
    return Object.assign({ token },
      version === defalutVersion ? {} : {},
      version === 'v1' ? { userId, mobile, appOs: platform, appName: productName || appName } : {},
      version === 'v1.1' ? { userId, loginPhone } : {},
      version === 'sdk' ? { productType, platform, mobile, type } : {}
    )
  }
  return Object.assign(urlQuery(), commonQuery(ver))
}

export default requestQuery
