<template>
    <div>
       <el-row class="row-box">
            选择需录入数据的流程事务
       </el-row>
        <el-row class="row-box-content">
            <el-row class="row-box-add">
                <el-col :span="24">
                    <el-button type="primary" size="small" style="margin-left: 20px" @click="addFlowDataModelShow = true ">
                        新增流程事务
                    </el-button>
                </el-col>
            </el-row>
            <el-row>
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="title"
                                label="流程事务名">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="addChoseBtn(scope.row)" type="text" size="small">
                                    <span>开始事务</span>
                                </el-button>
                                <el-button  type="text" size="small">
                                    <span style="color: #f60;" @click="delProcessBtn(scope.row)">删除</span>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-row>
            <el-row>
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
        </el-row>

        <el-dialog title="选择流程录入数据" :visible.sync="addFlowDataModelShow">
            <el-form >
                <el-form-item label="流程事务名" label-width="100px">
                    <el-input v-model="title" auto-complete="off" placeholder="请输入流程事务名"></el-input>
                </el-form-item>
                <el-form-item label="选择流程事务" label-width="100px">
                    <el-select v-model="pdId" placeholder="请选择已定义好的流程" style="width: 100%">
                        <el-option :label="item.title" :value="item.id"
                                   v-for="(item,index) in pdList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注信息" label-width="100px">
                    <el-input type="textarea" v-model="remark" placeholder="请输入流程事务备注信息"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFlowDataModelShow = false">取 消</el-button>
                <el-button type="primary" @click="addFlowData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "userFlowList",
        data(){
            return{
                tableData:[],
                addFlowDataModelShow:false,

                /** 添加流程*/
                title:'',
                pdId:'',
                remark:'',
                moduleKey:'测试平台1',
                pdList:[],
                offset:0,
                count:10,
                page:1,
                pageOver:false,
            }
        },
        methods:{
            /** 选中事务*/
            addChoseBtn(item){
                /*跳转页面 有问题*/
                // this.$router.push({
                //     path:'/userFlowList',
                //     name:'userFlowList',
                //     params:{
                //         info:item
                //     }
                // })
            },
            addFlowData(){
                let cnt ={
                    pdId: this.pdId, // Long 流程定义编号
                    title: this.title, // String 流程标题
                    remark: this.remark, // String
                }
                this.$api.createTableSchema(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('操作成功')
                    }else{
                        this.$message.error('操作失败')
                    }
                })
                this.$router.push('/page')
            },
            /** 获取流程事务列表*/
            getProcessList(cnt){
                this.$api.getProcessList(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableData =this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tableData = []
                    }

                    if(this.tableData.length<this.count){
                        this.pageOver = true
                    }else{
                        this.pageOver = false
                    }


                })
            },
            //分页数据
            changePage(page){
                this.page = page
                let cnt ={
                    offset:(this.page-1)*this.count,
                    count:this.count
                }
                this.getProcessList(cnt)
            },

            //删除单个流程实例--删除流程事务
            delProcessBtn(item){
                let cnt={
                    id:item.id
                }
                this.$confirm('是否确认删除？')
                    .then(_ => {
                        this.$api.delProcess(cnt,(res)=>{
                            if(res.data.rc == this.$util.RC.SUCCESS){
                                this.$message.success('操作成功')
                            }else {
                                this.$message.error('操作失败')
                            }
                            this.$router.push('/page')
                        })
                    })
                    .catch(_ => {})
            }

        },
        mounted() {
            let cnt ={
                moduleKey: this.moduleKey, // String 模块关键字
                count: 500, // Integer
                offset: 0, // Integer
            }
            this.$api.getPDList(cnt,(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.pdList = this.$util.tryParseJson(res.data.c)
                }else{
                    this.pdList = []
                }
                console.log(this.pdList);
            })
            let cnt1 = {
                offset:this.offset,
                count:this.count,
            }
            this.getProcessList(cnt1)
        }
    }
</script>

<style scoped lang="scss">
    .row-box{
        width: 100%;
        height: 50px;
        background: #fff;
        line-height: 50px;
        padding: 0 20px;
        font-size: 16px;
        color: #333;
    }
    .row-box-content{
        width: 100%;
        margin-top: 20px;
        background: #fff;
    }
    .row-box-add{
        width: 100%;
        margin: 10px 0;
        height: 40px;
        line-height: 40px;
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
