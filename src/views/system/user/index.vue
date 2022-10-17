<template>
  <div class="main" style="margin:10px;">
    <el-card>
      <div>
        <!-- 搜索 -->
        <span>
          <el-input v-model="searchKey" clearable placeholder="输入关键字搜索" style="width: 200px" class="filter-item"
            @keyup.enter.native="toQuery" />
          <span class="filter-item">
            <el-button type="success" @click="search" icon="el-icon-search">搜索</el-button>
            <el-button type="warning" @click="reast" icon="el-icon-refresh-left">重置</el-button>
            <el-button type="primary" @click="addUser" icon="el-icon-plus">新增</el-button>
          </span>
        </span>
        <!-- <span>
          <el-button-group>
            <el-button icon="el-icon-search"></el-button>
            <el-button icon="el-icon-refresh"></el-button>
          </el-button-group>
        </span> -->
      </div>
      <el-card style="margin-top:20px;">
        <div slot="header" class="clearfix">
          <span>用户列表</span>
        </div>
        <el-table :data="tableData" stripe style="width: 100%" v-loading='loading'>
          <el-table-column type="index" label="#" align="center">
          </el-table-column>
          <el-table-column prop="username" label="登录账号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="所属角色" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号码" align="center">
            <template slot-scope="scope">
              {{(scope.row.phone)}}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="date" label="创建时间" align="center">
            <template slot-scope="scope">
              {{scope.row.date | formatDate}}
            </template>
          </el-table-column> -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button :disabled='scope.row.system == 1' type="warning"
                @click.native.prevent="showEditDialog(scope.row)">
                编辑
              </el-button>
              <el-button :disabled='scope.row.system == 1' type="danger" @click.native.prevent="handleDel(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <!-- dialog -->
    <!-- <DialogUser :dialogUser='dialogUser' :formData='formData' @addUser='addUser' @updateUser='updateUser'></DialogUser> -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="700px">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="登录账号" prop="loginame">
          <el-input v-model="formData.username" placeholder="登录账号" style="width:90%;" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="登录密码" style="width:90%;" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="formData.phone" placeholder="手机号码" type="phone" style="width:90%;" />
        </el-form-item>
        <el-form-item label="分配权限">
          <el-tree :data="data" default-expand-all show-checkbox node-key="id" :default-checked-keys="defaultkey"
            :props="defaultProps" ref="treeRef">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="editbtn" @click="editUser">确 定</el-button>
        <el-button type="primary" v-if="addbtn" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Toobar from "@/components/System/toobar";
import { getUsersList, addUser, updateUser, delUser } from "@/api/system/index";
import DialogUser from "@/components/System/user/dialogUser";
import { getRouter } from "@/api/user";
export default {
  data() {
    return {
      dialogVisible: false,
      AddBtnAuth: ["add"],
      tableData: [],
      loading: false,
      dialogUser: {
        show: false,
        title: ""
      },
      editbtn:false,
      addbtn:false,
      permissionsDialog: {
        show: false,
        id: ""
      },
      formData: {
        uid: '',
        username: "",
        password: "",
        phone: "",
        name: '',
        powerMap: {
          4: '/system/user'
        }
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      defaultkey: []
    }
  },
  methods: {
    // 新增按钮触发
    handleAdd() {
      this.dialogUser = {
        show: true,
        title: "新增用户",
        option: "add"
      }

    },
    // 获取用户列表
    getUsersList() {
      getUsersList().then(res => {
        this.loading = true
        this.tableData = res.data.userList
        console.log(this.tableData)
        this.loading = false
      })
    },
    add() {
      addUser(this.formData).then(res => {
        this.$notify({
          title: '成功',
          message: '新建用户成功！',
          type: 'success'
        });
        //this.dialogUser.show = false
        this.getUsersList()
      })
    },
    //新增用户
    addUser() {
      this.dialogVisible = true
      this.addbtn = true;
      this.editbtn = false
      getRouter().then((res) => {

        this.data = res.data.routeList;
        console.log(this.data);
        this.tableLoading = false
      });
      // addUser(this.formData).then(res => {
      //   this.$notify({
      //     title: '成功',
      //     message: '新建用户成功！',
      //     type: 'success'
      //   });
      //   //this.dialogUser.show = false
      //   //this.getUsersList()
      // })
    },
    handleDel(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(row._id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUsersList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    showEditDialog(row) {

      this.dialogVisible = true
      this.formData.uid = row.uid;
      this.formData.name = row.name;
      this.id = row._id
      this.addbtn=false;
      this.editbtn = true
      getRouter().then((res) => {

        this.data = res.data.routeList;
        console.log(this.data);
        this.tableLoading = false
      });


    },
    editUser() {
      console.log(this.formData)
      updateUser(this.formData, this.id).then(res => {
        this.$notify({
          title: '成功',
          message: '修改用户成功！',
          type: 'success'
        });
        this.dialogVisible = false
        this.getUsersList()
      })
    }
  },
  mounted() {
    this.getUsersList()
  },
  components: {
    Toobar,
    DialogUser
  },
}
</script>

<style lang="scss" scoped>

</style>