<template>
	<div style="height: 100%">
		<div id="canvasBox" ref="canvasBox"></div>
	</div>
</template>

<script>
	import G6 from '@antv/g6';

	export default {
		name: "FlowEditor",
		components: {
			G6
		},
		data() {
			return {
				graph:{},
				currNode: {},
				activity: {
					type: 'node',
					src: 'https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg',
					label: '常规节点',
					model: {
						id: '',
						x: 300,
						y: 200,
						size: [70, 40],
						label: '常规节点',
						shape: 'rect',
						style: {
							stroke: '#1890ff',
							fill: '#e8f8ff',
							radius: 5
						}
					}
				},
				multiple:'',
				nodeData: {
					nodes: [{
						id: 'node1',
						label: 'node1',
						x: 100,
						y: 200,
						anchorPoints: [
							[0, 1],
							[0.5, 1]
						],
						shape: 'rect'
					}, ],
					edges: []
				},
			}
		},
		methods: {
			createActivity(label, x, y) {
				let model = JSON.parse(JSON.stringify(this.nodeTemplate.model))
				model.x = x
				model.y = y
				model.label = label
				this.graph.addItem('node', model)
			},
		},
		mounted() {
			let _this = this

			G6.registerBehavior('activate-node', {
				getDefaultCfg() {
					return {
						multiple: true
					};
				},
				getEvents() {
					return {
						'node:click': 'onNodeClick',
						'canvas:click': 'onCanvasClick'
					};
				},
				onNodeClick(e) {
					console.log('onNodeClick')
					const graph = this.graph;
					const item = e.item;

					if (item.hasState('active')) {
						graph.setItemState(item, 'active', false);
						return;
					}
					// this 上即可取到配置，如果不允许多个active，先取消其他节点的active状态
					if (!this.multiple) {
						this.removeNodesState();
					}
					// 置点击的节点状态为active
					graph.setItemState(item, 'active', true);
				},
				onCanvasClick(e) {
					// shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
					console.log('onCanvasClick')

					//取消选中状态
					if (this.shouldUpdate(e)) {
						this.removeNodesState();
					}
				},
				removeNodesState() {
					this.graph.findAllByState('active').forEach(node => {
						this.graph.setItemState(node, 'active', false);
					});
				}
			})

			const graph = new G6.Graph({
				container: 'canvasBox',
				width: document.body.clientWidth - 540,
				height: document.body.clientHeight - 140,
				modes: {
					default: ['click-add-node', 'click-select', 'click-add-edge', 'drag-node', 'activate-node'], //'click-add-edge' 新增先的behiver
				},
				defaultEdge: {
					shape: 'quadratic',
					size: 1,
					endArrow: true
				},
				edgeStyle: {
					default: {
						stroke: '#aaa',
						endArrow: true
					}
				},
			});

			graph.data(this.nodeData)
			graph.render()
			graph.setMode('default')

			this.graph = graph

		}
	}
</script>

<style scoped lang="scss">
	.header-box {
		background: beige;
	}

	.footer {
		background: beige;
	}

	.main-box {
		padding: 0;
		width: auto;
		height: 100%;
	}

	.info-box {
		float: right;
		width: 300px;
		height: 100%;
		background: #fafafa;
		border-left: 1px solid #e8e8e8;
	}

	.center-box {
		float: left;
		width: auto;
	}

	.item-box {
		background: #fafafa;
		border-right: 1px solid #e8e8e8;
	}


	.nav-box {
		margin-top: 20px;
		text-align: center;
		width: auto;
	}

	/*右侧内容样式*/
	.tab-box {
		width: 100%;
		height: 400px;
	}

	.show-box {
		width: 100%;
		height: 200px;
		border-top: 1px solid #e8e8e8;
		padding: 10px 0;
	}
</style>
