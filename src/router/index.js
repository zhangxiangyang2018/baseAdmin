import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 基础继承组件
import Layout from '../views/layout/Layout'

export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
 
 

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/example1',
    component: Layout,
    redirect: '/example1/role',
    children: [
      {
        path: 'outer',
        component: () => import('@/views/outLink')
      },
      {
        path: 'user',
        component: () => import('@/views/user/index')
      },
      {
        path: 'role',
        component: () => import('@/views/role/index')
      },
      {
        path: 'menu',
        component: () => import('@/views/menu/index')
      },
      {
        path: 'order',
        component: () => import('@/views/order/index')
      },
      {
        path: 'dept',
        component: () => import('@/views/dept/index')
      },

    ]
  },


  {
    path: '*',
    redirect: '/404'
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
