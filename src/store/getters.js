const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  name: state => state.user.name,
  roleList: state => state.user.roleList
}
export default getters
