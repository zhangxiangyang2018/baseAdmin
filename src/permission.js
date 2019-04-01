import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  Message
} from 'element-ui'
import {
  getUser
} from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {


  NProgress.start();
  // 已经登录了则用户名缓存
  if (getUser()) {
    //如果是登录页   重定向置首页
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    }

    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      //console.log("未登录")
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }

})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})
