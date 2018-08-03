/**
 * Created by admin on 2018/5/28.
 */
var commonUtils = require('../../../common/common_utils'),
    menuModel = require('../../models/menu/menu_model').Menu,
    commonDao = require('../../../common/commonDao'),
    sysModel = require('../../models/sys/sys_model').Sys;

/**
 * 增加一个菜单
 * @param params
 */
exports.addMenu = function (params) {
    return new Promise(function (resolve, reject) {
        menuModel(params).save().then(function () {
            resolve('增加系统成功');
        }).catch(function (err) {
            reject(err);
        })
    })
}

/**
 * 更新菜单
 * @param id
 * @param params
 */
exports.updateMenuById = function(id,params){
    var condition = {_id:id};
    var data = {$set:params};
    var option = {};
    return new Promise(function(resolve,reject){
        menuModel.update(condition,data,option).then(function(){
            resolve(true);
        }).catch(function(err){
            reject(err);
        })
    })
}

/**
 * 获取菜单列表
 */
exports.getMenuList = function (searchMap,populate,sort) {
    return new Promise(function (resolve, reject) {
        commonDao.getAllNoPage(menuModel,searchMap,populate,sort).then(function(result){
            resolve(result);
        }).catch(function (err) {
            reject(err);
        })
    })
}

/**
 * 获取系统列表
 * @param search
 */
exports.sysList = function (params) {
    var search = {};
    if (params) {
        search = {sys_name: params};
    }
    return new Promise(function (resolve, reject) {
        sysModel.find(search).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        })
    })
}

/**
 * 查询菜单树
 */
exports.menuTree = function () {
    return new Promise(function (resolve, reject) {
        menuModel.find().then(function (menus) {
            var menuArr = [];
            menus.forEach(function (menu) {
                var menuObj = {};
                menuObj['id'] = menu._id;
                menuObj['pid'] = menu.menu_parent;
                menuObj['text'] = menu.menu_name;
                menuObj['attributes'] = menu.menu_url;
                //menuObj['iconCls'] = menu.menu_icon;

                menuArr.push(menuObj);
            });
            resolve(commonUtils.getArrToTree(menuArr));
        }).catch(function (err) {
            reject(err);
        })
    })
}

exports.getMenuById = function(id){
    var search = {_id:id};
    return new Promise(function(resolve,reject){
        menuModel.find(search).then(function(menu){
            resolve(menu)
        }).catch(function(err){
            reject(err);
        })
    })
}

/**
 * 删除一个菜单
 * @param id
 */
exports.deleteMenuById = function(id){
    return new Promise(function(resolve,reject){
        menuModel.remove({_id:id}).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}