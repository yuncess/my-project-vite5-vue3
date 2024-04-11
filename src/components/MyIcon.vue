<template>
  <i :class="`iconfont icon-${name}`" :style="{ fontSize: fontSize, color: color }"></i>
</template>
<script>
export default {
  name: 'MyIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: ''
    },
    size: {
      type: [Number, String],
      required: false,
      default: 16
    }
  },
  computed: {
    fontSize() {
      if (typeof this.size === 'number') {
        return this.size + 'px'
      } else {
        return this.size
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
