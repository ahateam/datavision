<template>
    <div>
        <div class="box">
            <div class="item-list-box">
                <el-form label-width="100px">
                    <el-form-item label="行为类型">
                        <el-select v-model="actionType"
                                   size="small"
                                   placeholder="请选择行为类型">
                            <el-option
                                    v-for="(item,index) in typeList"
                                    :key="index"
                                    :label="item.val" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下一跳节点">
                        <el-select v-model="nextNodeId"
                                   size="small"
                                   placeholder="请选择下一跳节点地址"
                                   @focus="getNodeList">
                            <el-option
                                    v-for="(item,index) in nodeList"
                                    :key="index"
                                    :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="add-btn">
                    <el-button type="primary" size="small"
                               @click="addActionBtn()">
                        新增行为
                    </el-button>
                    <el-button type="danger" size="small" > 清空选中</el-button>
                </div>
            </div>

        </div>
        <div class="active-node-list">
            <div class="active-node-title">
                已选中资源
            </div>
            <div class="active-node-content">

                <div class="active-node-item-title">
                    选中部门
                </div>
                <div class="active-node-item-content">

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FlowPanelNodeAction",

        data() {
            return {
                typeList: [],
                actionType: '',
                nextNodeId: '',
                nodeList: [],
                actions:[]
            }
        },
        computed:{
            getActiveNode(){
                return this.$store.state.flowData.nodeActive
            }
        },
        watch:{
            getActiveNode(val){
                let str = this.$store.state.flowData.nodeActiveInfo.actions
                this.actions = JSON.parse(str)
                console.log( this.actions)
            }
        },
        methods: {
            getNodeList() {
                this.nodeList = this.$store.state.nodeList
                console.log(this.nodeList)
            },
            /** 修改选中节点数据*/
            setNodeACtiveInfo(actions){
                this.$store.state.flowData.nodeActiveInfo.actions = JSON.stringify(actions)
            },
            /** 新增行为*/
            addActionBtn(){
               if(this.actionType == '' || this.nextNodeId == ''){
                   this.$message.error('行为未选择完整')
               }else{
                   let obj = {
                       actionType:this.actionType,
                       nextNodeId:this.nextNodeId
                   }
                   this.actions.push(obj)
                   this.setNodeACtiveInfo(this.actions)
               }
            }
        },
        mounted() {
            this.typeList = this.$constData.actionType
            let str = this.$store.state.flowData.nodeActiveInfo.actions
            this.actions = JSON.parse(str)
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
    }

    .tag-box {
        margin-top: 5px;
        margin-left: 10px;
    }
    .add-btn{
        width: auto;
        height: 40px;
        line-height: 40px;
        text-align: center;
        text-align: center;
    }

</style>
