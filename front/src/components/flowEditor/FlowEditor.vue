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

            },
            /** 获取节点的详细信息*/
            getNodeInfo(nodeId){
                let flowId=localStorage.getItem('flowId')
                let cnt = {
                    pdid: flowId, // Long 流程定义编号
                    activityid: nodeId, // Long 流程节点编号
                }
                this.$api.getPDActivityById(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.nodeInfo = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.nodeInfo = {}
                    }
                    this.$store.state.flowData.nodeActiveInfo = this.nodeInfo
                    this.$store.state.flowData.nodeActive = nodeId
                })
            },

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
                    _this.getNodeInfo(item._cfg.id)
                    graph.setItemState(item, 'active', true)
                },
                onCanvasClick(e) {
                    // shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
                    if (this.shouldUpdate(e)) {
                        _this.$store.state.flowData.nodeActive = '0'
                        _this.$store.state.flowData.nodeActiveInfo = {}
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
