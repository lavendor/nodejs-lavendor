/**
 * Created by Yanghao on 2017/11/21.
 */
var mongoose = require('../../../common/mongodb_utils').getConnection();
var Schema = mongoose.Schema;

/**
 * 角色菜单中间表 菜单跟角色是多对多的关系
 * @type {*|Schema}
 */
var roleMenuSchema = new Schema({
    role_id:{type:Schema.Types.ObjectId,ref:'role'},
    menu_id:[{type:Schema.Types.ObjectId,ref:'menu'}]
},{
    collection:'tb_role_menu_info'
});
exports.RoleMenu = mongoose.model('roleMenu',roleMenuSchema);