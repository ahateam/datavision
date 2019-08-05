<template>

    <div>
        <div class="add-resouce">
            <el-button type="success" size="mini" @click="addShowAssetBtn">
                + 节点所需资源
            </el-button>
        </div>
        <div style="margin-top: 10px">

            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="表格" name="table">
                    <div>
                        <div class="text-info"
                             v-if="assetDesc.table.length ==0 ">
                            暂无选中表格数据
                        </div>
                        <div v-else  class="item-list-box">
                            <el-tag
                                    class="tag-item-box"
                                    v-for="(item,index) in assetDesc.table"
                                    :key="index"
                                    @close="delItemAssetDesc(item)"
                                    closable>
                                {{item.name}}
                            </el-tag>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="报表" name="report">
                    <div>
                        <div class="text-info"
                             v-if="assetDesc.report.length ==0 ">
                            暂无选中报表数据
                        </div>
                        <div v-else class="item-list-box">


                            <el-tag
                                    class="tag-item-box"
                                    v-for="(item,index) in assetDesc.report"
                                    :key="index"
                                    @close="delItemAssetDesc(item)"
                                    closable>
                                {{item.name}}
                            </el-tag>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="文件" name="file">
                    <div>
                        <div class="text-info"
                             v-if="assetDesc.file.length ==0 ">
                            暂无选中文件数据
                        </div>
                        <div v-else class="item-list-box">
                            <el-tag
                                    class="tag-item-box"
                                    v-for="(item,index) in assetDesc.file"
                                    :key="index"
                                    @close="delItemAssetDesc(item)"
                                    closable>
                                {{item.name}}
                            </el-tag>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>


        <!--弹出层-->
        <el-dialog title="创建所需资源" :visible.sync="showAddAssetModel">
            <el-form>
                <el-form-item label="资源名称" label-width="100px">
                    <el-input v-model="addAsset.name" autocomplete="off" placeholder="请输入资源名称"></el-input>
                </el-form-item>
                <el-form-item label="资源类型" label-width="100px">
                    <el-select v-model="addAsset.type"
                               placeholder="请选择资源类型" style="width: 100%"
                               @change="getAssetList">
                        <el-option :label="item.val" :value="item.key"
                                   v-for="(item,index) in typeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资源对象" label-width="100px"
                              v-if="addAsset.type == 'table' || addAsset.type == 'report'">
                    <el-select v-model="addAsset.uri"
                               placeholder="请选择资源对象" style="width: 100%">
                        <el-option :label="item.alias" :value="item.id"
                                   v-for="(item,index) in assetList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否必须" label-width="100px">
                    <el-radio-group v-model="addAsset.necessary">
                        <el-radio :label="true">必须</el-radio>
                        <el-radio :label="false">非必须</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="资源说明" label-width="100px">
                    <el-input type="textarea" v-model="addAsset.remark" placeholder="请输入资源说明"></el-input>
                </el-form-item>
                <el-form-item label="模板地址" label-width="100px">
                    <el-input v-model="addAsset.template" autocomplete="off" placeholder="请输入模板地址URL（可选项）"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddAssetModel = false">取 消</el-button>
                <el-button type="primary" @click="addAssetBtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "FlowResources",

        data() {
            return {
                activeName: 'table',

                /** 当前节点能够选择的资源列表*/
                assetDesc: {table: [], report: [], file: []},


                /** 当前节点已经选中的资源列表*/
                tableActiveList: [],
                reportActiveList: [],
                fileACtiveList: [],

                typeList: [{key: 'table', val: '表格'}, {key: 'report', val: '报表'}, {key: 'file', val: '文件'}],
                /** 弹出层*/
                showAddAssetModel: false,
                addAsset: {
                    ownerId: '',
                    name: '',
                    type: '',
                    necessary: false,
                    remark: '',
                    template: '',        //url地址
                    ext: '',
                },
                assetList: [],
            }
        },
        computed: {
            getActiveNode() {
                return this.$store.state.flowData.nodeActive
            }
        },
        watch: {
            getActiveNode(val) {
                console.log(val)
                let cnt = {
                    ownerId: val,
                    offset: 0,
                    count: 500
                }
                this.getAssetDescList(cnt)
            }
        },
        methods: {

            /** 获取表格或者报表列表*/
            getAssetList() {
                let cnt = {
                    tags: [],
                    count: 500,
                    offset: 0
                }
                if (this.addAsset.type == 'table') {
                    this.$api.getTableSchemaByTags(cnt, (res) => {
                        if (res.data.rc == this.$util.RC.SUCCESS) {
                            this.assetList = this.$util.tryParseJson(res.data.c)
                        } else {
                            this.assetList = []
                        }
                    })

                } else if (this.addAsset.type == 'report') {
                    this.$api.getReportSchemaList(cnt, (res) => {
                        if (res.data.rc == this.$util.RC.SUCCESS) {
                            this.assetList = this.$util.tryParseJson(res.data.c)
                        } else {
                            this.assetList = []
                        }
                    })

                } else {
                    this.assetList = []
                }
            },

            /** 新增asset 弹窗显示*/
            addShowAssetBtn() {
                this.showAddAssetModel = true
            },
            /** 新增asset*/
            addAssetBtn() {
                let cnt = JSON.parse(JSON.stringify(this.addAsset))
                cnt.ownerId = this.$store.state.flowData.nodeActive
                let obj = {
                    ownerId: '',
                    name: '',
                    type: '',
                    necessary: false,
                    remark: '',
                    template: '',        //url地址
                    uri: '',
                }
                this.addAsset = obj
                this.$api.createAssetDesc(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.$message.success('操作成功')
                    } else {
                        this.$message.error('操作失败')
                    }
                    this.showAddAssetModel = false
                    let cnt1 = {
                        ownerId: cnt.ownerId,
                        offset: 0,
                        count: 500
                    }
                    this.getAssetDescList(cnt1)
                })

            },
            /** 查找资源定义列表*/
            getAssetDescList(cnt) {
                this.assetDesc = {table: [], report: [], file: []},
                    this.$api.getAssetDescList(cnt, (res) => {
                        let arr = []
                        if (res.data.rc == this.$util.RC.SUCCESS) {
                            arr = this.$util.tryParseJson(res.data.c)
                        } else {
                            arr = []
                        }
                        console.log(arr)
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].type == 'table') {
                                this.assetDesc.table.push(arr[i])
                            } else if (arr[i].type == 'report') {
                                this.assetDesc.report.push(arr[i])
                            } else if (arr[i].type == 'file') {
                                this.assetDesc.file.push(arr[i])
                            }
                        }


                        console.log(this.assetDesc)
                    })
            },
            /**  删除节点资源*/
            delItemAssetDesc(item){
                console.log(item.id)
                let cnt ={ids:[item.id]}
                console.log(cnt);
                this.$api.delAssetDesc(cnt,(res)=>{
                    if(res.data.rc== this.$util.RC.SUCCESS){
                        let cnt1 = {
                            ownerId: this.$store.state.flowData.nodeActive,
                            offset: 0,
                            count: 500
                        }
                        this.getAssetDescList(cnt1)
                    }else{
                        this.$message.error('操作失败')
                    }

                })
            }
        },
        mounted() {

            let id = this.$store.state.flowData.nodeActive
            let cnt = {
                ownerId: id,
                offset: 0,
                count: 500
            }
            this.getAssetDescList(cnt)


        }
    }
</script>

<style scoped lang="scss">
    .add-resouce {
        width: auto;
        height: 30px;
        line-height: 30px;

        padding: 0 10px;
    }

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
        height: 300px;
        line-height: 40px;
        color: #666;
        font-size: 16px;
        text-align: center;
    }

    .item-list-box {
        width: 90%;
        margin: 0 auto;
        height: 300px;
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

    .tag-item-box {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }

</style>
