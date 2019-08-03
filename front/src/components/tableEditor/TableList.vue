<template>
    <div>
        <div class="table-list">
            <div :class="tableActive.id == item.id?'list-item list-item-active':'list-item '"
                 v-for="(item,index) in tableList"
                 :key="index"
                 @click="checkTableBtn(item)">
                {{item.alias}}
            </div>
        </div>
        <div class="btn">
            <el-button size="small" type="primary" @click="addTableBtn">
                新增表格
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tableList",
        data(){
            return{
                tableList:[],
                tableActive:''
            }
        },
        computed:{
            getTableActive(){
                return this.$store.state.tableEditor.tableActive
            }
        },
        watch:{
            getTableActive(val){
                this.tableActive = val
            }
        },
        methods:{
            checkTableBtn(item){
                this.tableActive = item
                this.$store.state.tableEditor.tableActive = item
            },

            addTableBtn(){
                this.$store.state.tableEditor.tableAddData = {}
                this.$store.state.tableEditor.tableSetRow = {}
                this.$store.state.tableEditor.tableActive = '0'
            }
        },
        mounted(){
            let cnt={
                tags: [], // JSONArray <选填> 标签列表JSON列表，可以为空，即返回所有
                count: 500, // Integer
                offset: 0, // Integer
            }
            this.$api.getTableSchemas(cnt,(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.tableList = this.$util.tryParseJson(res.data.c)
                }else{
                    this.tableList = []
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .table-list{
        width: 100%;
        margin: 0 auto;
    }
    .list-item{
        width: auto;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #666;
        padding: 0 20px;
        cursor: pointer;
        transition: all .3s;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .list-item:hover{
        background:rgb(217, 236, 255);
        color: #333;
    }

    .list-item-active{
        background: rgb(121, 187, 255);
        color: #fff;
    }
    .btn{
        width: auto;
        margin-top: 50px;
        text-align: center;
    }


</style>
