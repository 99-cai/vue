<template>
  <div style="padding:30px;">
    <div v-show="$route.meta.showfater">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="Uid" width="80px" prop="id">
          <el-input v-model="form.id" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="装盘抽奖券">
          <el-input v-model="form.raffleticket" placeholder="格式[10,20,30],对应关系[绿券,紫券,橙券]" style="width:290px">
          </el-input>

          <!-- <el-select v-model="form.raffleticket">
            <el-option label="10" value="10"></el-option>
            <el-option label="20" value="20"></el-option>
            <el-option label="30" value="30"></el-option>
          </el-select> -->
        </el-form-item>
        <!-- <el-form-item label="对应品级">
          <el-select v-model="form.quality">
            <el-option label="绿券" value="绿券"></el-option>
            <el-option label="紫券" value="紫券"></el-option>
            <el-option label="橙券" value="橙券"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- 添加 -->
        <div style="float:right">
          <el-button type="primary" @click="add" style="margin-right:20px">重置</el-button>
          <el-button type="primary" @click="submit">添 加</el-button>
        </div>
      </el-form>
      <!-- 添加弹框 -->
      <el-dialog style="width: 1000px;height: 1000px;" title="添加道具" :visible.sync="zdydialog">
        <el-form :model="form" :label-position="labelPosition">
          <el-form-item label="Uid" prop="id">
            <el-input v-model="form.id" placeholder="用户ID" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装盘抽奖券">
            <el-select v-model="form.raffleticket">
              <el-option label="10" value="10"></el-option>
              <el-option label="20" value="20"></el-option>
              <el-option label="30" value="30"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="对应品级">
            <el-select v-model="form.quality">
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
        <el-table :data="tableData" style="width: 100%" :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{textAlign: 'center'}">
          <el-table-column prop="id" label="Uid" style="width:30%">
          </el-table-column>
          <el-table-column prop="raffleticket" label="装盘抽奖券" style="width:33%">
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

    </div>
    <!-- 子路由 -->
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: 'top',
      form: {
        id: '',
        raffleticket: '',
        // quality:''
      },
      tableData: [{
        id: '0',
        raffleticket: '[100,100,100]',
        // quality: '绿券',
      }, {
        id: '1',
        raffleticket: '[10,20,30]',
      }],
      zdydialog: false,
      loading: true,
      submitType: "",
    }
  },

  methods: {
    add() {
      this.form = {
        id: '',
        raffleticket: '',
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
  },
  //监听两个输入框的值
  watch: {
    form: {
      handler(newVal, oldVal) {
        // this.form.quality = this.form.raffleticket;

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