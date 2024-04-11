<template>
  <div class="nav-left">
    <div class="bg-t"></div>
    <div class="main">
      <div
        v-for="(menu, index) in menuList"
        :key="menu.path"
        :title="menu.title"
        :class="['menu-item', { active: index === currentIndex }]"
        @click="chooseMenu(index, menu.path)"
      >
        <div class="active-dot" />
        <div class="icon-box">
          <MyIcon :size="24" :name="menu.iconName" />
        </div>
      </div>
    </div>
    <div class="bg-b"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const currentIndex = ref(0)
const menuList = [
  {
    iconName: 'zhuye',
    title: 'dashboard',
    path: '/dashboard'
  },
  {
    iconName: 'baobiaoshujulianjie',
    title: '报表连接',
    path: '/data-source/list'
  },
  {
    iconName: 'baobiaoshujuqianyi',
    title: '报表数据迁移',
    path: '/'
  },
  {
    iconName: 'baobiaoshujufenxi',
    title: '报表数据分析',
    path: '/'
  }
]

function chooseMenu(index, path) {
  currentIndex.value = index
  path && router.push(path)
}

onMounted(() => {
  const index = menuList.findIndex((menu) => menu.path === route.path)
  chooseMenu(index)
})
</script>
<style lang="scss" scoped>
.nav-left {
  position: fixed;
  top: 50%;
  left: 0;
  display: flex;
  flex-direction: column;
  margin-top: -215px;
  width: 74px;
  height: 430px;
  .bg-t {
    height: 50px;
    background: url('@/assets/images/nav-left/top.png') top / 100% auto no-repeat;
  }
  .bg-b {
    height: 50px;
    background: url('@/assets/images/nav-left/bottom.png') bottom / 100% auto no-repeat;
  }
  .main {
    flex: 1;
    background: url('@/assets/images/nav-left/middle.png') 0 0 / 100% auto repeat-y;
  }
}
.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 0;
  height: 50px;
  cursor: pointer;
  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: $t-c-1;
  }
  .active-dot {
    margin-left: -19px;
    width: 19px;
    height: 50px;
    background: url('@/assets/images/nav-left/active-dot@2x.png') center / 100% auto;
  }
  &:hover {
    .icon-box {
      background-color: $bg-c-icon;
    }
  }
  &.active {
    .icon-box {
      margin-left: 10px;
      background-color: $c-primary;
      color: #fff;
      transition: margin 0.5s;
    }
    .active-dot {
      margin-left: 0;
      transition: margin 0.5s;
    }
  }
}
</style>
