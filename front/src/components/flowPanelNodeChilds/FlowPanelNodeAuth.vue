<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="部门" name="department">
                <div class="text-info" v-if="departmentList.length ==0 ">
                    暂无表格数据
                </div>
                <div v-else class="item-list-box">
                    <div class="item-list"
                         v-for="(item,index) in departmentList" :key="index"
                        @click="addDepartmentBtn(item)">
                        {{item.name}}
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="角色" name="userRole">
                <div class="text-info" v-if="userRoleList.length ==0 ">
                    暂无用户角色
                </div>
                <div v-else class="item-list-box">
                    <div class="item-list"
                         v-for="(item,index) in userRoleList" :key="index"
                         @click="addRolesBtn(item)">
                        {{item.name}}
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="个人" name="user">
                <div class="text-info" v-if="userList.length ==0 ">
                    暂无用户数据
                </div>
                <div v-else class="item-list-box">
                    <div class="item-list"
                         v-for="(item,index) in userList" :key="index"
                         @click="addUserBtn(item)">
                        {{item.realName}}
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="active-node-list">
            <div class="active-node-title">
                已选中资源
            </div>
            <div class="active-node-content">
                <div class="active-node-item-title">
                    选中部门
                </div>
                <div class="active-node-item-content">
                    <span v-for="(item,index) in receivers.departments"
                          :key="index">
                          <el-tag size="small"
                                  class="tag-box"
                                  closable
                                  @close="delDepartmentActiveItem(index)">
                                {{item.name}}
                          </el-tag>
                    </span>
                </div>

                <div class="active-node-item-title" style="margin-top: 20px">
                    选中角色
                </div>
                <div class="active-node-item-content">
                     <span v-for="(item,index) in receivers.roles"
                           :key="index">
                          <el-tag size="small"
                                  class="tag-box"
                                  closable
                                  @close="delRolesActiveItem(index)">
                                {{item.name}}
                          </el-tag>
                    </span>
                </div>
                <div class="active-node-item-title" style="margin-top: 20px">
                    选中用户
                </div>
                <div class="active-node-item-content">
                        <span v-for="(item,index) in receivers.users"
                              :key="index">
                          <el-tag size="small"
                                  class="tag-box"
                                  closable
                                  @close="delUsersActiveItem(index)">
                                {{item.realName}}
                          </el-tag>
                    </span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FlowPanelNodeAuth",
        data() {
            return {
                activeName: 'department',
                departmentList: [],
                userRoleList: [],
                userList: [],
                receivers:{},
            }
        },
        computed:{
            getActiveNode(){
                return this.$store.state.flowData.nodeActive
            }
        },
        watch:{
            getActiveNode(val){
                let str = this.$store.state.flowData.nodeActiveInfo.receivers
                this.receivers = JSON.parse(str)
                console.log( this.receivers)
            }
        },
        methods: {
            /** 获取部门列表*/
            getDepartmentList(cnt) {
                this.$api.getDepartmentList(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.departmentList = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.departmentList = []
                    }
                })
            },
            /** 获取用户角色列表*/
            getUserRoleList(cnt) {
                this.$api.getUserRoleList(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.userRoleList = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.userRoleList = []
                    }
                })

            },
            /** 获取用户列表*/
            getUserList(cnt) {
                this.$api.getUserList(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.userList = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.userList = []
                    }
                })
            },

            /** 修改选中节点数据*/
            setNodeACtiveInfo(receivers){
                this.$store.state.flowData.nodeActiveInfo.receivers = JSON.stringify(receivers)
            },
            /** 有时间待优化
             *抽离公共部分js方法*/
            /*选中部门*/
            addDepartmentBtn(item) {
                let _index = -1
                for (let i = 0; i < this.receivers.departments.length; i++) {
                    if (this.receivers.departments[i].id == item.id) {
                        _index = i
                        break
                    }
                }
                if (_index == -1) {
                    this.receivers.departments.push(item)
                    this.setNodeACtiveInfo(this.receivers)
                } else {
                    this.$message.error('该部门已经被选中')
                }
            },
            /* 选中角色*/
            addRolesBtn(item){
                let _index = -1
                for (let i = 0; i < this.receivers.roles.length; i++) {
                    if (this.receivers.roles[i].id == item.id) {
                        _index = i
                        break
                    }
                }
                if (_index == -1) {
                    this.receivers.roles.push(item)
                    this.setNodeACtiveInfo(this.receivers)
                } else {
                    this.$message.error('该部门已经被选中')
                }
            },
            /* 选中用户*/
            addUserBtn(item){
                let _index = -1
                for (let i = 0; i < this.receivers.users.length; i++) {
                    if (this.receivers.users[i].id == item.id) {
                        _index = i
                        break
                    }
                }
                if (_index == -1) {
                    this.receivers.users.push(item)
                    this.setNodeACtiveInfo(this.receivers)
                } else {
                    this.$message.error('该部门已经被选中')
                }
            },
            /* 删除部门*/
            delDepartmentActiveItem(_index){
                this.receivers.departments.splice(_index, 1)
                this.setNodeACtiveInfo(this.receivers)
            },
            /* 删除角色*/
            delRolesActiveItem(_index){
                this.receivers.roles.splice(_index, 1)
                this.setNodeACtiveInfo(this.receivers)
            },
            /* 删除用户*/
            delUsersActiveItem(_index){
                this.receivers.users.splice(_index, 1)
                this.setNodeACtiveInfo(this.receivers)
            }

        },
        mounted() {
            let cnt = {
                count: 500,
                offset: 0
            }
            this.getDepartmentList(cnt)
            this.getUserRoleList(cnt)
            this.getUserList(cnt)
            console.log(this.$store.state.flowData.nodeActiveInfo)
            let str = this.$store.state.flowData.nodeActiveInfo.receivers
            this.receivers = JSON.parse(str)
        }

    }
</script>

<style scoped lang="scss">
    .search-box {
        width: auto;
        height: 50px;
        line-height: 50px;
    }

    .tab-item-content {
        width: auto;
        height: 300px;
        overflow-y: auto;
    }

    .check-btn {
        width: auto;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    .item-list {
        width: auto;
        padding: 10px;
        background: #fff;
        margin-top: 2px;
        cursor: pointer;
        font-size: 14px;
        color: #666;
        border-bottom: 1px solid #e8e8e8;
    }

    .item-list:hover {
        background: #e8f8ff;
    }

    .item-list:active {
        background: #88afff;
    }

    .text-info {
        width: auto;
        height: 40px;
        line-height: 40px;
        color: #666;
        font-size: 16px;
        text-align: center;
    }

    .item-list-box {
        width: auto;
        height: 330px;
        overflow-y: auto;
    }

    /** 已经选中的值列表*/
    .active-node-list {
        width: auto;
        height: 160px;
    }

    .active-node-title {
        width: auto;
        height: 30px;
        color: #fff;
        background: #88afff;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
    }

    .active-node-content {
        width: auto;
        height: 130px;
        overflow-y: auto;
    }

    .active-node-item-title {
        width: auto;
        height: 30px;
        line-height: 30px;
        color: #666;
        font-size: 14px;
        padding: 0 10px;
    }

    .active-node-item-content {
        width: auto;
    }

    .tag-box {
        margin-top: 5px;
        margin-left: 10px;
    }
</style>
