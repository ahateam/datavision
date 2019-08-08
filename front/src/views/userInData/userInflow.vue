<template>
    <div>
        <div class="header-box" v-if="loading ">
                <div class="flow-title">{{processData.process.title}}</div>
                <div class="flow-content">{{processData.process.remark}} </div>
        </div>
        <div class="flow-activity-content">
            <div class="node-list">
                <process-activity-list
                        :processActivityList="processActivityList"
                        :processLogList="processLogList"
                        :activityId="activityId"
                        >
                </process-activity-list>
            </div>
            <div class="page-next-box" v-if="loading">
                <process-handle
                        :nodeInfo="nodeInfo"
                        :assetList="assetList">
                </process-handle>
            </div>
        </div>

    </div>
</template>

<script>
    import ProcessActivityList from '@/components/UserFlowProcess/ProcessActivityList'
    import ProcessHandle from '@/components/UserFlowProcess/ProcessHandle'
    export default {
        name: "userInflow",
        data(){
            return{
                info:'',
                processData:'',
                nodeInfo:{},
                assetList:[],
                processActivityList:[],
                loading:false,
                activityId:'',
                processLogList:[]
            }
        },
        components:{
            ProcessActivityList,
            ProcessHandle
        },


        methods:{
            /** 获取节点所需资源列表*/
            getAssetDescList(id){
                let cnt ={
                    ownerId: id, // Long 资产所属编号（流程定义编号或流程节点编号）
                    count: 500, // Integer
                    offset: 0, // Intege
                }
                this.$api.getAssetDescList(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.assetList = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.assetList = []
                    }
                    this.loading = true
                    console.log(this.assetList)
                })
            },

            /** 获取当前应该执行的节点详细信息*/
            getPDActivityById(pdid,activityid){
                let cnt={
                    pdid: pdid, // Long 流程定义编号
                    activityid: activityid, // Long 流程节点编号
                }
                this.$api.getPDActivityById(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.nodeInfo = this.$util.tryParseJson(res.data.c)
                        console.log(this.nodeInfo)

                        this.activityId = this.nodeInfo.id+''

                        this.getAssetDescList( this.nodeInfo.id)
                    }else{
                        this.nodeInfo = {}
                    }

                })
            },

            /** 获取peocess 所有的activity 列表*/
            getPDActivityList(pdId){
                let cnt = {
                    pdId: pdId, // Long 流程定义编号
                    count: 500, // Integer
                    offset: 0, // Integer
                }
                this.$api.getPDActivityList(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.processActivityList = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.processActivityList = []
                    }
                     console.log( this.processActivityList)
                })
            }

        },
        mounted(){
            this.info = this.$route.params.info
            this.loading = false
            let cnt={
                processId:this.info.id,
            }
            this.$api.getProcessInfo(cnt,(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.processData = this.$util.tryParseJson(res.data.c)
                    console.log(this.processData)
                    this.getPDActivityList(this.processData.definition.id)
                    this.getPDActivityById(this.processData.definition.id,this.processData.process.currActivityId)

                }else{
                    this.processData = ''
                }
            })
            /** 请求所有节点的操作日志*/
            let cnt1={
                processId:this.info.id, // Long processId流程编号
                count: 500, // Integer
                offset: 0, // Integer
            }
            this.$api.getProcessLogList(cnt1,(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.processLogList = this.$util.tryParseJson(res.data.c)
                }else{
                    this.processLogList = []
                }
                console.log('processLogList----')
                console.log(this.processLogList)
            })




        }
    }
</script>

<style scoped lang="scss">
    .header-box{
        width: auto;
        padding: 20px;
        background: #fff;
    }
    .flow-title{
        width: auto;
        height: 40px;
        color: #333;
        font-size: 16px;
        line-height: 40px;
        border-left: 3px solid #63a35c;
        padding-left: 20px;
    }
    .flow-content{
        width: auto;
        height: 30px;
        line-height: 30px;
        color: #666;
        font-size: 14px;
        padding-left: 20px;
    }
    .flow-activity-content{
        width: 100%;
        background: #fff;
    }
    .page-next-box{
        margin-left: 250px;
        width: auto;
        height: 500px;
        background: #fff;
        padding: 20px;
        margin-top: 20px;
    }
    .node-list{
        float: left;
        width: 250px;
        height: 500px;
        background: #fff;
        overflow-y: auto;
    }

</style>
