import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import { useRouter } from 'vue-router'

const alovaInstance = createAlova({
  baseURL: '/dolphinscheduler',
  statesHook: VueHook,
  // 推荐使用GlobalFetch请求适配器
  requestAdapter: GlobalFetch(),
  responded: {
    // 请求成功的拦截器
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        const msg = method.url + '，' + response.statusText
        ElMessage({
          message: msg,
          type: 'error'
        })
        throw new Error(msg)
      }
      const json = await response.json()
      if (json.code !== 200) {
        ElMessage({
          message: json.message || json.msg,
          type: 'error'
        })
        throw new Error(json)
      }
      return json.data
    },
    // 请求失败的拦截器
    onError: (err) => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    },
    // 请求完成的拦截器
    onComplete: async () => {
      // 处理请求完成逻辑
    }
  },
  // 请求超时时间，单位为毫秒，默认为0，表示永不超时
  timeout: 50000,
  // 函数参数为一个method实例，包含如url、params、data、headers等请求数据
  // 你可以自由修改这些数据
  beforeRequest(method) {
    const appToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImRtcCIsImluc2lkZSI6ZmFsc2UsInNpZCI6NDgzOTczNDM2NDQ1MjQ4fQ.qwhKIOpZzHE1k8rWa77tdOTtUaRVFjuQYYxx4WncfgE'
    const token = '12261bed-286d-4100-8108-6a1ea6e5437a'
    const tenantId = '604645287633472'

    const headers = {
      'content-type': 'application/json;charset=UTF-8',
      'digi-middleware-auth-app': appToken,
      'digi-middleware-auth-user': token,
      'digi-middleware-tenant-id': tenantId
    }

    // 需要鉴权且未登录情况，自动跳转登录页
    if (!method.config.meta?.ignoreToken && !token) {
      useRouter().push('/login')
    }

    method.config.headers = headers
  }
})

export default alovaInstance
