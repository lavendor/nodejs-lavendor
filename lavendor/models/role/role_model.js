/**
 * Created by yanghao on 2017/7/12.
 */
var mongoose = require('../../../common/mongodb_utils').getConnection();
var Schema = mongoose.Schema;

/**
 * 角色model
 * @type {*|Schema}
 */
var roleSchema = new Schema({
    role_code:String,           //角色编码
    role_name:String,           //角色名称
    role_sys:{type:Schema.Types.ObjectId,ref:'sys'},           //所属系统
    role_status:Number          //角色状态(1：启用，2：禁用)
},{
    collection:'tb_role_info'
});
exports.Role = mongoose.model('role',roleSchema);