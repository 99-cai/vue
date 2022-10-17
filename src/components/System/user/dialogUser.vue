<template>
  <div>
    <div>
      <el-dialog :title="dialogUser.title" :visible.sync="dialogUser.show" width="30%" destroy-on-close @open='openDialog'
                 :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false">
        <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
          <el-form-item label="登录账号" prop="loginame">
            <el-input v-model="formData.loginame" placeholder="登录账号" style="width:90%;" />
          </el-form-item>
          <el-form-item label="登录密码" prop="password" v-if="dialogUser.option == 'add'">
            <el-input v-model="formData.password" type="password" placeholder="登录密码" style="width:90%;" />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formData.phone" placeholder="手机号码" type="phone" style="width:90%;" />
          </el-form-item>
          <el-form-item label="分配权限" >
            <el-tree :data="data" default-expand-all :check-strictly='isCheck' show-checkbox node-key="id" :default-checked-keys="defaultkey"
               :props="defaultProps" ref="treeRef">
            </el-tree>
          </el-form-item>
          <!-- <el-form-item label="分配角色" prop="rules">
            <el-select v-model="formData.rules" placeholder="请选择角色" style="width:90%;">
              <el-option v-for="(item,index) in roleList" :key="index" :label="item.title" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-dialog title="分配权限" :visible.sync="permissionsDialog.show" width="16%" destroy-on-close @close='closeDialog' @open='openDialog'
               :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false">
            <el-tree :data="data" default-expand-all :check-strictly='isCheck' show-checkbox node-key="_id" :default-checked-keys="defaultkey"
               :props="defaultProps" ref="treeRef">
            </el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="permissionsDialog.show = false">取 消</el-button>
            <el-button type="primary" @click="giveRules">确 定</el-button>
          </span>
          </el-dialog>
          <!-- <pre>
          {{formData}}
        </pre> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUser.show = false">取 消</el-button>
          <el-button type="primary" v-if="dialogUser.option == 'add'" @click="addUser('form')">确 定</el-button>
          <el-button type="primary" v-if="dialogUser.option == 'edit'" @click="editUser('form')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRolesList,getAllRouter } from "@/api/system/index";
import { getRouter } from "@/api/user";
export default {
  props: ['dialogUser', 'formData'],
  data() {
    return {
      rules: {
        loginame: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入负责人手机号码', trigger: 'blur' }],
        rules: [{ required: true, message: '请为该用户分配角色', trigger: 'change' }],
      },
      permissionsDialog: {
        show: false,
        id: ""
      },
      roleList: [],
      data: [],
      isCheck: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  methods: {
    //菜单列表
    getMenuList() {
            this.tableLoading = true
            getRouter().then((res) => {

                this.tableData = res.data.routeList;
                console.log(this.tableData);
                this.tableLoading = false
            });
        },
    openDialog() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();//解决dialog打开自动触发了下拉选择框的校验
        // 获取角色列表
        getRolesList().then(res => {
          this.roleList = res.data
        })
      })
    },
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
    addUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("addUser")
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    giveRules() {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      let idStr = keys.join(',')
      if (idStr == '') {
        idStr = " "
      }
      this.$emit('giveRules', idStr)
    },
    closeDialog() {
      this.$emit('resetDefaultKey')
    },
    openDialog() {
      getAllRouter().then(res => {
        console.log(res);
        this.data = res.data
      })
    },
    editUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("updateUser")
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style>
</style>