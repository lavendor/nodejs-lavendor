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
    return new Promise(function(resolve,reject){
        userModel(params).save(function(err){
            if(err){
                reject('添加用户失败！');
            }else{
                resolve('添加用户成功！');
            }
        });
    })
};

/**
 * 修改用户数据
 * @param id
 * @param callback
 */
exports.editUserById = function(id,params,callback){
    var condition = {_id:id};
    var newData = {$set:params};
    var option = {};
    userModel.update(condition,newData,option,function(err){
        callback(err);
    });
};

/**
 * 根据id删除用户数据
 * @param id
 * @param callback
 */
exports.deleteUserById = function(id,callback){
    var condition = {_id:id};
    userModel.remove(condition,function(err){
       callback(err);
    });
};

/**
 * 分页查询
 * @param params
 * @param callback
 */
exports.getUserListPagination = function(searchMap,page,size,populate,sort){
    var promise = new Promise(function(resolve,reject){
        commonDao.getPageAll(userModel,searchMap,page,size,populate,sort).then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        })
    });
    return promise;
};

/**
 * 根据查询条件查询用户信息
 * @param search
 */
exports.getUserList = function(searchMap,populate,sort){
    var promise = new Promise(function(resolve,reject){
        commonDao.getAllNoPage(userModel,searchMap,populate,sort).then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        })
    });
    return promise;
}
