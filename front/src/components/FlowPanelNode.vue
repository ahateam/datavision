<template>
    <div>
        <div class="tab-box">
            节点属性配置
        </div>
        <!-- 面板左侧导航菜单 -->
        <div>
            <div class="tab-title">
                <div :class="tabActive==index?'tab-item-title tab-active':'tab-item-title'"
                     v-for="(item,index) in tabList" :key="index"
                     @click="onTabItemChange(index)">
                    {{item.title}}
                </div>
            </div>

            <div class="tab-item">
                <!--资源配置右侧-->
                <div v-if="tabActive == 0">
                    <!--<flow-panel-node-res :content="tabList[tabActive].content" ></flow-panel-node-res>-->
                    <flow-node-resources></flow-node-resources>
                </div>
                <!--权限配置右侧-->
                <div v-if="tabActive == 1">
                    <flow-panel-node-auth></flow-panel-node-auth>
                </div>
                <!--行为配置-->
                <div v-if="tabActive ==2" >
                    <flow-panel-node-action></flow-panel-node-action>
                </div>

            </div>

            <div class="edit-node-box">
                <el-button
                        type="primary"
                        size="small"
                        @click="editNodeBtn">
                    确认节点配置</el-button>
            </div>
        </div>


    </div>


</template>

<script>
    import FlowPanelNodeAuth from './flowPanelNodeChilds/FlowPanelNodeAuth'
    import FlowPanelNodeAction from './flowPanelNodeChilds/FlowPanelNodeAction'
    import FlowNodeResources from './flowPanelNodeChilds/FlowNodeResources'


    export default {
        name: "FlowNodePanel",
        data() {
            return {
                tabActive: 0,
                tabList: [{title: '资源配置'}, {title: '权限配置'}, {title: '行为配置'}],

                nodeInfo:{},    //节点已有的所有值
                flowInfo:'',    //流程图已有的所有值
            }
        },
        props: {
            flowId: String
        },
        components: {
            FlowPanelNodeAuth,
            FlowPanelNodeAction,
            FlowNodeResources,
        },




        methods: {
            onTabItemChange(index) {
                this.tabActive = index;
            },
            delItem() {
                const item = this.graph.findById(this.graph_id)
                this.graph.removeItem(item)
            },
            changeItem() {
                const item = this.graph.findById(this.graph_id)
                let model = item._cfg.model
                model.label = this.graph_lable
                this.graph.updateItem(item, model)
            },

            /** 修改节点信息*/
            editNodeBtn(){
                let nodeActive = this.$store.state.flowData.nodeActiveInfo
                let cnt = nodeActive
                this.$api.editPDActivity(cnt,(res)=>{
                   if(res.data.rc == this.$util.RC.SUCCESS){
                       this.saveNodeBtn()
                   }else{
                       this.$message.error('操作失败')
                   }
                   this.$emit('resetDom',true)
                })
            },
            /** 保存显示层样式*/
            saveNodeBtn(){
                let visual =this.$commen.getGraphNodes(this.$store.state.flowData.graph.getNodes())
                let cnt = {
                    pdId: this.flowId, // Long 流程定义编号
                    activityVisualList: visual, //
                    count:visual.length,
                    offset:0
                }

                this.$api.setPDActivityVisualList(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){


                        this.$message.success('操作成功')
                    }else{
                        this.$message.error('操作失败')
                    }
                })
            },


        },

    }
</script>

<style scoped>
    /** 右侧tab样式*/

    .tab-title {
        float: left;
        width: 30px;
        height: 600px;
        border-right: 1px solid #e8e8e8;
    }

    .tab-item {
        float: left;
        width: 265px;
        height: 600px;
        background: #fff;
    }

    .tab-item-title {
        width: 30px;
        text-align: center;
        font-size: 16px;
        color: #666;
        padding: 10px 0;
        cursor: pointer;
        border-bottom: 1px solid #e8e8e8;
        transition: all .8s;
    }

    .tab-active {
        background: #409eff;
        color: #fff;
    }

    .tab-box {
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #666;
        font-size: 16px;
        border-bottom: 1px solid #e8e8e8;
        background: #e8f8ff;
    }
    .edit-node-box{
        width: auto;
        height: 40px;
        margin-top: 20px;
        text-align: center;
        line-height: 40px;
    }


</style>
