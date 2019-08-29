<template>
    <div v-if="loading">
        <fm-making-form ref="makingform" 
            :style="boxStyle" preview generate-code generate-json>
            <template slot="action">
                <el-button type="primary" size="small" @click="getFromJson()">提交表单模板</el-button>
            </template>
        </fm-making-form>

    </div>
</template>

<script>
    export default {
        name: "formDesign",
        data(){
            return{
                boxStyle:{},
                loading:false,
                formData:'',
            }
        },
        methods: {
            /**获取设计器json数据**/
            // getFormData(){
            //     console.log(this.$refs.makingform.getJSON())
            // }
            getFromJson() {
                console.log('-----------------')
                console.log(this)
                let list = this.$refs.makingform.getJSON()

                console.log(list)
                // this.formData = this.$refs.makingform.getJSON()
                // this.$message.success('生成数据成功，可以保存')
            },
            // getHtml(){
            //     return this.$refs.makingform.getHtml()
            // },
            // saveFormData(){
            //     console.log(this.formData)
            //     console.log('----------------------')
            //      return this.$refs.makingform.getJSON()
            // }
        },
        mounted(){
            this.boxStyle={
                    height:document.body.clientHeight +'px'
            }
            this.loading = true
        }

    }
</script>

<style scoped>

</style>
