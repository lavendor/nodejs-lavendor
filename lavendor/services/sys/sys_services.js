/**
 * Created by admin on 2018/5/24.
 */
var sysModel = require('../../models/sys/sys_model').Sys;

/**
 * 添加一个系统
 * @param req
 * @param res
 */
exports.addSys = function(params){
    return new Promise(function(resolve,reject){
        sysModel(params).save().then(function(){
            resolve('增加系统成功');
        }).catch(function(err){
            reject(err);
        })
    })
}

/**
 * 获取系统列表
 */
exports.getSysList = function(){
    return new Promise(function(resolve,reject){
        sysModel.find().then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        })
    })
};

/**
 * 更新系统信息
 * @param id
 * @param params
 */
exports.updateSysById = function(id,params){
    var condition = {_id:id},setData = {$set:params},options = {};
    return new Promise(function(resolve,reject){
        sysModel.update(condition,setData,options).then(function(res){
            resolve(res)
        }).catch(function(err){
            reject(err);
        })
    })
}

/**
 * 根据条件查询系统信息
 * @param id
 * @param params
 */
exports.getSysById = function(id){
    return new Promise(function(resolve,reject){
        sysModel.findOne({_id:id}).then(function(sys){
            resolve(sys);
        }).catch(function(err){
            reject(err);
        })
    })
};

/**
 * 根据ID删除系统信息
 * @param id
 */
exports.deleteSysById = function(id){
    return new Promise(function(resolve,reject){
        sysModel.remove({_id:id}).then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        })
    })
}