<template>
    <div>
        <div class="node-title" >
            ---{{nodeInfo.visual.label}}---
        </div>
        <div class="node-content">
            <div class="resource-box">
                <div class="resource-title">
                    所需资源上传
                </div>
                <div v-if="assetList.length == 0" class="none-box" >
                    暂无需要上传的资源
                </div>
                <div v-else>
                    <table id="table-box" cellspacing="0" cellpadding="0">
                        <thead>
                        <th width="60% ">需上传资源</th>
                        <th>操作</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>请假申请表格</td>
                            <td>
                                <el-button type="primary" size="small">下载模板</el-button>
                                <el-button type="primary" size="small">上传文件</el-button>
                                <el-button type="primary" size="small">在线填写</el-button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="action-btn">
                    <el-button type="primary" > 下一步 </el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProcessHandle",
        props:{
            nodeInfo:Object,
            assetList:Array
        },
        computed:{
            getNodeInfo(){
                return this.nodeInfo
            }
        },
        watch:{
            getNodeInfo(val){

            }
        },
        data(){
            return{
                actions:[]
            }
        },


    }
</script>

<style scoped lang="scss">
    .node-title{
        width: auto;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        color: #63a35c;
    }
    .node-content{
        width: auto;
        padding: 20px;
    }
    .resource-box{
        width: auto;

        border-radius: 5px;
        padding: 10px;
    }
    .resource-title{
        width: auto;
        height: 30px;
        color: #333;
        font-size: 16px;
        font-weight: 600;
    }
    .action-btn{
        width: auto;
        height: 40px;
        margin-top: 30px;
        line-height: 40px;
        text-align: center;
    }

    .none-box{
        width: auto;
        height: 40px;
        line-height: 40px;
        color: #666;
    }
    /** 表格样式*/
    #table-box{
        width: 100%;
        margin-top: 20px;
        th{
            border: 1px solid #eee;
            height: 50px;
        }
        td{
            border: 1px solid #eee;
            height: 40px;
            text-align: center;
        }
    }
</style>
