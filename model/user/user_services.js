/**
 * Created by yanghao on 2017/7/12.
 */
var userModel = require('./user_model').User;

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
 * 获取用户列表
 * @param req
 * @param res
 * @param callback
 */
exports.getUserList = function(req,res){
    var promise = new Promise(function(resolve,reject){
        userModel.find(function(err,users){
            if(err){
                reject('获取用户列表失败！');
            }else{
                resolve(users);
            }
        })
    });
    return promise;
};

/**
 * 分页查询
 * @param params
 * @param callback
 */
exports.getUserListPagination = function(params){
    var promise = new Promise(function(resolve,reject){
        var index = (params.page-1)*params.size;//设置分页起点下标
        var size = parseInt(params.size);
        //设置分页条件
        var query = userModel.find({});
        query.limit(size);//条数
        query.skip(index);//下标

        //执行查询
        query.exec(function(err,users){
            if(err){
                reject(err);
            }else{
                resolve(users);
            }
        });
    });
    return promise;
};

/**
 * 根据查询条件查询用户信息
 * @param search
 */
exports.findUserBySearch = function(search){
    var promise = new Promise(function(resolve,reject){
        var query = userModel.find({});
        if(search){
            for(var key in search){
                query.where(key,search[key]);
            }
        }
        query.exec(function(err,users){
            if(err){
                reject(err)
            }else{
                resolve(users)
            }
        });
    });
    return promise;
}
