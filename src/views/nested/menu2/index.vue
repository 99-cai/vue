<template>
  <div style="padding:30px;">
    <div>
      <el-form :inline="true" >
        <el-form-item label="作物成熟时间(单位:  秒,xx秒后成熟)">
          <el-select v-model="time">
            <el-option label="10" value="0"></el-option>
            <el-option label="20" value="1"></el-option>
            <el-option label="30" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="解锁新的种子">
          <el-select v-model="newseed">
            <el-option label="萝卜" value="0"></el-option>
            <el-option label="茄子" value="1"></el-option>
            <el-option label="玉米" value="2"></el-option>
          </el-select>
        </el-form-item>     
      </el-form>
      <el-button  type="primary" @click="add">添加道具</el-button>
    </div>
<!-- 子路由 -->
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
     
    }
  },
  methods: {

  }
}
</script>