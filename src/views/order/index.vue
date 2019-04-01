<template>
  <div class="menuManger">
    <el-row type="flex" class="row-bg">
      <el-col :span="5">
        <div class="menuTree">
          <el-tree
            :data="data2"
            show-checkbox
            accordion
            ref="tree"
            highlight-current
            node-key="id"
            :default-checked-keys="leftActive"
            :default-expanded-keys="leftActive"
            :props="defaultProps"
            @node-click="handleNodeClick"
            @check="handleNodeClick"
          ></el-tree>
        </div>
      </el-col>

      <el-col :span="19">
        <div class="content">
          <div class="addMenu">
            <el-button type="primary" round size="mini" icon="el-icon-plus" @click="addMenu()">新增菜单</el-button>
          </div>

          <el-table :data="datas" style="width: 100%" border>
            <el-table-column label="菜单ID" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="菜单排序" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.num}}</span>
              </template>
            </el-table-column>
            <el-table-column label="菜单名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="菜单Url">
              <template slot-scope="scope">
                <span>{{ scope.row.path}}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否为内部链接">
              <template slot-scope="scope">
                <span>{{ scope.row.innerUrl==false? '否':'是'}}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="edit(scope.row.id)"
                >{{ $t('table.edit')}}</el-button>

                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="del(scope.row.id,scope.row.index)"
                >{{ $t('table.delete')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 新增菜单 -->
    <el-dialog title="新增菜单" :visible.sync="isAdd" width="30%" center>
      <el-form :model="addItem" :rules="addOrderRules" ref="addorder" label-width="130px">
        <el-form-item label="菜单名:" prop="name">
          <el-input type="text" v-model="addItem.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单Url:" prop="path">
          <el-input type="text" v-model="addItem.path"></el-input>
        </el-form-item>

        <el-form-item label="菜单排序:" prop="num">
          <el-input-number
            v-model="addItem.num"
            controls-position="right"
            :min="1"
            style="width:100%"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="是否为内部链接:" prop="innerUrl">
          <el-radio-group v-model="addItem.innerUrl">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="父资源:" prop="parentId">
          <el-select placeholder="请选择" clearable style="width:100%" v-model="addTreeName">
            <el-option style="min-height:150px;overflow-y:scroll">
              <el-tree
                :data="data2"
                ref="addTree"
                accordion
                node-key="id"
                :props="defaultProps"
                @node-click="addTree"
                @check="addTree"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAdd= false">取 消</el-button>
        <el-button type="primary" @click="addConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑菜单" :visible.sync="isEdit" width="30%" center>
      <el-form :model="editItem" label-width="100px" :rules="editOrderRules" ref="editorder">
        <el-form-item label="菜单名:" prop="name">
          <el-input type="text" v-model="editItem.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单Url:" prop="url">
          <el-input type="text" v-model="editItem.path"></el-input>
        </el-form-item>

        <el-form-item label="菜单排序:" prop="num">
          <el-input-number
            v-model="editItem.num"
            controls-position="right"
            :min="1"
            style="width:100%"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="是否为内部链接:" prop="innerUrl">
          <el-radio-group v-model="editItem.innerUrl">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父资源:">
          <el-select placeholder="根节点无父资源" clearable style="width:100%" v-model="editTreeName">
            <el-option style="min-height:150px;overflow-y:scroll">
              <el-tree
                :data="data2"
                ref="editTree"
                accordion
                node-key="id"
                :default-checked-keys="active"
                :default-expanded-keys="active"
                show-checkbox
                :props="defaultProps"
                @node-click="editTree"
                @check="editTree"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEdit= false">取 消</el-button>
        <el-button type="primary" @click="editConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //  验证角色输入是否为空值
    const validateEmpty = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('不能为空!'))
      } else {
        callback()
      }
    }
    return {
      num8: 1, //  初始化排序

      isAdd: false, // 新增权限对话框显示

      isEdit: false, //编辑权限显示对话框

      datas: [],

      data2: [],

      active: [], //  编辑回显得选中树节点
      addTreeName: '',
      editTreeName: '',
      addItem: {
        name: '',
        innerUrl: '',
        path: '',
        num: '',
        parentId: ''
      },
      // 添加菜单字段非空判断
      addOrderRules: {
        name: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        innerUrl: [
          { required: true, trigger: 'change', validator: validateEmpty }
        ],

        num: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        parentId: [
          { required: true, trigger: 'change', validator: validateEmpty }
        ]
      },

      editItem: {
        id: null,

        name: '',
        innerUrl: '',
        path: '',
        num: '',
        parentId: ''
      },

      // 添加菜单字段非空判断
      editOrderRules: {
        name: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        innerUrl: [
          { required: true, trigger: 'change', validator: validateEmpty }
        ],

        num: [{ required: true, trigger: 'blur', validator: validateEmpty }]
      },

      defaultProps: {
        children: 'children',

        label: 'label'
      },
      optionId: '', //当前操作的左侧树状结构id
      leftActive: [] //左侧树形结构默认展开
    }
  },

  mounted() {
    // this.init();

    this.getList()
    // 初始化左侧第一个根节点选中
    this.activeRoot()
  },

  watch: {
    // // 监测addTreeName为空 则把添加menuId 重置为空

    editTreeName() {
      if (this.editTreeName == '') {
        this.editItem.parentId = ''
      }
    },
    // 监测父级添加名称和父级节点的双向绑定
    addTreeName() {
      if (this.addTreeName == '') {
        this.addItem.parentId = ''
      }
    }
  },

  methods: {
    async activeRoot() {
      let result = await this.$httpGet('meun/list')

      if (result.data.code == 0) {
        //取到根节点并取到根节点的信息
        if (result.data.result.length != 0) {
          this.optionId = result.data.result[0].id

          this.leftActive = []

          this.leftActive.push(this.optionId)
          if (this.optionId) {
            this.details(this.optionId)
          }
        }
      }
    },
    //1.获取菜单列表
    async getList() {
      let result = await this.$httpGet('meun/list')
      if (result && result == []) {
        this.optionId = ''
      }
      if (result.data.code == 0) {
        var key = 'children'

        var key1 = 'label'

        function parseJson(arr) {
          arr = arr.slice()

          function toParse(arr) {
            arr.forEach(function(item) {
              if (item.sub && Array.isArray(item.sub)) {
                item[key] = item.sub

                item[key1] = item.name

                toParse(item[key])
              }

              delete item.sub

              delete item.name
            })

            return arr
          }

          return toParse(arr)
        }

        this.data2 = parseJson(result.data.result)
      }
    },

    //2.单条项的详情
    async details(id) {
      let params = 'id=' + id

      let result = await this.$httpGet('meun/child', params)

      this.datas = []

      this.datas = result.data.result
    },
    //3.菜单列表点击显示右侧内容
    handleNodeClick(data) {
      this.$refs.tree.setCheckedKeys([])
      this.$refs.tree.setCheckedKeys([data.id])
      this.leftActive = []
      this.optionId = data.id
      this.leftActive.push(this.optionId)
      this.details(data.id)
    },
    //4.点击弹出增加菜单弹出层
    addMenu() {
      this.isAdd = true

      // 重置父资源名称
      this.addTreeName = ''

      this.getList()

      // 重置表单
      this.$refs.addorder.resetFields()
    },
    //5.新增树形结构点击
    addTree(data) {
      this.$refs.addTree.setCheckedKeys([])

      this.$refs.addTree.setCheckedKeys([data.id])

      this.addItem.parentId = data.id

      this.addTreeName = data.label

      console.log(data)
    },
    //6.增加菜单提交
    addConfirm() {
      this.$refs.addorder.validate(valid => {
        if (valid) {
          this.$httpPost('meun/add', this.addItem)
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: 'success',
                  message: res.data.result
                })

                this.isAdd = false
                // 重新刷新当前左侧点击对应的子菜单
                this.getList()
                if (this.optionId) {
                  this.details(this.optionId)
                }
                // 重新加载整个菜单数
              } else {
                this.$message({
                  type: 'error',

                  message: res.data.msg
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    // 7.删除菜单操作
    del(id, index) {
      // console.log(id)

      let that = this

      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',

        cancelButtonText: '取消',

        type: 'warning'
      })

        .then(() => {
          let params = 'id=' + id

          that
            .$httpGet('meun/del', params)
            .then(function(res) {
              if (res.data.code == 0) {
                that.getList()
                if (that.optionId) {
                  that.details(that.optionId)
                }
                that.$message({
                  type: 'success',

                  message: res.data.result
                })
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

          return
        })
    },

    // 8.点击编辑弹出对话框

    async edit(id) {
      let that = this

      this.isEdit = false
      that.editTreeName = ''

      let params = 'id=' + id

      let result = await this.$httpGet('meun/edit', params)

      if (result.data.code == 0) {
        this.isEdit = true

        this.editItem = {
          id: id,

          name: result.data.result.name,

          path: result.data.result.path,

          parentId: result.data.result.parentId,
          num: result.data.result.num,
          innerUrl: result.data.result.innerUrl.toString()
        }
        // 重新请求树形结构
        this.getList()
        //选中标注的树形结构
        this.active = []

        this.active.push(result.data.result.parentId)
      }

      function getArray(data, id) {
        for (var i in data) {
          if (data[i].id == id) {
            that.editTreeName = data[i].label

            console.log(data[i].label)

            break
          } else {
            getArray(data[i].children, id)
          }
        }
      }

      getArray(this.data2, result.data.result.parentId)

      // 清除上次的绿色框
      that.$refs.editorder.clearValidate()
    },
    //9.编辑权限树形结构
    editTree(data) {
      this.$refs.editTree.setCheckedKeys([])

      this.$refs.editTree.setCheckedKeys([data.id])

      this.editItem.parentId = data.id

      this.editTreeName = data.label
    },
    // 10.编辑确定
    editConfirm() {
      this.$refs.editorder.validate(valid => {
        if (valid) {
          this.$httpPost('meun/update', this.editItem)
            .then(res => {
              if (res.data.code == 0) {
                this.getList()
                this.$message({
                  type: 'success',

                  message: res.data.result
                })
                this.isEdit = false
                if (this.optionId) {
                  this.details(this.optionId)
                }
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
.menuManger {
  .menuTree {
    margin-top: 60px;
  }

  .addMenu {
    padding: 30px 0;
  }
}
</style>
