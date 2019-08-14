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
//设置节点起点
api.setPDStartActivity= function (cnt,callback) {
    util.call(baseUrl+'/flow/setPDStartActivity', cnt, callback)
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
//创建节点所需资源
api.createAssetDesc= function (cnt,callback) {
    util.call(baseUrl+'/flow/createAssetDesc', cnt, callback)
}
//获取节点资源列表
api.getAssetDescList= function (cnt,callback) {
    util.call(baseUrl+'/flow/getAssetDescList', cnt, callback)
}
//删除节点所需资源
api.delAssetDesc= function (cnt,callback) {
    util.call(baseUrl+'/flow/delAssetDesc', cnt, callback)
}

//获取根据标签获取表格列表
api.getTableSchemaByTags = function (cnt,callback) {
    util.call(baseUrl+'/table/getTableSchemaByTags', cnt, callback)
}
//获取根据标签获取报表列表
api.getReportSchemaList= function (cnt,callback) {
    util.call(baseUrl+'/report/getReportSchemaList', cnt, callback)
}
//获取标签列表
api.getSysTableTags= function (cnt,callback) {
    util.call(baseUrl+'/table/getSysTableTags', cnt, callback)
}
//修改节点资源/权限/行为信息
api.editPDActivity= function (cnt,callback) {
    util.call(baseUrl+'/flow/editPDActivity', cnt, callback)
}
//删除table定义
api.delTableSchema= function (cnt,callback) {
    util.call(baseUrl+'/table/delTableSchema', cnt, callback)
}
//修改table定义
api.editTableSchema= function (cnt,callback) {
    util.call(baseUrl+'/table/editTableSchema', cnt, callback)
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



/** 表格设计器*/
//创建表格
api.createTableSchema= function (cnt,callback) {
    util.call(baseUrl+'/table/createTableSchema', cnt, callback)
}



/** 流程数据定义完成后进行展示--*/
//创建流程事务
api.createProcess= function (cnt,callback) {
    util.call(baseUrl+'/process/createProcess', cnt, callback)
}
//流程事务列表
api.getProcessListByUserId= function (cnt,callback) {
    util.call(baseUrl+'/process/getProcessListByUserId', cnt, callback)
}
//删除单个流程事务
api.delProcess = function (cnt,callback) {
    util.call(baseUrl+'/process/delProcess', cnt, callback)
}

//获取流程事务的详细信息
api.getProcessInfo = function (cnt,callback) {
    util.call(baseUrl+'/process/getProcessInfo', cnt, callback)
}
//获取流程下所有节点的操作日志
api.getProcessLogList = function (cnt,callback) {
    util.call(baseUrl+'/process/getProcessLogList', cnt, callback)
}
//执行流程行为
api.executeProcessAction = function (cnt,callback) {
    util.call(baseUrl+'/process/executeProcessAction', cnt, callback)
}

/** 表格操作相关*/
//获取表格数据
api.getTableDatas = function (cnt,callback) {
    util.call(baseUrl+'/table/getTableDatas', cnt, callback)
}

//获取表格结构
api.getTableSchemaById = function (cnt,callback) {
    util.call(baseUrl+'/table/getTableSchemaById', cnt, callback)
}

//插入表格数据
api.insertProcessTableData	= function (cnt,callback) {
    util.call(baseUrl+'/process/insertProcessTableData', cnt, callback)
}
//修改表数据
api.editProcessTableData= function (cnt,callback) {
    util.call(baseUrl+'/process/editProcessTableData', cnt, callback)
}
//获取process填写过的表格
api.getProcessAssetByDescIds	= function (cnt,callback) {
    util.call(baseUrl+'/process/getProcessAssetByDescIds', cnt, callback)
}
//获取用户在process里面填写过的资源列表
api.getProcessAssetList	= function (cnt,callback) {
    util.call(baseUrl+'/process/getProcessAssetList', cnt, callback)
}
//获取用户填写过的资源对应的详细信息
api.getProcessAssetByIdANDUserId= function (cnt,callback) {
    util.call(baseUrl+'/process/getProcessAssetByIdANDUserId', cnt, callback)
}

export default api

