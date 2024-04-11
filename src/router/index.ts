import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/utils/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/403',
      name: '403',
      meta: {
        title: '没有权限'
      },
      component: () => import('@/views/403/index.vue')
    },
    ...(import.meta.env.DEV
      ? [
          {
            path: '/test',
            name: 'test',
            meta: {
              title: 'test'
            },
            component: () => import('@/views/test/index.vue')
          }
        ]
      : []),
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            title: 'dashboard',
            iconName: 'zhuye'
          },
          component: () => import('@/views/dashboard/index.vue')
        },
        {
          path: '/data-source',
          name: 'dataSource',
          redirect: { name: 'dataSourceList' },
          meta: {
            title: '报表连接',
            iconName: 'baobiaoshujulianjie'
          },
          component: () => import('@/views/data-source/index.vue'),
          children: [
            {
              path: '/data-source/list',
              name: 'dataSourceList',
              meta: {
                title: '报表连接',
                //用于标记，是否是一个模块的主页
                isIndex: true
              },
              component: () => import('@/views/data-source/list/index.vue')
            },
            {
              path: '/data-source/create',
              name: 'dataSourceCreate',
              meta: {
                title: '添加连接'
              },
              component: () => import('@/views/data-source/edit/index.vue')
            },
            {
              path: '/data-source/modify',
              name: 'dataSourceModify',
              meta: {
                title: '编辑连接'
              },
              component: () => import('@/views/data-source/edit/index.vue')
            }
          ]
        }
      ]
    }
  ]
})

/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = 'page' + '-' + `${to.meta.title}`
  }
  next()
})

export default router
