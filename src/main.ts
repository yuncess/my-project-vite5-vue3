import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initCommonConfig } from '@/utils/commonConfig'

//样式
import '@/styles/index.scss'

//引入阿里图标
import '@/assets/icons/iconfont.css'

//国际化
import i18n from '@/utils/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

new Promise((resolve, reject) => {
  //初始化配置
  initCommonConfig()
    .then(() => {
      //其他前置逻辑
      //...
      resolve(true)
    })
    .catch(() => {
      ElMessage({
        message: i18n.t('huo-qu-pei-zhi-wen-jian-cuo-wu'),
        type: 'error'
      })
      reject(false)
    })
}).then(() => {
  document.querySelector('.global-loading').style.display = 'none'
  app.mount('#app')
})
