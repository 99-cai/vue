<template>
  <div style="padding:30px;">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户id" width="80px" prop="uid">
          <el-input v-model="form.uid" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="道具id">
          <el-input v-model="form.itemID" placeholder="道具id" style="width:290px"></el-input>
        </el-form-item>
        <el-form-item label="道具数量">
          <el-input v-model="form.itemNum" placeholder="道具数量" style="width:290px"></el-input>
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
        <el-form :model="form" :label-position="labelPosition">
          <el-form-item label="用户id" prop="uid">
            <el-input v-model="form.uid" placeholder="用户ID" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="道具id">
            <el-input v-model="form.itemID" placeholder="道具id" style="width:290px"></el-input>
          </el-form-item>
          <el-form-item label="道具数量">
            <el-input v-model="form.itemNum" placeholder="道具数量" style="width:290px"></el-input>
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
          <el-table-column prop="uid" label="用户id" style="width:220px">
          </el-table-column>
          <el-table-column prop="itemID" label="道具id" style="width:320px">
          </el-table-column>
          <el-table-column prop="itemNum" label="道具数量" style="width:300px">
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
      <!-- <div class="block" style="margin-top:15px;">
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[6]" :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div> -->
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
        uid: 20433,
        itemID: "",
        itemNum: "",
      },
      exit:{
        uid:'',
        itemID:'',
        itemNum:''
      },
      tableData: [],
      submitType: "",
      zdydialog: false,
      loading: true,

      // currentPage: 1, //初始页
      // pagesize: 6, //    每页的数据,数字是几就显示几条
      // total: 1000
    }
  },
  created() {
    this.init()
  },
  methods: {
        //查询
        search() {
      this.init()
    },
    init() {
      let _this = this;
      var obj= {
          uid: this.form.uid,
          itemID: this.form.itemID,
          itemNum: this.form.itemNum
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
        uid: '',
        itemID: '',
        itemNum: '',
      }
      this.zdydialog = false
      this.submitType = "add"
    },
    //添加
    submit() {
      if (this.submitType == "add") {
        this.tableData.push(this.form)//向tableData中添加数据
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
      // this.form = row     //将该行对象数据直接赋给form
      this.zdydialog = false //自定义对话框展示
      this.submitType = "update";
      this.exit.uid = row.uid
      this.exit.itemID = row.itemID
      this.exit.itemNum = row.itemNum
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
