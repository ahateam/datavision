<template>
    <div>

        <div class="menu-title">
            <span style="margin-left: 20px">字段配置</span>
            <el-button type="primary" icon="el-icon-plus" size="mini"
                       style="float: right;margin-right: 20px"
                       @click="addFiledBtn">新增字段
            </el-button>
        </div>

        <div :style="menuForm" class="menu-form">
            <el-form label-width="100px" style="width: 90%;margin: 0 auto;margin-top: 20px">
                <el-form-item label="字段名">
                    <el-input v-model="data.name" size="mini" placeholder="字段名（必须英文）"></el-input>
                </el-form-item>
                <el-form-item label="字段别名">
                    <el-input v-model="data.alias" size="mini" placeholder="字段别名（建议中文）"></el-input>
                </el-form-item>
                <el-form-item label="是否必填">
                    <el-radio-group v-model="data.necessary">
                        <el-radio label="0"> 必填</el-radio>
                        <el-radio label="1"> 非必填</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="数据类型">
                    <el-select v-model="data.dataType"
                               @change="changeDataType"
                               placeholder="请选择数据类型" size="mini">
                        <el-option
                                v-for="(item,index) in dataTypeList" :key="index"
                                :label="item.val" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字段类别">
                    <el-radio-group v-model="data.columnType">
                        <el-radio label="data"
                                  :disabled="data.dataType != 'int' && data.dataType != 'decimal' && data.dataType != 'money' ">
                            数据
                        </el-radio>
                        <el-radio label="compute"
                                  :disabled="data.dataType != 'int' && data.dataType != 'decimal' && data.dataType != 'money' ">
                            运算
                        </el-radio>
                    </el-radio-group>
                </el-form-item>


                <!--根据数据类型不同 分支数据-->
                <!--运算规则设置-->
                <span v-if="data.columnType == 'compute'">
                                        <el-form-item label="计算公式">
                                            <el-button type="primary" size="mini" style="width: 100%"
                                                       @click="setPormulaBtn">设置计算公式</el-button>
                                        </el-form-item>
                                    </span>

                <!--整型/字符串-->
                <span v-if="data.dataType == 'int' || data.dataType == 'string'">
                                        <el-form-item label="数据长度">
                                            <el-input v-model="data.dataProp.length" size="mini"
                                                      placeholder="请输入数据长度"></el-input>
                                        </el-form-item>
                                    </span>
                <!--小数-->
                <span v-if="data.dataType == 'decimal'">
                                         <el-form-item label="保留位数">
                                            <el-input v-model="data.dataProp.decimals" size="mini"
                                                      @change="changeIntRules" placeholder="请输入小数保留位数"></el-input>
                                         </el-form-item>
                                         <el-form-item label="取整规则">
                                            <el-select v-model="data.dataProp.intRules"
                                                       @change="changeDecimals"
                                                       placeholder="请选择取整规则" size="mini">
                                                <el-option
                                                        v-for="(item,index) in intRulesList" :key="index"
                                                        :label="item.val" :value="item.key">
                                                </el-option>
                                            </el-select>
                                         </el-form-item>
                                    </span>

                <!--日期/日期时间-->
                <span v-if="data.dataType == 'date'">
                                          <el-form-item label="起始日期">
                                                <el-date-picker
                                                        size="mini"
                                                        v-model="data.dataProp.start"
                                                        type="date"
                                                        style="width: 100%"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                         </el-form-item>
                                         <el-form-item label="截止日期">
                                                <el-date-picker
                                                        size="mini"
                                                        v-model="data.dataProp.end"
                                                        type="date"
                                                        style="width: 100%"
                                                        placeholder="截止日期">
                                                </el-date-picker>
                                         </el-form-item>
                                    </span>
                <span v-if="data.dataType == 'time'">
                                          <el-form-item label="起始时间">
                                                <el-date-picker
                                                        size="mini"
                                                        v-model="data.dataProp.start"
                                                        type="datetime"
                                                        style="width: 100%"
                                                        placeholder="选择起始时间">
                                                </el-date-picker>
                                         </el-form-item>
                                         <el-form-item label="截止时间">
                                                <el-date-picker
                                                        size="mini"
                                                        v-model="data.dataProp.end"
                                                        type="datetime"
                                                        style="width: 100%"
                                                        placeholder="选择截止时间">
                                                </el-date-picker>
                                         </el-form-item>
                                    </span>
                                    <span>
                                        <el-form-item label="单位">
                                            <el-input v-model="data.dataUnit" size="mini"
                                                      placeholder="请输入字段单位"></el-input>
                                         </el-form-item>
                                    </span>


            </el-form>
            <div class="add-btn-box">
                <el-button type="success" @click="completeBtn" size="small" style="width: 90%">完成字段配置</el-button>
            </div>
        </div>

        <el-dialog title="设置计算公式" :visible.sync="showFormula">
            <div class="data-list-box">
                <el-form >
                    <el-form-item label="可选数据列" label-width="120px" >
                        <span v-if="computeList.length >0">
                            <el-tag v-for="(item,index) in computeList" :key="index"
                                    class="tag-item"
                                    @click="addItemBtn(item,index)">
                                {{item.name}}:{{item.alias}}
                            </el-tag>
                        </span>
                        <span v-else>
                            暂无可选数据列
                        </span>

                    </el-form-item>
                    <el-form-item label="计算符选择" label-width="120px" >
                        <el-tag v-for="(item,index) in signList" :key="index"
                                class="tag-sign"
                                @click="addSign(item)"
                                type="danger" size="small" >
                            {{item}}
                        </el-tag>
                    </el-form-item>
                    <el-form-item label="生成计算公式" label-width="120px" >
                        <span>
                                {{formulaData}}
                        </span>

                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showFormula = false">取 消</el-button>
                <el-button type="primary" @click="resetCompute">重置计算公式</el-button>
                <el-button type="primary" @click="setFormulaBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "tablePanel",
        data(){
            return{
                tableData:[],
                menuForm: {
                    width: '100%',
                },
                data:{},
                newData: {
                    name: '',              //字段名
                    alias: '',             //字段别名
                    necessary:'0',        //是否必填 0：必填 1：非必填
                    columnType: 'data',   //数据列还是计算列
                    dataType: '',          //数据类型
                    dataUnit:'',            //单位
                    computeFormula:'',            //公式
                    selections:[],              //选项
                    dataProp: {
                        length: '',      //数据位数
                        decimals: '',    //小数位数
                        intRules: '',    //取整规则
                        start: '',       //开始日期
                        end: '',         //截止日期
                    },
                },
                dataTypeList:this.$constData.dataTypeList,
                intRulesList:this.$constData.intRulesList,
                signList:this.$constData.signList,

                /** 计算公式弹窗*/
                formulaData:'',
                showFormula:false,
                computeList:[],

                changeIndex:'-1'
            }
        },
        computed:{
            getTableData(){
                return this.$store.state.tableEditor.tableData
            },
            getChangeIndex(){
                return this.$store.state.tableEditor.changeIndex
            }
        },
        watch:{
            getTableData(val){

                this.tableData = JSON.parse(JSON.stringify(val))
                console.log(this.tableData)
            },

            getChangeIndex(val){
                this.changeIndex = val
                if(this.changeIndex == '-1'){
                    this.data = JSON.parse(JSON.stringify(this.newData))
                }else{
                    this.data =this.$store.state.tableEditor.tableData[this.changeIndex]
                }

                console.log(this.changeIndex)
                console.log(this.data)
            }
        },
        methods:{
            /** 新增字段*/
            addFiledBtn(){
                this.data = JSON.parse(JSON.stringify(this.newData))
                this.changeIndex = '-1'
            },

            /** 更改数据类型改变默认值*/
            changeDataType(){
                this.data.dataProp.length = ''
                this.data.dataProp.decimals = ''
                this.data.dataProp.intRules = ''
                this.data.dataProp.start = ''
                this.data.dataProp.end = ''
                this.data.dataUnit = ''
                this.data.columnType = 'data'
                this.formulaData = ''

            },


            /** 小数 规则配置
             * 改变取整规则
             * */
            changeIntRules(){
                if( this.data.dataProp.decimals != 0){
                    this.data.dataProp.intRules = 0
                }
            },
            /** 改变小数位*/
            changeDecimals(){
                if( this.data.dataProp.intRules != 0){
                    this.data.dataProp.decimals = 0
                }
            },

            /** 设置公式弹出层*/
            setPormulaBtn(){
                this.resetCompute()
                this.showFormula = true
                console.log(this.computeList)
            },
            /** 添加节点进入公式*/
            addItemBtn(item,_index){
                let str = '{{'+item.name+'}}'
                if(this.formulaData == undefined || this.formulaData == null ||this.formulaData == ''){
                    this.formulaData =  str
                }else{
                    let res =this.$commen.validataCompute(this.formulaData,0)
                    if(res){
                        this.formulaData = this.formulaData+ str
                    }else{
                        this.$message.error('插入数据失败')
                    }
                }
            },
            /** 选择运算符*/
            addSign(item){
                let str =item
                if(this.formulaData == undefined || this.formulaData == null ||this.formulaData == ''){
                    if(str == '(' ){
                        this.formulaData = str
                    }else{
                        this.$message.error('操作失败，请先选择一个数据子项')
                    }
                }else{
                    let res =this.$commen.validataCompute(this.formulaData,1,str)
                    if(res){
                        this.formulaData = this.formulaData+ str
                    }else{
                        this.$message.error('操作失败，请先选择一个数据子项')
                    }
                }
            },
            /** */
            setFormulaBtn(){
                this.data.computeFormula = this.formulaData
                this.formulaData = ''
                this.showFormula = false

            },
            /** 重置计算公式,重新计算可选项*/
            resetCompute(){

                this.formulaData = this.data.computeFormula
                this.computeList = []
                let arr = []
                for(let i =0;i<this.tableData.length;i++){
                    if(this.tableData[i].dataType == 'int' || this.tableData[i].dataType == 'decimal' || this.tableData[i].dataType == 'money'){
                        if(this.tableData[i].name != this.data.name){
                           let obj= JSON.parse(JSON.stringify(this.tableData[i]))
                            arr.push(obj)
                        }
                        /** 需要满足 当前字段没有成为 其他的字段中的计算公式的 子项    如果是修改操作可能已经有部分字段已经加入到那个字段*/
                    }
                }
                /**  去掉已经有当前列成为子项用来计算的列*/
                for(let i =0;i<arr.length;i++){
                    if(arr[i].computeFormula != null && arr[i].computeFormula != undefined && arr[i].computeFormula != ''){
                        let res = this.$commen.getFormulaRepeat(this.data.name,arr[i].computeFormula)
                        if(res == false){
                            this.computeList.push(arr[i])
                        }
                    }else{
                        this.computeList.push(arr[i])
                    }
                }
            },


            /** 完成字段配置 更改原表配置 进行赋值*/
            completeBtn(){
                if(this.data.name == '' || this.data.alias == '' || this.data.necessary == '' || this.data.columnType == '' || this.data.dataType == '' ){
                    this.$message.error('请将必填项填写完整')
                }else{
                    let nameKey = -1
                    if(this.tableData.length >0){
                        for(let i =0;i<this.tableData.length;i++){
                            if(this.tableData[i].name ==this.data.name){
                                nameKey = i
                                break
                            }
                        }
                    }

                    if(this.changeIndex == -1){
                        if(nameKey != -1){
                            this.$message.error('字段名不能够重复，请修改字段名')
                        }else{
                            let obj = JSON.parse(JSON.stringify(this.data))
                            this.tableData.push(obj)
                        }
                    }else{
                        let obj = JSON.parse(JSON.stringify(this.data))
                        this.tableData.splice(this.changeIndex,1,obj)
                    }
                    this.changeIndex = '-1'
                    this.$store.state.tableEditor.changeIndex =  this.changeIndex
                    this.$store.state.tableEditor.tableData = this.tableData
                    this.data = JSON.parse(JSON.stringify(this.newData))
                }
            },


        },
        mounted(){
            this.tableData = this.$store.state.tableEditor.tableData
            console.log(this.tableData)
            this.changeIndex = this.$store.state.tableEditor.changeIndex
            if(this.changeIndex == '-1' || this.changeIndex == '0'){
                this.data =JSON.parse(JSON.stringify(this.newData))
            }else{
                this.data = this.$store.state.tableEditor.tableData[this.changeIndex]
            }

        }
    }
</script>

<style scoped lang="scss">
    /** 配置器相关*/
    .menu-title {
        width: auto;
        height: 30px;
        color: #666;
        font-size: 16px;
        font-weight: 600;
        padding: 5px;
        line-height: 30px;

        border-bottom: 1px solid #b3d8ff
    }

    .menu-icon-btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .menu-item {
        width: 100%;
    }

    .menu-form {
        overflow-y: auto;
    }
    .add-btn-box{
        margin-top: 30px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .form-table-btn{
        width: auto;
        height: 40px;
        margin-top: 40px;
        line-height: 40px;
        text-align: center;

    }

    /** 计算公式弹出窗*/
    .data-list-box{
        width: 100%;
    }
    .tag-sign{
        font-size: 16px;
        font-weight: 600;
        margin:10px 0 0 10px;
        cursor:pointer;
    }
    .tag-sign:hover{
        background: #f56c6c;
        color: #fff;
    }
    .tag-sign:active{
        background:#fef0f0;
        color: #fff;
    }
    .tag-item{
        margin: 10px 0 0 10px;
        cursor:pointer;
    }
    .tag-item:hover{
        background: #409EFF;
        color: #fff;

    }
    .tag-item:active{
        background: #d9ecff;
        color: #fff;
    }
</style>
