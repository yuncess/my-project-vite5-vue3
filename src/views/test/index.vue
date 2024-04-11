<template>
  <div class="aaa">
    {{ loading }}
    <div><MyIcon name="xuanzhong" /></div>
    <div>count: {{ count }}</div>
    <div>doubleCount: {{ doubleCount }}</div>
    <div>
      <el-button type="primary" @click="increment"> <MyIcon name="add" /></el-button>
    </div>
    <MarkdownRenderer :source="'# Hi!!'" />
  </div>
</template>
<script setup>
import { ref, toRefs } from 'vue'
import { useRequest } from 'alova'
import alovaInstance from '@/utils/alova'
import i18n from '@/utils/i18n'
import { useCounterStore } from '@/stores/counter'

const { count, doubleCount, increment } = toRefs(useCounterStore())

console.log('apiHostUrl', window.localStorage.getItem('apiHostUrl'))

const { loading, data, error } = useRequest(
  alovaInstance.Post('/home-page/statistics', { projectId: '59' })
)
setTimeout(() => {
  ElMessage({
    message: i18n.t('ni-hao-shi-jie'),
    type: 'success'
  })
}, 500)
</script>
<style lang="scss" scoped>
.aaa {
  background-color: $bg-c;
}
</style>
