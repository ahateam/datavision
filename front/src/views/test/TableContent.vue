<template>
	<div>
		<div class="form-title">
			<el-form label-width="100px">
				<el-form-item label="表格名称">
					<el-input v-model="alias" size="small" placeholder="表名称" style="width: 40%"></el-input>
				</el-form-item>

				<el-form-item label="标签选择">
					<el-checkbox-group v-model="tags">
						<el-checkbox v-for="(item,index) in tagList" :key="index" :label="item.name" name="tags"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
		</div>
		<div class="form-data-source">
			<el-form label-width="100px">
				<el-form-item label="数据源选择">
					<el-select v-model='database' placeholder="请选择数据库" @change="database_change()">
						  <el-option v-for="(ondatabase) in databaselist" :label="ondatabase" :value="ondatabase"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="数据表">
					<el-select v-model='table' placeholder="请选择数据库" @change="table_change()">
						  <el-option v-for="(ontable) in tableList" :label="ontable" :value="ontable"></el-option>
					</el-select>
				</el-form-item>


			</el-form>

		</div>
		<div class="form-table">
			<table class="table-design">
				<thead>
					<th>字段名</th>
					<th>字段别名</th>
					<th>是否必填</th>
					<th>字段类别</th>
					<th>数据类型</th>
					<th>计算公式</th>
					<th>操作</th>
				</thead>
				<tbody>
					<tr v-for="(oitem,oindex) in tableDatas" :key="oindex">
						<td>{{oitem.name}}</td>
						<td>{{oitem.alias}}</td>
						<td>
							{{necessaryFilter(oitem.necessary)}}
						</td>
						<td>
							{{columnTypeFilter(oitem.columnType)}}
						</td>
						<td>
							{{dataTypeFilter(oitem.dataType)}}
						</td>
						<td>{{oitem.computeFormula}}</td>
						<td>
							<el-button type="primary" size="mini" @click="checkDataBtn(oindex)">编辑</el-button>
							<el-button type="danger" size="mini" @click="delDataBtn(oindex)" style="margin-left: 20px">删除</el-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="form-table-btn">
			<el-button type="primary" size="small" @click="saveBtn" style="width: 20%">提交数据配置</el-button>
			<el-button type="danger" size="small" v-if="tableActive != '-1'" @click="delBtn" style="width: 20%;margin-left: 20px">删除表格</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "tableContent",
		props: {
			tagList: Array
		},
		data() {
			return {
				tableData: [],
				alias: '',
				type: 1,
				tags: [],
				tableActive: '-1',
				dataTypeList: this.$constData.dataTypeList,
				databaselist: [],
				database: '',
				tableList: [],
				table:'',
				in_columns: [],
				tableDatas:this.tableData
			}
		},
		computed: {
			getTableData() {
				return this.$store.state.tableEditor.tableData
			},
			getTableActive() {
				return this.$store.state.tableEditor.tableActive
			},

		},
		watch: {

			getTableData(val) {
				this.tableData = JSON.parse(JSON.stringify(val))
			},
			getTableActive(val) {
				if (val == '-1') {
					this.tableData = []
					this.alias = ''
					this.tags = []
				} else {
					this.tableData = this.$store.state.tableEditor.tableActiveArr.columns
					this.alias = this.$store.state.tableEditor.tableActiveArr.alias
					this.tags = this.$store.state.tableEditor.tableActiveArr.tags
				}
				this.tableActive = val
				this.$store.state.tableEditor.changeIndex = '-1'
				this.$store.state.tableEditor.tableData = this.tableData
			},


		},
		methods: {
			/*数据库改变事件*/
			database_change(){
				let cnt = {
					databaseName : this.database,
					count : 512,
					offset : 0
				}
				this.$testapi.getTableNameList(cnt, (res)=>{
					this.tableList = JSON.parse(res.data.c)
					console.log(res);
				})
			},
			/*数据改变事件*/
			table_change(){
				let cnt = {
					databaseName : this.database,
					tableName : this.table
				}
				this.$testapi.getTableColumns(cnt, (res)=>{
					console.log(res);
					this.in_columns = []
					this.in_columns = JSON.parse(res.data.c);
					this.tableDatas = this.tableData.concat(this.in_columns)
					console.log(this.tableDatas);
				})
			},
			
			/** 数据过滤器*/
			necessaryFilter(key) {
				if (key == '0') {
					return '必填'
				} else if (key == '1') {
					return '非必填'
				}
			},
			/** 字段类别*/
			columnTypeFilter(key) {
				if (key == 'data') {
					return '数据列'
				} else if (key == 'compute') {
					return '计算列'
				}
			},
			/** 数据类型*/
			dataTypeFilter(key) {
				for (let i = 0; i < this.dataTypeList.length; i++) {
					if (this.dataTypeList[i].key == key) {
						return this.dataTypeList[i].val
					}
				}
			},
			/** 编辑按钮*/
			checkDataBtn(_index) {
				console.log(_index)
				this.$store.state.tableEditor.changeIndex = _index
				// this.data = JSON.parse(JSON.stringify(this.tableData[_index]))
			},

			/** 删除一行数据*/
			delDataBtn(_index) {
				console.log(_index)
				this.tableDatas = this.tableDatas.splice(_index)
			},

			/** 保存数据*/
			saveBtn() {
				//新增table定义数据
				if (this.tableActive == '-1') {
					let cnt = {
						tags: this.tags,
						alias: this.alias,
						type: this.type,
						columns: this.$store.state.tableEditor.tableData
					}
					this.$api.createTableSchema(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.$message.success('操作成功')
							this.$store.state.tableEditor.tableData = []
							this.$store.state.tableEditor.tableActive = '-1'
							this.$store.state.tableEditor.changeIndex = '-1'
							this.$store.state.tableEditor.tableSetRow = {}
							this.$router.push('/page')
						} else {
							this.$message.error('操作失败')
						}
					})
				} else { //编辑table定义接口
					console.log(this.tableActive)
					let cnt = {
						tags: this.tags,
						alias: this.alias,
						id: this.tableActive,
						columns: this.$store.state.tableEditor.tableData
					}
					this.$api.editTableSchema(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.$message.success('操作成功')
							this.$store.state.tableEditor.tableData = []
							this.$store.state.tableEditor.tableActive = '-1'
							this.$store.state.tableEditor.changeIndex = '-1'
							this.$store.state.tableEditor.tableSetRow = {}
							this.$router.push('/page')
						} else {
							this.$message.error('操作失败')
						}
					})
				}
			},
			/** 删除数据*/
			delBtn() {
				console.log('111')
				let cnt = {
					id: this.tableActive
				}
				this.$api.delTableSchema(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message.success('操作成功')
					} else {
						this.$message.error('操作失败')
					}
				})
				this.$router.push('/page')
			}

		},
		mounted() {
			this.tableData = this.$store.state.tableEditor.tableData
			console.log(this.tagList);
			console.log(this.tableData);
			let cnt = {
				count: 10,
				offset: 0
			}
			this.$testapi.getDatabaseList(cnt, (res) => {
				this.databaselist = JSON.parse(res.data.c);
				console.log(res);
			})
		}
	}
</script>

<style scoped lang="scss">
	.form-title {
		width: auto;
		padding: 10px 0px;
		background: #fff;
		line-height: 40px;
		font-size: 16px;
		color: #666;
		border-bottom: 1px solid #eee;
	}

	.form-table {
		margin-top: 20px;
	}

	/** 表格相关样式*/
	.table-design {
		width: 100%;
		font-family: verdana, arial, sans-serif;
		font-size: 11px;
		color: #333333;
		border: 1px solid #e8e8e8;
		border-collapse: collapse;

		thead th {
			height: 40px;
			padding: 8px;
			border: 1px solid #e8e8e8;
			background-color: rgb(240, 249, 235);
		}

		tbody tr td {
			padding: 8px;
			color: #666;
			border: 1px solid #e8e8e8;
			background-color: #ffffff;
			text-align: center;
		}
	}

	.form-table-btn {
		text-align: center;
		margin-top: 50px;

	}

	.form-data-source {
		margin-top: 10px;
	}
</style>
