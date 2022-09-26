<template>
  <div style="padding:30px;">
    <div v-show="$route.meta.showfater">
      <el-form :inline="true" :model="form" class="demo-form-inline" action="https://stage.bjxscy.com/center-api-adminppgame/admin/userInfoSet">
        <el-form-item label="Uid" width="80px" prop="id">
          <el-input v-model="form.uid" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="装盘抽奖券" prop="ticket">
          <el-input v-model="form.ticket" placeholder="格式[10,20,30],对应关系[绿券,紫券,橙券]" style="width:290px">
          </el-input>
        </el-form-item>
        <!-- 添加 -->
        <div style="float:right">
          <el-button type="primary" @click="add" style="margin-right:20px">重置</el-button>
          <el-button type="primary" @click="search" style="margin-right:20px">查询</el-button>
          <el-button type="primary" @click="submit">添 加</el-button>
        </div>
      </el-form>
      <!-- 添加弹框 -->
      <el-dialog style="width: 1000px;height: 1000px;" title="添加道具" :visible.sync="zdydialog">
        <el-form :model="exit" :label-position="labelPosition" action="https://stage.bjxscy.com/center-api-adminppgame/admin/userInfoSet">
          <el-form-item label="Uid" prop="uid">
            <el-input v-model="exit.uid" placeholder="用户ID" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装盘抽奖券">
            <el-select v-model="exit.ticket">
              <el-option label="10" value="10"></el-option>
              <el-option label="20" value="20"></el-option>
              <el-option label="30" value="30"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="对应品级">
            <el-select v-model="exit.quality">
              <el-option label="绿券" value="绿券"></el-option>
              <el-option label="紫券" value="紫券"></el-option>
              <el-option label="橙券" value="橙券"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>


      <!-- 表单 -->
      <div class="tableMain">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"
          :cell-style="{ textAlign: 'center' }" :header-cell-style="{textAlign: 'center'}">
          <el-table-column prop="uid" label="Uid" style="width:30%">
          </el-table-column>
          <el-table-column prop="ticket" label="装盘抽奖券" style="width:33%">
          </el-table-column>
          <!-- <el-table-column prop="quality" label="对应品级" style="width:33%">
          </el-table-column> -->
          <!-- 添加弹框 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block" style="margin-top:15px;">
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[6]" :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>
    </div>
    <!-- 子路由 -->
    <router-view />
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      labelPosition: 'top',
      form: {
        uid: 20436,
        ticket: '',
        // quality:''
      },
      exit:{
        uid:'',
        ticket:''
      },
      tableData: [],
      zdydialog: false,
      loading: true,
      submitType: "",
      currentPage: 1, //初始页
      pagesize: 6, //    每页的数据,数字是几就显示几条
      total: 1000
    }
  },
  created() {
    this.init()
  },
  methods: {
    search() {
      this.init()
    },
    init() {
      let _this = this;
      var obj = {
        uid: this.form.uid,
        ticket: this.form.ticket
      }
      this.tableData = []
      axios({
        url: 'https://stage.bjxscy.com/center-api-adminppgame/admin/userInfoSet',
        method: 'post',
        data: JSON.stringify(obj),
        headers: { "Content-type": "application/json" }

      }).then(res => {
        console.log(res)
        // this.tableData = res.data
        this.tableData.push(res.data.data.user)
        // this.total.push(total)
      })
    },
    add() {
      this.form = {
        id: '',
        ticket: '',
        quality: ''
      }
      this.zdydialog = false
      this.submitType = "add"
    },
    submit() {
      if (this.submitType == "add") {
        this.tableData.push(this.form)//向tableData中添加数据
        this.zdydialog = false
      } else {

      }
    },
    cancel() {
      this.zdydialog = false
    },
    handleEdit(index, row) {
      this.form = row     //将该行对象数据直接赋给form
      this.zdydialog = false //自定义对话框展示
      this.submitType = "update";
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除改操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val;
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val;
    },
  },
  //监听两个输入框的值
  watch: {
    form: {
      handler(newVal, oldVal) {
        // this.form.quality = this.form.tickets;

      },
      deep: true
    }
  }

}
</script>
<style>
.tableAll {
  /* margin-left: 100px; */
  width: 100%;
  height: 100vh;
  /* border: red 1px solid; */
}

.addArea {
  height: 40px;
  width: 920px;
  /* border: red 1px solid; */
}

.add_btn {
  float: left;
}

.dialog_input {
  width: 220px;
}
</style>