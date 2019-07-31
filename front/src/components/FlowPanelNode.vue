<template>
	<div>
		<div class="tab-box">
			节点属性配置
		</div>
			<!-- 面板左侧导航菜单 -->
			<div>
				<div class="tab-title">

					<div :class="tabActive==index?'tab-item-title tab-active':'tab-item-title'"
						 v-for="(item,index) in tabList" :key="index"
						 @click="onTabItemChange(index)">
						{{item.title}}
					</div>
				</div>

				<div class="tab-item">
					<!--资源配置右侧-->
					<div v-if="tabActive == 0">
						<!--<flow-panel-node-res :content="tabList[tabActive].content" ></flow-panel-node-res>-->
						<flow-node-resources></flow-node-resources>
					</div>
					<!--权限配置右侧-->
					<div v-if="tabActive == 1">
						<flow-panel-node-auth ></flow-panel-node-auth>
					</div>
					<!--行为配置-->
					<div v-if="tabActive ==2">
						<flow-panel-node-action></flow-panel-node-action>
					</div>

				</div>
			</div>
		</div>


</template>

<script>
	import FlowPanelNodeRes from './flowPanelNodeChilds/FlowPanelNodeRes'
	import FlowPanelNodeAuth from './flowPanelNodeChilds/FlowPanelNodeAuth'
	import FlowPanelNodeAction from './flowPanelNodeChilds/FlowPanelNodeAction'
	import FlowNodeResources from './flowPanelNodeChilds/FlowNodeResources'


	export default {
		name: "FlowNodePanel",
		data(){
			return{
				tabActive: 0,
				defaultProps: {
					children: 'field',
					label: 'text'
				},
				tabList:[{title:'资源配置'},{title:'权限配置'},{title:'行为配置'}],
				permissionTabActive: 0,
			}
		},
		props:{
			flowId:String
		},
		components: {
			FlowPanelNodeRes,
			FlowPanelNodeAuth,
			FlowPanelNodeAction,
			FlowNodeResources,
		},
		methods: {
			onTabItemChange(index) {
				this.tabActive = index;
			},
			delItem() {
				const item = this.graph.findById(this.graph_id)
				this.graph.removeItem(item)
			},
			changeItem() {
				const item = this.graph.findById(this.graph_id)
				let model = item._cfg.model
				model.label = this.graph_lable
				this.graph.updateItem(item, model)
			},
		},
		mounted(){
			console.log('111122')
			console.log(this.flowId)
			let cnt = {
				pdId: this.flowId, // Long 所属流程定义ProcessDefinition编号
				// activityIds: activityIds, // JSONArray <选填> 所属流程节点Activity编号，不填表示只查看流程定义中的全局资产
				count: 500, // Integer
				offset: 0, // Integer
			}
			this.$api.getPDAssetList(cnt,(res)=>{
				console.log(res)
			})
		}

	}
</script>

<style scoped>
	/** 右侧tab样式*/

	.tab-title {
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
	.tab-box{
		width: 100%;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #666;
		font-size: 16px;
		border-bottom: 1px solid #e8e8e8;
		background: #e8f8ff;
	}




</style>
