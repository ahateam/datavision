import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let test = {};

test.uploadtest = function (cnt,callback){
	util.call(baseUrl+'/flow/uploadtest', cnt, callback)
}

//表格引擎测试
test.getORGUserInfo = function (cnt,callback){
	util.call(baseUrl+'/org/getORGUserInfo', cnt, callback)
}

test.exportData = function (cnt,callback){
	util.call(baseUrl+'/import/importTableBatchData', cnt, callback)
}



test.getDatabaseList = function(cnt,callback){
	util.call(baseUrl+'/table/getDatabaseList', cnt, callback)
}

test.getTableNameList = function(cnt,callback){
	util.call(baseUrl+'/table/getTableNameList', cnt, callback)
}
test.getTableColumns = function(cnt,callback){
	util.call(baseUrl+'/table/getTableColumns', cnt, callback)
}








//测试创建流程定义
test.createPD = function (cnt,callback){
	util.call(baseUrl+'/flow/createPD', cnt, callback)
}
//删除流程定义
test.deletePD = function (cnt,callback){
	util.call(baseUrl+'/flow/delPD', cnt, callback)
}
//创建流程节点
test.createPDActivity = function(cnt,callback){
	util.call(baseUrl+'/flow/createPDActivity', cnt, callback)
}
//得到流程节点列表
test.getPDActivityList = function(cnt,callback){
	util.call(baseUrl+'/flow/getPDActivityList', cnt, callback)
}
//删除流程节点
test.deletePDActivity = function(cnt, callback){
	util.call(baseUrl+'/flow/delPDActivity', cnt, callback)
}
//创建流程节点分组
test.createActivityGroup = function(cnt, callback){
	util.call(baseUrl+'/flow/createProcessActivityGroup', cnt, callback)
}
//删除流程节点分组
test.deleteActivityGroup = function(cnt,callback){
	util.call(baseUrl+'/flow/delProcessActivityGroup', cnt, callback)
}
//添加节点到节点分组中
test.putActivityInGroup = function(cnt, callback){
	util.call(baseUrl+'/flow/putActivityInGroup', cnt, callback)
}
//从节点分组中移除一个节点
test.removeActivityInGroup = function(cnt, callback){
	util.call(baseUrl+'/flow/removeActivityInGroup', cnt, callback)
}
//得到某个节点分组下的所以子节点
test.getSubActivity = function(cnt, callback){
	util.call(baseUrl+'/flow/getSubActivity', cnt, callback)
}
//添加action
test.addAction = function(cnt, callback){
	util.call(baseUrl+'/flow/createProcessAction', cnt, callback)
}









//////////////////////////////////////////////

//最后测试版本
console.log('开始调用ctrl');

test.testAction = function (cnt,callback){
	util.call(baseUrl+'/process/execAction', cnt, callback)
}


test.ifActivityAction = function(cnt, callback){
	util.call(baseUrl+'/process/ifActivityAction', cnt, callback)
}
//得到当前节点相关的action行为
test.getProcessActionsInActivity = function(cnt, callback){
	util.call(baseUrl+'/process/getProcessActionsInActivity', cnt, callback)
}

//修改当前节点操作行为状态（是否操作，以及操作行为是什么）
test.editActionExt = function(cnt, callback){
	util.call(baseUrl+'/process/editActionExt', cnt, callback)
}

//得到process相关信息
test.getProcessInfoByTargerType=function(cnt,callback) {
	util.call(baseUrl+'/process/getProcessInfoByTargerType', cnt, callback)
}

//重构后的action动作，acceptAction动作
test.processActionAccept=function(cnt,callback) {
	util.call(baseUrl+'/process/processActionAccept', cnt, callback)
}

//重构后的action动作，rejectAction动作
test.processActionReject=function(cnt,callback) {
	util.call(baseUrl+'/process/processActionReject', cnt, callback)
}

export default test