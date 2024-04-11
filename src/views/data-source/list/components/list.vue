<template>
  <el-table :data="listData" v-loading="loading">
    <template #empty>
      <NoData />
    </template>
    <el-table-column type="index" label="编号" width="80" align="center" />
    <el-table-column prop="name" label="连接名称" />
    <el-table-column prop="type" label="连接类型" />
    <el-table-column prop="" label="连接信息" />
    <el-table-column prop="status" label="状态" />
    <el-table-column prop="updateTime" label="更新时间">
      <template #default="scope">
        <span>{{ formatDate(scope.row.updateTime) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="opt" label="操作" />
  </el-table>
</template>
<script lang="ts" setup>
import { formatDate } from '@/utils'
withDefaults(defineProps<{ listData: any[]; loading: boolean }>(), {
  listData: () => [],
  loading: false
})
</script>
<style lang="scss" scoped></style>
