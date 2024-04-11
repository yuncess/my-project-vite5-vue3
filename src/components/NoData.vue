<template>
  <div class="no-data">
    <img src="@/assets/images/no-data@2x.png" />
    <div class="tip">{{ tip }}</div>
  </div>
</template>
<script lang="ts" setup>
import i18n from '@/utils/i18n'
withDefaults(defineProps<{ tip?: string }>(), { tip: i18n.t('zan-wu-shu-ju') })
</script>
<style lang="scss" scoped>
.no-data {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 380px;
  img {
    width: 200px;
    height: 200px;
  }
  .tip {
    color: $t-c-4;
    font-size: 14px;
  }
}
</style>
