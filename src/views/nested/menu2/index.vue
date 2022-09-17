<template>
  <div style="padding:30px;">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="Uid" width="80px" prop="id">
          <el-input v-model="form.id" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="作物成熟时间">
          <el-input v-model="form.time" placeholder="(单位:  秒,xx秒后成熟)" style="width:290px"></el-input>
        </el-form-item>
        <el-form-item label="解锁新的种子">
          <el-input v-model="form.newneed" placeholder="种子id" style="width:290px"></el-input>
        </el-form-item>
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
          <el-form-item label="作物成熟时间">
            <el-input v-model="form.time" placeholder="(单位:  秒,xx秒后成熟)" style="width:290px"></el-input>
          </el-form-item>
          <el-form-item label="解锁新的种子">
            <el-input v-model="form.newneed" placeholder="种子id" style="width:290px"></el-input>
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
          <el-table-column prop="id" label="Uid" style="width:220px">
          </el-table-column>
          <el-table-column prop="time" label="作物成熟时间" style="width:320px">
            <template slot-scope="scope">
              {{scope.row.time}}秒后成熟
            </template>
          </el-table-column>
          <el-table-column prop="newneed" label="解锁种子ID" style="width:300px">
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
        time: '',
        newneed: '',
      },
      tableData: [{
        id: '0',
        time: '20',
        newneed: '3',
      },],
      submitType: "",
      zdydialog: false,
      loading: true,
    }
  },

  methods: {
    add() {
      this.form = {
        id: '',
        time: '',
        newneed: ''
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

}
</script>
