<template>
    <div>
        <div class="box">
            <div class="item-list-box">
                <el-form label-width="100px">
                    <el-form-item label="行为类型">
                        <el-select v-model="type"
                                   size="small"
                                   placeholder="请选择行为类型">
                            <el-option
                                    v-for="(item,index) in typeList"
                                    :key="index"
                                    :label="item.val" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下一跳节点">
                        <el-select v-model="target"
                                   size="small"
                                   placeholder="请选择下一跳节点地址"
                                   @focus="getNodeList">
                            <el-option
                                    v-for="(item,index) in nodeList"
                                    v-if="item.id != source"
                                    :key="index"
                                    :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="add-btn">
                    <el-button type="primary" size="small"
                               @click="addActionBtn()">
                        新增
                    </el-button>
                    <el-button type="primary" size="small"
                               @click="editActionBtn()">
                        修改
                    </el-button>
                    <el-button type="danger" size="small"> 清空选中</el-button>
                </div>
            </div>

        </div>
        <div class="active-node-list">
            <div class="active-node-title">
                已有行为
            </div>
            <div class="active-node-content">
                <div v-for="(item,index) in actions" :key="index">
                    <div class="active-node-item-content"
                        @click="checkItemAction(item,index)">
                        <div class="active-node-type">
                                <span
                                        v-for="(item1,index1) in actionTypeList"
                                        :key="index1"
                                        v-if="item1.key == item.type">
                                    {{item1.val}}
                                    <span style="font-size: 14px;text-align: right;float: right;margin-right: 10px">
                                        <i class="iconfont icon-xiayibu"></i>
                                    </span>
                                </span>
                        </div>
                        <div class="active-node-item-text">

                             <span
                                     v-for="(item1,index1) in nodeList"
                                     :key="index1"
                                     v-if="item1.id == item.target">
                                    {{item1.label}}
                             </span>


                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import G6 from '@antv/g6';
    export default {
        name: "FlowPanelNodeAction",

        data() {
            return {
                typeList: [],
                type: '',
                target: '',
                nodeList: [],
                actions: [],
                source: '',
                actionTypeList: this.$constData.actionType,

                /** 修改行为*/
                editIndex:-1,
            }
        },
        computed: {
            getActiveNode() {
                return this.$store.state.flowData.nodeActive
            }
        },
        watch: {
            getActiveNode(val) {

                this.source = val

                let str = this.$store.state.flowData.nodeActiveInfo.actions

                console.log(this.$store.state.flowData.nodeActiveInfo)
                this.actions = JSON.parse(str)
                console.log('2333444')
                this.type =''
                this.target =''
                this.getNodeList()

            }
        },
        methods: {
            getNodeList() {
                this.nodeList = this.$store.state.flowStyle.nodeList
            },
            /** 修改选中节点数据*/
            setNodeACtiveInfo(actions) {
                this.$store.state.flowData.nodeActiveInfo.actions = JSON.stringify(actions)
            },
            /** 选中已有行为*/
            checkItemAction(item,_index){
                this.editIndex = _index
                this.type = item.type
                this.target =item.target
            },
            /** 编辑已有行为*/
            editActionBtn(){
                if (this.type == '' || this.target == '') {
                    this.$message.error('行为未选择完整')
                } else {
                    let obj = {
                        type: this.type,
                        target: this.target
                    }
                    this.actions.splice(this.editIndex,1,obj)
                    this.setNodeACtiveInfo(this.actions)
                }
            },
            /** 新增行为*/
            addActionBtn() {
                if (this.type == '' || this.target == '') {
                    this.$message.error('行为未选择完整')
                } else {
                    let obj = {
                        type: this.type,
                        source:this.source,
                        id:G6.Util.uniqueId(),
                        target: this.target,
                        shape: 'hvh'
                    }
                    this.actions.push(obj)
                    this.setNodeACtiveInfo(this.actions)
                }
            },


        },
        mounted() {
            this.typeList = this.$constData.actionType
            let str = this.$store.state.flowData.nodeActiveInfo.actions
            this.actions = JSON.parse(str)
            this.source = this.$store.state.flowData.nodeActive
            this.type =''
            this.target =''
            this.getNodeList()
        }

    }
</script>

<style scoped lang="scss">
    .box {
        width: 94%;
        margin: 0 auto;
        margin-top: 20px;
        height: 370px;
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
        height: 40px;
        overflow: hidden;
        line-height: 40px;
        margin-bottom: 10px;
        margin-top: 10px;
        cursor: pointer;
    }

    .tag-box {
        margin-top: 5px;
        margin-left: 10px;
    }

    .add-btn {
        width: auto;
        height: 40px;
        line-height: 40px;
        text-align: center;
        text-align: center;
    }

    .active-node-type{
        float: left;
        width: 100px;
        height: 40px;
        text-align: center;

        line-height: 40px;
        color: #666;
        font-size: 14px;

    }
    .active-node-item-text{
        width: auto;
        height: 40px;
        margin-left: 105px;
        line-height: 40px;
        color: #0086b3;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }
</style>
