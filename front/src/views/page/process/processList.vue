<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="title-box">
                    流程图管理列表
                </div>
            </el-col>
        </el-row>
        <el-row class="content-box">
            <el-col :span="24">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="title"
                                label="流程图名称">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="checkBtn(scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "processList",
        data(){
            return{
                tableData:[],
                count:10,
                offset:0,
                page:1
            }
        },
        methods:{
            /*获取数据*/
            getProcessDefinition(cnt){
                this.$api.getProcessDefinition(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData = this.$util.tryParseJson(res.data.c)
                    }
                    console.log(this.tableData)
                })
            },

            /** 跳转页面*/
            checkBtn(row){
                this.$store.state.flowId = row.id
                this.$router.push('/flowDesign')
            }
        },
        mounted(){
            let cnt={
                moduleId:'567813484',
                offset:this.offset,
                count:this.count
            }
            this.getProcessDefinition(cnt)

        }
    }
</script>

<style scoped lang="scss">
    .title-box{
        width: auto;
        height: 50px;
        line-height: 50px;
        background: #fff;
        padding-left: 20px;
    }
    .content-box{
        width: auto;
        margin-top: 10px;
        padding: 20px;
        background: #fff;
    }
</style>
