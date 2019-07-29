<template>
    <div >
        <div class="node-title">
            <div class="node-panel-title">节点列表</div>
        </div>
        <div class="node-list">
            <div class="node-list-item"
                v-for="(item,index) in nodeList"
                :key="index">
                {{item.label}}
            </div>
        </div>
        <div class="node-btn">
            <el-button type="primary" size="small" @click="addNodeBtn"> + 新增节点</el-button>
        </div>
        <div class="node-btn">
            <el-button type="primary" size="small" @click="saveNodeBtn"> 保存流程图</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "nodeList",
        props:{
            flowId:Number,
        },
        data(){
            return{
                nodeData:{
                        id: '',
                        x: 300,
                        y: 200,
                        size: [70, 40],
                        label: '常规节点',
                        shape: 'rect',
                        style: {
                            stroke: '#1890ff',
                            fill: '#e8f8ff',
                            radius: 5,
                        }
                },
                newNodeId:'',
                isChangeNode:true,
                nodeList:[]
            }
        },
        methods:{
            /** 新增节点 */
            addNodeBtn(){
                this.addNodeData()
            },
            /*新增数据节点*/
            addNodeData(){
                /*新增数据*/
                let cnt = {
                    pdId: this.flowId, // Long 流程定义编号
                    title: this.nodeData.label, // String 活动标题
                    part: '111', // String 所属泳道
                    receivers: [], // JSONArray 接收者（departments部门，roles角色，users用户）
                    actions: [], // JSONArray 行为动作
                };
                this.$api.createPDActivity(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.newNodeId = res.data.c
                        this.addNodeStyle( this.newNodeId )
                    }else{
                        this.$message.error('新增节点失败')
                    }
                })
            },

            /* 新增设置节点样式*/
            addNodeStyle(newNodeId){
                let visual = JSON.parse(JSON.stringify(this.nodeData))
                visual.id = newNodeId
                let cnt = {
                    activityId: newNodeId, // Long 流程定义编号
                    visual: visual,
                }
                this.$api.setPDActivityVisual(cnt,(res)=>{
                    if(res.data.rc== this.$util.RC.SUCCESS){
                        this.$store.state.flowData.graph.addItem('node',visual)
                        this.nodeList = this.$commen.getGraphNodes(this.$store.state.flowData.graph.getNodes())
                    }else{
                        this.$message.error('新增节点失败')
                        this.delPDActivity()
                    }
                })
            },
            /*删除数据节点*/
            delPDActivity(){
                let cnt ={
                    pdId: this.flowId, // Long 流程定义编号
                    activityId: this.newNodeId
                }
                this.$api.delPDActivity(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        return true
                    }else{
                        return false
                    }
                })
            },
            /** 保存显示层样式*/

            saveNodeBtn(){
                console.log('1111222')
                let visual =this.$commen.getGraphNodesObj(this.$store.state.flowData.graph.getNodes())
                let cnt = {
                    pdId: this.flowId, // Long 流程定义编号
                    activityVisualList: visual, //
                    count:visual.length,
                    offset:0
                }

                console.log(cnt)

                this.$api.setPDActivityVisualList(cnt,(res)=>{
                    console.log(res)
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.$message.success('保存成功')
                    }else{
                        this.$message.error('操作失败')
                    }
                })

            }
        },
        mounted(){
            this.nodeList=this.$store.state.nodeList
            console.log('2222')
            console.log(this.nodeList)
        }
    }
</script>

<style scoped lang="scss">
    .node-list{
        width: auto;
        height: 400px;
        background: #fff;
        overflow-y: auto;
        padding: 10px;
    }
    .node-title{
        width: auto;
        height: 40px;
        font-size: 16px;
        color: #333;
        background: #fff;
        padding-bottom: 5px;
        border-bottom: 1px solid #e8e8e8;
        font-weight: 600;
    }
    .node-panel-title{
        width: auto;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .node-btn{
        width: auto;
        height: 50px;
        background: #fff;
        text-align: center;
        line-height: 50px;

    }
    .node-list-item{
        width: auto;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #666;
        border-bottom: 1px solid #e8e8e8;
        cursor: pointer;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .node-list-item:hover{
        background: #e8f8ff;
        color: #333;
        font-weight: 600;
    }

</style>
