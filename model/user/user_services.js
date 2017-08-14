/**
 * Created by yanghao on 2017/7/12.
 */
var userModel = require('./user_model');

/**
 * 添加用户的方法
 * @param params
 * @param callback
 */
exports.addUser = function(params,callback){
    userModel.$user(params).save(function(err){
       if(err){
           callback('添加用户失败！');
       }
        callback('添加用户成功！');
    });
};

/**
 * 获取用户列表
 * @param req
 * @param res
 * @param callback
 */
exports.getUserList = function(req,res,callback){
    userModel.$user.find(function(err,users){
        if(err){
            callback('获取用户列表失败！',null);
        }else{
            callback(null,users);
        }
    })
}
