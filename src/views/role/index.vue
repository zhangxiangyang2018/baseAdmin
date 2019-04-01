<template>
  <div class="role">
    <div class="addRole">
      <el-button type="primary" round size="mini" icon="el-icon-plus" @click="addRole()">添加角色</el-button>
    </div>

    <div class="container">
      <el-table :data="arr" border style="width: 100%">
        <el-table-column prop="id" label="角色ID"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="remark" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="420">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editRole(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delRole(scope.row.id)"
            >删除</el-button>
            <el-button size="mini" icon="el-icon-share" @click="share(scope.row.id)">分配权限</el-button>
            <el-button size="mini" icon="el-icon-search" @click="ownUser(scope.row.id)">查看用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagenation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </div>
    <!-- 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="isAdd" width="30%">
      <el-form
        label-width="100px"
        :model="addItem"
        :rules="addRoleRules"
        ref="addrole"
        auto-complete="on"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addItem.name" min="0" minlength="0" maxlength="32" type="text"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：">
          <el-input v-model="addItem.remark" type="textarea" minlength="0" maxlength="255"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAdd = false">取 消</el-button>
        <el-button type="primary" @click="addroleConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色 -->
    <el-dialog title="编辑角色" :visible.sync="isEdit" width="30%">
      <el-form label-width="100px" :model="editItem" :rules="editRoleRules" ref="editrole">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editItem.name" minlength="0" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：">
          <el-input v-model="editItem.remark" type="textarea" minlength="0" maxlength="255"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEdit = false">取 消</el-button>
        <el-button type="primary" @click="editroleConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="isAssign" width="50%">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          :title="item.name"
          v-for="(item,index) in  permiss"
          :name="index"
          v-if="(item.perms!=null)"
          :key="index"
        >
          <el-checkbox
            v-for="per in item.perms"
            :label="per.id"
            :key="per.id"
            v-model="checkboxGroup4"
          >{{per.name}}</el-checkbox>
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAssign = false">取 消</el-button>
        <el-button type="primary" @click="assignConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 角色所属用户展示 -->
    <el-dialog title="用户列表" :visible.sync="isown" width="50%">
      <el-table :data="ownlist" style="width: 100%" border>
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
            <span>{{ scope.row.enable| isEnable}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //  验证角色输入是否为空值
    const validateEmpty = (rule, value, callback) => {
      // if (value.length == 0) {
      //   callback(new Error('不能为空！'))
      // } else {
      callback()
      // }
    }
    return {
      isown: false, //  所属用户展示
      ownlist: [], //所属用户列表
      checkboxGroup4: [],

      isAssign: false, //分配权限显示
      arr: [],
      data2: [],
      pageNum: 1, // 当前请求第几页
      pageSize: 10, // 每次请求几条数据
      totalNum: 0, // 总条数
      isAdd: false, // 新增角色对话框显示

      isEdit: false, //  编辑角对话框显示
      addItem: {
        name: '',
        remark: ''
      },
      addRoleRules: {
        name: [{ required: true, trigger: 'blur', validator: validateEmpty }]
      },
      editItem: {
        id: null,
        name: '',
        remark: ''
      },
      editRoleRules: {
        name: [{ required: true, trigger: 'blur', validator: validateEmpty }]
      },
      activeNames: [], //折叠面板全部展开
      permiss: [], //权限展示
      sendpermiss: null // 角色分配权限id
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

  methods: {
    // 查看当前角色所属用户
    async ownUser(id) {
      let params = 'id=' + id

      let result = await this.$httpGet('role/getUser', params)
      if (result.data.code == 0) {
        if (result.data.result.length > 0) {
          this.isown = true
          this.ownlist = result.data.result
          //console.log( result.data.result)
        } else {
          this.$message({
            type: 'error',

            message: '暂无用户！'
          })
        }
      } else {
        this.$message({
          type: 'error',

          message: result.data.msg
        })
      }
    },

    async assignConfirm() {
      let params = {
        roleId: this.sendpermiss,

        permisIds: this.checkboxGroup4.toString()
      }

      let result = await this.$httpPost('role/grantPermis', params)

      if (result.data.code == 0) {
        this.$message({
          type: 'success',

          message: result.data.result
        })

        this.isAssign = false
      } else {
        this.$message({
          type: 'error',

          message: result.data.msg
        })
      }
    },

    async share(id) {
      let params = 'id=' + id

      let result = await this.$httpGet('role/edit', params)

      if (result.data.code == 0) {
        let perms = result.data.result.perms

        this.checkboxGroup4 = []

        if (perms != null) {
          for (let i = 0; i < perms.length; i++) {
            this.checkboxGroup4.push(perms[i].id)
          }
        }

        this.showPermiss(id)
      }
    },

    // 权限回显

    async showPermiss(id) {
      this.sendpermiss = id

      this.isAssign = true

      let result = await this.$httpGet('authority/list')

      if (result.data.code == 0) {
        let arr = result.data.result

        //console.log(arr);

        this.permiss = this.flatten(arr, [
          'id',
          'name',
          'parentId',
          'path',
          'perms'
        ],2)
        //进来默认展开所有折叠面板
      }
    },
    // 将树形结构扁平化
    flatten(data, keys, level = 0) {
      return data.reduce(
        (arr, x) => [
          ...arr,
          keys.reduce((o, k) => ((o[k] = x[k]), o), {
            level
          }),
          ...this.flatten(x.sub || [], keys, level + 1)
        ],
        []
      )
    },

    // 1.初始化数据请求

    async init() {
      let params = 'page=' + this.pageNum + '&size=' + this.pageSize
      let result = await this.$httpGet('role/rolelist', params)
      if (result.data.code == 0) {
        this.arr = result.data.result.content
        this.totalNum = result.data.result.totalNum
      } else {
        this.$message({
          type: 'error',
          message: result.data.msg
        })
      }
    },

    //2.改变当前请求几条数据
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },

    //3.改变当前请求第几页

    handleCurrentChange(val) {
      this.pageNum = val
      this.init()
    },

    //4.新增角色弹出窗口

    addRole() {
      this.isAdd = true
      //对该表单项进行重置，将其值重置为初始值并移除校验结果
      this.$refs.addrole.resetFields()
    },

    //5. 新增角色提交

    addroleConfirm() {
      //  判断角色名称不为空
      this.$refs.addrole.validate(valid => {
        if (valid) {
          this.$httpPost('role/add', this.addItem)
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: 'success',
                  message: res.data.result
                })
                this.init()
                this.isAdd = false
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

      //console.log(result)
    },

    // 6.编辑角色弹出层显示

    editRole(id) {
      this.isEdit = false

      this.editItem = {
        id: id,

        name: '',

        remark: ''
      }

      let that = this

      let params = 'id=' + id

      this.$httpGet('role/edit', params)

        .then(function(res) {
          // console.log(res);

          if (res.data.code == 0) {
            that.isEdit = true

            that.editItem.name = res.data.result.name

            that.editItem.remark = res.data.result.remark
            // 清除上次的绿色框
            that.$refs.editrole.clearValidate()
          }
        })

        .catch(function(error) {
          console.log(error)
        })
    },

    // 7.编辑提交

    editroleConfirm() {
      let that = this
      this.$refs.editrole.validate(valid => {
        if (valid) {
          this.$httpPost('role/update', this.editItem)
            .then(function(res) {
              if (res.data.code == 0) {
                that.$message({
                  type: 'success',

                  message: res.data.result
                })

                that.isEdit = false

                that.init()
              } else {
                that.$message({
                  type: 'error',

                  message: res.data.msg
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

    // 8.删除角色

    delRole(id) {
      let that = this

      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',

        cancelButtonText: '取消',

        type: 'warning'
      })

        .then(() => {
          let params = 'id=' + id
          let result = that
            .$httpGet('role/del', params)
            .then(function(res) {
              console.log(res)
              if (res.data.code == 0) {
                that.$message({
                  type: 'success',
                  message: res.data.result
                })
                if (that.ownlist.length == 0 && that.pageNum > 0) {
                  that.pageNum = that.pageNum - 1
                }
                //重新初始化列表
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
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.role {
  padding: 0 30px;

  .el-dialog__header {
    text-align: center;
  }

  .addRole {
    height: 80px;
    line-height: 80px;
    padding: 0 0;
  }

  .pagenation {
    height: 150px;

    line-height: 150px;

    padding: 30px;

    text-align: right;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }
  .el-checkbox {
    margin-right: 20px;
    margin-bottom: 10px;
  }
}
</style>
