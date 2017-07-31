/**
 * Created by yanghao on 2017/7/12.
 */
var mongoose = require('mongoose');
var $mongoose = require('../utils/mongodb_utils').getConnection();
var Schema = mongoose.Schema;

/**
 * 角色model
 * @type {*|Schema}
 */
var roleSchema = new Schema({
    role_code:String,           //角色编码
    role_name:String,           //角色名称
    role_type:String,           //角色类型
    role_status:Number          //角色状态
},{
    collection:'tb_role_info'
});
exports.$role = $mongoose.model('role',roleSchema);