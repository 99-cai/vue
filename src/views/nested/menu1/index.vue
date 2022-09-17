<template>
  <div style="padding:30px;">

    <div class="tableAll">
      <!-- <div class="addArea">
      </div> -->
      <el-form :model="form" :inline="true">
        <el-form-item label="Uid" width="80px" prop="id">
          <el-input class="dialog_input" v-model="form.id" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="金币" prop="gold">
          <el-input v-model="form.gold" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="宝石" prop="preciousstone">
          <el-input v-model="form.preciousstone" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="integration">
          <el-input v-model="form.integration" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="日期" width="80px">
          <el-date-picker v-model="form.date" @change="getSTime" value-format="yyyy-MM-dd" type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="装备" prop="equipment">
          <el-input v-model="form.equipment" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="装备等级" prop="equipmentgrade">
          <el-input v-model="form.equipmentgrade" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="装备星级" prop="equipmentstar">
          <el-input v-model="form.equipmentstar" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="装备品质" prop="equipmentquality">
          <el-select v-model="form.equipmentquality" placeholder="选择品质" style="width:220px">
            <el-option label="低" value="低"></el-option>
            <el-option label="中" value="中"></el-option>
            <el-option label="高" value="高"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级" prop="grade">
          <el-input v-model="form.grade" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="等级经验" prop="experience">
          <el-input v-model="form.experience" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="宠物等级" prop="pet">
          <el-input v-model="form.pet" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="现金红包" prop="cash">
          <el-input v-model="form.cash" style="width:220px"></el-input>
        </el-form-item>
   
        <div style="float:right">
          <el-button type="primary" @click="add" style="margin-right:10px">重 置</el-button>
          <el-button type="primary" @click="submit">添 加</el-button>
        </div>
      </el-form>

      <el-dialog style="width: 100%;height: 100vh;" title="添加道具" :visible.sync="zdydialog">
        <el-form :model="form" :inline="true">
          <el-form-item label="Uid" width="80px" prop="id">
            <el-input class="dialog_input" v-model="form.id" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item label="金币" prop="gold">
            <el-input v-model="form.gold" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="宝石" prop="preciousstone">
            <el-input v-model="form.preciousstone" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="integration">
            <el-input v-model="form.integration" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装备" prop="equipment">
            <el-input v-model="form.equipment" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装备等级" prop="equipmentgrade">
            <el-input v-model="form.equipmentgrade" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装备星级" prop="equipmentstar">
            <el-input v-model="form.equipmentstar" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装备品质" prop="equipmentquality">
            <el-select v-model="form.equipmentquality" placeholder="选择品质" style="width:220px">
              <el-option label="低" value="低"></el-option>
              <el-option label="中" value="中"></el-option>
              <el-option label="高" value="高"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等级" prop="grade">
            <el-input v-model="form.grade" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="等级经验" prop="experience">
            <el-input v-model="form.experience" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="宠物等级" prop="pet">
            <el-input v-model="form.pet" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="现金红包" prop="cash">
            <el-input v-model="form.cash" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="日期" width="80px">
            <el-date-picker v-model="form.date" @change="getSTime" value-format="yyyy-MM-dd" type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
      <div class="tableMain">
        <el-table :data="tableData" style="width: 100%" :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{textAlign: 'center'}">
          <el-table-column prop="id" label="Uid" width="90">
          </el-table-column>
          <el-table-column prop="gold" label="金币" width="90">
          </el-table-column>
          <el-table-column prop="preciousstone" label="宝石" width="90">
          </el-table-column>
          <el-table-column prop="integration" label="积分" width="90">
          </el-table-column>
          <el-table-column prop="equipment" label="装备" width="90">
          </el-table-column>
          <el-table-column prop="equipmentgrade" label="装备等级" width="90">
          </el-table-column>
          <el-table-column prop="equipmentquality" label="装备品质" width="90">
          </el-table-column>
          <el-table-column prop="equipmentstar" label="装备星级" width="90">
          </el-table-column>
          <el-table-column prop="grade" label="等级" width="90">
          </el-table-column>
          <el-table-column prop="experience" label="等级经验" width="90">
          </el-table-column>
          <el-table-column prop="pet" label="宠物等级" width="90">
          </el-table-column>
          <el-table-column prop="cash" label="现金红包" width="90">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="100">
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

    </div>
    <router-view />

  </div>
</template>

<script type="text/javascript">
import { reformat } from './reformatDate'

export default {
  name: "eltable",
  data() {
    return {
      tableData: [{
        id: '0',
        gold: '99999',
        preciousstone: '100',
        integration: '30',
        equipment: '武器',
        equipmentgrade: '100',
        equipmentstar: '3',
        equipmentquality: '高',
        grade: '100',
        experience: '0',
        pet: '50',
        cash: '0',
        date: '2022-9-16'
      }
      ],
      zdydialog: false,
      formLabelWidth: '80px',
      form: {},
      submitType: "",
    }
  },
  methods: {
    add() {
      this.form = {
        id: '',
        gold: '',
        preciousstone: '',
        integration: '',
        //装备
        equipment: '',
        equipmentgrade: '',
        equipmentstar: '',
        equipmentgrade: '',
        //人物
        grade: '',
        experience: '',
        pet: '',
        cash: '',
        date: ''

      }
      this.submitType = "add";
      this.zdydialog = false;
      // this.form = ''


    },
    //提交表单
    submit() {
      //alert(this.form.date)
      // var ss = reformat(this.form.date)
      // alert(ss)
      this.zdydialog = false

      if (this.submitType == "add") {
        this.form.date = reformat(this.form.date);//日期类型转换
        this.tableData.push(this.form)//向tableDate中添加
        // this.form = ''
      } else {

      }
    },
    //编辑修改
    handleEdit(index, row) {
      // this.form = this.tableData[index]
      this.submitType = "update";
      this.form = row //将该对象数据赋值给form
      this.zdydialog = false
    },
    //删除
    handleDelete(index, row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
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
    },
    //修改日期undefined
    getSTime(val) {
      this.editForm.date = val;
      console.log(val);
    },
  },
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
