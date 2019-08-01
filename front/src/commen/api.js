import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';


let api = {};
console.log('开始调用ctrl');

//获取流程图列表
api.getPDList= function (cnt,callback) {
    util.call(baseUrl+'/flow/getPDList', cnt, callback)
}
//新增流程图
api.createPD= function (cnt,callback) {
    util.call(baseUrl+'/flow/createPD', cnt, callback)
}
//删除单个流程
api.delPD = function (cnt,callback) {
    util.call(baseUrl+'/flow/delPD', cnt, callback)
}
//获取流程下所有的节点
api.getPDActivityList = function (cnt,callback) {
    util.call(baseUrl+'/flow/getPDActivityList', cnt, callback)
}
//新增数据节点
api.createPDActivity= function (cnt,callback) {
    util.call(baseUrl+'/flow/createPDActivity', cnt, callback)
}
//删除单个数据节点
api.delPDActivity= function (cnt,callback) {
    util.call(baseUrl+'/flow/delPDActivity', cnt, callback)
}
//设置单个节点样式
api.setPDActivityVisual= function (cnt,callback) {
    util.call(baseUrl+'/flow/setPDActivityVisual', cnt, callback)
}
//获取所有的资源列表
api.getPDAssetList= function (cnt,callback) {
    util.call(baseUrl+'/flow/getPDAssetList', cnt, callback)
}
//获取单个节点的所有详细信息
api.getPDActivityById = function (cnt,callback) {
    util.call(baseUrl+'/flow/getPDActivityById', cnt, callback)
}

//保存设置所有的节点样式
api.setPDActivityVisualList= function (cnt,callback) {
    util.call(baseUrl+'/flow/setPDActivityVisualList', cnt, callback)
}
//删除单个节点所有数据
api.delPDActivity= function (cnt,callback) {
    util.call(baseUrl+'/flow/delPDActivity', cnt, callback)
}

/** 资源相关*/
//创建资源

api.createAssetDesc= function (cnt,callback) {
    util.call(baseUrl+'/flow/createAssetDesc', cnt, callback)
}

//获取资源table列表
api.getTableSchemas= function (cnt,callback) {
    util.call(baseUrl+'/table/getTableSchemas', cnt, callback)
}
//修改节点资源/权限/行为信息

api.editPDActivity= function (cnt,callback) {
    util.call(baseUrl+'/flow/editPDActivity', cnt, callback)
}

/** 权限相关*/
//获取部门列表
api.getDepartmentList= function (cnt,callback) {
    util.call(baseUrl+'/flow/getDepartmentList', cnt, callback)
}
//获取用户角色列表
api.getUserRoleList= function (cnt,callback) {
    util.call(baseUrl+'/flow/getUserRoleList', cnt, callback)
}
//获取用户列表
api.getUserList= function (cnt,callback) {
    util.call(baseUrl+'/flow/getUserList', cnt, callback)
}

export default api

