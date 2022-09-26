<template>
  <div style="padding:30px;">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="Uid" width="80px" prop="uid">
          <el-input v-model="form.uid" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="作物成熟时间">
          <el-input v-model="form.plant" placeholder="(单位:  秒,xx秒后成熟)" style="width:290px"></el-input>
        </el-form-item>
        <el-form-item label="解锁新的种子">
          <el-input v-model="form.seed" placeholder="种子id" style="width:290px"></el-input>
        </el-form-item>
        <!-- 添加 -->
        <div style="float:right">
          <el-button type="primary" @click="search" style="margin-right:20px">查询</el-button>
          <el-button type="primary" @click="submit">添 加</el-button>
        </div>
      </el-form>
      <!-- 添加弹框 -->
      <el-dialog style="width: 1000px;height: 1000px;" title="添加道具" :visible.sync="zdydialog">
        <el-form :model="exit" :label-position="labelPosition">
          <el-form-item label="Uid" prop="uid">
            <el-input v-model="exit.uid" placeholder="用户ID" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="作物成熟时间">
            <el-input v-model="exit.plant" placeholder="(单位:  秒,xx秒后成熟)" style="width:290px"></el-input>
          </el-form-item>
          <el-form-item label="解锁新的种子">
            <el-input v-model="exit.seed" placeholder="种子id" style="width:290px"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 表单 -->
      <div class="tableMain">
        <el-table :data="tableData" style="width: 100%" :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{textAlign: 'center'}">
          <el-table-column prop="uid" label="Uid" style="width:220px">
            <!-- {{form.uid}} -->
          </el-table-column>
          <el-table-column prop="plant" label="作物成熟时间" style="width:320px">
            <template slot-scope="scope">
              {{scope.row.plantTimes}}秒后成熟
            </template>
          </el-table-column>
          <el-table-column prop="seed" label="解锁种子ID" style="width:300px">
            <template slot-scope="scope">
              {{scope.row.seed}}
            </template>
          </el-table-column>
          <!-- 添加弹框 -->
          <el-table-column label="操作">
            <template slot-scope="scope2">
              <el-button size="small" @click="handleEdit(scope2.$index, scope2.row)">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope2.$index, scope2.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block" style="margin-top:15px;">
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[6]" :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 子路由 -->
    <router-view />
  </div>
</template>
<script>
// import Axios from 'axios'

import axios from 'axios';

export default {
  data() {
    return {
      labelPosition: 'top',
      form: {
        uid: 20441,
        plant: '',
        seed: '',
      },
      exit: {
        uid: '',
        plant: '',
        seed: '',
      },
      tableData: [],
      submitType: "",
      zdydialog: false,
      loading: true,
      currentPage: 1, //初始页
      pagesize: 6, //    每页的数据,数字是几就显示几条
      total: 1000
    }
  },
  created() {
    this.init()
  },
  methods: {
    //查询
    search(){
      this.init()
    },
    init() {
      let _this = this;
      var obj= {
          uid: this.form.uid,
          plant: this.form.plant,
          seed: this.form.seed
      }
      this.tableData = []
      axios({
        url: 'https://stage.bjxscy.com/center-api-adminppgame/admin/userInfoSet',
        method: 'post',
        data: JSON.stringify(obj),
        headers: {"Content-type": "application/json"}
        //dataType: "json"
      }).then(res => {
        console.log(res)
        //this.tableData = JSON.parse(JSON.stringify(this.tableData))
        this.tableData.push(res.data.data.user)
        // this.tableData = res.data 
         console.log(res.data);
        //this.total = res.
      })
    },
    add() {
      this.form = {
        uid: '',
        plant: '',
        seed: ''
      }
      this.zdydialog = false
      this.submitType = "add"
    },
    //添加
    submit(res) {
      if (this.submitType == "add") {
        this.tableData.push(this.form)//向tableData中添加数据
        // this.tableData.push(res.data)
        this.zdydialog = false
      } else {

      }
    },
    //弹框不显示
    cancel() {
      this.zdydialog = false
    },
    //编辑
    handleEdit(index, row) {
      //this.form = row     //将该行对象数据直接赋给form
      this.zdydialog = true //自定义对话框展示
      this.submitType = "update";
      this.exit.uid = row.uid
      this.exit.plant = row.plantTimes
      this.exit.seed = row.uid
    },
    //删除
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

}
</script>
