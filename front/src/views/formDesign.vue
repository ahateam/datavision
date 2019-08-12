<template>
    <div v-if="loading">
        <fm-making-form ref="makingform" :style="boxStyle" preview generate-code generate-json>
            <template slot="action">
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
            }
        },
        methods: {
            /**获取设计器json数据**/
            getjson () {
                return this.$refs.makingform.getJSON()
            },
            getHtml(){
                return this.$refs.makingform.getHtml()
            }
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
