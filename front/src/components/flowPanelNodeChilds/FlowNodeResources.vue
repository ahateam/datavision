<template>
    <div>
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="表格" name="table">
                <div class="text-info" v-if="tableList.length ==0 ">
                    暂无表格数据
                </div>
                <div v-else class="item-list-box">
                    <div class="item-list" v-for="(item,index) in tableList" :key="index">
                        {{item.alias}}
                    </div>
                </div>


            </el-tab-pane>
            <el-tab-pane label="附件" name="annex">
                <div class="text-info" v-if="annexList.length ==0 ">
                    暂无附件数据
                </div>
                <div v-else class="item-list-box">
                    <div class="item-list" v-for="(item,index) in annexList" :key="index">
                        {{item.name}}
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="模板" name="template" >
                <div class="text-info" v-if="templateList.length ==0 ">
                    暂无模板数据
                </div>
                <div v-else class="item-list-box">
                    <div class="item-list" v-for="(item,index) in templateList" :key="index">
                        {{item.alias}}
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    export default {
        name: "FlowResources",
        data(){
            return{
                activeName:'table',
                tableList:[],
                annexList:[],
                templateList:[],
            }
        },
        methods: {
            /** 请求table列表*/
            getTableSchemas(cnt){
                this.$api.getTableSchemas(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableList = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tableList = []
                    }
                })
            },
            /** 获取附件annex 列表*/
            getAnnexList(cnt){
                this.$api.getAnnexList(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.annexList = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.annexList = []
                    }

                    console.log( this.annexList)
                })
            }
        },
        mounted(){
            /** 请求table列表*/
            let cnt = {
                count:500,
                offset:0
            }
            this.getTableSchemas(cnt)

            let cnt1 = {
                ownerId: 400522524166839, // Long 附件持有者编号
                count: 500, // Integer
                offset: 0, // Integer
            };
            this.getAnnexList(cnt1)
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
    .item-list:hover{
        background: #e8f8ff;
    }
    .item-list:active{
        background: #88afff;
    }
    .text-info{
        width: auto;
        height: 40px;
        line-height: 40px;
        color: #666;
        font-size: 16px;
        text-align: center;
    }
</style>
