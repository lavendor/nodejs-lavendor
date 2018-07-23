/**
 * Created by Administrator on 2017/8/25.
 */


/**
 * 数组转树型数据结构
 * @param a 数组
 * @param idStr ID字段
 * @param pidStr pid字段
 * @returns {Array}
 */
exports.getArrToTree  = function(a,idStr,pidStr){
    var result = [], hash = {}, id= idStr?idStr:'id',pid = pidStr?pidStr:'pid';
    for(var i=0; i < a.length; i++){
        //使用ID作为键，ID对应的对象作为值，存在哈希对象中
        hash[a[i][id]] = a[i];
    }
    for(var j=0; j < a.length; j++){
        //当前对象
        var currentValue = a[j];

        //使用当前对象的父ID，从哈希对象中拿到当前对象的父对象
        var parentValue = hash[currentValue[pid]];

        //有父对象
        if(parentValue){
            //判断父对象是不是包含了子节点，没包含，则创建子节点
            !parentValue['children'] && (parentValue['children'] = []);
            //把当前对象归为父对象的子节点中
            parentValue['children'].push(currentValue);
        }else{
            //没有父对象，则为根节点
            result.push(currentValue);
        }
    }
    return result;
}