<template>
	<div>
		<el-button @click="getProcessInfo">开始流程</el-button>===>
		<el-button @click="processActionAccept">下一步</el-button>===>
		<el-button @click="processActionAccept">提交审核</el-button>===>
		<el-button @click="processActionAccept">审核通过</el-button>

		<div>流程定义编号 ------------- {{pdId}}</div>
		<div>流程定义第一个节点 ------- {{startActivityId}}</div>
		<div>当前节点 ----------------- {{currActivityId}}</div>
		<div>流程实例编号 ------------- {{processId}}</div>
		<div>流程实例标题 ------------- {{processTitle}}</div>
		<div>action编号--------------- {{actionId}}</div>
		<div>action类型 -------------- {{actionType}}</div>
		<div>target跳转类型 ---------- {{targetType}}</div>
		<div>target跳转位置 ---------- {{target}}</div>
		<el-table :data="activityList">
			<el-table-column prop="id" label="节点编号"></el-table-column>
			<el-table-column prop="title" label="节点标题"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="accept(scope.row.id,scope.row.title)">同意</el-button>
					<el-button @click="reject(scope.row.id,scope.row.title)">驳回</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'test',
		data() {
			return {
				userId: 400987736416750,
				pdId: '',
				startActivityId: '',
				processId: '',
				processTitle: '',
				currActivityId: '',
				actionType: '',
				actionId: '',
				targetType: '',
				target: '',
				activityTitle: '',
				activityId: '',
				activityList: []
			}
		},
		methods: {
			accept(id, title) {
				console.log(id + "======" + title);
			},
			reject(id, title) {
				console.log(id + "======" + title);
			},
			getProcessInfo() {
				let cnt = {
					id: '123',
					userId: this.userId,
					processId: 401141089162204,
					targetType: this.targetType
				}
				this.$api.getProcessInfoByTargerType(cnt, (res) => {
					console.log(res)
					var processInfo = JSON.parse(res.data.c);
					this.pdId = processInfo.definition.id;
					this.startActivityId = processInfo.definition.startActivityId;
					this.processId = processInfo.process.id;
					this.processTitle = processInfo.process.title;
					this.currActivityId = processInfo.process.currActivityId;
					if (processInfo.action != null) {
						this.actionId = processInfo.action.id;
						this.actionType = processInfo.action.type;
						this.targetType = processInfo.action.rules[0].targetType;
						this.target = processInfo.action.rules[0].target;
					} else {
						this.actionId = '最后一个节点没有action';
						this.actionType = '';
						this.targetType = '';
						this.target = '';
					}
					this.activityTitle = processInfo.activity[0].title;
					this.activityId = processInfo.activity[0].id;
					this.activityList = processInfo.activity;
				})
			},
			processActionAccept() {
				let cnt = {
					id: '123',
					processId: 401141089162204,
					activityId: this.currActivityId,
					actionId: this.actionId,
					actionType: this.actionType,
					targetType: this.targetType,
					userId: this.userId,
				}
				this.$api.processActionAccept(cnt, (res) => {
					console.log(res);
					if (res.data.c === '1' && res.data.rc === 'succ') {
						this.getProcessInfo();
					} else if (res.data.c === '2' && res.data.rc === 'succ') {
						console.log("等待审核！！");
						this.getProcessInfo();
					}
				})
			}
		},
		onLoad: function() {

		}
	}
</script>

<style lang="scss" scoped>
	div {
		font-size: 20px;
		;
	}
</style>
