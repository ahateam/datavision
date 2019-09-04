<template>
	<div>
		<el-button @click="getProcessInfo" :disabled="get_dis">开始流程</el-button>===>
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
		<div class="remark">{{remark}}</div>
		<div style="margin: 20px;">
			<div class="box">
				<div class="title-list">
					节点编号
				</div>
				<div class="title-list">
					节点标题
				</div>
				<div class="title-list" style="border: none;">
					操作
				</div>
			</div>
			<div class=" " v-for="(item,index) in activityList" :key="index">
				<div class="box">
					<div class="title-list">
						{{item.id}}
					</div>
					<div class="title-list">
						{{item.title}}
					</div>
					<div class="title-list" style="border: none;">
						<el-button @click="accept(index)" :disabled="item.a_ret">同意</el-button>
						<el-button @click="reject(index)" :disabled="item.r_ret">驳回</el-button>
					</div>
				</div>
			</div>
		</div>
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
				processId: 401275010026419,
				processTitle: '',
				currActivityId: '',
				actionType: '',
				actionId: '',
				targetType: '',
				target: '',
				activityTitle: '',
				activityId: '',
				activityList: [],
				receivers: '',
				ext: 0,
				remark: '',
				get_dis: false,
				action_by_activity: [],
				activityGroupId:''
			}
		},
		methods: {
			accept(_index) {
				let obj = JSON.parse(JSON.stringify(this.activityList[_index]));
				obj.a_ret = true;
				// 				this.activityList.splice(_index, 1, obj);
				// 
				// 				let cnt1 = {
				// 					activityId: obj.id
				// 				}
				// 				this.$testapi.getProcessActionsInActivity(cnt1, (res) => {
				// 					console.log(res);
				// 					this.action_by_activity = JSON.parse(res.data.c);
				// 					this.editExt(obj.id, 'accept');
				// 					this.ifActivityAction();
				// 				})
				let cnt = {
					processId: this.processId,
					activityId: obj.id,
					actionId: this.actionId,
					activityGroupId: this.currActivityId,
					userId: this.userId,
					type:'accept'
				}
				this.$testapi.getProcessActionsInActivity(cnt1, (res) => {
					console.log(res);
					this.action_by_activity = JSON.parse(res.data.c);
					console.log("节点分组编号"+this.currActivityId);
					let cnt ={
						processId:this.processId,
						activityId:obj.id,
						actionId: this.action_by_activity[_index].id,
						activityGroupId:this.currActivityId,
						userId:this.userId,
						type:'accept'
					};
					this.$testapi.testAction(cnt,(res)=>{
						console.log(res);
						this.getProcessInfo();
					})
				})

			},
			reject(_index) {
				let obj = JSON.parse(JSON.stringify(this.activityList[_index]));
				obj.r_ret = true;
				this.activityList.splice(_index, 1, obj);
				let cnt1 = {
					activityId: obj.id
				}
				this.$testapi.getProcessActionsInActivity(cnt1, (res) => {
					console.log(res);
					this.action_by_activity = JSON.parse(res.data.c);
					this.editExt(obj.id, 'reject');
				})

			},

			ifActivityAction() {
				let cnt = {
					activityGroupId: this.currActivityId
				}
				this.$testapi.ifActivityAction(cnt, (res) =>{
					console.log(res.data.c);
					let ext = Number(res.data.c);
					if (ext == this.activityList.length) {
						console.log("成功");
					} else {
						console.log("失败");
					}
				})
			},

			editExt(activityId, actionType) {
				for (let _index = 0; _index < this.action_by_activity.length; _index++) {
					if (this.action_by_activity[_index].type === actionType) {
						let cnt2 = {
							actionId: this.action_by_activity[_index].id,
							activityId: activityId,
							ext: 1	
						}
						this.$testapi.editActionExt(cnt2, (res) => {
							console.log(res);
						})
					}
				}
			},

			getProcessInfo() {
				let cnt = {
					id: '123',
					userId: this.userId,
					processId: this.processId,
					targetType: this.targetType
				}
				this.$testapi.getProcessInfoByTargerType(cnt, (res) => {
					this.get_dis = true;
					this.ext = 0;
					this.aret = false;
					this.rret = false;
					console.log(res);
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

					this.activityList.forEach((item) => {
						item.a_ret = false;
						item.r_ret = false;
					})
				})
			},
			processActionAccept() {
				let cnt = {
					id: '123',
					processId: this.processId,
					activityId: this.currActivityId,
					actionId: this.actionId,
					actionType: this.actionType,
					targetType: this.targetType,
					userId: this.userId,
				}
				this.$testapi.processActionAccept(cnt, (res) => {
					console.log(res);
					if (res.data.c === '1' && res.data.rc === 'succ') {
						this.getProcessInfo();
					} else if (res.data.c === '2' && res.data.rc === 'succ') {
						this.remark = '等待审核中！！！';
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

	.title-list {
		float: left;
		width: 25%;
		height: 50px;
		border-right: 1px solid #aaa;
		font-size: 16px;
		color: 666;
		text-align: center;
		line-height: 50px;
	}

	.box {
		width: auto;
		height: 50px;
		border: 1px solid #aaa;
	}

	.remark {
		font-size: 25px;
		font-weight: 700;
		width: auto;
		height: 60px;
		text-align: center;
		line-height: 60px;
		color: #EE9900;
	}
</style>
