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

//新增节点
api.createProcessActivity= function (cnt,callback) {
    util.call(baseUrl+'/flow/createProcessActivity', cnt, callback)
}
export default api

