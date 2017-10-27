/**
 * Created by yanghao on 2017/7/12.
 */

var roleModel = require('./role_model');

/**
 * 添加一个角色
 * @param params
 * @param callback
 */
exports.addRole = function(params,callback){
    roleModel.$role(params).save(function(err){
        if(err){
            callback('添加角色失败！');
        }else{
            callback('添加角色成功！');
        }
    });
};

/**
 * 根据角色id修改角色信息
 * @param id
 * @param params
 * @param callback
 */
exports.editRoleById = function(id,params,callback){
    var condition = {_id:id};
    var updateData = {$set:params};
    var options = {};

    roleModel.$role.update(condition,updateData,options,function(err){
        callback(err);
    });
};

/**
 * 根据角色id删除角色信息
 * @param id
 * @param callback
 */
exports.deleteRoleById = function(id,callback){
    var condition = {_id:id};
    roleModel.$role.remove(condition,function(err){
       callback(err);
    });
};

/**
 * 获取用户列表
 * @param req
 * @param res
 * @param callback
 */
exports.getRoleList = function(req,res,callback){
    roleModel.$role.find(function(err,roles){
        callback(err,roles);
    });
};