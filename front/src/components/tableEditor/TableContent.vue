<template>
    <div>
        <div class="form-title">
            <el-form  label-width="100px">
                <el-form-item label="表格名称">
                    <el-input v-model="alias" size="small" placeholder="表名称" style="width: 60%"></el-input>
                </el-form-item>
                <el-form-item label="标签选择">
                    <el-checkbox-group v-model="tags">
                        <el-checkbox v-for="(item,index) in tagList" :key="index"
                                     :label="item.name" name="tags" ></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </div>
        <div class="form-table">
            <table class="table-design">
                <thead>
                <th>字段名</th>
                <th>字段别名</th>
                <th>是否必填</th>
                <th>字段类别</th>
                <th>数据类型</th>
                <th>计算公式</th>
                <th>操作</th>
                </thead>
                <tbody >
                    <tr v-for="(item,index) in tableData" :key="index">
                        <td>{{item.name}}</td>
                        <td>{{item.alias}}</td>
                        <td>
                            {{necessaryFilter(item.necessary)}}
                        </td>
                        <td>
                            {{columnTypeFilter(item.columnType)}}
                        </td>
                        <td>
                            {{dataTypeFilter(item.dataType)}}
                        </td>
                        <td>{{item.computeFormula}}</td>
                        <td>
                            <el-button type="primary" size="mini" @click="checkDataBtn(index)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="delDataBtn(index)" style="margin-left: 20px">删除</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="form-table-btn">
            <el-button type="primary" size="small" @click="saveBtn" style="width: 20%">提交数据配置</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tableContent",
        props:{
            tagList:Array
        },
        data(){
            return {
                tableData:[],
                alias:'',
                type:1,
                tags:[],
                dataTypeList:this.$constData.dataTypeList
            }
        },
        computed:{
            getTableData(){
                return this.$store.state.tableEditor.tableData
            },
            getTableActive(){
                return this.$store.state.tableEditor.tableActive
            },
        },
        watch:{

            getTableData(val){
                this.tableData = JSON.parse(JSON.stringify(val))
            },
            getTableActive(val){
                if(val == '-1'){
                    this.tableData = []
                    this.alias = ''
                    this.tags =[]
                }else{
                    this.tableData = this.$store.state.tableEditor.tableActiveArr.columns
                    this.alias = this.$store.state.tableEditor.tableActiveArr.alias
                    this.tags = this.$store.state.tableEditor.tableActiveArr.tags
                    console.log(this.$store.state.tableEditor.tableActiveArr);
                }
                this.$store.state.tableEditor.changeIndex = '-1'
                this.$store.state.tableEditor.tableData = this.tableData
            }
        },

        methods:{
            /** 数据过滤器*/
            /** 是否必填*/
            necessaryFilter(key){
                if(key == '0'){
                    return '必填'
                }else if( key == '1'){
                    return '非必填'
                }
            },
            /** 字段类别*/
            columnTypeFilter(key){
                if(key == 'data'){
                    return '数据列'
                }else if(key == 'compute'){
                    return '计算列'
                }
            },
            /** 数据类型*/
            dataTypeFilter(key){
                for(let i=0;i<this.dataTypeList.length;i++){
                    if(this.dataTypeList[i].key == key){
                        return this.dataTypeList[i].val
                    }
                }
            },
            /** 编辑按钮*/
            checkDataBtn(_index){
                console.log(_index)
                this.$store.state.tableEditor.changeIndex = _index
                // this.data = JSON.parse(JSON.stringify(this.tableData[_index]))
            },

            /** 删除一行数据*/
            delDataBtn(_index){
                console.log(_index)
            },


            saveBtn(){

                let cnt = {
                    tags:this.tags,
                    alias:this.alias,
                    type:this.type,
                    columns:this.$store.state.tableEditor.tableData
                }
                this.$api.createTableSchema(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('操作成功')
                    }else{
                        this.$message.error('操作失败')
                    }
                })
                this.$store.state.tableEditor.tableData = []
                this.$store.state.tableEditor.tableActive = '-1'
                this.$store.state.tableEditor.changeIndex = '-1'
                this.$store.state.tableEditor.tableSetRow = {}
                this.$router.push('/page')

            }

        },
        mounted(){
            this.tableData = this.$store.state.tableEditor.tableData

            console.log(this.tagList);
            console.log(this.tableData);
        }
    }
</script>

<style scoped lang="scss">
    .form-title {
        width: auto;
        padding: 10px 0px;
        background: #fff;
        line-height: 40px;
        font-size: 16px;
        color: #666;
        border-bottom: 1px solid #eee;
    }

    .form-table {
        margin-top: 20px;
    }

    /** 表格相关样式*/
    .table-design {
        width: 100%;
        font-family: verdana, arial, sans-serif;
        font-size: 11px;
        color: #333333;
        border: 1px solid #e8e8e8;
        border-collapse: collapse;
        thead th {
            height: 40px;
            padding: 8px;
            border: 1px solid #e8e8e8;
            background-color: rgb(240, 249, 235);
        }
        tbody tr td {
            padding: 8px;
            color: #666;
            border: 1px solid #e8e8e8;
            background-color: #ffffff;
            text-align: center;
        }
    }

    .form-table-btn{
        text-align: center;
        margin-top: 20px;
    }

</style>
