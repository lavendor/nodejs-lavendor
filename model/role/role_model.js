/**
 * Created by yanghao on 2017/7/12.
 */
var mongoose = require('mongoose');
var $mongoose = require('../utils/mongodb_utils').getConnection();
var Schema = mongoose.Schema;

/**
 * 创建一个角色表的model
 * @type {*|Schema}
 */
var roleSchema = new Schema({
    role_name:String,
    role_code:String,
    role_type:String
},{
    collection:'tb_role'
});
exports.$role = $mongoose.model('role',roleSchema);