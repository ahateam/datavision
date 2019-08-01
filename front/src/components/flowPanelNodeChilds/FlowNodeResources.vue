<template>

    <div>
        <div class="add-resouce">
            <el-button type="success" size="mini" @click="addShowAssetBtn">
                + 新增资源
            </el-button>
        </div>
        <div style="margin-top: 10px">
            <el-tabs v-model="activeName" type="card" >
                <el-tab-pane label="表格" name="table" >
                    <div class="text-info" v-if="tableList.length ==0 ">
                        暂无表格数据
                    </div>
                    <div v-else class="item-list-box">
                        <div class="item-list"
                             v-for="(item,index) in tableList"
                             :key="index"
                             @click="addTableBtn(item)">
                            {{item.alias}}
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="报表" name="report">
                    <div class="text-info" v-if="reportList.length ==0 ">
                        暂无报表数据
                    </div>
                    <div v-else class="item-list-box">

                    </div>
                </el-tab-pane>
                <el-tab-pane label="文件" name="file">
                    <div class="text-info" v-if="fileList.length ==0 ">
                        暂无文件数据
                    </div>
                    <div v-else class="item-list-box">

                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>


        <div class="active-node-list">
            <div class="active-node-title">
                已选中资源
            </div>
            <div class="active-node-content">
                <div class="active-node-item-title">
                    选中表格
                </div>
                <div class="active-node-item-content">
                    <span v-for="(item,index) in assetDesc.table"
                          :key="index">
                          <el-tag size="small"
                                  class="tag-box"
                                  closable
                                  @close="delTableActiveItem(index)">
                                {{item.alias}}
                          </el-tag>
                    </span>
                </div>

                <div class="active-node-item-title" style="margin-top: 20px">
                    选中报表
                </div>
                <div class="active-node-item-content">
                     <span v-for="(item,index) in assetDesc.report"
                           :key="index">
                          <el-tag size="small"
                                  class="tag-box"
                                  closable>
                                {{item.name}}
                          </el-tag>
                    </span>
                </div>
                <div class="active-node-item-title" style="margin-top: 20px">
                    选中文件
                </div>
                <div class="active-node-item-content">
                        <span v-for="(item,index) in assetDesc.file"
                              :key="index">
                          <el-tag size="small"
                                  class="tag-box"
                                  closable>
                                {{item.name}}
                          </el-tag>
                    </span>
                </div>

            </div>
        </div>


        <!--弹出层-->
        <el-dialog title="新增资源定义" :visible.sync="showAddAssetModel">
            <el-form>
                <el-form-item label="资源名称" label-width="100px">
                    <el-input v-model="addAsset.name" autocomplete="off" placeholder="请输入资源名称"></el-input>
                </el-form-item>
                <el-form-item label="资源类型" label-width="100px">
                    <el-select v-model="addAsset.type" placeholder="请选择资源类型" style="width: 100%">
                        <el-option :label="item.val" :value="item.key"
                                   v-for="(item,index) in typeList" :key="index"></el-option>
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

                assetDesc: {},

                /** 当前节点能够选择的资源列表*/
                tableList: [],
                reportList: [],
                fileList: [],

                /** 当前节点已经选中的资源列表*/
                tableActiveList: [],
                reportActiveList: [],
                fileACtiveList: [],

                typeList:[{key:'table',val:'表格'},{key:'report',val:'报表'},{key:'file',val:'文件'}],
                /** 弹出层*/
                showAddAssetModel:false,
                addAsset:{
                    ownerId:'',
                    name:'',
                    type:'',
                    necessary:false,
                    remark:'',
                    template:'',        //url地址
                    ext:'',

                }

            }
        },
        computed:{
            getActiveNode(){
                return this.$store.state.flowData.nodeActive
            }
        },
        watch:{
            getActiveNode(val){
                let str = this.$store.state.flowData.nodeActiveInfo.assetDesc
                this.assetDesc = JSON.parse(str)
                console.log( this.assetDesc)
            }
        },
        methods: {
            /** 修改选中节点数据*/
            setNodeACtiveInfo(assetDesc){
                this.$store.state.flowData.nodeActiveInfo.assetDesc = JSON.stringify(assetDesc)
            },

            /** 请求table列表*/
            getTableSchemas(cnt) {
                this.$api.getTableSchemas(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.tableList = this.$util.tryParseJson(res.data.c)
                    } else {
                        this.tableList = []
                    }
                })
            },
            /** 选中table*/
            addTableBtn(item) {

                let _index = -1
                for (let i = 0; i < this.assetDesc.table.length; i++) {
                    if (this.assetDesc.table[i].id == item.id) {
                        _index = i
                        break
                    }
                }
                if (_index == -1) {
                    this.assetDesc.table.push(item)
                    this.setNodeACtiveInfo(this.assetDesc)
                } else {
                    this.$message.error('该资源已经被选中')
                }
            },
            /** 删除选中的table*/
            delTableActiveItem(_index) {
                this.assetDesc.table.splice(_index, 1)
                this.setNodeACtiveInfo(this.assetDesc)
            },

            /** 新增asset 弹窗显示*/
            addShowAssetBtn(){
                this.showAddAssetModel = true
            },
            /** 新增asset*/
            addAssetBtn(){
                let cnt = JSON.parse(JSON.stringify(this.addAsset))
                cnt.ownerId = this.$store.state.flowData.nodeActive
                this.$api.createAssetDesc(cnt,(res)=>{
                    console.log(res)
                })

            }

        },
        mounted() {
            /** 请求table列表*/
            let cnt = {
                count: 500,
                offset: 0
            }
            this.getTableSchemas(cnt)
            let str = this.$store.state.flowData.nodeActiveInfo.assetDesc
            this.assetDesc = JSON.parse(str)
        }
    }
</script>

<style scoped lang="scss">
    .add-resouce{
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
        width: auto;
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

</style>
