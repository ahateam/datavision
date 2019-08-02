<template>
    <div>
        <div id="canvasBox" ref="canvasBox"></div>
    </div>
</template>

<script>
    import G6 from '@antv/g6';

    export default {
        name: "FlowEditor",
        props: {
            flowId: String,
        },

        data() {
            return {
                nodeData: {
                    nodes: [],
                    edges: []
                },
                nodeList: [],
                activeNode: ''
            }
        },
        computed: {
            getActiveNode() {
                return this.$store.state.flowData.nodeActive
            },
            getFlowStyle() {
                return this.$store.state.flowStyle
            }
        },
        watch: {
            /** 根据动态的节点id 更改不同的canvas节点选中状态
             * */
            getActiveNode(val) {
                this.activeNode = val
                const graph = this.$store.state.flowData.graph
                let nodes = graph.getNodes()
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i]._cfg.id == val) {
                        this.$store.state.flowData.graph.setItemState(nodes[i], 'active', true)
                    } else {
                        this.$store.state.flowData.graph.setItemState(nodes[i], 'active', false)
                    }
                }
            },

            /** 获取最新的流程图样式 node edge*/
            getFlowStyle(val) {
                console.log('1111')
                let nodeList = val.nodeList
                let edgeList = val.edgeList
                let graph = this.$store.state.flowData.graph
                this.reDraw(graph, nodeList, edgeList)
            },
        },
        methods: {
            /** 重新绘图*/
            reDraw(graph, nodeList, edgeList) {
                console.log('111111')
                this.nodeData.nodes = nodeList
                this.nodeData.edges = edgeList
                graph.changeData(this.nodeData)

            }
        },
        mounted() {
            let _this = this
            G6.registerNode('round-rect', {
                // 设置状态
                setState(name, value, item) {
                    const group = item.getContainer();
                    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
                    if (name == 'mouse') {
                        if (value) {
                            shape.attr('fill', '#e8f8ff');
                        } else {
                            shape.attr('fill', '#fff');
                        }
                    } else if (name == 'active') {
                        if (value) {
                            shape.attr('fill', '#e8f8ff');
                        } else {
                            shape.attr('fill', '#fff');
                        }
                    }
                }
            }, 'rect');
            // G6.registerBehavior('click-add-edge', {
            // 	getEvents() {
            // 		return {
            // 			'node:click': 'onClick',
            // 			mousemove: 'onMousemove',
            // 			'edge:click': 'onEdgeClick' // 点击空白处，取消边
            // 		};
            // 	},
            // 	onClick(ev) {
            // 		const node = ev.item;
            // 		const graph = _this.$store.state.flowData.graph
            // 		const point = {
            // 			x: ev.x,
            // 			y: ev.y
            // 		};
            // 		const model = node.getModel();
            // 		if (this.addingEdge && this.edge) {
            // 			graph.updateItem(this.edge, {
            // 				target: model.id
            // 			});
            //
            // 			this.edge = null;
            // 			this.addingEdge = false;
            // 		} else {
            // 			this.edge = graph.addItem('edge', {
            // 				source: model.id,
            // 				target: point
            // 			});
            // 			this.addingEdge = true;
            // 		}
            //
            //
            // 	},
            // 	onMousemove(ev) {
            // 		const point = {
            // 			x: ev.x,
            // 			y: ev.y
            // 		};
            // 		if (this.addingEdge && this.edge) {
            // 			_this.$store.state.flowData.graph.updateItem(this.edge, {
            // 				target: point
            // 			});
            // 		}
            // 	},
            // 	onEdgeClick(ev) {
            // 		const currentEdge = ev.item
            // 		// 拖拽过程中，点击会点击到新增的边上
            // 		if (this.addingEdge && this.edge == currentEdge) {
            // 			_this.$store.state.flowData.graph.removeItem(this.edge)
            // 			this.edge = null
            // 			this.addingEdge = false
            // 		}
            // 	}
            // })
            G6.registerBehavior('activate-node', {
                getDefaultCfg() {
                    return {
                        multiple: true
                    };
                },
                getEvents() {
                    return {
                        'node:mouseenter': 'onMouseEnter',
                        'node:mouseleave': 'onMouseLeave',
                        'node:click': 'onNodeClick',
                        'canvas:click': 'onCanvasClick'
                    };
                },
                onMouseEnter(e) {
                    const graph = _this.$store.state.flowData.graph;
                    const item = e.item;
                    if (item.hasState('active')) {
                        return
                    } else {
                        graph.setItemState(item, 'mouse', true)
                    }
                },
                onMouseLeave(e) {
                    const graph = _this.$store.state.flowData.graph
                    const item = e.item
                    if (item.hasState('active')) {
                        return
                    } else {
                        graph.setItemState(item, 'mouse', false)
                    }

                },
                onNodeClick(e) {
                    const graph = _this.$store.state.flowData.graph
                    const item = e.item
                    if (item.hasState('active')) {
                        graph.setItemState(item, 'active', false)
                        return;
                    }
                    // this 上即可取到配置，如果不允许多个active，先取消其他节点的active状态
                    this.removeNodesState()
                    // 置点击的节点状态为active
                    _this.$store.state.flowData.nodeActive = item._cfg.id
                    graph.setItemState(item, 'active', true)
                },
                onCanvasClick(e) {
                    // shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
                    if (this.shouldUpdate(e)) {
                        _this.$store.state.flowData.nodeActive = '0'
                        this.removeNodesState()
                    }
                },
                removeNodesState() {
                    _this.$store.state.flowData.nodeActive = '0'
                    _this.$store.state.flowData.graph.getNodes().forEach(node => {
                        _this.$store.state.flowData.graph.setItemState(node, 'active', false)
                    })
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
            })
            this.nodeData.nodes = this.$store.state.flowStyle.nodeList
            this.nodeData.edges = this.$store.state.flowStyle.edgeList
            console.log(this.nodeData.nodes)
            graph.data(this.nodeData)
            graph.render()
            graph.setMode('default')

            _this.$store.state.flowData.graph = graph
            this.activeNode = this.$store.state.flowData.nodeActive


        }
    }
</script>

<style scoped lang="scss">
    #canvasBox {
        cursor: pointer;
    }

</style>
