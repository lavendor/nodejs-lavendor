/**
 * Created by admin on 2018/5/28.
 */
var commonUtils = require('../../../common/commonUtils'),
    menuModel = require('../../models/menu/menu_model').Menu,
    commonDao = require('../../../common/commonDao'),
    sysModel = require('../../models/sys/sys_model').Sys;

/**
 * 增加一个菜单
 * @param params
 */
exports.addMenu = function (params) {
    return commonDao.addModel(menuModel,params);
}

/**
 * 更新菜单
 * @param id
 * @param params
 */
exports.updateMenuById = function(id,params){
    return commonDao.updateById(menuModel,id,params);
}

/**
 * 获取菜单列表
 */
exports.getMenuList = function (searchMap,populate,sort) {
    return commonDao.getAllNoPage(menuModel,searchMap,populate,sort);
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
    return commonDao.getAllNoPage(sysModel,search,null,null);
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

/**
 * 根据ID查询一个菜单
 * @param id
 * @returns {Query}
 */
exports.getMenuById = function(id){
    return commonDao.findOneById(menuModel,id);
}

/**
 * 删除一个菜单
 * @param id
 */
exports.deleteMenuById = function(id){
    return commonDao.deleteOneById(menuModel,id);
}