
const commen={}

/** @getFormulaResult 根据计算公式返回计算完成的值
 *  @item  一行的对应数据数据 Object (键值对)
 *  @formula 对应的计算公式  String
 *  @return 计算完成的数值
 * */
commen.getFormulaResult=function (item,formula) {
    /** 获取第一个变量的位置*/
    let start = formula.indexOf('{{')
    let end = formula.indexOf('}}')

    while (start !=-1){
        let variable = formula.substring(start+2,end)
        let str = ''
        /** 获取变量对应的值*/
        let val = item[variable]
        if(val == undefined || val ==null || val == ''){
            val = 0
        }
        /**如果起点是0 的情况*/
        if(start == 0){
            str =  formula.substr(end+2)
            str = val+str
        }else{
        /** 起点不是0的情况 拼接 左--中(对应的值)--右 字符串 */
            let str1 = formula.substring(0,start)
            let str2 = val
            let str3 = formula.substr(end+2)
            str = str1+str2+str3
        }
        /** 重置字符串替换变量为对应值*/
        formula = str
        start = formula.indexOf('{{')
        end = formula.indexOf('}}')
    }
    /** 返回计算完成的值*/
    let value = eval(formula)
    return value
}

/** @getGraphNodes  根据canvas图形更新 全局状态nodeList
 *  @graphNodes  最新的画图的节点列表 Array
 *  @return   只有canvas model的数组 Array
 * */
commen.getGraphNodes = function (graphNodes) {
    let arr = []
    for(let i=0;i<graphNodes.length;i++){
        arr.push(graphNodes[i]._cfg.model)
    }
    return arr
}

/** @validataCompute 判断增加字符串或数据子项是否合法
 *  @formula  计算公式 必须非空字符串
 *  @key  0：数据子项 1：运算符号
 *  @item  要增加的字符串
 * */
commen.validataCompute=function(formula,key,item=''){
    let str = formula.substr(formula.length-1,1)
    let res = false
    /* 增加数据项*/
    if(key == 0){

        if(str == '}' || str == ')'){
            res = false
        }else{
            res = true
        }
    } else if(key == 1){ //增加计算符号
        if(item =='('){
            if(str !='}' && str !=')'){
                res = true
            }
        }else{
            if(str == '}' || str == ')'){
                res = true
            }
        }

    }
    return res
}



export default {
    commen
}
