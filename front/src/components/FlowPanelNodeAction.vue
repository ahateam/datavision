<template>
	<div>
		<el-tabs v-model="permissionTabActive">

			<el-tab-pane :label="item.title" :key="index" v-for="(item,index) in tabList[1].content" @click="permissionTabActive = index">

				<div class="permission-list" v-for="(item1,index1) in item.list" :key="index1">
					{{item1.name}}
				</div>

			</el-tab-pane>

		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: "FlowPanelNodeAction",
		props: ['tabList'],
		data() {
			return {
				permissionTabActive: 0,
			}
		},
		methods: {}
	}
</script>

<style scoped>

</style>
