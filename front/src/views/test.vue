<template>
    <div style="height: 100%">


        <div class="left-box">
            左侧操作区
        </div>
        <div class="right-box">
            <div class="nav-box">
                顶部区域
            </div>
            <div class="center-box">
                <div id="mountNode"></div>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                graph:'',
            }
        },
        methods:{

            canvasEvent(){

            },

            /** 画图的svg方法*/




    },
        mounted(){
            this.G6.registerEdge('hvh', {
                draw(cfg, group) {
                    const startPoint = cfg.startPoint;
                    const endPoint = cfg.endPoint;
                    const shape = group.addShape('path', {
                        attrs: {
                            stroke: '#333',
                            path: [
                                ['M', startPoint.x, startPoint.y],
                                ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , startPoint.y],
                                ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , endPoint.y],
                                ['L', endPoint.x, endPoint.y]
                            ]
                        }
                    });
                    return shape;
                }
            });
            this.G6.registerEdge('line-growth', {
                afterDraw(cfg, group) {
                    const shape = group.get('children')[0];
                    const length = shape.getTotalLength();
                    shape.animate({
                        onFrame(ratio) {
                            const startLen = ratio * length;
                            const cfg = {
                                lineDash: [startLen, length - startLen]
                            };
                            return cfg;
                        },
                        repeat: true
                    }, 2000);
                },
                setState(name, value, item) {
                    const group = item.getContainer();
                    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
                    if(name === 'active') {
                        if(value) {
                            shape.attr('stroke', 'red');
                        } else {
                            shape.attr('stroke', '#333');
                        }
                    }
                    if (name === 'selected') {
                        if(value) {
                            shape.attr('lineWidth', 3);
                        } else {
                            shape.attr('lineWidth', 2);
                        }
                    }
                }
            }, 'cubic');

            const data = {
                nodes: [{
                    id: 'node1',
                    x: 100,
                    y: 200,
                    anchorPoints:[
                        [0, 0.5],  [1, 0.5]
                    ]
                },{
                    id: 'node2',
                    x: 200,
                    y: 100,
                    anchorPoints:[
                        [0, 0.5],  [1, 0.5]
                    ]
                },{
                    id: 'node3',
                    x: 200,
                    y: 300,
                    anchorPoints:[
                        [0, 0.5],  [1, 0.5]
                    ]
                }],
                edges: [{
                    id: 'edge1',
                    target: 'node2',
                    source: 'node1',
                    shape: 'line-growth'
                },{
                    id: 'edge2',
                    target: 'node3',
                    source: 'node1',
                    shape: 'line-growth'
                }]
            };




            const graph = new this.G6.Graph({
                container: 'mountNode',
                width: 800,
                height: 800,
                modes: {
                    default: ['click-select','drag-canvas', 'zoom-canvas',],
                    // edit: ['']
                }
            });

            graph.data(data);
            graph.render();

            graph.on('node:mouseenter', ev=> {
                const node = ev.item;
                graph.setItemState(node, 'running', true);
            });



        }
    }
</script>

<style scoped lang="scss">

    /** 顶部区域*/
    .nav-box{
        width: 100%;
        height: 60px;
        background: azure;
    }
    .left-box{
        float: left;
        width: 200px;
        height: 100%;
        background: azure;
    }
    .right-box{
        margin-left: 200px;
        width: auto;
        height: 100%;
    }
    .center-box{
        width: 100%;
        height:100%;

    }

</style>
