<template>
  <div>login</div>
</template>
<script setup>
import { useRequest } from 'alova'
import alovaInstance from '@/utils/alova'

const { loading, data, error } = useRequest(
  alovaInstance.Get('/login', {
    params: {
      userId: 1
    },
    meta: {
      ignoreToken: true
    }
  })
)
</script>
<style lang="scss" scoped></style>
