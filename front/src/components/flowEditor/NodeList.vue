<template>
    <div >
        <div class="node-title">
            <div class="node-panel-title">节点列表</div>
        </div>
        <div class="node-list">
            <div class="node-list-item"
                v-for="(item,index) in nodeList"
                :key="index"
                 @mouseenter="delBtnShow = item.id"
                 @mouseleave="delBtnShow =0"
                @click="checkNodeBtn(item)">
                <div :class="activeNode==item.id?'item-box item-box-active': 'item-box' " >
                   <div class="item-label">
                       {{item.label}}
                   </div>
                    <span  class="del-box"
                           v-if="delBtnShow == item.id"
                           @click.stop="delNodeItemBtn(index,item)">
                        <i class="iconfont icon-jiufuqianbaoicon08"></i>
                    </span>
                </div>

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
            flowId:String,
        },
        computed:{
            getActiveNode(){
                return this.$store.state.flowData.nodeActive
            }
        },
        watch:{
            getActiveNode(val){
                this.activeNode =val
            }
        },
        data(){
            return{
                nodeData:{
                        id: '',
                        x: 300,
                        y: 200,
                        size: [70, 40],
                        label: '常规节点',
                        shape: 'round-rect',
                        style: {
                            stroke: '#1890ff',
                            fill: '#fff',
                            radius: 5,
                        }
                },
                newNodeId:'',
                isChangeNode:true,
                nodeList:[],
                activeNode:'',
                delBtnShow:'0',

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
                    receivers: {departments:[],roles:[],users:[]}, // JSONArray 接收者（departments部门，roles角色，users用户）
                    actions: [], // JSONArray 行为动作
                    assetDesc:{table:[],report:[],file:[]},
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
                        this.$store.state.flowStyle.nodeList = this.nodeList
                        this.getNodeInfo(newNodeId)
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
            checkNodeBtn(item){
                this.getNodeInfo(item.id)
            },
            /** 编辑节点信息*/
            editPDActivity(node,actions){
                console.log(node)
                console.log(actions)
                node.actions = actions
                this.$api.editPDActivity(node,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        // console.log(res.data.c)
                        console.log('111')
                    }
                })

            },

            /** 删除节点之后 删除每个节点受影响的action*/
            setNodeAction(delNodeId){
              let cnt = {
                  pdId: localStorage.getItem('flowId'), // Long 流程定义编号
                  count: 500, // Integer
                  offset: 0, // Integer
              }
              this.$api.getPDActivityList(cnt,(res)=>{
                  let nodeList = []
                  if(res.data.rc == this.$util.RC.SUCCESS){
                      nodeList = this.$util.tryParseJson(res.data.c)
                  }
                  //循环出每一个节点的actions
                  for(let i=0;i<nodeList.length;i++){
                      let key = -1
                      let newActions = []
                      let actions  = JSON.parse(nodeList[i].actions)
                      for( let j=0;j<actions.length;j++){
                          if(actions[j].target == delNodeId){
                              key = j
                          }else{
                              newActions.push(actions[j])
                          }
                      }

                      if(key != -1){
                          this.editPDActivity(nodeList[i],newActions)
                      }

                  }
              })
            },

            /** 获取节点的详细信息*/
            getNodeInfo(nodeId){
                let cnt = {
                    pdid: this.flowId, // Long 流程定义编号
                    activityid: nodeId, // Long 流程节点编号
                }
                this.$api.getPDActivityById(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.nodeInfo = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.nodeInfo = {}
                    }
                    this.$store.state.flowData.nodeActiveInfo = this.nodeInfo
                    this.$store.state.flowData.nodeActive = nodeId
                })
            },

            /** 点击删除按钮删除节点*/
            delNodeItemBtn(index,item){
                console.log(index,item)
                let visual =this.$commen.getGraphNodes(this.$store.state.flowData.graph.getNodes())
                let cnt = {
                    pdId: this.flowId, // Long 流程定义编号
                    activityVisualList: visual, //
                    count:visual.length,
                    offset:0
                }
                //保存所有的节点样式
                this.$api.setPDActivityVisualList(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        //删除节点
                        let cnt1 = {
                            pdId: this.flowId, // Long 流程定义编号
                            activityId: item.id, // Long 流程节点编号
                        }
                        this.$api.delPDActivity(cnt1,(res)=>{
                            if(res.data.rc == this.$util.RC.SUCCESS){
                                this.$message.success('删除成功')
                                this.setNodeAction(item.id)

                            }else{
                                this.$message.error('删除失败')
                            }
                            this.$router.push('/page')
                        })
                    }else{
                        this.$message.error('删除失败')
                    }
                })


            }


        },
        mounted(){
            this.nodeList=this.$store.state.flowStyle.nodeList

            this.activeNode = this.$store.state.flowData.nodeActive
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

        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .item-box{
        width: 90%;
        height:30px;
        margin-top: 5px;

        border: 1px solid #1890ff;
        background: #fff;
        border-radius: 5px;
        cursor: pointer;
        transition: all .5s;
        position: relative;
    }
    .item-label{
        width: 95%;
        height:30px;
        line-height: 30px;
        color: #666;
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .item-box:hover{
        border: 1.5px solid #1890ff;
    }
    .item-box:active{
        background: #e8f8ff;
    }
    .item-box-active{
        background: #e8f8ff;
    }
    .del-box{
        width: 18px;
        height: 18px;
        display: block;
        position: absolute;
        top: -5px;
        right: -9px;
        text-align: center;
        line-height: 20px;
        background: #fff;
        border-radius: 50%;
    }
    .del-box i{
        font-size: 18px;
        color: #f60;
    }



</style>
