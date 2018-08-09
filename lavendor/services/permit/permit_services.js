/**
 * Created by admin on 2018/8/9.
 */
var commonDao = require('../../../common/commonDao'),
    permitModel = require('../../models/permit/permit_model').RoleMenu;


/**
 *
 * @param params
 * @returns {*|Promise}
 */
exports.addRoleMenu = function(params){
    return commonDao.addModel(permitModel,params);
};

/**
 * 保存或者更新角色对应的菜单
 * @param roleId
 * @param menuIds
 */
exports.saveOrUpdateMenu = function(roleId,menuIds){
    return new Promise(function(resolve,reject){
        commonDao.findOneByOther(permitModel,{role_id:roleId}).then(function(role){
            if(role){
                //包含此角色，做更新
                return commonDao.updateByOther(permitModel,{role_id:roleId},{menu_id:menuIds});
            }else{
                //不包含此角色，做新增
                var params = {role_id:roleId,menu_id:menuIds};
                return commonDao.addModel(permitModel,params);
            }
        }).catch(function(err){
            reject(err);
        })
    })
};

/**
 * 根据角色ID查询菜单列表
 * @param roleId
 * @returns {Query}
 */
exports.getMenusByRoleId = function(roleId){
  return commonDao.findOneByOther(permitModel,{role_id:roleId});
};