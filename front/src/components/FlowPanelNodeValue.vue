<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="节点名称" v-if="isNodeItem ">
                <el-input v-model="newGraphLabel" size="small" style="width: 90%"></el-input>
            </el-form-item>
            <div v-else style="line-height: 40px;color: #666;text-align: center;margin: 20px">
                暂无选中节点
            </div>
        </el-form>
        <el-row v-if="isNodeItem ">
            <el-col :span="24" style="text-align: center">
                    <el-button type="primary" @click="changeItem" size="small">确认修改</el-button>
                <!--<el-button type="danger" style="margin-left: 15px" @click="delItem" size="small">删除选中</el-button>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "FlowPanelNodeValue",
        data() {
            return {
                newGraphLabel: '',
                newGraphId: '',
                newGraphType: '',
                isNodeItem: false,
                nodeList:[]
            }
        },
        computed: {
            changeGraphId() {
                return this.$store.state.flowData.nodeActive
            }
        },
        watch: {
            changeGraphId(val) {
                if (val == '0') {
                    this.isNodeItem = false
                } else {
                    this.isNodeItem = true
                    this.nodeList = this.$store.state.nodeList
                    this.newGraphId = val
                    let item = this.$store.state.flowData.graph.findById(this.newGraphId)._cfg.model
                    this.newGraphLabel = item.label
                }
            }
        },
        methods: {
            changeItem() {

                const item = this.$store.state.flowData.graph.findById(this.newGraphId)
                let model = item._cfg.model
                model.label = this.newGraphLabel
                model.size = [this.newGraphLabel.length * 14, 40]
                this.$store.state.flowData.graph.updateItem(item, model)
                let arr = this.nodeList
                for(let i=0;i<arr.length;i++){
                    if(this.nodeList[i].id == this.newGraphId){
                       let obj = JSON.parse(JSON.stringify(arr[i]))
                        obj.label = this.newGraphLabel
                        this.nodeList.splice(i,1,obj)
                        return
                    }
                }
                this.$store.state.flowStyle.nodeList =this.nodeList



            },
            // delItem() {
            //     // const item = this.$store.state.flowData.graph.findById(this.newGraphId)
            //     // this.$store.state.flowData.graph.removeItem(item)
            // },
        },
        mounted() {
            this.newGraphId = this.$store.state.flowData.nodeActive
            let val = this.newGraphId
            if (val == '0') {
                this.isNodeItem = false
            } else {
                this.isNodeItem = true
                this.newGraphId = val
                let item = this.$store.state.flowData.graph.findById(this.newGraphId)._cfg.model
                this.newGraphLabel = item.label
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
