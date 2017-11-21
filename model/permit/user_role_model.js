/**
 * Created by Yanghao on 2017/11/21.
 */
var mongoose = require('../utils/mongodb_utils').getConnection();
var Schema = mongoose.Schema;

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
exports.UserRole = mongoose.model('userRole',userRoleSchema);