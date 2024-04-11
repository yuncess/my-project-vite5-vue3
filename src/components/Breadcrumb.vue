<template>
  <el-row v-if="!hide" type="flex" align="middle" class="breadcrumb">
    <MyIcon
      v-if="breadcrumbList.length === 1"
      :name="breadcrumbList[0].meta.iconName"
      :size="16"
      class="model-icon"
    />
    <MyIcon v-else name="fanhui" :size="16" class="back-btn" @click="back" />
    <el-breadcrumb>
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item.path">{{
        item?.meta?.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
</template>
<script setup>
import { watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const breadcrumbList = ref([])

watch(
  () => route,
  (route) => {
    const [_, ...rest] = route.matched || []
    if (rest.length && rest[rest.length - 1].meta.isIndex) {
      rest.pop()
    }
    breadcrumbList.value = rest
    console.log(breadcrumbList)
  },
  { deep: true, immediate: true }
)

const hide = computed(() => {
  return breadcrumbList.value[breadcrumbList.value.length - 1].name === 'dashboard'
})

function back() {
  router.back()
}
</script>
<style lang="scss" scoped>
.breadcrumb {
  padding: 5px 13px;
  border-bottom: 1px solid $b-c-base;
}
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: $bg-c-icon;
  text-align: center;
}
.model-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px 0 15px;
  width: 20px;
  height: 30px;
  color: $c-primary;
}
::v-deep .ep-breadcrumb__item:last-child .ep-breadcrumb__inner {
  color: $t-c-1;
}
</style>
