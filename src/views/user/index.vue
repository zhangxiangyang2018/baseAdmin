<template>
  <div class="user">
    <div class="addUser">
      <el-button
        type="primary"
        round
        size="mini"
        icon="el-icon-plus"
        @click="addUser()"
      >{{ $t('table.add')}}</el-button>
    </div>

    <el-table :data="arr" style="width: 100%" border>
      <el-table-column label="用户ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="真实姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者">
        <template slot-scope="scope">
          <span>{{ scope.row.creator}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.role==null? " ": scope.row.role.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门">
        <template slot-scope="scope">
          <span>{{ scope.row.dept==null? " ": scope.row.dept.name}}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.enable|isEnable}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editUser(scope.row.id)"
          >{{ $t('table.edit')}}</el-button>

          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="delUser(scope.row.id)"
          >{{ $t('table.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagenation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </div>

    <!-- 新增用户  -->
    <el-dialog class="add" :title="$t('table.addUser')" :visible.sync="isAdd" width="30%">
      <el-form
        :model="additem"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
        :rules="addUserRules"
        ref="addUser"
      >
        <el-form-item :label="$t('user.username')+':'" prop="username">
          <el-input
            type="text"
            v-model="additem.username"
            minlength="0"
            maxlength="6"
            placeholder="请输入0-6位英文"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.password')+':'" prop="password">
          <el-input
            type="text"
            v-model="additem.password"
            minlength="0"
            maxlength="32"
            placeholder="请输入纯数字"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input type="text" v-model="additem.email" minlength="0" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input type="text" v-model="additem.name" minlength="0" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input type="text" v-model="additem.tel" minlength="0" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="roleId">
          <el-select v-model="additem.roleId" placeholder="请选择" style="width:100%" clearable>
            <el-option v-for="item in role" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门:">
          <el-select placeholder="请选择" v-model="addVal" clearable style="width:100%">
            <el-option style="min-height:150px;overflow-y:scroll">
              <el-tree
                :data="dept"
                accordion
                node-key="id"
                ref="addTree"
                :props="defaultProps"
                @node-click="handleNodeClick"
                @check="handleNodeClick"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="enable">
          <el-radio-group v-model="additem.enable">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addConfirm()">增加</el-button>
          <el-button @click="isAdd=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑用户 -->
    <el-dialog class="add" :title="$t('table.editUser')" :visible.sync="isEdit" width="30%">
      <el-form
        :model="edititem"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
        :rules="editUserRules"
        ref="editUser"
      >
        <el-form-item label="用户名">
          <el-input
            type="text"
            v-model="edititem.username"
            disabled="disabled"
            minlength="0"
            maxlength="32"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱:">
          <el-input type="text" v-model="edititem.email" minlength="0" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input type="text" v-model="edititem.name" minlength="0" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input type="text" v-model="edititem.tel" minlength="0" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="edititem.roleId" ref="editTree" placeholder="请选择" style="width:100%">
            <el-option v-for="item in role" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门:">
          <el-select placeholder="请选择" v-model="editVal" clearable style="width:100%">
            <el-option style="min-height:150px;overflow-y:scroll">
              <el-tree
                :data="dept"
                accordion
                node-key="id"
                ref="editTree"
                :default-checked-keys="active"
                :default-expanded-keys="active"
                show-checkbox
                :props="defaultProps"
                @node-click="handleNodeClick2"
                @check="handleNodeClick2"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态:" prop="enable">
          <el-radio-group v-model="edititem.enable">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editConfirm()">编辑</el-button>
          <el-button @click="isEdit=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  isvalidUsername,
  isvalidPassword,
  isvalidEmail,
  isvalidPhone
} from '@/utils/validate'
export default {
  data() {
    // // 用户名验证
    const validateUser = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请输入用户名!'))
      } else if (!isvalidUsername(value)) {
        callback(new Error('用户名不能包含非法字符!'))
      } else {
        callback()
      }
    }
    // 密码验证

    const validatePass = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请设置密码!'))
      }

      if (!isvalidPassword(value)) {
        callback(new Error('密码应为纯数字'))
      } else {
        callback()
      }
    }

    // 邮箱验证
    const validateMail = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('邮箱不能为空!'))
      }

      if (!isvalidEmail(value)) {
        callback(new Error('邮箱格式不正确！'))
      } else {
        callback()
      }
    }

    // 姓名验证
    const validateName = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('姓名不能为空!'))
      } else {
        callback()
      }
    }
    // 电话号码验证
    const validatePhone = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('电话号码不能为空!'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('电话号码格式不正确!'))
      } else {
        callback()
      }
    }

    // 角色验证
    const validateRole = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请选择角色!'))
      } else {
        callback()
      }
    }

    //  部门非空判断
    const validateDept = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请选择部门!'))
      } else {
        callback()
      }
    }

    //  状态非空判断
    const validateEnable = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请选择部门!'))
      } else {
        callback()
      }
    }

    return {
      addVal: '', //增加用户部门状态显示

      editVal: '', // 编辑用户部门显示

      data2: [],
      //树形结构的默认属性
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      active: [], // 编辑用户树形结构的回显
      arr: [], // 后台返回的列表数据
      pageNum: 1, // 当前请求第几页
      pageSize: 10, // 每次请求几条数据

      totalNum: 0, // 总条数
      isAdd: false, //是否增加用户弹出层状态
      isEdit: false, //是否编辑用户弹出层状态

      // 增加用户item

      additem: {
        username: '',
        password: '',
        email: '',
        name: '',
        tel: '',

        roleId: '',
        deptId: '',
        enable: true
      },

      // 添加用户的验证
      addUserRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUser }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        email: [{ required: true, trigger: 'blur', validator: validateMail }],
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        tel: [{ required: true, trigger: 'blur', validator: validatePhone }],
        roleId: [
          { required: true, trigger: 'change', validator: validateRole }
        ],
        deptId: [
          { required: true, trigger: 'change', validator: validateDept }
        ],
        enable: [
          { required: true, trigger: 'change', validator: validateEnable }
        ]
      },

      // 编辑用户item
      edititem: {
        id: '',
        username: '',
        password: '',
        email: '',
        name: '',
        tel: '',

        roleId: '',
        deptId: '',
        enable: ''
      },

      // 编辑用户的验证
      editUserRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUser }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        email: [{ required: true, trigger: 'blur', validator: validateMail }],
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        tel: [{ required: true, trigger: 'blur', validator: validatePhone }],
        roleId: [
          { required: true, trigger: 'change', validator: validateRole }
        ],
        deptId: [
          { required: true, trigger: 'change', validator: validateDept }
        ],
        enable: [
          { required: true, trigger: 'change', validator: validateEnable }
        ]
      }
    }
  },
  watch: {
    // 部门增加和部门编辑的回显对应置空item的deptId
    addVal() {
      if (this.addVal == '') {
        this.additem.deptId = ''
      }
    },
    editVal() {
      if (this.editVal == '') {
        this.edititem.deptId = ''
      }
    }
  },
  mounted() {
    this.init()
  },

  filters: {
    // 禁用跟启用过滤器
    isEnable(val) {
      if (val) {
        return '启用'
      } else {
        return '禁用'
      }
    }
  },

  computed: {
    role() {
      return this.$store.state.user.roleList
    },
    dept() {
      return this.$store.state.user.deptList
    }
  },

  methods: {
    // 1.初始化请求列表函数

    async init() {
      let params = 'page=' + this.pageNum + '&size=' + this.pageSize

      let result = await this.$httpGet('userManger/getList', params)

      //  成功状态

      if (result.data.code == 0) {
        this.arr = result.data.result.content
        console.log(this.arr)
        this.totalNum = result.data.result.totalNum
      } else {
        this.$message({
          type: 'error',
          message: result.data.msg
        })
      }
    },

    //2. 改变当前请求几条数据
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },

    //3.改变当前请求第几页
    handleCurrentChange(val) {
      this.pageNum = val
      this.init()
    },

    //4.新增用户弹出层
    addUser() {
      this.$store.dispatch('getRolelist')
      this.$store.dispatch('getDeptlist')
      this.isAdd = true
      // 重置值添加用户状态
      this.$refs.addUser.resetFields()
      // 重置部门回显字段状态
      this.addVal = ''
    },

    //5.新增部门树结构点击
    handleNodeClick(data) {
      this.$refs.addTree.setCheckedKeys([])
      this.$refs.addTree.setCheckedKeys([data.id])
      this.addVal = data.label
      this.additem.deptId = data.id
    },
    //6.新增用户确定
    addConfirm() {
      let that = this
      this.$refs.addUser.validate(valid => {
        if (valid) {
          this.$httpPost('userManger/add', this.additem)
            .then(function(res) {
              if (res.data.code == 0) {
                that.$message({
                  type: 'success',
                  message: '添加成功'
                })
                that.isAdd = false
                that.init()
              } else {
                that.$message({
                  type: 'error',
                  message:
                    res.data.msg.length > 10
                      ? '添加失败，请稍后重试'
                      : res.data.msg
                })
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        } else {
          return false
        }
      })
    },
    //7.删除用户
    delUser(id) {
      let that = this
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = 'id=' + id
          that
            .$httpGet('userManger/del', params)
            .then(function(res) {
              if (res.data.code == 0) {
                that.$message({
                  type: 'success',
                  message: res.data.result
                })
                if (that.data2.length == 0 && that.pageNum > 0) {
                  that.pageNum = that.pageNum - 1
                }
                that.init()
              } else {
                that.$message({
                  type: 'success',
                  message: res.data.msg
                })
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        })
        .catch(res => {
          console.log('res: ', res)
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 8.编辑用户树形结构操作
    handleNodeClick2(data) {
      this.$refs.editTree.setCheckedKeys([])
      this.$refs.editTree.setCheckedKeys([data.id])
      this.editVal = data.label
      this.edititem.deptId = data.id
    },

    // 9.编辑用户弹出层显示
    async editUser(id) {
      this.isEdit = true
      this.$store.dispatch('getRolelist')
      this.$store.dispatch('getDeptlist')
      this.edititem = {
        id: id,
        username: '',
        password: '',
        email: '',
        name: '',
        tel: '',

        roleId: '',
        deptId: '',
        enable: ''
      } // 重置编辑用户部门显示
      this.editVal = ''
      let params = 'id=' + id

      // // 请求当前项 做内容回显
      let result = await this.$httpGet('userManger/edit', params)
      if (result.data.code == 0) {
        this.isEdit = true
        this.edititem = {
          id: id,
          username: result.data.result.username,
          password: result.data.result.pwd,
          email: result.data.result.email,
          name: result.data.result.name,
          tel: result.data.result.tel,
          creator: result.data.result.creator,
          roleId:
            result.data.result.role == null ? '' : result.data.result.role.id,
          deptId:
            result.data.result.dept == null ? ' ' : result.data.result.dept.id,
          enable: result.data.result.enable
        }
        this.active = []
        this.active.push(result.data.result.dept.id)

        this.getArray(
          this.$store.state.user.deptList,
          result.data.result.dept.id
        )
        this.$refs.editUser.clearValidate()
      }
    },
    //递归遍历显示父节点label
    getArray(data, id) {
      if (id) {
        for (var i in data) {
          if (data[i].id == id) {
            this.editVal = data[i].label
            break
          } else {
            this.getArray(data[i].children, id)
          }
        }
      }
    },

    //10.编辑确认提交
    editConfirm() {
      this.$refs.editUser.validate(valid => {
        if (valid) {
          this.$httpPost('userManger/update', this.edititem)
            .then(res => {
              if (res.data.code == 0) {
                this.isEdit = false
                this.init()
                this.$message({
                  type: 'success',
                  message: res.data.result
                })
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
.user {
  padding: 0 30px;
  .add {
    .el-dialog__header {
      text-align: center;
    }
  }
  .addUser {
    height: 80px;
    line-height: 80px;
    padding: 0 0;
  }
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .pagenation {
    height: 150px;

    line-height: 150px;

    padding: 30px;

    text-align: right;
  }
}
</style>
