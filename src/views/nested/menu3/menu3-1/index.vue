<!-- <template functional>
  <div>
    <el-alert :closable="false" title="menu 3-1" type="warning" />

  </div>
</template> -->
<template>
  <div class="container">
   <div class="block">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      @node-click="handleNodeClick"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span v-if="node.data.flag">{{ node.label }}</span>
        <input  type="text" v-else v-model="value" @change='input(node)'>
        <span class="el-btn">
          <el-button
           icon="el-icon-circle-plus-outline" 
            circle
            type="text"
            size="mini"
            @click="() => append(data)">
          </el-button>
          <el-button
          type="text" 
          icon="el-icon-delete" 
          circle
            size="mini"
            @click="() => remove(node, data)">
            
          </el-button>
          <el-button
            icon="el-icon-edit" 
            circle
            type="text"
            size="mini"
            @click="() => edit(node,data)">
          
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
  </div>
</template>

<script>
let id = 1000;
export default {
    name:'pmenu',
      data() {
        const data = [{
          id: 1,
          label: '',
          flag: true,
          children: [{
          id: 4,
          label: '道具管理',
          flag: true,
          children: [{
            id: 9,
            label: '金币',
            flag: true,
          }, {
            id: 10,
            label: '宝石',
            flag: true,
          }]
          },{
            id: 5,
            label: '等级',
            flag: true,
            children: [{
              id: 6,
              label: '经验',
              flag: true,
            }]
          }]
        }];
      return {
        value:'',
        dian:'dianjiyixia',
        flag:true,
        data: JSON.parse(JSON.stringify(data)),
        // data: JSON.parse(JSON.stringify(data))
      }
    },

    methods: {
       handleNodeClick(data) {
        console.log(data);
      },
      append(data) {
      //关键，给新增的数据也添加flag
        const newChild = { id: id++, label: 'test', children: [] ,flag: false};
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        // debugger
        data.children.push(newChild);
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      edit(node,data){
        node.data.flag=false;
        // node.data.label=this.nei;
        // console.log(node);
        
      },
    input(node){
      // console.log(node);
      node.data.flag=true;
      node.data.label=this.value;
      this.value=null;
    },

    }
  };
</script>

<style>
.container {
  margin-left: 80px;
  width: 80%;
   flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.el-btn{
  margin-left: 20px;
}
.el-button--mini.is-circle{
  padding: 2px;
}
.el-button+.el-button {
    margin-left: 0px;
}
</style>

