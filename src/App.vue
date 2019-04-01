<template>
  <!-- <div id="app" @click="isDo()"> -->
  <div id="app" @mousemove="isDo()">
    <router-view/>
  </div>
</template>
<script>
// import { Message } from 'element-ui'
export default {
  name: 'App',
  data() {
    return {
      timer: null //定时器初始化定时器
    }
  },

  computed: {
    token() {
      return this.$store.getters.token
    },
    overTime() {
      return this.$store.state.user.overTime
    }
  },
  created() {},
  mounted() {},
  watch: {
    token() {
      if (this.token != '') {
        this.countTime()
      }
    }
  },

  methods: {
    // 用户多久没操作页面提示登录已经超时
    isDo() {
      this.resetTime()
    },

    countTime() {
      this.timer = setTimeout(this.Timeout, this.overTime)
    },

    resetTime() {
      if (this.$route.path !== '/login') {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.Timeout, this.overTime)
      }
    },

    Timeout() {
      const that = this
      if (this.$route.path !== '/login') {
        this.$message({
          message: '登录已超时!',
          center: true,
          duration: 4000
        })
        this.$store.dispatch('LogOut').then(() => {
          that.$router.push({
            path: '/login'
          })
        })
      }
    }
  }
}
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

