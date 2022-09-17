<template>
  <div style="padding:30px;">
    <div v-show="$route.meta.showfater">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="装盘抽奖券">
          <el-select v-model="form.raffleticket">
            <el-option label="10" value="10"></el-option>
            <el-option label="20" value="20"></el-option>
            <el-option label="30" value="30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对应品级">
          <el-select v-model="form.raffleticket">
            <el-option label="绿券" value="绿券"></el-option>
            <el-option label="紫券" value="紫券"></el-option>
            <el-option label="橙券" value="橙券"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="add">添加道具</el-button>
      <!-- 表单 -->
      <div class="tableMain">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="ID" width="180">
          </el-table-column>
          <el-table-column prop="raffleticket" label="装盘抽奖券" width="180">
          </el-table-column>
          <el-table-column prop="quality" label="对应品级" width="180">
          </el-table-column>
        </el-table>
        <!-- 添加操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          </template>
     </el-table-column>


      </div>
      <!-- 添加弹窗 -->
      <el-dialog style="width: 1000px;height: 1000px;" title="添加道具" :visible.sync="zdydialog">
      <el-form :model="form">
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



    </div>
    <!-- 子路由 -->
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        raffleticket: '',
      },
      loading: true,
      tableData: [{
        id: '0',
        raffleticket: '10',
        quality: '绿券',

      },],
      zdydialog:false,
      submitType : "",


    }
  },

  methods: {
    add(){
      this.form ={
        id:'',
        raffleticket:'',
        quality:''
      }
      this.zdydialog = true;
      this.submitType = "add"
    },
    submit() {
      if(this.submitType == "add"){
        this.tableData.push(this.form)//向tableData中添加数据
      }else{

      }
      this.zdydialog = false
    },
    handleEdit(index, row) {
      console.log(index)
      console.log(row)
      this.submitType = "update";
      this.row = row
      this.zdydialog = true
    },
  }

}
</script>