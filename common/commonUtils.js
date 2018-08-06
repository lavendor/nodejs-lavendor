/**
 * Created by Administrator on 2017/8/25.
 */


/**
 * 返回一个JSON数组 形式如下 {success：true,data:result,total:result.length,msg:message}
 * @param res           返回信息
 * @param promise       执行方法返回的promise
 * @param successMsg    成功返回信息
 * @param errorMessage  失败返回信息
 */
exports.respJSONArray = function(res,promise,successMsg,errorMessage){
    var sucMsg = successMsg?successMsg:'';

    //传过来的是不是一个promise对象
    if(!promise instanceof Promise){
        res.send({success:false,msg:'执行的方法不是一个Promise方法.'});
    }

    //返回执行结果到页面
    promise.then(function(result){
        res.send({success:true,msg:sucMsg,data:result,total:result.length});
    }).catch(function(err){
        res.send({success:false,msg:errorMessage}?errorMessage:err);
    })
};

/**
 * 返回一个JSON          直接返回获取的数据
 * @param res           返回信息
 * @param promise       执行方法返回的promise
 * @param successMsg    成功返回信息
 * @param errorMessage  失败返回信息
 */
exports.respJSON = function(res,promise){

    //传过来的是不是一个promise对象
    if(!promise instanceof Promise){
        res.send({success:false,msg:'执行的方法不是一个Promise方法.'});
    }

    //返回执行结果到页面
    promise.then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    })
};

/**
 * 返回一个分页查询列表
 * @param res
 * @param promise
 */
exports.resJSONPage = function(res,promise,successMsg,errorMessage){
    var sucMsg = successMsg?successMsg:'';
    //传过来的是不是一个promise对象
    if(!promise instanceof Promise){
        res.send({success:false,msg:'执行的方法不是一个Promise方法.'});
    }
    promise.then(function(result){
        res.send({'success':true,'msg':successMsg,'total':result.total,'rows':result.data});
    }).catch(function(err){
        res.send({success:false,msg:errorMessage?errorMessage:err,data:null});
    });
};

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
};
