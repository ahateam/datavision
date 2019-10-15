<template>
    <div style="height: 100%;">
        <el-container style="height: 100%;">
            <el-header style="background: bisque">表格设计器</el-header>
            <el-container >
                <el-aside  width="200px" style="background: #fff;border-right: 1px solid #e8e8e8" >
                    <table-list :tableList="tableList"  v-if="isLoading"></table-list>
                </el-aside>
                <el-container>
                    <el-main>
                        <div class="center-box" :style="centerBoxStyle">
                            <table-content :tagList="tagList"></table-content>
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

    import TableContent from '@/views/test/TableContent'
    import TableList from '@/views/test/TableList'
    import TablePanel from '@/views/test/TablePanel'
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

                tableList:[],
                isLoading:false,
                tagList:[],
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
            let cnt={
                tags: [], // JSONArray <选填> 标签列表JSON列表，可以为空，即返回所有
                count: 500, // Integer
                offset: 0, // Integer
            }
            this.$api. getTableSchemaByTags(cnt,(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.tableList = this.$util.tryParseJson(res.data.c)

                }else{
                    this.tableList = []
                }

                this.$api.getSysTableTags({},(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.tagList = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.tagList = []
                    }
                    console.log( this.tagList)
                    console.log(this.tableList)
                    this.isLoading = true
                })


            })
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







</style>
