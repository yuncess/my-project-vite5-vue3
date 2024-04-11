<template>
  <PaginationListLayout>
    <template #search>
      <SearchForm @search="onSearch">
        <template #default="{ searchForm }">
          <el-form-item prop="searchVal">
            <el-input v-model="searchForm.searchVal" placeholder="搜索连接名称"></el-input>
          </el-form-item>
        </template>
      </SearchForm>
    </template>
    <template #list>
      <List :listData="listData" :loading="loading" />
    </template>
    <template #pagination>
      <Pagination
        :total="totalCount"
        :current-page="pagination.pageNum"
        @update:current-page="onCurrentChange"
      ></Pagination>
    </template>
  </PaginationListLayout>
</template>
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import List from './components/list.vue'
import { usePaginationList } from '@/hooks'

const router = useRouter()
const {
  loading,
  listData,
  pagination,
  totalCount,
  setSearchParams,
  onCurrentChange,
  onSizeChange,
  loadData
} = usePaginationList({
  queryUrl: '/datasources/list-paging',
  method: 'Get'
})

onMounted(() => {
  loadData()
})

function add() {
  router.push({ path: '/data-source/create' })
}

function onSearch(params) {
  setSearchParams(params)
  loadData()
}
</script>
<style lang="scss" scoped></style>
