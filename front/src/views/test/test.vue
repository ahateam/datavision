<template>
	<div>
		<el-button @click="getProcessInfo">第一个节点</el-button>===>
		<el-button @click="processActionAccept">第二个节点</el-button>===>
		<el-button @click="processActionAccept">节点分组</el-button>===>
		
		<div>流程定义编号 ------------- {{pdId}}</div>
		<div>流程定义第一个节点 ------- {{startActivityId}}</div>
		<div>当前节点 ----------------- {{currActivityId}}</div>
		<div>流程实例编号 ------------- {{processId}}</div>
		<div>流程实例标题 ------------- {{processTitle}}</div>
		<div>action编号--------------- {{actionId}}</div>
		<div>action类型 -------------- {{actionType}}</div>
		<div>target跳转类型 ---------- {{targetType}}</div>
		<div>target跳转位置 ---------- {{target}}</div>
		<div>activity编号 ---------- {{activityId}}</div>
		<div>activity标题 ---------- {{activityTitle}}</div>
	</div>
</template>

<script>
	export default {
		name:'test',
		data(){
			return {
				userId:400987736416750,
				pdId:'',
				startActivityId:'',
				processId: '',
				processTitle: '',
				currActivityId:'',
				actionType:'',
				actionId: '',
				targetType:'',
				target: '',
				activityTitle:'',
				activityId: ''
			}
		},
		methods:{
			getProcessInfo(){
				let cnt = {
					id: '123',
					userId:this.userId,
					processId : 401141089162204,
					targetType : this.targetType
				}
				this.$api.getProcessInfoByTargerType(cnt, (res) => {
					console.log(res)
					var processInfo = JSON.parse(res.data.c);
					this.pdId = processInfo.definition.id;
					this.startActivityId = processInfo.definition.startActivityId;
					this.processId = processInfo.process.id;
					this.processTitle = processInfo.process.title;
					this.currActivityId = processInfo.process.currActivityId;
					this.actionId = processInfo.action.id;
					this.actionType = processInfo.action.type;
					this.targetType = processInfo.action.rules[0].targetType;
					this.target = processInfo.action.rules[0].target
					this.activityTitle = processInfo.activity.title
					this.activityId = processInfo.activity.id
				})
			},
			processActionAccept(){
				let cnt = {
					id: '123',
					processId : 401141089162204,
					activityId: this.currActivityId,
					actionId:this.actionId,
					actionType:this.actionType,
					userId:this.userId
				}
				this.$api.processActionAccept(cnt, (res) => {
					console.log(res);
					if(res.data.c === '1' && res.data.rc === 'succ'){
						this.getProcessInfo()
					} 
				})
			}
		},
		onLoad: function() {
			
		}
	}
</script>

<style lang="scss" scoped>
	div{
		font-size: 20px;;
	}
</style>
