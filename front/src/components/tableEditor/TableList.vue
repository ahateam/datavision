<template>
    <div>
        <div class="table-list">
            <div :class="tableActive == index?'list-item list-item-active':'list-item '"
                 v-for="(item,index) in tableList"
                 :key="index"
                 @click="checkTableBtn(item,index)">
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
        props:{
            tableList:Array
        },
        data(){
            return{
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
            checkTableBtn(item,_index){
                this.tableActive = _index
                this.$store.state.tableEditor.tableActive =  this.tableActive
                this.$store.state.tableEditor.tableActiveArr = item
                console.log( this.$store.state.tableEditor.tableActiveArr)
            },

            addTableBtn(){
                this.$store.state.tableEditor.tableActiveArr = []
                this.$store.state.tableEditor.tableActive = '-1'

            }
        },
        mounted(){

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
