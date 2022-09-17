<template>
  <div style="padding:30px;">
    <div v-show="$route.meta.showfater">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="Uid" width="80px" prop="id">
          <el-input v-model="form.id" placeholder="用户ID"></el-input>
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
      <!-- 添加 -->
      <el-button type="primary" @click="add" style="margin-right:20px">重置</el-button>

      <el-button type="primary" @click="submit">添 加</el-button>
      <!-- 添加弹框 -->
      <el-dialog style="width: 1000px;height: 1000px;" title="添加道具" :visible.sync="zdydialog">
      <el-form :model="form" :label-position="labelPosition">
        <el-form-item label="Uid" prop="id">
          <el-input  v-model="form.id" placeholder="用户ID" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="装盘抽奖券">
          <el-select v-model="form.raffleticket" >
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
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="Uid" width="180">
          </el-table-column>
          <el-table-column prop="raffleticket" label="装盘抽奖券" width="180">
          </el-table-column>
          <el-table-column prop="quality" label="对应品级" width="180">
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
      labelPosition:'top',
      form: {
        id:'',
        raffleticket: '',
        quality:''
      },
      zdydialog:false,
      loading: true,
      tableData: [{
        id: '0',
        raffleticket: '10',
        quality: '绿券',
      },],
    }
  },

  methods: {
    add(){
      this.form ={
        id:'',
        raffleticket:'',
        quality:''
      }
      this.zdydialog = false
      this.submitType = "add"
    },
    submit() {
      if(this.submitType == "add"){
        this.tableData.push(this.form)//向tableData中添加数据
        this.zdydialog = false
      }else{

      }
    },
    cancel() {
      this.zdydialog = false
    },

  },
  //监听两个输入框的值
  watch: {
    form:{
      handler(newVal,oldVal){
        this.form.quality = this.form.raffleticket;

      },
      deep:true
    }
  }

}
</script>