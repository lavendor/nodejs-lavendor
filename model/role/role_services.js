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
}