

const constData = {}

/** 行为类型定义*/
constData.actionType = [{key:'accept',val:'同意'},{key:'reject',val:'反对'},{key:'terminate',val:'申请'}]

/** 表格*/
constData.dataTypeList=[{key: 'int', val: '整型'}, {key: 'decimal', val: '小数'}, {key: 'string', val: '字符串'}, {key: 'date', val: '日期'}, {key: 'time', val: '日期时间'}, {key: 'money', val: '金额'}, {key: 'bool', val: '布尔型'}]
constData.intRulesList=[{key: 0, val: '不取整'}, {key: 1, val: '直接取整'}, {key: 2, val: '四舍五入'}, {key: 3, val: '向上取整'}, {key: 4, val: '向下取整'}]
constData.signList=['+','-','*','/','(',')']

export default {
    constData
}
