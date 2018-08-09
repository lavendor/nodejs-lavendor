/**
 * Created by yanghao on 2017/7/12.
 */
var userModel = require('../../models/user/user_model').User,
    commonDao = require('../../../common/commonDao');

/**
 * 添加用户的方法
 * @param params
 * @param callback
 */
exports.addUser = function(params){
    return commonDao.addModel(userModel,params);
};

/**
 * 根据其他条件查询用户
 * @param search
 * @returns {Query}
 */
exports.getUserByOther = function(search){
    return commonDao.findOneByOther(userModel,search);
};

/**
 * 修改用户数据
 * @param id
 * @param callback
 */
exports.editUserById = function(id,params){
    return commonDao.updateById(userModel,id,params);
};

/**
 * 根据id删除用户数据
 * @param id
 * @param callback
 */
exports.deleteUserById = function(id){
    return commonDao.deleteOneById(userModel,id);
};

/**
 * 分页查询
 * @param params
 * @param callback
 */
exports.getUserListPagination = function(searchMap,page,size,populate,sort){
    return commonDao.getAllPage(userModel,searchMap,page,size,populate,sort);
};

/**
 * 根据查询条件查询用户信息
 * @param search
 */
exports.getUserList = function(searchMap,populate,sort){
    return commonDao.getAllNoPage(userModel,searchMap,populate,sort);
}
