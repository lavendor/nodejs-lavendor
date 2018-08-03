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
exports.addRole = function(params,callback){
    roleModel(params).save(function(err){
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

    roleModel.update(condition,updateData,options,function(err){
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
    roleModel.remove(condition,function(err){
       callback(err);
    });
};

/**
 * 获取用户列表-不分页
 * @param searchMap 查询条件
 * @param populate  联查字段
 * @param sort      排序字段
 */
exports.getRoleList = function(searchMap,populate,sort){
    return new Promise(function(resolve,reject){
        commonDao.getAllNoPage(roleModel,searchMap,populate,sort).then(function(result){
            resolve(result)
        }).catch(function(err){
            reject(err);
        })
    })
};

/**
 * 根据ID查询角色
 * @param id
 */
exports.getRoleById = function(id){
    return new Promise(function(resolve,reject){
        roleModel.findOne({_id:id}).then(function(role){
            resolve(role);
        }).catch(function(err){
            reject(err);
        })
    })
}

/**
 * 分页查询
 * @param page
 * @param size
 * @param search
 * @param populate
 * @param sort
 */

exports.getRoleListWithPage = function(page,size,search,populate,sort){
    return new Promise(function(resolve,reject){
        commonDao.getPageAll(roleModel,search,page,size,populate,sort).then(function(result){
            resolve(reject);
        }).catch(function(err){
            reject(err);
        })
    })
};

/**
 * 根据ID更新角色状态
 * @param id
 * @param param
 */
exports.updateRoleById = function(id,param){
    var condition = {_id:id};
    var setData = {$set:param};
    var option = null;
    return new Promise(function(resolve,reject){
        roleModel.update(condition,setData,option).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}