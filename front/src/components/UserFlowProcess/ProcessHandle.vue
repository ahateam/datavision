<template>
    <div  v-if="!loading">
        <div class="node-title"  >
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

                                <td>
                                    <span style="color: #67C23A;" v-if="item.assetId">是</span>
                                    <span style="color: #666;" v-else>否</span>
                                </td>
                                <td>
                                    <!--<el-button type="primary" size="small">下载模板</el-button>-->
                                    <!--<el-button type="primary" size="small">上传文件</el-button>-->

                                    <el-button type="primary" size="small" @click="writeModelShowBtn(item)"  v-if="item.assetId && isShow">查看</el-button>

                                    <el-button type="primary" size="small" @click="writeModelShowBtn(item)"  v-else-if="item.assetId">重新编辑</el-button>
                                    <el-button type="primary" size="small" @click="writeModelShowBtn(item)"  v-else>在线填写</el-button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="action-btn" v-if="!isShow">
                    <span v-for="(item,index) in actions" :key="index">
                           <el-button type="primary"  @click="subBtn(item)"
                                      style="margin-left: 20px;margin-top: 20px">
                        {{item.label}}
                    </el-button>
                    </span>
                </div>

            </div>
        </div>


        <el-dialog :title="table.alias" :visible.sync="tableModelShow"  >
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
                                          :readonly="isShow"
                                          :placeholder="item.columnType=='compute'?'根据公式自动计算完成的值':'请输入数字'"
                                            >
                                </el-input>
                            </el-form-item>
                    </span>
                    <span v-if="item.dataType == 'string'">
                            <el-form-item :label="item.alias" label-width="100px"
                                          :rules="item.necessary=='0'?[{ required: true, message: '必填项不能为空'}]:''"
                                       >
                                <el-input v-model="entryData[item.name]" type="text" autocomplete="off"
                                          :readonly="isShow"  placeholder="请输入字符串数据" ></el-input>
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
                                         :readonly="isShow"
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
                                           :readonly="isShow"
                                           value-format="timestamp"
                                           placeholder="选择日期">
                                   </el-date-picker>
                            </el-form-item>
                    </span>
                    <span v-if="item.dataType == 'bool'">
                             <el-form-item :label="item.alias" label-width="100px"
                                           :rules="item.necessary=='0'?[{ required: true, message: '必填项不能为空'}]:''">
                                <el-radio-group v-model="entryData[item.name]"   :readonly="isShow">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                    </span>
                </span>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="tableModelShow = false">取 消</el-button>
                <el-button type="primary" @click="tableModelShow = false" v-if="isEdit && isShow">确定</el-button>
                <el-button type="primary" @click="saveEditDataBtn" v-else-if="isEdit">保存修改</el-button>
                <el-button type="primary" @click="saveEntryDataBtn"  v-else>确 定</el-button>

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
            process:Object,
            processActivityId:Number,
        },
        watch:{
            nodeInfo(){
                this.getNodeData()
            },
            process(){
                this.getNodeData()
            },
        },
        data(){
            return{
                loading:true,
                actions:[],
                table:{},       //整体表头信息（有表格别名/字段列表）
                tableHead:[],   //只有表单字段列表
                entryData:{},   //输入数据绑定的表单对象
                entryIds:{},

                isShow:false,

                //填写表单
                isEdit:false,
                tableModelShow:false,
                tableDataId:'',
                tableOverList:[],       //被填写过的asset


            }
        },
        methods:{
            /** 提交当前action的所有操作 */
            subBtn(item){

                let _index = -1

               for(let i=0;i<this.assetList.length;i++){
                   if(this.assetList[i].necessary && !this.assetList[i].assetId){
                       _index = i
                       break
                   }
               }

               if(_index == -1){
                   let cnt = {
                       processId: this.process.id, // Long 流程实例编号
                       activityId: this.nodeInfo.id, // Long 流程节点编号
                       actionId:item.id,
                       userId:'2222',
                   }
                   this.executeProcessAction(cnt)
               }else{
                   this.$message.error('请先填写必填资料！')
               }

            },
            //执行流程行为
            executeProcessAction(cnt){
                this.$api.executeProcessAction(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('操作成功')
                    }else{
                        this.$message.error('操作失败')
                    }
                    console.log('2222222222222222')
                    this.$emit('changeActivity','0')
                })
            },

            getProcessAssetByIdANDUserId(item){
                if(item.assetId){ //如果用户已经给当前资源输入过数据 需请求已经有的数据出来
                    let cnt ={
                        userId:localStorage.getItem('userId'),
                        assetId:item.assetId
                    }
                    this.$api.getProcessAssetByIdANDUserId(cnt,(res)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.entryData = this.$util.tryParseJson(res.data.c).tableData.data
                        }else{
                            this.entryData = {}
                        }
                        this.tableDataId = item.tableDataId
                        this.isEdit = true
                        this.tableModelShow = true
                    })
                }else{
                    this.isEdit = false
                    this.tableModelShow = true
                }
            },

            //获取弹窗数据
            writeModelShowBtn(item){
                this.entryData = {}
                this.entryIds = {}
                this.entryIds.userId = localStorage.getItem('userId')
                this.entryIds.processId = this.$store.state.process.processInfo.id
                this.entryIds.descId = item.id
                this.entryIds.tableSchemaId = item.uri


                let cnt={
                    id:item.uri,
                }

                //获取要输入的数据的表头字段
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
                    this.getProcessAssetByIdANDUserId(item)


                })





            },
            /** 保存新增的输入的表单数据*/
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
                    console.log('--------tableModelShow----------')
                    this.tableModelShow = false
                    this.$emit('changeActivity','0')
                })
            },


            /** 保存更改的输入的表单数据*/
            saveEditDataBtn(){
                console.log('-----entryIds----------')
                console.log(this.entryIds)
                let cnt = {
                    tableSchemaId:this.entryIds.tableSchemaId,
                    tableDataId:this.tableDataId,
                    data:this.entryData
                }
                this.$api.editProcessTableData(cnt,(res)=>{
                    console.log(res)
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('操作成功')
                    }else{
                        this.$message.success('操作失败')
                    }
                    console.log('-----tableModelShow----------')
                    this.tableModelShow = false
                    this.$emit('changeActivity','0')
                })

                console.log(cnt)
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
            },
            getNodeData(){
                this.actions = JSON.parse(this.nodeInfo.actions)


                if(this.nodeInfo.id == this.processActivityId){
                    this.isShow = false
                }else{
                    this.isShow = true
                }


                /** 获取用户已经填写过的资源 列表  返回有误*/
                    //获取单个已经被填写的资源的详细信息--
                    // 根据已经填写的资源列表与需要的资源id进行匹配之后得到具体的数据id再请求单个的
                let cnt1= {
                        processId:this.$store.state.process.processInfo.id,
                        userId:'222',
                        count:500,
                        offset:0
                    }

                this.$api.getProcessAssetList(cnt1,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tableOverList = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tableOverList = []
                    }
                    console.log('------用户已经提交的资源- tableOverList---');
                    console.log(this.tableOverList)

                    for(let i =0;i<this.assetList.length;i++){
                        for(let j=0;j< this.tableOverList.length;j++){
                            if(this.assetList[i].id == this.tableOverList[j].descId){
                                let  obj = this.assetList[i]
                                obj.assetId =  this.tableOverList[j].id
                                obj.tableDataId = this.tableOverList[j].src
                                this.assetList.splice(i,1,obj)
                                break
                            }
                        }
                    }
                    this.loading = false
                    console.log('-----editasset------')
                    console.log(this.assetList)

                })
            }
        },

        mounted(){
            this.getNodeData()

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
