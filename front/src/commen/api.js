import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';


let api = {};
console.log('开始调用ctrl');

//获取流程图列表
api.getProcessDefinition= function (cnt,callback) {
    util.call(baseUrl+'/flow/getProcessDefinition', cnt, callback)
}
//新增流程图
api.createProcessDefinition= function (cnt,callback) {
    util.call(baseUrl+'/flow/createProcessDefinition', cnt, callback)
}
//删除单个流程
api.delProcessDefinition= function (cnt,callback) {
    util.call(baseUrl+'/flow/delProcessDefinition', cnt, callback)
}
//查询单个流程
api.getProcessDefinitionByPDId= function (cnt,callback) {
    util.call(baseUrl+'/flow/getProcessDefinitionByPDId', cnt, callback)
}

//新增数据节点
api.createProcessActivity= function (cnt,callback) {
    util.call(baseUrl+'/flow/createProcessActivity', cnt, callback)
}
//删除单个数据节点
api.delPDActivity= function (cnt,callback) {
    util.call(baseUrl+'/flow/delPDActivity', cnt, callback)
}
//新增样式节点-修改节点-替换所有节点显示信息
api.addVisualToDefinition= function (cnt,callback) {
    util.call(baseUrl+'/flow/addVisualToDefinition', cnt, callback)
}

//获取所有节点信息
api.getPDActivityList= function (cnt,callback) {
    util.call(baseUrl+'/flow/getPDActivityList', cnt, callback)
}

//
export default api

