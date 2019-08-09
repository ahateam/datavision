<template>
    <div style="height: 100%">
        <el-container style="height: 100%" v-if="isLoadDom">
            <el-header class="header-box">Header</el-header>
            <el-container style="height: 100%;">

                <el-aside width="200px" class="item-box" >
                    <node-list :flowId="flowId"></node-list>
                    <div class="show-box">
                        <flow-panel-node-value :flowId="flowId"></flow-panel-node-value>
                    </div>
                </el-aside>

                <el-container>
                    <el-main class="main-box">
                        <div class="center-box" >
                            <flow-editor :flowId="flowId"></flow-editor>
                        </div>
                        <div class="info-box">
                            <div class="tab-box">

                                <flow-panel-node
                                        v-if="this.$store.state.flowData.nodeActive !='0'"
                                        :flowId="flowId"
                                        @resetDom="resetDom">
                                </flow-panel-node>

                                <flow-public-panel-node
                                        v-else
                                        :flowId="flowId">
                                </flow-public-panel-node>

                            </div>

                        </div>
                    </el-main>
                    <el-footer class="footer">

                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import FlowEditor from '@/components/flowEditor/FlowEditor'
    import FlowPanelNode from '@/components/flowEditor/FlowPanelNode'
    import FlowPanelNodeValue from '@/components/flowEditor/FlowPanelNodeValue'
    import NodeList from '@/components/flowEditor/NodeList'
    import FlowPublicPanelNode from '@/components/flowEditor/FlowPublicPanelNode'

    export default {
        name: "flowDesign",
        components: {
            FlowEditor,
            FlowPanelNode,
            FlowPanelNodeValue,
            NodeList,
            FlowPublicPanelNode
        },
        data() {
            return {
                flowId: '',
                nodeList:[],
                edgeList:[],
                isLoadDom:false,

            }
        },
        computed:{
            getNodeActive(){
                return this.$store.state.flowData.nodeActive
            }
        },
        watch:{
            getNodeActive(val){
                this.changeNodeList()
            }
        },
        methods: {
            resetDom(val){
                this.$router.push({path:'/page',name:'page',params:{routerUrl:'flowDesign'}})
            },
            /** 获取样式节点信息*/
            getPDActivityList(cnt){
                let nodeList = []
                let edgeList = []
                this.$api.getPDActivityList(cnt, (res) => {
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        let arr = this.$util.tryParseJson(res.data.c)
                        console.log(arr)
                        for(let i=0;i<arr.length;i++){
                            nodeList.push(arr[i].visual)
                            /*更新所有的线条*/
                            let actions =JSON.parse( arr[i].actions)
                            for(let j =0 ;j<actions.length;j++){
                                edgeList.push(actions[j].visual)
                            }
                        }
                    }else{
                        nodeList = []
                    }
                    console.log(   this.$store.state.flowStyle)
                    this.$store.state.flowStyle.edgeList = edgeList
                    this.$store.state.flowStyle.nodeList = nodeList
                    this.isLoadDom = true


                })

            },


            /** 更新节点样式列表*/
            changeNodeList(){
                    let cnt = {
                        pdId: this.flowId,
                        count:500,
                        offset:0
                    }
                    this.getPDActivityList(cnt)
            }
        },
        mounted() {
            this.flowId = localStorage.getItem('flowId')
            this.$store.state.flowData.nodeActive = '0'
            this.$store.state.flowData.nodeActiveInfo ={}
            if(this.flowId == undefined || this.flowId == ''){
                this.$message.error('请先选择一个流程')
                this.$router.push('/processList')
            }
            let cnt = {
                pdId: this.flowId,
                count:500,
                offset:0
            }
            this.getPDActivityList(cnt)
        }
    }
</script>

<style scoped lang="scss">
    .header-box {
        background: beige;
    }

    .footer {
        background: beige;
    }

    .main-box {
        padding: 0;
        width: auto;
        height: 100%;
    }

    .info-box {
        float: right;
        width: 300px;
        height: 100%;
        background: #fafafa;
        border-left: 1px solid #e8e8e8;
    }

    .center-box {
        float: left;
        width: auto;
    }

    .item-box {
        background: #fafafa;
        border-right: 1px solid #e8e8e8;
    }

    .nav-box {
        margin-top: 20px;
        text-align: center;
        width: auto;
    }

    /*右侧内容样式*/
    .tab-box {
        width: 100%;
        height: 710px;
    }

    .show-box {
        width: 100%;
        height: 200px;
        background: #fff;
        border-top: 1px solid #e8e8e8;
        padding: 10px 0;

    }

    /** 右侧tab样式*/
    .tab-title {
        float: left;
        width: 30px;
        height: 400px;
        border-right: 1px solid #e8e8e8;
    }

    .tab-item {
        float: left;
        width: 265px;
        height: 400px;
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

    .tab-item-content {
        width: auto;
        height: 300px;
        overflow-y: auto;
    }

    .search-box {
        width: auto;
        height: 50px;
        line-height: 50px;

    }

    .check-btn {
        width: auto;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    .permission-list {
        width: auto;
        padding: 5px;
        background: #fff;
        margin-top: 2px;
        cursor: pointer;
    }

    .permission-list:hover {
        background: #cbe2fa;
    }

    .permission-list:active {
        background: #cbe2fa;
    }

    .permission-list-active {
        background: #cbe2fa
    }
</style>
