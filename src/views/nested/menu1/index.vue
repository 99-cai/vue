<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Uid">
      <div class="tableAll">
        <div class="addArea">
          <el-button class="add_btn" type="primary" @click="add">添加道具</el-button>
        </div>
    
        <div class="tableMain">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="Uid" width="180">
            </el-table-column>
            <el-table-column prop="name" label="属性" width="180">
            </el-table-column>
            <el-table-column prop="value" label="数值" width="180">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
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
    
        <el-dialog style="width: 1000px;height: 1000px;" title="添加道具" :visible.sync="zdydialog">
          <el-form :model="form">
            <el-form-item label="Uid" width="80px">
              <el-input class="dialog_input" v-model="form.id" placeholder="用户ID"></el-input>
            </el-form-item>
            <el-form-item label="属性" width="80px">
              <el-select class="dialog_input" v-model="form.name" placeholder="选择属性">
                <el-option label="宝石" value="宝石"></el-option>
                <el-option label="金币" value="金币"></el-option>
                <el-option label="等级" value="等级"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数值" width="80px">
              <el-input class="dialog_input" v-model="form.value"></el-input>
            </el-form-item>
            <el-form-item label="日期" width="80px">
              <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
    
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <router-view />
    </el-alert>
  </div>
</template>

<script type="text/javascript">
  import { reformat } from './reformatDate'

export default {
  name:"eltable",
  data() {
    return {
      tableData: [{
        id: '0',
        name: '宝石',
        value:'100',
        date: '2022-9-15'
      }, {
        id: '1',
        name: '金币',
        value:'100',
        date: '2022-9-15'
      }, {
        id: '2',
        name: '等级',
        value:'100',
        date: '2022-9-15'
      },],
      zdydialog: false,

      formLabelWidth: '80px',
      form: {},
      submitType : "",
    }
  },
  methods: {
    add() {
      this.form = {
        id: '',
        name: '',
        date: '',
      }
      this.submitType = "add";
      this.zdydialog = true
    },
    submit() {
      //alert(this.form.date)
      // var ss = reformat(this.form.date)
      // alert(ss)
      this.zdydialog = false

      if(this.submitType == "add"){
        this.form.date = reformat(this.form.date);
        this.tableData.push(this.form)
      }else{

      }

    },
    handleEdit(index, row) {
      // this.form = this.tableData[index]
      this.submitType = "update";
      this.form = row
      this.zdydialog = true
    },
    handleDelete(index, row) {
      this.$confirm('此操作将, 是否继续?', '提示', {
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
    cancel() {
      this.zdydialog = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
}
</script>


<style>
.tableAll{
  margin-left: 100px;
  width:900px;
  height: 300px;
  /* border: red 1px solid; */
}
.addArea{
  height: 40px;
  width: 900px;
  /* border: red 1px solid; */
}
.add_btn{
  float: right;
  margin-right: 20px;
}
.dialog_input{
  width:220px;
}

</style>
