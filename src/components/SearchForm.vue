<template>
  <el-form
    :inline="true"
    label-suffix="："
    :model="searchForm"
    :rules="rules"
    class="dmp-search-form"
  >
    <div class="content">
      <slot :search-form="searchForm"></slot>
    </div>
    <div class="operate">
      <el-button type="primary" @click="onSearch"> 查询 </el-button>
      <el-button @click="onReset">重置</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{ defaultValue?; rules? }>(), {
  defaultValue: {},
  rules: {}
})
const emit = defineEmits(['search'])
const searchForm = ref({})

/**
 * 初始化默认搜索条件
 * 设置了defaultValue默认执行一次onSearch
 * ！如果不想默认执行一次onSearch，请不要设置defaultValue
 */
watch(
  props.defaultValue,
  (defaultValue) => {
    if (defaultValue && Object.keys(defaultValue).length) {
      searchForm.value = { ...searchForm.value, ...defaultValue }
      onSearch()
    }
  },
  {
    deep: true,
    immediate: true
  }
)

function onReset() {
  searchForm.value = { ...(props.defaultValue || {}) }
  onSearch()
}

function onSearch() {
  console.log('====== onSearch ======', searchForm.value)
  emit('search', searchForm.value)
}
</script>

<style lang="scss" scoped>
.dmp-search-form {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin: 0 10px -18px 0;
  .content {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 135px);
    ::v-deep .el-form-item--small {
      &.el-form-item {
        display: flex;
        margin-right: 20px;
        margin-bottom: 16px;
        .el-form-item__content {
          flex: 1;
          & > div {
            width: 100%;
          }
        }
      }
      .el-form-item__label {
        margin-bottom: 0;
      }
    }
  }
  .operate {
    flex: 0 0 auto;
    margin-bottom: 18px;
    margin-left: auto;
    width: 135px;
    ::v-deep .el-button + .el-button {
      margin-left: 6px;
    }
  }
}
</style>

<style lang="scss">
//屏宽1776以上4列 @media screen and (min-width: 1776px) { .dmp-search-form
.content {
  .el-form-item--small {
    &.el-form-item {
      width: calc(25% - 24px);
    }
  }
}
//屏宽1776以下3列 @media screen and (max-width: 1776px) { .dmp-search-form
.content {
  .el-form-item--small {
    &.el-form-item {
      width: calc(33.3% - 24px);
    }
  }
}
</style>
