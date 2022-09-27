<template>
  <div style="padding: 30px">
    <div>
      <el-form
        :inline="true"
        class="demo-form-inline"
        action="https://stage.bjxscy.com/center-api-adminppgame/admin/userInfoSet"
      >
        <el-form-item label="Uid" width="80px" prop="uid">
          <el-input v-model="uid" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="道具id" v-show="value1 == 'itemNum'">
          <el-input
            v-model="itemId"
            placeholder="道具id"
            style="width: 290px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="数值"
          v-show="value1 != 'equip' && value1 != 'seed'"
        >
          <el-input
            v-model="num"
            placeholder="数值"
            style="width: 290px"
          ></el-input>
        </el-form-item>
        <el-form-item label="经验" v-show="value1 == 'level'">
          <el-input
            v-model="exp"
            placeholder="经验"
            style="width: 290px"
          ></el-input>
        </el-form-item>
        <el-form-item label="装备等级" v-show="value1 == 'equip'">
          <el-input
            v-model="equipLv"
            placeholder="装备等级"
            style="width: 290px"
          ></el-input>
        </el-form-item>
        <el-form-item label="星级" v-show="value1 == 'equip'">
          <el-input
            v-model="starLv"
            placeholder="装备星级"
            style="width: 290px"
          ></el-input>
        </el-form-item>
        <el-form-item label="装备质量" v-show="value1 == 'equip'">
          <el-input
            v-model="equipQuality"
            placeholder="装备质量"
            style="width: 290px"
          ></el-input>
        </el-form-item>
        <el-form-item label="解锁种子id" v-show="value1 == 'seed'">
          <el-input
            v-model="index"
            placeholder="种子id"
            style="width: 290px"
          ></el-input>
        </el-form-item>
        <!-- 添加 -->
        <el-button type="primary" @click="exit">编辑</el-button>
      </el-form>

      <!-- 表单 -->
      <div class="tableMain">
        <el-table
          :data="tableData"
          style="width: 100%"
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
        >
          <el-table-column prop="uid" label="Uid" width="90"> </el-table-column>
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
          <el-table-column prop="tickets" label="抽奖券" width="150">
            <template slot-scope="{ row }">
              {{ tickets }}
            </template>
          </el-table-column>
          <el-table-column prop="money" label="现金红包" width="90">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// import Axios from 'axios'

import axios from "axios";

export default {
  data() {
    return {
      labelPosition: "top",
      uid: "",
      form:{},
      options: [
        {
          value: "coin",
          label: "金币",
        },
        {
          value: "diamond",
          label: "宝石",
        },
        {
          value: "level",
          label: "等级",
        },
        {
          value: "score",
          label: "积分",
        },
        {
          value: "petLv",
          label: "宠物等级",
        },
        {
          value: "money",
          label: "现金红包",
        },
        {
          value: "equip",
          label: "装备",
        },
        {
          value: "plant",
          label: "作物成熟时间(单位:秒,xx秒后成熟)",
        },
        {
          value: "seed",
          label: "解锁种子",
        },
        {
          value: "tickets",
          label: "转盘抽奖券(格式:[10,20,30] 对应关系:[绿券,紫券,橙券])",
        },
        {
          value: "itemNum",
          label: "其他道具",
        },
      ],
      equips: [
        {
          value: "0",
          label: "低",
        },
        {
          value: "1",
          label: "中(非专属)",
        },
        {
          value: "2",
          label: "高(专属)",
        },
      ],
      value: "",
      value1: "",
      num: 0,
      exp: 0,
      itemId: 0,
      isSpecial: 0,
      equipQuality: "0",
      equipLv: "",
      starLv: "",
      index: "",
      tickets:[],
      tableData: [],
    };
  },
  created() {},
  methods: {
    exit() {
      this.tableData = [];
      console.log(this.value1);
      // console.log(JSON.stringify(data))
      var obj = {
        uid: this.uid,
      };
      if (this.value1 == "level") {
        obj.exp = this.exp;
        obj[this.value1] = this.num;
      } else if (this.value1 == "equip") {
        obj.equipLv = this.equipLv;
        obj.starLv = this.starLv;
        obj.isSpecial = this.isSpecial;
        obj.equipQuality = this.equipQuality;
      } else if (this.value1 == "itemNum") {
        obj.itemId = this.itemId;
        obj[this.value1] = this.num;
      } else {
        obj[this.value1] = this.num;
      }
      axios({
        url: "https://stage.bjxscy.com/center-api-adminppgame/admin/userInfoSet",
        method: "post",
        data: JSON.stringify(obj),
        headers: { "Content-type": "application/json" },
      }).then((res) => {
        console.log(res.data.data);
        this.tableData.push(res.data.data.user);
        this.tickets = res.data.data.userSecond.tickets;
        // this.tableData.push(res.data.data.userSecond);
      });
      this.num = 0;
        this.exp = 0;
        this.itemId = 0;
        this.isSpecial = 0;
        this.equipQuality = "0";
        this.equipLv = "";
        this.starLv = "";
    },
  },
};
</script>
