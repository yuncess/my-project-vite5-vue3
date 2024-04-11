<template>
  <el-config-provider :locale="currentLocale" namespace="ep">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import enUs from 'element-plus/es/locale/lang/en'
import { locale } from '@/utils/i18n'

const currentLocale = {
  zh_CN: zhCn,
  zh_TW: zhTw,
  en_US: enUs
}[locale as string]
</script>
