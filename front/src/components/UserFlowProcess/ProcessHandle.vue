<template>
    <div>
        <div class="node-title" >
            ---{{nodeInfo.visual.label}}---
        </div>
        <div class="node-content">
            <div class="resource-box">
                <div class="resource-title">
                    所需资源上传
                </div>
                <div v-if="assetList.length == 0" class="none-box" >
                    暂无需要上传的资源
                </div>
                <div v-else>
                    <table id="table-box" cellspacing="0" cellpadding="0">
                        <thead>
                            <th width="40% ">需上传资源</th>
                            <th>资源说明</th>
                            <th>是否已传</th>
                            <th>操作</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in assetList" :key="index">
                                <td> <span v-if="item.necessary" style="color: #f60;">* </span> {{item.name}}</td>
                                <td><span style="font-size: 14px;color: #666;">{{item.remark}}</span></td>
                                <td><span style="color: #666;">否</span></td>
                                <td>
                                    <!--<el-button type="primary" size="small">下载模板</el-button>-->
                                    <!--<el-button type="primary" size="small">上传文件</el-button>-->
                                    <el-button type="primary" size="small" @click="writeModelShowBtn(item)">在线填写</el-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="action-btn">
                    <span v-for="(item,index) in actions" :key="index">
                           <el-button type="primary"  @click="subBtn(item)"
                                      style="margin-left: 20px;margin-top: 20px">
                        {{item.label}}
                    </el-button>
                    </span>

                </div>

            </div>
        </div>


        <el-dialog :title="table.alias" :visible.sync="tableModelShow">
            <el-form>
                <span v-for="(item,index) in tableHead" :key="index">
                    <span v-if="item.dataType == 'int' || item.dataType == 'decimal' ||  item.dataType == 'money'">
                            <el-form-item :label="item.alias" label-width="100px"
                                          :rules="item.necessary=='0'?[{ required: true, message: '必填项不能为空'}]:''"
                            >
                                <el-input v-model="entryData[item.name]"
                                          type="number" autocomplete="off"
                                          :disabled="item.columnType=='compute'"
                                          @blur="getComputeVal()"
                                          :placeholder="item.columnType=='compute'?'根据公式自动计算完成的值':'请输入数字'"
                                            >
                                </el-input>
                            </el-form-item>
                    </span>
                    <span v-if="item.dataType == 'string'">
                            <el-form-item :label="item.alias" label-width="100px"
                                          :rules="item.necessary=='0'?[{ required: true, message: '必填项不能为空'}]:''"
                                       >
                                <el-input v-model="entryData[item.name]" type="text" autocomplete="off"    placeholder="请输入字符串数据" ></el-input>
                            </el-form-item>
                    </span>
                     <span v-if="item.dataType == 'time'">
                            <el-form-item :label="item.alias" label-width="100px"
                                          :rules="item.necessary=='0'?[{ required: true, message: '必填项不能为空'}]:''">
                                 <el-date-picker
                                         v-model="entryData[item.name]"
                                         type="datetime"
                                         value-format="timestamp"
                                         style="width:100%"
                                         placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                    </span>
                    <span v-if="item.dataType == 'date'">
                            <el-form-item :label="item.alias" label-width="100px"
                                          :rules="item.necessary=='0'?[{ required: true, message: '必填项不能为空'}]:''">
                                   <el-date-picker
                                           v-model="entryData[item.name]"
                                           type="date"
                                           style="width: 100%"
                                           value-format="timestamp"
                                           placeholder="选择日期">
                                   </el-date-picker>
                            </el-form-item>
                    </span>
                    <span v-if="item.dataType == 'bool'">
                             <el-form-item :label="item.alias" label-width="100px"
                                           :rules="item.necessary=='0'?[{ required: true, message: '必填项不能为空'}]:''">
                                <el-radio-group v-model="entryData[item.name]">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                    </span>
                </span>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="tableModelShow = false">取 消</el-button>
                <el-button type="primary" @click="saveEntryDataBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ProcessHandle",
        props:{
            nodeInfo:Object,
            assetList:Array,
            process:Object
        },
        data(){
            return{
                actions:[],
                table:{},       //整体表头信息（有表格别名/字段列表）
                tableHead:[],   //只有表单字段列表
                entryData:{},   //输入数据绑定的表单对象
                entryIds:{},

                //填写表单
                tableModelShow:false,

                tableOverList:[],       //被填写过的asset

            }
        },
        methods:{
            /** 提交当前action的所有操作 */
            subBtn(item){
                let cnt = {
                    processId: this.process.id, // Long 流程实例编号
                    activityId: this.nodeInfo.id, // Long 流程节点编号
                    actionId:item.id,
                    userId:'2222',
                }
                this.executeProcessAction(cnt)
            },
            //执行流程行为
            executeProcessAction(cnt){
                this.$api.executeProcessAction(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('操作成功')
                    }else{
                        this.$message.error('操作失败')
                    }
                    this.$router.push('/page')
                })
            },


            writeModelShowBtn(item){
                this.entryData = {}
                this.entryIds = {}

                this.entryIds.userId = '222'
                this.entryIds.processId = this.$store.state.process.processInfo.id
                this.entryIds.descId = item.id
                this.entryIds.tableSchemaId = item.uri
                let cnt={
                    id:item.uri,
                }

                this.$api.getTableSchemaById(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.table = this.$util.tryParseJson(res.data.c)
                        this.tableHead = this.table.columns
                        console.log('-------------table--------')
                        console.log(this.table)
                        this.entryIds.tableSchemaName = this.table.alias

                    }else {
                        this.table = {}
                        this.tableHead ={}
                    }
                    this.tableModelShow = true

                })



            },
            /** 保存输入的表单数据*/
            saveEntryDataBtn(){
                console.log(this.entryIds)
                console.log(this.entryData)
                this.entryIds.data = this.entryData
                console.log(this.entryIds)
                this.$api.insertProcessTableData(this.entryIds,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('提交数据成功')
                    }else{
                        this.$message.error('操作失败')
                    }
                })


            },
            /** 计算列单击计算*/
            getComputeVal(){
                console.log('1111')
                console.log(this.entryData)
                for(let i=0;i<this.tableHead.length;i++){
                    if(this.tableHead[i].computeFormula !='' && this.tableHead[i].computeFormula != undefined && this.tableHead[i].computeFormula!= null){
                        let val = this.$commen.getFormulaResult(this.entryData,this.tableHead[i].computeFormula)
                        // this.entryData[this.tableHead[i].name] = val
                        this.$set( this.entryData,this.tableHead[i].name,val)
                    }
                }
            }
        },
        mounted(){
            this.actions = JSON.parse(this.nodeInfo.actions)

            console.log(this.assetList)
            let descIds = []
            for(let i=0;i<this.assetList.length;i++){
                descIds.push(this.assetList[i].id)
            }

            let cnt = {
                processId:this.$store.state.process.processInfo,
                descIds:descIds,
                count:500,
                offset:0
            }
            this.$api.getProcessAssetByDescIds(cnt,(res)=>{
                console.log(this.tableOverList)
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.tableOverList = this.$util.tryParseJson(res.data.c)
                }else {
                    this.tableOverList = []
                }
                console.log(this.tableOverList)
            })



        }


    }
</script>

<style scoped lang="scss">
    .node-title{
        width: auto;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        color: #63a35c;
    }
    .node-content{
        width: auto;
        padding: 20px;
    }
    .resource-box{
        width: auto;

        border-radius: 5px;
        padding: 10px;
    }
    .resource-title{
        width: auto;
        height: 30px;
        color: #333;
        font-size: 16px;
        font-weight: 600;
    }
    .action-btn{
        width: auto;
        height: 40px;
        margin-top: 30px;
        line-height: 40px;
        text-align: center;
    }

    .none-box{
        width: auto;
        height: 40px;
        line-height: 40px;
        color: #666;
    }
    /** 表格样式*/
    #table-box{
        width: 100%;
        margin-top: 20px;
        th{
            border: 1px solid #eee;
            height: 50px;
        }
        td{
            border: 1px solid #eee;
            height: 40px;
            text-align: center;
        }
    }
</style>
