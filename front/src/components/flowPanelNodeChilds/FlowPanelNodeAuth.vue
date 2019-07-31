<template>
	<div>
		<el-tabs v-model="activeName" type="card" >
			<el-tab-pane label="部门" name="department">
				<div class="text-info" v-if="departmentList.length ==0 ">
					暂无表格数据
				</div>
				<div v-else class="item-list-box">
					<div class="item-list" v-for="(item,index) in departmentList" :key="index">
						{{item.name}}
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="角色" name="userRole">
				<div class="text-info" v-if="userRoleList.length ==0 ">
					暂无用户角色
				</div>
				<div v-else  class="item-list-box">
					<div class="item-list" v-for="(item,index) in userRoleList" :key="index">
						{{item.name}}
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="个人" name="user">
				<div class="text-info" v-if="userList.length ==0 ">
					暂无用户数据
				</div>
				<div v-else  class="item-list-box">
					<div class="item-list" v-for="(item,index) in userList" :key="index">
						{{item.realName}}
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: "FlowPanelNodeAuth",
		data(){
			return{
				activeName:'department',
				departmentList:[],
				userRoleList:[],
				userList:[]
			}
		},
		methods: {
			/** 获取部门列表*/
			getDepartmentList(cnt){
				this.$api.getDepartmentList(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						this.departmentList = this.$util.tryParseJson(res.data.c)
					}else{
						this.departmentList = []
					}

					console.log(this.departmentList)
				})
			},
			/** 获取用户角色列表*/
			getUserRoleList(cnt){
				this.$api.getUserRoleList(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						this.userRoleList = this.$util.tryParseJson(res.data.c)
					}else{
						this.userRoleList = []
					}
				})

			},
			/** 获取用户列表*/
			getUserList(cnt){
				this.$api.getUserList(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						this.userList = this.$util.tryParseJson(res.data.c)
					}else{
						this.userList = []
					}
				})
			}
		},
		mounted(){
			let cnt = {
				count:500,
				offset:0
			}
			this.getDepartmentList(cnt)
			this.getUserRoleList(cnt)
			this.getUserList(cnt)

		}

	}
</script>

<style scoped lang="scss">
	.search-box {
		width: auto;
		height: 50px;
		line-height: 50px;
	}

	.tab-item-content {
		width: auto;
		height: 300px;
		overflow-y: auto;
	}
	.check-btn {
		width: auto;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.item-list {
		width: auto;
		padding: 10px;
		background: #fff;
		margin-top: 2px;
		cursor: pointer;
		font-size: 14px;
		color: #666;
		border-bottom: 1px solid #e8e8e8;
	}
	.item-list:hover{
		background: #e8f8ff;
	}
	.item-list:active{
		background: #88afff;
	}
	.text-info{
		width: auto;
		height: 40px;
		line-height: 40px;
		color: #666;
		font-size: 16px;
		text-align: center;
	}
	.item-list-box{
		width: auto;
		height: 330px;
		overflow-y: auto;
	}
</style>
