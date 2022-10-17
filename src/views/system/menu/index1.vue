<template>
  <div class="main" style="margin: 10px">
    <el-card>
      <Toobar :AddBtnAuth="AddBtnAuth" @handleAdd='handleAdd'></Toobar>
      <el-card style="margin-top: 10px">
        <el-table ref="table" :data="tableData" style="width: 100%" row-key="_id" lazy :load="getChildMenus"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
          <el-table-column type="index" label="#" width="55"> </el-table-column>
          <el-table-column prop="title" label="菜单标题" width="165" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="icon" label="图标" align="center" width="70">
            <template slot-scope="scope">
              <!-- <svg-icon :icon-class="scope.row.icon" v-if="scope.row.icon" /> -->
              <!-- <e-icon :icon-name="scope.row.icon" v-if="scope.row.icon" /> -->
              <!-- <span v-else>-</span> -->
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="70" align="center"> </el-table-column>
          <el-table-column prop="permissions" width="70" label="权限标识" align="center">
            <template slot-scope="scope">
              {{ scope.row.permissions == '' ? '--' : scope.row.permissions }}
            </template>
          </el-table-column>
          <el-table-column prop="component" label="组件路径" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.component == 'Layout'">--</span>
              <span v-else>{{ scope.row.component== undefined ? '--' : scope.row.component }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="menuType" label="菜单类型" align="center" width="80">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.menuType == C">目录</el-tag>
              <el-tag type="warning" v-if="scope.row.menuType == M">菜单</el-tag>
              <el-tag type="danger" v-if="scope.row.menuType == F">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="hidden" label="是否可见" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.hidden" disabled active-value="1" active-text="是" inactive-value="0" inactive-text="否">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="hidden" label="是否缓存" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.noCache" disabled active-value="1" active-text="是" inactive-value="0" inactive-text="否">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="创建日期" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              {{ scope.row.date | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="primary" :disabled='scope.row.system == 1' @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" :disabled='scope.row.system == 1' @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <DialogMenu :dialogMenu='dialogMenu' :formData='formData' @handleSubmit='handleSubmit' @handleSubmitEdit='handleSubmitEdit'></DialogMenu>
  </div>
</template>

<script>
import Toobar from "@/components/System/toobar";
import { getMenuList, addMenu, delMenu, updateMenu } from "@/api/system/index";
import DialogMenu from "@/components/System/menu/dialogMenu.vue";
export default {
  data() {
    return {
      AddBtnAuth: ["add"],
      tableData: [],
      dialogMenu: {
        show: false
      },
      formData: {},
      oldPid: ""
    };
  },
  methods: {
    getMenuList() {
      getMenuList({ pid: 0 }).then((res) => {
        console.log(res);
        this.tableData = res.data.menuList;
      });
    },
    getChildMenus(tree, treeNode, resolve) {
      const data = { pid: tree._id }
      getMenuList(data).then((res) => {
        resolve(res.data)
      });
    },
    // 新增按钮触发
    handleAdd() {
      this.dialogMenu = {
        show: true,
        title: "新增菜单",
        option: 'add'
      }
      this.formData = {
        menuType: C,
        hidden: 1,
        pid: "",
        icon: "",
        path: "",
        title: "",
        sort: "",
        name: "",
        component: "",
        permissions: "",
        noCache: "0"
      }
    },
    //提交新增请求
    handleSubmit() {
      addMenu(this.formData).then(res => {
        console.log(res);
        this.dialogMenu.show = false
        this.$message.success('新增成功！')
        if (this.formData.pid != 0) {
          // 实现无感刷新
          getMenuList({ pid: this.formData.pid }).then(res => {
            this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.formData.pid, res.data)
          })
        } else {
          this.getMenuList()
        }
      })
    },
    // 提交编辑请求
    handleSubmitEdit() {
      if (this.formData.id == this.formData.pid) {
        this.$message.error('自己不能成为自己的下级！')
        return false
      }
      updateMenu(this.formData.id, this.formData).then(res => {
        this.dialogMenu.show = false
        this.$message.success('修改成功！')
        if (this.formData.pid != 0) {
          if (this.formData.pid != this.oldPid) {
            // 这时候说明已经改变了上级类目
            getMenuList({ pid: this.oldPid }).then(res => {
              this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.oldPid, res.data)
              getMenuList({ pid: this.formData.pid }).then(res => {
                this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.formData.pid, res.data)
              })
            })
          } else {
            getMenuList({ pid: this.formData.pid }).then(res => {
              this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.formData.pid, res.data)
            })
          }
        } else {
          this.getMenuList()
        }
        // // 无感刷新子节点数据
        // getMenuList({ pid: this.formData.pid }).then(res => {
        //   this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.formData.pid, res.data)
        // })
      })
    },
    // 删除按钮触发
    handleDelete(row) {
      this.$confirm('此操作将永久删除该菜单，并删除所属子级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMenu(row._id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 无感刷新
          getMenuList({ pid: row.pid }).then(res => {
            this.$set(this.$refs.table.store.states.lazyTreeNodeMap, row.pid, res.data)
          })
          if (row.pid == 0) {
            this.getMenuList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 编辑按钮触发
    handleEdit(row) {
      this.dialogMenu = {
        show: true,
        title: '修改菜单',
        option: "edit"
      }
      this.formData = {
        id: row._id,
        menuType: row.menuType,
        icon: row.icon,
        hidden: row.hidden,
        title: row.title,
        path: row.path,
        sort: row.sort,
        name: row.name,
        component: row.component,
        pid: row.pid + '',
        permissions: row.permissions,
        noCache: row.noCache == 0 ? '0' : '1'
      }
      this.oldPid = row.pid
    }
  },
  mounted() {
    this.getMenuList();
  },
  components: {
    Toobar,
    DialogMenu
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-switch.is-disabled {
  opacity: 1;
}
::v-deep .el-switch.is-checked .el-switch__core {
  &:hover {
    cursor: pointer;
  }
}
</style>