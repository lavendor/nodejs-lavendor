/**
 * Created by yanghao on 2017/7/12.
 */

var roleModel = require('../../models/role/role_model').Role,
    commonDao = require('../../../common/commonDao');

/**
 * 添加一个角色
 * @param params
 * @param callback
 */
exports.addRole = function(params){
    return commonDao.addModel(roleModel,params);
};

/**
 * 根据角色id修改角色信息
 * @param id
 * @param params
 * @param callback
 */
exports.editRoleById = function(id,params){
    return commonDao.updateById(roleModel,id,params);
};

/**
 * 根据角色id删除角色信息
 * @param id
 * @param callback
 */
exports.deleteRoleById = function(id){
    return commonDao.deleteOneById(roleModel,id);
};

/**
 * 获取用户列表-不分页
 * @param searchMap 查询条件
 * @param populate  联查字段
 * @param sort      排序字段
 */
exports.getRoleList = function(searchMap,populate,sort){
    return commonDao.getAllNoPage(roleModel,searchMap,populate,sort);
};

/**
 * 根据ID查询角色
 * @param id
 */
exports.getRoleById = function(id){
    return commonDao.findOneById(roleModel,id);
};

/**
 * 分页查询
 * @param page
 * @param size
 * @param search
 * @param populate
 * @param sort
 */

exports.getRoleListWithPage = function(page,size,search,populate,sort){
    return commonDao.getAllPage(roleModel,search,page,size,populate,sort)
};

/**
 * 根据ID更新角色状态
 * @param id
 * @param param
 */
exports.updateRoleById = function(id,param){
    return commonDao.updateById(roleModel,id,param);
};