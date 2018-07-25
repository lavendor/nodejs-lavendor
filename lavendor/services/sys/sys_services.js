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
}