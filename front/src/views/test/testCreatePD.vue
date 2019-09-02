<template>
	<div class="content">
		<div class="box">创建流程定义</div>
		<div class="row">
			流程定义标题
			<el-input class="pd_title_input" v-model="pdTitle"></el-input>
			<el-button class="create_pd_button" @click="createPD">创建流程定义</el-button>
			<el-button class="create_pd_button" @click="deletePD">删除流程定义</el-button>
		</div>
		<div class="row">当前流程定义编号=== {{pdId}}</div>


		<div class="row">创建流程节点</div>
		<div class="row">
			流程节点名称
			<el-input class="pd_title_input" v-model="activityTitle"></el-input>
			<el-button class="create_pd_button" @click="createPDActivity">创建流程节点</el-button>
		</div>
		<div class="row">
			<div style="margin: 20px;">
				<div class="box">
					<div class="title-list">
						节点编号
					</div>
					<div class="title-list">
						节点标题
					</div>
					<div class="title-list">
						所属节点分组
					</div>
					<div class="title-list">
						操作
					</div>
				</div>
				<div></div>
				<div v-for="(item,index) in activityList" :key="index">
					<div class="box">
						<div class="title-list">
							{{item.id}}
						</div>
						<div class="title-list">
							{{item.title}}
						</div>
						<div class="title-list">
							{{item.activityGroupId}}
						</div>
						<div class="title-list">
							<el-button @click="deletePDActivity(index)" :disabled="item.a_ret">删除当前节点</el-button>
							<el-button @click="addAction(index)" :disabled="item.a_ret">添加action</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<br /><br /><br />
		<div class="row line"></div>
		<div class="row">创建流程节点分组</div>
		<div class="row">
			流程节点分组名称
			<el-input class="pd_title_input" v-model="activityGroupTitle"></el-input>
			<el-button class="create_pd_button" @click="createActivityGroup">创建流程节点分组</el-button>
			<el-button class="create_pd_button" @click="deleteActivityGroup">删除流程节点分组</el-button>
		</div>
		<div class="row">当前流程节点分组编号=== {{activityGroupId}}</div>
		<div class="row">创建节点到流程节点分组中</div>
		<div class="row">
			<div class="row">
				流程节点名称
				<el-input class="pd_title_input" v-model="activityTitle"></el-input>
				<el-button class="create_pd_button" @click="createSubActivity">创建流程节点分组下属节点</el-button>
			</div>


		</div>
		<div class="row">流程节点下属节点</div>
		<div class="row">
			<div style="margin: 20px;">
				<div class="box">
					<div class="title-list">
						节点编号
					</div>
					<div class="title-list">
						节点标题
					</div>
					<div class="title-list">
						所属节点分组
					</div>
					<div class="title-list">
						操作
					</div>
				</div>
				<div></div>
				<div v-for="(sub_activity,index) in subActivityList" :key="index">
					<div class="box">
						<div class="title-list">
							{{sub_activity.id}}
						</div>
						<div class="title-list">
							{{sub_activity.title}}
						</div>
						<div class="title-list">
							{{sub_activity.activityGroupId}}
						</div>
						<div class="title-list">
							<el-button @click="removeSubActivity(index)" :disabled="sub_activity.a_ret">删除当前节点</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>


	</div>

</template>

<script>
	export default {
		data() {
			return {
				pdId: '',
				pdTitle: '',
				activityTitle: '',
				activityGroupTitle: '',
				activityGroupId: '',
				activityList: [],
				subActivityList: [],
				visual: {
					size: [70, 40],
					shape: 'round-rect',
					x: 532,
					y: 488,
					style: {
						fill: '#fff',
						radius: 5,
						stroke: '#1890ff'
					},
					id: 400969407422093,
					label: '常规节点'
				},
				activity:'',
			}

		},
		methods: {
			//创建流程定义
			createPD() {
				console.log("创建流程定义");
				let cnt = {
					moduleKey: "测试平台1",
					title: this.pdTitle,
					tags: [],
					lanes: [],
					visual: []
				};
				this.$testapi.createPD(cnt, (res) => {
					this.pdId = JSON.parse(res.data.c).id;
				})
			},
			//删除流程定义
			deletePD() {
				console.log("删除流程定义");
				let cnt = {
					paId: this.pdId
				}
				this.$testapi.deletePD(cnt, (res) => {
					console.log(res.data.c);
				})
			},
			//创建流程节点
			createPDActivity() {
				console.log("创建流程节点");
				let cnt = {
					pdId: this.pdId,
					title: this.activityTitle,
					part: '112233',
					receivers: {
						roles: [],
						departments: [],
						users: [],
					},
					action: []
				}
				this.$testapi.createPDActivity(cnt, (res) => {
					console.log(res);
					this.activity = JSON.parse(res.data.c);
					this.activityTitle='',
					console.log(this.activity.id);
					this.getPDActivityList();
				})
			},
			//获取当前流程所有流程节点
			getPDActivityList() {
				let cnt = {
					pdId: this.pdId,
					count: 20,
					offset: 0
				}
				this.$testapi.getPDActivityList(cnt, (res) => {
					this.activityList = JSON.parse(res.data.c);

				})
			},
			//删除流程节点
			deletePDActivity(_index) {
				let obj = JSON.parse(JSON.stringify(this.activityList[_index]));
				console.log("删除节点" + obj.id + "=======" + obj.title);
				let cnt = {
					pdId: this.pdId,
					activityId: obj.id
				};
				this.$testapi.deletePDActivity(cnt, (res) => {
					console.log(res);
					this.getPDActivityList();
				})
			},
			//创建流程节点分组
			createActivityGroup() {
				console.log("创建流程节点分组");
				let cnt = {
					pdId: this.pdId,
					title: this.activityGroupTitle,
					part: '112233',
					visual: this.visual
				};
				this.$testapi.createActivityGroup(cnt, (res) => {
					console.log(res);
					this.activityGroupId = JSON.parse(res.data.c).id;
				})
			},
			//删除流程节点分组
			deleteActivityGroup() {
				console.log("删除流程节点分组");
				let cnt = {
					pdId: this.pdId,
					activityGroupId: this.activityGroupId
				};
				this.$testapi.deleteActivityGroup(cnt, (res) => {
					console.log(res);
				})
			},
			//创建流程节点到流程分组中
			createSubActivity(){
				console.log("创建流程节点到流程分组中");
				let cnt = {
					pdId: this.pdId,
					title: this.activityTitle,
					part: '112233',
					receivers: {
						roles: [],
						departments: [],
						users: [],
					},
					action: []
				};
				this.$testapi.createPDActivity(cnt,(res)=>{
					this.activity = JSON.parse(res.data.c);
					this.activityTitle='';
					let cnt1 = {
						activityGroupId:this.activityGroupId,
						activityId:this.activity.id,
						necessary:true
					}
					this.$testapi.putActivityInGroup(cnt1,(res)=>{
						console.log(res);
						this.getSubActivity();
					})
				})
			},
			//移除节点分组下属某一节点
			removeSubActivity(_index){
				let obj = JSON.parse(JSON.stringify(this.subActivityList[_index]));
				console.log("移除节点分组下属某一节点");
				let cnt = {
					activityGroupId:this.activityGroupId,
					activityId:obj.id
				}
				this.$testapi.removeActivityInGroup(cnt,(res)=>{
					console.log(res);
					this.getSubActivity();
				})
			},
			
			//获取流程节点分组下属所有节点
			getSubActivity() {
				console.log("获取流程分组下的流程节点");
				let cnt = {
					activityGroupId: this.activityGroupId
				}
				this.$testapi.getSubActivity(cnt, (res) => {
					this.subActivityList = JSON.parse(res.data.c);
				})
			}
			//为节点或节点分组添加action
			,
			addActivityAction(_index){
				let obj = JSON.parse(JSON.stringify(this.activityList[_index]));
				let cnt = {
					pdId:this.pdId,
					ownerId:obj.id,
					ownerType: 0,
					type:'accept',
					rules:[{
						ext:'expDefault',
						targetType:'activity',
						target:''
					}]
				};
				this.$testapi.addAction(cnt ,(res)=>{
					console.log(res);
				})
			},
			addSubActivityAction(_index){
				let obj = JSON.parse(JSON.stringify(this.subActivityList[_index]));
				let cnt = {
					pdId:this.pdId,
					ownerId:obj.id,
					ownerType: 0,
					type:'accept',
					rules:[{
						ext:'expDefault',
						targetType:'activity',
						target:this.activityGroupId
					}]
				};
				this.$testapi.addAction(cnt ,(res)=>{
					console.log(res);
				})
			},
			addActivityGroupAction(){
				let cnt = {
					pdId:this.pdId,
					ownerId:this.activityGroupId,
					ownerType: 0,
					type:'accept',
					rules:[{
						ext:'expDefault',
						targetType:'activity',
						target:''
					}]
				};
				this.$testapi.addAction(cnt ,(res)=>{
					console.log(res);
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		font-size: 18px;
	}

	.box {
		font-size: 25px;
		margin-bottom: 20px;
	}

	.pd_title_input {
		width: 250px;
		margin-left: 10px;
		margin-right: 20px;
	}

	.row {
		width: 100%;
		margin: 10px 10px;
		float: left;
	}

	.title-list {
		float: left;
		width: 25%;
		height: 50px;
		border-bottom: 1px solid #aaa;
		font-size: 16px;
		color: 666;
		text-align: center;
		line-height: 50px;
	}

	.line {
		float: left;
		border-top: 5px solid #000000;
	}
</style>
