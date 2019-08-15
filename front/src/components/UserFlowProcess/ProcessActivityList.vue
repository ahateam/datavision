<template>
    <div>
        <div class="list-box">
            <div class="lsit-item-messsage" v-if="activityList.length == 0">暂无流程列表列表</div>
            <div class="list-item-box" v-else>
                <div :class="activityId==item.id?' list-item list-item-active':'list-item '"
                     v-for="(item,index) in activityList " :key="index"
                    @click="activeNodeBtn(item)">
                            <span class="sign-icon"  v-if="item.userAction"><i class="iconfont icon-dian"></i> </span>
                    {{item.visual.label}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProcessActivityList",
        props:{
            processActivityList:Array,
            processLogList:Array,
            activityId:String,
            processActivityId:Number,
        },
        data(){
            return{
                activityList:[]
            }
        },
        watch:{
            processActivityList(val){
                this.activityList = JSON.parse(JSON.stringify(val))
                this.initListAndLogList()
            },
            processLogList(){
                if(this.processLogList.length){
                    this.initListAndLogList()
                }
            },
            activityId(){
                this.initListAndLogList()
            }


        },
        methods:{
            initListAndLogList(){
                for(let i=0;i<this.processLogList.length;i++){
                    for(let j=0;j<this.activityList.length;j++){
                            if(this.activityList[j].id == this.processLogList[i].activityId){
                                let obj = {}
                                 obj = this.activityList[j]
                                obj.userAction = JSON.parse(JSON.stringify(this.processLogList[i]))
                                this.activityList.splice(j,1,obj)
                                break
                            }
                    }
                }
               console.log( this.activityList)
            },
            //选中某个节点
            activeNodeBtn(item){

                // this.activityId = item.id
                if(item.userAction || item.id == this.processActivityId){
                    console.log(item)
                    this.$emit('changeActivity',item.id)
                }




            }
        },

    }
</script>

<style scoped lang="scss">
    .list-box{
        width: 80%;
        margin: 0 auto;

    }
    .list-item{
        width: auto;
        height: 40px;
        line-height: 40px;
        margin-top: 20px;
        border-radius: 5px;
        padding: 0 20px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #1890ff;
        background: #fff;
        color: #333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .list-item:hover{
        background: #e8f8ff;
    }
    .list-item-active{
        background: #e8f8ff;
    }
    .sign-icon{
        display: block;
        font-size: 14px;
        line-height: 40px;
        width: 20px;
        height: 40px;
        float: right;
        color: #67C23A;
    }
</style>
