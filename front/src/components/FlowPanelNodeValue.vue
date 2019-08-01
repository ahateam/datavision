<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="节点ID">
                <el-input v-model="newGraphId" size="small" style="width: 90%" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="节点名称">
                <el-input v-model="newGraphLabel" size="small" style="width: 90%"></el-input>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="24" style="text-align: center">
                <el-button type="primary" @click="changeItem" size="small">确认修改</el-button>
                <el-button type="danger" style="margin-left: 15px" @click="delItem" size="small">删除选中</el-button>
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
                newGraphType: ''
            }
        },
        computed: {
            changeGraphId() {
                return this.$store.state.flowData.nodeActive
            }
        },
        watch: {
            changeGraphId(val) {

                this.newGraphId = val
                this.newGraphLabel = '1111'


            }
        },
        methods: {
            changeItem() {
                // const item = this.$store.state.flowData.graph.findById(this.newGraphId)
                // let model = item._cfg.model
                // model.label = this.newGraphLabel
                // this.$store.state.flowData.graph.updateItem(item, model)
            },
            delItem() {
                // const item = this.$store.state.flowData.graph.findById(this.newGraphId)
                // this.$store.state.flowData.graph.removeItem(item)
            },
        },
        mounted() {
            this.newGraphId = this.$store.state.flowData.nodeActive
            this.newGraphLabel = '1111'
            this.newGraphType = '222'
        }
    }
</script>

<style scoped lang="scss">

</style>
