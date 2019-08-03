<template>
    <div style="height: 100%;">
        <el-container style="height: 100%;">
            <el-header style="background: bisque">表格设计器</el-header>
            <el-container>
                <el-aside width="200px" style="background: #fff;border-right: 1px solid #e8e8e8" >
                    <table-list></table-list>
                </el-aside>
                <el-container>
                    <el-main>
                        <div class="center-box" :style="centerBoxStyle">
                            <table-content></table-content>
                        </div>
                        <div class="menu-box"  ref="menuBox">
                            <table-panel></table-panel>
                        </div>
                    </el-main>
                    <el-footer style="background: bisque">Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>


    </div>
</template>

<script>

    import TableContent from '@/components/tableEditor/TableContent'
    import TableList from '@/components/tableEditor/TableList'
    import TablePanel from '@/components/tableEditor/TablePanel'
    export default {
        name: "formDesign",
        data() {
            return {
                centerBoxStyle: {
                    width: document.body.clientWidth - 600 + 'px',
                    height: document.body.clientHeight - 200 + 'px'
                },
                menuForm: {
                    width: '100%',
                    height: '0px'
                },
            }
        },
        components:{
            TablePanel,
            TableList,
            TableContent
        },
        methods: {

        },
        mounted() {

            this.menuForm.height = this.$refs.menuBox.offsetHeight - 30 + 'px'

        }
    }
</script>

<style scoped lang="scss">
    .center-box {
        float: left;

    }

    .menu-box {
        float: right;
        width: 300px;
        height: 100%;
        background: #f8f8f8;
        border-radius: 5px;
    }



    /** 配置器相关*/
    .menu-title {
        width: auto;
        height: 30px;
        color: #666;
        font-size: 16px;
        font-weight: 600;
        padding: 5px;
        line-height: 30px;

        border-bottom: 1px solid #b3d8ff
    }

    .menu-icon-btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .menu-item {
        width: 100%;
    }

    .menu-form {
        overflow-y: auto;
    }
    .add-btn-box{
        margin-top: 30px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .form-table-btn{
        width: auto;
        height: 40px;
        margin-top: 40px;
        line-height: 40px;
        text-align: center;

    }


    /** 计算公式弹出窗*/
    .data-list-box{
        width: 100%;
    }
    .tag-sign{
        font-size: 16px;
        font-weight: 600;
        margin:10px 0 0 10px;
        cursor:pointer;
    }
    .tag-sign:hover{
        background: #f56c6c;
        color: #fff;
    }
    .tag-sign:active{
        background:#fef0f0;
        color: #fff;
    }
    .tag-item{
        margin: 10px 0 0 10px;
        cursor:pointer;
    }
    .tag-item:hover{
        background: #409EFF;
        color: #fff;

    }
    .tag-item:active{
        background: #d9ecff;
        color: #fff;
    }
</style>
