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
            <el-col :span="24" style="height: 40px;line-height: 40px;">
                <el-button type="primary" size="small" @click="showAddFlowBtn">新增流程</el-button>
            </el-col>
            <el-col :span="24" style="margin-top: 20px">
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
                                <el-button type="text" size="small"
                                           @click="checkBtn(scope.row)">
                                    编辑
                                </el-button>
                                <el-button type="text" size="small"
                                           style="margin-left: 20px"
                                           @click="delBtn(scope.row)">
                                    <span style="color: #f44;">删除</span>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
            <el-col :span="24">
                <div class="page-box">
                    <span>当前第 - </span>
                    <span style="color: #f44;"> {{page}} </span>
                    <span> - 页</span>
                    <el-button style="margin-left: 20px"
                               type="primary" size="small"
                               @click="changePage(page-1)"
                               :disabled="page==1">
                        上一页
                    </el-button>
                    <el-button style="margin-left: 20px"
                               type="primary" size="small"
                               @click="changePage(page+1)"
                               :disabled="pageOver == true">
                        下一页
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-dialog title="新增流程" :visible.sync="showAddFlowModel">
            <el-form >
                <el-form-item label="流程名称" label-width="120px">
                    <el-input v-model="addTitle" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddFlowModel = false">取 消</el-button>
                <el-button type="primary" @click="addFlowBtn">确 定</el-button>
            </div>
        </el-dialog>
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
                page:1,
                pageOver:false,

                showAddFlowModel:false,
                addTitle:'',
                tags:[],
                lanes:[],
                moduleKey:'测试平台1',
                visual:[]
            }
        },
        methods:{
            /*获取数据*/
            getPDList(cnt){
                    this.$api.getPDList(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.tableData = this.$util.tryParseJson(res.data.c)
                        }else{
                            this.tableData = []
                        }
                        if(this.tableData.length <this.count){
                            this.pageOver = true
                        }else{
                            this.pageOver = false
                        }
                    })
            },
            /** 分页*/
            changePage(page){
                this.page = page
                let cnt = {
                    moduleKey:this.moduleKey,
                    offset:(this.page-1)*this.count,
                    count:this.count
                }
                this.getPDList(cnt)
            },
            /** 删除单个流程*/
            delBtn(row){
                this.$confirm('是否确认删除？')
                    .then(_ => {
                        let cnt={
                            pdId:row.id
                        }
                        this.$api.delPD(cnt,(res)=>{
                            if(res.data.rc == this.$util.RC.SUCCESS){
                                this.$message.success('删除成功')
                                this.$router.push('/page')
                            }else{
                                this.$message.error('删除操作失败')
                            }
                            console.log(res)
                        })
                    })
                    .catch(_ => {})
            },

            /** 跳转页面*/
            checkBtn(row){
                localStorage.setItem('flowId',row.id+'')
                this.$router.push('/flowDesign')
            },

            /** 新增流程弹窗*/
            showAddFlowBtn(){
                this.showAddFlowModel =true
            },
            addFlowBtn(){
                let cnt = {
                    moduleKey:this.moduleKey,
                    title:this.addTitle,
                    tags:this.tags,
                    lanes:this.lanes,
                    visual:this.visual
                }
                this.$api.createPD(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('新增成功！')
                        this.$router.push('/page')
                    }else{
                        this.$message.error('新增失败')
                    }
                })
            }
        },
        mounted(){
            localStorage.setItem('flowId','')
            let cnt={
                moduleKey:this.moduleKey,
                offset:this.offset,
                count:this.count
            }
            this.getPDList(cnt)

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

    /*分页相关*/
    .page-box{
        width: auto;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #666;
    }
</style>
