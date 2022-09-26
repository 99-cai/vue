<template>
  <div style="padding:30px;">
    <div class="tableAll">
      <!-- <div class="addArea">
      </div> -->
      <el-form :model="form" :inline="true">
        <el-form-item label="Uid" width="80px" prop="uid">
          <el-input class="dialog_input" v-model="form.uid" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="金币" prop="coin">
          <el-input v-model="form.coin" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="宝石" prop="diamond">
          <el-input v-model="form.diamond" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="score">
          <el-input v-model="form.score" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-input v-model="form.level" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="等级经验" prop="exp">
          <el-input v-model="form.exp" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="宠物等级" prop="petLV">
          <el-input v-model="form.petLV" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="现金红包" prop="money">
          <el-input v-model="form.money" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="装备" prop="equipment">
          <el-input v-model="form.equipment" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="装备等级" prop="equipLv">
          <el-input v-model="form.equipLv" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="装备星级" prop="starLV">
          <el-input v-model="form.starLV" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="装备品质" prop="equipQuality">
          <el-select v-model="form.equipQuality" placeholder="选择品质" style="width:220px">
            <el-option label="低" value="低"></el-option>
            <el-option label="中" value="中"></el-option>
            <el-option label="高" value="高"></el-option>
          </el-select>
        </el-form-item>
        <div style="float:right">
          <el-button type="primary" @click="add" style="margin-right:10px">重 置</el-button>
          <el-button type="primary" @click="search" style="margin-right:20px">查询</el-button>
          <el-button type="primary" @click="submit">添 加</el-button>
        </div>
      </el-form>

      <el-dialog style="width: 100%;height: 100vh;" title="添加道具" :visible.sync="zdydialog">
        <el-form :model="form" :inline="true">
          <el-form-item label="Uid" width="80px" prop="uid">
            <el-input class="dialog_input" v-model="form.uid" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item label="金币" prop="coin">
            <el-input v-model="form.coin" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="宝石" prop="diamond">
            <el-input v-model="form.diamond" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="score">
            <el-input v-model="form.score" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="等级" prop="level">
            <el-input v-model="form.level" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="等级经验" prop="exp">
            <el-input v-model="form.exp" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="宠物等级" prop="petLv">
            <el-input v-model="form.petLv" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="现金红包" prop="money">
            <el-input v-model="form.money" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装备" prop="equipment">
            <el-input v-model="form.equipment" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装备等级" prop="equipLv">
            <el-input v-model="form.equipLv" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装备星级" prop="starLV">
            <el-input v-model="form.starLV" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="装备品质" prop="equipQuality">
            <el-select v-model="form.equipQuality" placeholder="选择品质" style="width:220px">
              <el-option label="低" value="低"></el-option>
              <el-option label="中" value="中"></el-option>
              <el-option label="高" value="高"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
      <div class="tableMain">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"
          :cell-style="{ textAlign: 'center' }" :header-cell-style="{textAlign: 'center'}">
          <el-table-column prop="uid" label="Uid" width="90">
          </el-table-column>
          <el-table-column prop="coin" label="金币" width="90">
          </el-table-column>
          <el-table-column prop="diamond" label="宝石" width="90">
          </el-table-column>
          <el-table-column prop="score" label="积分" width="90">
          </el-table-column>
          <el-table-column prop="level" label="等级" width="90">
          </el-table-column>
          <el-table-column prop="exp" label="等级经验" width="90">
          </el-table-column>
          <el-table-column prop="petLv" label="宠物等级" width="90">
          </el-table-column>
          <el-table-column prop="money" label="现金红包" width="90">
          </el-table-column>
          <el-table-column prop="equipment" label="装备" width="90">
          </el-table-column>
          <el-table-column prop="equipLv" label="装备等级" width="90">
          </el-table-column>
          <el-table-column prop="equipQuality" label="装备品质" width="90">
          </el-table-column>
          <el-table-column prop="starLV" label="装备星级" width="90">
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
      <!-- 分页 -->
      <div class="block" style="margin-top:15px;">
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[4]" :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>

    </div>
    <router-view />

  </div>
</template>

<script type="text/javascript">
import axios from 'axios';

export default {
  name: "eltable",
  data() {
    return {
      zdydialog: false,
      formLabelWidth: '80px',
      form: {
        uid: 20430,
        coin: '',
        diamond: '',
        score: '',
        equipment: '',
        equipLv: '',
        starLV: '',
        equipQuality: '',
        level: '',
        exp: '',
        petLv: '',
        money: '',
      },
      exit: {
        uid: '',
        coin: '',
        diamond: '',
        score: '',
        equipment: '',
        equipLv: '',
        starLV: '',
        equipQuality: '',
        level: '',
        exp: '',
        petLv: '',
        money: '',
      },
      tableData: [],
      submitType: "",
      
      currentPage: 1, //初始页
      pagesize: 4, //    每页的数据,数字是几就显示几条
      total: 1000
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
      var obj = {
        uid: this.form.uid,
        coin: this.form.coin,
        diamond: this.form.diamond,
        score: this.form.score,
        equipment: this.form.equipment,
        equipLv: this.form.equipLv,
        starLV: this.form.starLV,
        level: this.form.level,
        exp: this.form.exp,
        petLv: this.form.petLv,
        money: this.form.money,

      }
      this.tableData = []
      axios({
        url: 'https://stage.bjxscy.com/center-api-adminppgame/admin/userInfoSet',
        method: 'post',
        data: JSON.stringify(obj),
        headers: { "Content-type": "application/json" }
      }).then(res => {
        console.log(res)
        // this.tableData = JSON.parse(JSON.stringify(this.tableData))
        this.tableData.push(res.data.data.user)
      })
    },
    add() {
      this.form = {
        uid: '',
        coin: '',
        diamond: '',
        score: '',
        //装备
        equipment: '',
        equipLv: '',
        starLV: '',
        equipQuality: '',
        //人物
        level: '',
        exp: '',
        petLv: '',
        money: '',
      }
      this.submitType = "add";
      this.zdydialog = false;
    },
    //提交表单
    submit() {
      this.zdydialog = false

      if (this.submitType == "add") {
        this.tableData.push(this.form)//向tableDate中添加
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


<style>
.tableAll {
  /* margin-left: 100px; */
  width: 100%;
  height: 100%;
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
