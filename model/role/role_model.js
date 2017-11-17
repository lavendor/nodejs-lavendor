/**
 * Created by yanghao on 2017/7/12.
 */
var mongoose = require('../utils/mongodb_utils').getConnection();
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
exports.$role = mongoose.model('role',roleSchema);

/**
 * 用户角色中间表 用户跟角色是多多的关系
 * @type {*|Schema}
 */
var userRoleSchema = new Schema({
    role_id:{type:Schema.Types.ObjectId,ref:'role'},
    user_id:{type:Schema.Types.ObjectId,ref:'user'}
},{
    collection:'tb_user_role_info'
});
exports.$userRole = mongoose.model('userRole',userRoleSchema);