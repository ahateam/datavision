<template>
    <div>
        <div class="tab-title">
            公共流程属性配置
        </div>
        <!-- 面板左侧导航菜单 -->
        <div class="tab-list">
            <div :class="tabActive==index?'tab-item-title tab-active':'tab-item-title'"
                 v-for="(item,index) in tabList" :key="index"
                 @click="onTabItemChange(index)">
                {{item.title}}
            </div>

        </div>
        <div class="tab-item">
            <!--资源配置右侧-->
            <div v-if="tabActive == 0">
               1111
            </div>
            <!--权限配置右侧-->
            <div v-if="tabActive == 1">
              22222
            </div>
            <!--行为配置-->
            <div v-if="tabActive ==2">
               3333
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "FlowPublicPanelNode",
        data(){
            return{
                tabList:[
                    {title:'公共资产',content:[]},
                    {title:'用户',content:[]},
                    {title:'部门',content:[]},
                ],
                tabActive:'0'
            }
        },
        props:{
            flowId:String
        },
        methods:{
            onTabItemChange(_index){
                this.tabActive = _index;
            }
        }
    }
</script>

<style scoped lang="scss">
    .tab-title {
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #666;
        font-size: 16px;
        border-bottom: 1px solid #e8e8e8;
        background:#e8f8ff ;
    }
    /** 右侧tab样式*/

    .tab-list {
        float: left;
        width: 30px;
        height: 400px;
        border-right: 1px solid #e8e8e8;
    }

    .tab-item {
        float: left;
        width: 265px;
        height: 400px;
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


</style>
