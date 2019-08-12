<template>
    <div>
        <div class="list-box">
            <div class="lsit-item-messsage" v-if="processActivityList.length == 0">暂无流程列表列表</div>
            <div class="list-item-box" v-else>
                <div :class="activityId==item.id?' list-item list-item-active':'list-item '"
                     v-for="(item,index) in processActivityList " :key="index">
                        <span v-for="(item1,index1) in processLogList" :key="index1">
                            <span class="sign-icon"  v-if="item1.id == item.id"><i class="iconfont icon-dian"></i> </span>
                        </span>


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
        },
        methods:{

        }

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
