<template>
  <div class="main" style="margin:10px;">
    <el-card>
      <Toobar :AddBtnAuth="AddBtnAuth" @handleAdd='handleAdd'></Toobar>
      <el-card style="margin-top:20px;">
        <div slot="header" class="clearfix">
          <span>角色列表</span>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" label="#" align="center">
          </el-table-column>
          <el-table-column prop="title" label="角色名" align="center">
          </el-table-column>
          <el-table-column prop="roleType" label="角色级别" align="center">
            <template slot-scope="scope">
              <el-tag>{{scope.row.roleType}}级</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="创建时间" align="center">
            <template slot-scope="scope">
              {{scope.row.date | formatDate}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="success" :disabled="scope.row.roleType == 1 || scope.row.roleType == 2 || scope.row.roleType == 3"
                         @click.native.prevent="setPermissions(scope.row)">
                分配权限
              </el-button>
              <el-button type="warning" :disabled="scope.row.roleType == 1 || scope.row.roleType == 2 || scope.row.roleType == 3"
                         @click.native.prevent="showEditDialog(scope.row)">
                编辑
              </el-button>
              <el-button type="danger" :disabled="scope.row.roleType == 1 || scope.row.roleType == 2 || scope.row.roleType == 3"
                         @click.native.prevent="handleDel(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <!-- dialog -->
    <RolesDialog :rolesDialog='rolesDialog' :formData='formData' @addRoles='addRoles' @editRoles='editRoles'></RolesDialog>
    <PermissionsDialog ref="child" @giveRules='giveRules' @resetDefaultKey='resetDefaultKey' :permissionsDialog='permissionsDialog'
                       :defaultkey='defaultkey'>
    </PermissionsDialog>
  </div>
</template>

<script>
import Toobar from "@/components/System/toobar";
import { getRolesList, authorize, addRoles, editRoles, deleteRoles } from "@/api/system/index";
import RolesDialog from "@/components/System/roles/rolesDialog";
import PermissionsDialog from "@/components/System/roles/permissionsDialog";

export default {
  data() {
    return {
      AddBtnAuth: ["add"],
      tableData: [],
      loading: false,
      rolesDialog: {
        show: false,
        title: ""
      },
      formData: {},
      permissionsDialog: {
        show: false,
        id: ""
      },
      defaultkey: []
    }
  },
  methods: {
    handleAdd() {
      this.rolesDialog = {
        show: true,
        title: "新增角色",
        option: 'add'
      }
      this.formData = {
        title: "",
        roleType: ""
      }
    },
    // 获取角色列表
    getRolesList() {
      getRolesList().then(res => {
        this.tableData = res.data
      })
    },
    addRoles() {
      addRoles(this.formData).then(res => {
        this.rolesDialog.show = false
        this.$notify({
          title: '成功',
          message: '新建角色成功！',
          type: 'success'
        });
        this.getRolesList()
      })
    },
    showEditDialog(row) {
      this.rolesDialog = {
        show: true,
        title: "编辑角色",
        option: 'edit'
      }
      this.formData = {
        id: row._id,
        title: row.title,
        roleType: row.roleType
      }
    },
    editRoles() {
      editRoles(this.formData, this.formData.id).then(res => {
        this.rolesDialog.show = false
        this.$notify({
          title: '成功',
          message: '编辑角色成功！',
          type: 'success'
        });
        this.getRolesList()
      })
    },
    handleDel(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoles(row._id, { roleType: row.roleType }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getRolesList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 点击分配权限按钮触发
    setPermissions(row) {
      this.permissionsDialog = {
        show: true,
        id: row._id
      }
      let arr = row.rules.split(',')
      this.$refs.child.isCheck = true
      console.log(arr);
      this.defaultkey = arr
      setTimeout(() => {
        this.$refs.child.isCheck = false
      }, 500);
    },
    resetDefaultKey() {
      this.defaultkey = []
    },
    giveRules(data) {
      authorize(this.permissionsDialog.id, { rules: data }).then(res => {
        this.$notify({
          title: '成功',
          message: '分配成功！',
          type: 'success'
        });
        this.permissionsDialog.show = false
        this.getRolesList()
      })
    }



  },
  mounted() {
    this.getRolesList()
  },
  components: {
    Toobar,
    RolesDialog,
    PermissionsDialog
  },
}
</script>

<style>
</style>