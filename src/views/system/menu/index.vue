<template>
    <div>
        <div>
            <!-- 搜索 -->
            <span>
                <el-input v-model="searchKey" clearable placeholder="输入关键字搜索" style="width: 200px" class="filter-item"
                    @keyup.enter.native="toQuery" />
                <span class="filter-item">
                    <el-button type="success" @click="search" icon="el-icon-search">搜索</el-button>
                    <el-button type="warning" @click="reast" icon="el-icon-refresh-left">重置</el-button>
                    <el-button type="primary" @click="addMenu" icon="el-icon-plus">新增</el-button>
                </span>
            </span>
            <!-- <span>
          <el-button-group>
            <el-button icon="el-icon-search"></el-button>
            <el-button icon="el-icon-refresh"></el-button>
          </el-button-group>
        </span> -->
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top:20px" stripe row-key="sort"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}" v-loading="tableLoading" border>
            <el-table-column type="index" label="#" width="55"> </el-table-column>
            <el-table-column prop="title" width="" label="菜单标题">
            </el-table-column>
            <el-table-column prop="meta.icon" width="" label="图标">
                <template slot-scope="{row}">
                    <i :class="row.meta.icon"></i>
                </template>
            </el-table-column>
            <el-table-column prop="sort" width="" label="排序">
            </el-table-column>
            <el-table-column prop="permissions" width="" label="权限标识">
            </el-table-column>
            <el-table-column prop="component" width="" label="组件路径">
            </el-table-column>
            <!-- <el-table-column prop="menuType" label="菜单类型" align="center" width="80">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.menuType == C">目录</el-tag>
                    <el-tag type="warning" v-if="scope.row.menuType == M">菜单</el-tag>
                    <el-tag type="danger" v-if="scope.row.menuType == F">按钮</el-tag>
                </template>
            </el-table-column> -->
            <!-- <el-table-column prop="hidden" label="是否可见" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.hidden" disabled active-value="1" active-text="是" inactive-value="0"
                        inactive-text="否">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="hidden" label="是否缓存" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.noCache" disabled active-value="1" active-text="是" inactive-value="0"
                        inactive-text="否">
                    </el-switch>
                </template>
            </el-table-column> -->
            <el-table-column prop="date" label="创建日期" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    {{ scope.row.date | formatDate }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="">
                <template slot-scope="{row}">
                    <el-button size="mini" @click="GetEdit(row.id,row.parentnodeid)"
                        style="margin-left:0;margin-right:10px;margin-bottom:10px">編輯</el-button>
                    <el-button size="mini" type="danger" @click="Delete(row.id)"
                        style="margin-left:0;margin-right:10px;">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增菜单" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
            <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
                <!-- 菜单类型 -->
                <el-form-item label="菜单类型">
                    <el-radio-group v-model="formData.type">
                        <el-radio-button label="1">目录
                        </el-radio-button>
                        <el-radio-button label="2">菜单
                        </el-radio-button>
                        <el-radio-button label="3">按钮
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <!-- 选择图标 -->
                <el-form-item label="选择图标" v-if="formData.type != 3" prop="icon">
                    <e-icon-picker v-model="formData.icon" :options="options" style="width:76%;" />
                </el-form-item>
                <!-- 是否可见 ，菜单标题 -->
                <div class="flex" style="display: flex;" v-if="formData.type != 3">
                    <!-- <el-form-item label="是否可见">
                        <el-radio-group v-model="formData.hidden">
                            <el-radio-button label="1">是</el-radio-button>
                            <el-radio-button label="0">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item> -->
                    <el-form-item label="目录标题" style="margin-left:15px;" prop="title">
                        <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
                    </el-form-item>
                </div>
                <!-- 路由地址和菜单排序 -->
                <div class="flex" style="display: flex;" v-if="formData.type != 3">
                    <el-form-item label="路由地址" prop="path">
                        <el-input placeholder="路由地址(/:path)" v-model="formData.path"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单排序" style="margin-left:15px;" prop="sort">
                        <el-input-number placeholder="请排序" controls-position="right" v-model="formData.sort">
                        </el-input-number>
                    </el-form-item>
                </div>
                <!-- 组件名称 、组件路径 -->
                <div class="flex" style="display: flex;" v-if="formData.type == 2">
                    <el-form-item label="组件名称" prop="name">
                        <el-input placeholder="请输入组件name" v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="组件路径" style="margin-left:15px;" prop="component">
                        <el-input placeholder="请输入组件路径" v-model="formData.component"></el-input>
                    </el-form-item>
                </div>
                <!-- 按钮名称、权限标识 -->
                <div class="flex" style="display: flex;" v-if="formData.type == 3">
                    <el-form-item label="按钮名称" prop="title">
                        <el-input placeholder="请输入按钮名称" v-model="formData.title"></el-input>
                    </el-form-item>
                    <el-form-item label="权限标识" style="margin-left:15px;" prop="permissions">
                        <el-input placeholder="请输入权限标识" v-model="formData.permissions"></el-input>
                    </el-form-item>
                </div>
                <!-- 上级类目 -->
                <div class="flex" style="display: flex;">
                    <el-form-item label="上级类目" prop="pid">
                        <el-cascader :options="allMenu" v-model="formData.pid" :show-all-levels='false'
                            :props="{ checkStrictly: true,label:'title',value:'sort' }" clearable></el-cascader>
                    </el-form-item>
                    <!-- <el-form-item label="路由嵌套" v-if="formData.type==2">
                        <el-radio-group v-model="nest">
                            <el-radio-button label="1">是</el-radio-button>
                            <el-radio-button label="0">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item> -->
                    <el-form-item label="按钮排序" prop="sort" style="margin-left:15px;" v-if='formData.type == 3'>
                        <el-input-number placeholder="请排序" controls-position="right" v-model="formData.sort">
                        </el-input-number>
                    </el-form-item>
                </div>
                <!-- <el-form-item label="是否缓存" v-if="formData.type==2">
                    <el-radio-group v-model="formData.noCache">
                        <el-radio-button label="1">是</el-radio-button>
                        <el-radio-button label="0">否</el-radio-button>
                    </el-radio-group>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getMenuList, addMenu, delMenu, updateMenu } from "@/api/system/index";
import { getRouter } from "@/api/user";
import DialogMenu from "@/components/System/menu/dialogMenu.vue";
// import { getMoveRouter } from "@/api/index";
export default {
    data() {
        return {
            tableData: [],
            tableLoading: false,
            searchKey: '',
            dialogVisible: false,
            allMenu: [],//全部的路由
            options: {
                FontAwesome: false,
                ElementUI: true,
                eIcon: false,//自带的图标，来自阿里妈妈
                eIconSymbol: false,//是否开启彩色图标
                addIconList: [],
                removeIconList: []
            },
            formData: {
                //menuName: 'SysUserManage',        //菜单名字
                title: '用户1管理',                 //菜单显示内容
                //apiPath: '/admin/sys-user',       //api地址
                path: '/system/user',                    //菜单路径 0根路径 0/2表示 根路径/用户管理
                action: 'POST',                    //行为 menuType为F时存在 查询'GET' 新增'POST' 修改'PUT' 删除'DELETE' 
                //menuType: 'M', 
                permissions:'',
                meta:{
                    icon: 'user',                     //菜单图标
                    roles: []
                } ,                  //菜单类型 C:目录,有子菜单,不对应具体某个页面  M:菜单,对应某个页面  F:功能点，对应某个按钮
                pid: 0,                      //父菜单id 
                component: 'system/menu',//vue index路径 menuType为M时存在
                sort: 10,
                type: 1,
                // hidden: 1,
                // pid: "",
                // icon: "",
                // path: "",
                // title: "",
                // sort: "",
                // name: "",
                // component: "",
                // permissions: "",
                // noCache: "0"
            }
        };
    },
    created() {
        this.getMenuList()
    },
    methods: {
        //菜单列表
        getMenuList() {
            this.tableLoading = true
            getRouter().then((res) => {

                this.tableData = res.data.routeList;
                console.log(this.tableData);
                this.tableLoading = false
            });
        },
        //搜索
        search() {
            console.log(this.searchKey)
        },
        //重置
        reast() {
            this.searchKey = ''
        },
        //新增
        addMenu() {
            this.dialogVisible = true
            this.allMenu = this.tableData

        },
        add() {
            console.log(this.formData)
            addMenu(this.formData).then((res) => {
                console.log(res.data);
            });
        }
    },

}
</script>
<style>

</style>