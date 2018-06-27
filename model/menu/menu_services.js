/**
 * Created by admin on 2018/5/28.
 */
var menuModel = require('./menu_model').Menu,
    sysModel = require('../sys/sys_model').Sys;

/**
 * 增加一个菜单
 * @param params
 */
exports.addMenu = function(params){
    return new Promise(function(resolve,reject){
        menuModel(params).save().then(function(){
            resolve('增加系统成功');
        }).catch(function(err){
            reject(err);
        })
    })
}

/**
 * 获取菜单列表
 */
exports.getMenuList = function(){
    return new Promise(function(resolve,reject){
        menuModel.find().then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        })
    })
}

/**
 * 获取系统列表
 * @param search
 */
exports.sysList = function(params){
    var search={};
    if(params) {
        search = {sys_name: params};
    }
    return new Promise(function(resolve,reject){
        sysModel.find(search).then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        })
    })
}