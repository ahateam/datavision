<template>
	<div>
		<div class="box">
			<el-form  label-width="100px">
				<el-form-item label="行为类型">
					<el-select v-model="actionType"
							   size="small"
							   placeholder="请选择行为类型">
						<el-option
								v-for="(item,index) in typeList"
								:key="index"
								:label="item.val" :value="item.key"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="下一跳节点">
					<el-select v-model="nextNodeId"
							   size="small"
							   placeholder="请选择下一跳节点地址"
								@focus="getNodeList">
						<el-option
								v-for="(item,index) in nodeList"
								:key="index"
								:label="item.label" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>


		</div>
	</div>
</template>

<script>
	export default {
		name: "FlowPanelNodeAction",
		data(){
			return{
				typeList:[],
				actionType:'',
				nextNodeId:'',
				nodeList:[]
			}
		},
		methods:{
			getNodeList(){
				this.nodeList  =  this.$store.state.nodeList
				console.log(this.nodeList)
			}
		},
		mounted(){
			this.typeList = this.$constData.actionType

		}

	}
</script>

<style scoped lang="scss">
	.box{
		width: 94%;
		margin: 0 auto;
		margin-top: 20px	;
	}
</style>
