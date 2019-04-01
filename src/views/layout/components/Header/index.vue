<template>
  <div class="wrapper">
    <el-header height="60px" style="background:#3c8dbc">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <h4>权限系统</h4>
        </el-col>
        <el-col :span="3">
          <span style="color:#fff">{{ $t('header.wel')}} {{userName}}!</span>
          <span class="exit" @click="logout()">
            退出
            <i class="el-icon-circle-close"></i>
          </span>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>
<script>
export default {
  name: 'app',

  data() {
    return {}
  },
  computed: {
    themeColor() {
      return this.$store.state.app.primaryColor
    },
    userName() {
      return this.$store.state.user.user
    }
  },
  methods: {
    async logout() {
      let that = this
      let result = await this.$httpGet('user/exit')
      if (result.data.code == 0) {
        this.$store.dispatch('LogOut')
        that.$router.push({
          path: '/login'
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"   >
.wrapper {
  .exit {
    color: #fff;
    margin-left: 10px;
  }
  .exit:hover {
    cursor: pointer;
  }
  .el-color-picker--small .el-color-picker__trigger {
    top: 10px;
  }
  .el-dropdown-link {
    color: #fff;
  }
  .thema {
    color: #fff;
  }
  position: fixed;
  h4 {
    font-size: 1.2rem;

    height: 60px;

    line-height: 60px;

    margin: 0;

    color: #fff;
    width: 40%;
  }

  width: 100%;
  height: 60px;
  line-height: 60px;
  z-index: 1001;
  overflow: hidden;
  .header-operations {
    margin: 0;
    position: absolute;
    right: 0;
    top: 5px;
    list-style: none;
    li {
      margin: 0;
      width: 200px;
    }
  }
}
</style>
