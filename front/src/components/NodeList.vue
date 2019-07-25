<template>
    <div >
        <div class="node-title">
            <div class="node-panel-title">节点列表</div>
        </div>
        <div class="node-list">

        </div>
        <div class="node-btn">
            <el-button type="primary" size="small" @click="addNodeBtn"> + 新增节点</el-button>
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
                }
            }
        },
        methods:{
            /** 新增节点 */
            addNodeBtn(){
                console.log(this.flowId)
                let cnt = {
                    pdId: this.flowId, // Long 流程定义编号
                    title: this.nodeData.label, // String 活动标题
                    part: '111', // String 所属泳道
                    receivers: [], // JSONArray 接收者（departments部门，roles角色，users用户）
                    actions: [], // JSONArray 行为动作
                };
                this.$api.createProcessActivity(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.nodeData.id = res.data.c
                        let model = JSON.parse(JSON.stringify(this.nodeData))
                        this.$store.state.flowData.graph.addItem('node', model)
                    }
                })
            }
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

</style>
