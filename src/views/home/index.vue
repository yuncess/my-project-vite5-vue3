<template>
  <div class="home-container">
    <NavLeft />
    <div class="page-container">
      <Breadcrumb />
      <div class="page-main">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import NavLeft from './components/NavLeft.vue'
</script>
<style lang="scss">
.home-container {
  padding: 20px 20px 20px 80px;
  height: 100vh;
  background-color: $bg-c;
  .page-container {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    height: 100%;
    border-radius: 20px;
    background-color: #fff;

    @include s1;
    .page-main {
      overflow: auto;
      flex: 1;
      padding: 10px;
    }
  }
}
</style>
