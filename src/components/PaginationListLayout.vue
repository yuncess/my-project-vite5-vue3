<template>
  <div class="list-layout">
    <div v-if="$slots.search" class="search">
      <slot name="search"></slot>
    </div>
    <div v-if="$slots.operation" class="operation">
      <slot name="operation"></slot>
    </div>
    <div v-if="$slots.list" class="list">
      <slot name="list"></slot>
    </div>
    <div v-if="$slots.pagination" class="pagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.list-layout {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  height: 100%;
  .search {
    margin-bottom: 10px;
  }
  .operation {
    margin-bottom: 10px;
  }
  .list {
    overflow: auto;
    flex: 1;
    ::v-deep .ep-table__inner-wrapper::before {
      display: none;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    border-top: 1px solid $b-c-base;
  }
}
</style>
