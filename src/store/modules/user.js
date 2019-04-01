// create  by   author 张向阳
import {
  getUser,
  setUser,
  removeUser
} from '@/utils/auth'
import {
  httpGet
} from '@/utils/request'
const user = {
  state: {
    user: getUser(), //用户名
    password: '', //  密码
    status: false, // 登陆状态
    overTime: 600000000, // 设置登录超时时间,
    roleList: [], // 获取角色列表
    deptList: [], // 部门列表获取
    meunList: [] // 菜单获取

  },
  mutations: {
    // 设置角色列表
    SET_ROLELIST: (state, roleList) => {
      state.roleList = roleList
    },
    // 设置部门列表
    SET_DEPTLIST: (state, deptList) => {
      state.deptList = deptList
    },
    // 不同用户登陆进来菜单显示
    SET_MEUN: (state, meunList) => {
      state.meunList = meunList
    },
    // 设置用户名
    SET_NAME: (state, user) => {
      state.user = user
    }
  },
  actions: {
    // 获取用户名
    getName: ({
      commit
    }, user) => {
      commit('SET_NAME', user)
      setUser(user)
    },
    // 登录退出操作
    LogOut: ({
      commit
    }) => {

      commit('SET_NAME', '');
      removeUser()
    },
    getRolelist: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        let params = 'page=' + 0 + '&size=' + 0
        httpGet('role/rolelist', params).then(
          response => {
            if (response.data.code == 0) {

              commit('SET_ROLELIST', response.data.result.content);
            }
            resolve()
          }

        ).catch(error => {
          reject(error)
        })

      })

    },
    getDeptlist: ({
      commit
    }) => {

      return new Promise((resolve, reject) => {

        httpGet('dept/deptList').then(
          response => {
            if (response.data.code == 0) {

              //  对后台返回来的树状结构做结构转换
              var key = "children";
              var key1 = "label";

              function parseJson(arr) {
                arr = arr.slice();

                function toParse(arr) {

                  arr.forEach(function (item) {

                    if (item.childDept && Array.isArray(item.childDept)) {
                      item[key] = item.childDept;
                      item[key1] = item.name;
                      toParse(item[key]);
                    }
                    delete item.childDept;
                    delete item.name;
                  });

                  return arr;
                }
                return toParse(arr);
              }
              let result = parseJson(response.data.result)
              console.log(result)
              commit('SET_DEPTLIST', result);
            }
            resolve()
          }

        ).catch(error => {
          reject(error)
        })

      })
    },
    getMeunList: ({
      commit
    }) => {

      return new Promise((resolve, reject) => {

        httpGet('showMenu/list').then(
          response => {
            if (response.data.code == 0) {

              //  对后台返回来的树状结构做结构转换
              var key = "child";


              function parseJson(arr) {
                arr = arr.slice();

                function toParse(arr) {

                  arr.forEach(function (item) {

                    if (item.sub && Array.isArray(item.sub)) {
                      item[key] = item.sub;

                      toParse(item[key]);
                    }
                    delete item.sub;

                  });

                  return arr;
                }
                return toParse(arr);
              }
              let result = parseJson(response.data.result)

              commit('SET_MEUN', result);
            }
            resolve()
          }

        ).catch(error => {
          reject(error)
        })

      })
    }
  }

}
export default user
