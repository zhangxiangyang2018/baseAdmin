// 定义了整个应用的状态
const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: 'zh',
    primaryColor: '#3c8dbc' // 主题色
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      // Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
    } 

  },
  actions: {
    toggleSideBar: ({
      commit
    }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({
      commit
    }, {
      withoutAnimation
    }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({
      commit
    }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
