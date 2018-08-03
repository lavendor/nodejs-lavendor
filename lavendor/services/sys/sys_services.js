/**
 * Created by admin on 2018/5/24.
 */
var sysModel = require('../../models/sys/sys_model').Sys,
    commonDao = require('../../../common/commonDao');

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
    return commonDao.getAllNoPage(sysModel,{},null,null);
};

/**
 * 更新系统信息
 * @param id
 * @param params
 */
exports.updateSysById = function(id,params){
    return commonDao.updateById(sysModel,id,params);
}

/**
 * 根据条件查询系统信息
 * @param id
 * @param params
 */
exports.getSysById = function(id){
    return commonDao.findOneById(sysModel,id);
};

/**
 * 根据ID删除系统信息
 * @param id
 */
exports.deleteSysById = function(id){
    return commonDao.deleteOneById(sysModel,id);
}