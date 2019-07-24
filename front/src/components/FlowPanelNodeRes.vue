<template>
	<div>
		<div class="search-box">
			<el-input size="small" placeholder="输入关键字进行过滤" v-model="searchTableData">
			</el-input>
		</div>
		<div class="tab-item-content">
			<el-tree class="filter-tree" :data="tabList[0].content" :props="defaultProps" default-expand-all :filter-node-method="filterNode"
			 ref="tree">
			</el-tree>
		</div>
		<div class="check-btn">
			<el-button type="primary" size="mini">选中当前值</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "FlowPanelNodeRes",
		props: ['tabList'],
		watch: {
			searchTableData(val) {
				console.log(val)
				this.$refs.tree.filter(val);
			}
		},
		data() {
			return {
				searchTableData: '',
				defaultProps: {
					children: 'field',
					label: 'text'
				},
			}
		},
		methods: {
			filterNode(value, data) {
				console.log('111')
				console.log(value)
				console.log(data)
				if (!value) return true;
				return data.text.indexOf(value) !== -1;
			},
		}
	}
</script>

<style scoped>

</style>
