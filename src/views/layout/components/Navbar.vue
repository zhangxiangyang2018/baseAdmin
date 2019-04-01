<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
      <breadcrumb/>
      <screenfull class="screenfull right-menu-item"/>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    LangSelect
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  data() {
    return {}
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  z-index: 1000;
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .changeColor {
    position: absolute;
    right: 150px;
    top: 0;
    display: block;
    height: 50px;
    line-height: 50px;
    outline: none;
  }
  .changeColor:hover {
    cursor: pointer;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 6px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

