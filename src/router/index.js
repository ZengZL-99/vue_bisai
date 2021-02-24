import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/selectMeituan',
    name: 'Example',
    meta: { title: '管理', icon: 'el-icon-menu' },
    children: [
      {
        path: 'selectMeituan',
        name: 'SelectMeituan',
        component: () => import('@/views/selectMeituan/index'),
        meta: { title: '信息查询', icon: 'el-icon-search' }
      },
      {
        path: 'visualMeituan',
        name: 'visualMeituan',
        component: () => import('@/views/visualMeituan/index'),
        meta: { title: '可视化', icon: 'el-icon-s-data' },
        children: [
          {
            path: 'common',
            name: 'common',
            component: () => import('@/views/visualMeituan/commonMeituan/index'),
            meta: { title: '普通可视化', icon: 'el-icon-pie-chart' }
          },
          {
            path: 'hotspot',
            name: 'hotspot',
            component: () => import('@/views/visualMeituan/hotspotmapMeituan2/index'),
            meta: { title: '热点图可视化', icon: 'tree' }
          },
          {
            path: 'businessModel',
            name: 'businessModel',
            component: () => import('@/views/visualMeituan/hotspotmapMeituan/index'),
            meta: { title: '商家分布热力图', icon: 'el-icon-location-information' }
          },
          {
            path: 'singleContrast',
            name: 'singleContrast',
            component: () => import('@/views/visualMeituan/vagueQuery/index'),
            meta: { title: '模糊查询热点图', icon: 'el-icon-search' }
          }
        ]
      },
      {
        path: 'contrastMeituan',
        name: 'contrastMeituan',
        component: () => import('@/views/contrastMeituan/index'),
        meta: { title: '信息对比功能', icon: 'tree' },
        children: [
          {
            path: 'uploadContrastCom',
            name: 'uploadContrastCom',
            component: () => import('@/views/contrastMeituan/uploadContrastCom/index'),
            meta: { title: '文件上传对比(企)', icon: 'tree' }
          },
          {
            path: 'uploadContrast',
            name: 'uploadContrast',
            component: () => import('@/views/contrastMeituan/uploadContrast/index'),
            meta: { title: '文件上传对比(商)', icon: 'el-icon-upload2' }
          }
        ]
      }
    ]
  },
  /*
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  */
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
