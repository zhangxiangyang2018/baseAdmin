
<template>
  <div class="side-nav" :class="layout">
    <el-menu
      ref="navbar"
      :default-active="defActive"
      menu-trigger="click"
      @select="handleSelect"
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
    >
      <nav-bar-item v-for="(item, n) in arr" :item="item" :navIndex="String(n)" :key="n"></nav-bar-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import NavBarItem from './SidebarItem'

export default {
  data() {
    return {
      navBgShow: false

      // arr: [{

      //         path: '/ss',

      //         name: '系统管理',
      //         icon: 'el-icon-setting',
      //         child:[
      //             {
      //              path: '/example1/role',
      //              name: '角色管理',

      //            },
      //             {
      //              path: '/example1/user',
      //              name: '用户管理',
      //              },
      //              {
      //              path: '/example1/menu',
      //              name: '权限管理',
      //              },
      //              {
      //              path: '/example1/order',
      //              name: '菜单管理',
      //              },
      //               {
      //              path: '/example1/dept',
      //              name: '部门管理',
      //              }
      //         ]
      //     },
      // ]
    }
  },

  props: ['layout'],

  computed: {
    defActive() {
      return this.$route.path
    },
    arr() {
      return this.$store.state.user.meunList
    }
  },

  watch: {},
  mounted() {
    this.$store.dispatch('getMeunList')
  },
  methods: {
    handleSelect(key) {
      let that = this
      this.$store.dispatch('getMeunList')
      function getArray(data, path) {
        // console.log(data,path)
        for (var i in data) {
          if (data[i].path == path) {
            if (data[i].innerUrl) {
              that.$router.push({ path: key })
            } else {
              that.$router.push({ path: '/example1/outer' })
              window.sessionStorage.setItem('outLInk', key)
            }
            break
          } else {
            getArray(data[i].child, path)
          }
        }
      }

      getArray(this.arr, key)
      //console.log(this.arr)
    },
    selectMenu(index, indexPath) {
      /**
    
                         * 在选择父级菜单时自动关闭其下所有子菜单
    
                         * 选择时获取点击菜单的父级index，并计算得到该index在已打开菜单中的索引值，
    
                         * 关闭位于当前打开菜单中该索引值之后的全部菜单
    
                         */
      let openedMenus = this.$refs.navbar.openedMenus
      let openMenuList
      // 如果点击的是二级菜单，则获取其后已经打开的菜单
      if (indexPath.length > 1) {
        let parentPath = indexPath[indexPath.length - 2]
        openMenuList = openedMenus.slice(openedMenus.indexOf(parentPath) + 1)
      } else {
        openMenuList = openedMenus
      }
      // 关闭菜单
      openMenuList = openMenuList.reverse()
      openMenuList.forEach(ele => {
        this.$refs.navbar.closeMenu(ele)
      })
      if (this.navMode == 'horizontal') {
        this.navBgShow = false
      }
    },
    openMenu() {
      if (this.navMode == 'horizontal') {
        this.navBgShow = true
      }
    },

    closeMenu() {
      if (this.navMode == 'horizontal') {
        this.navBgShow = false
      }
    },

    closeAll() {
      let openMenu = this.$refs.navbar.openedMenus.concat([])
      openMenu = openMenu.reverse()
      openMenu.forEach(ele => {
        this.$refs.navbar.closeMenu(ele)
      })
      if (this.navMode == 'horizontal') {
        this.navBgShow = false
      }
    }
  },
  components: {
    NavBarItem: NavBarItem
  }
}
</script>

