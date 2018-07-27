/**
 * Created by yanghao on 2017/7/12.
 */
var mongoose = require('../../../common/mongodb_utils').getConnection();
var Schema = mongoose.Schema;

/**
 * 用户model
 * @type {*|Schema}
 */
var userSchema = new Schema({
    user_no:{type:String,unique:true},         //用户编号(唯一验证)
    user_email:String,      //用户邮箱
    user_phone:String,      //用户电话（唯一验证）
    user_name:String,       //用户姓名
    user_sex:Number,        //用户性别（1：男，2：女）
    user_account:{type:String,unique:true},    //登录账号(唯一验证)
    user_password:String,   //登录密码
    user_role:String,       //用户角色
    user_sys:{type:Schema.Types.ObjectId,ref:'sys'},        //所属系统，依赖系统表
    user_status:{type:Number,default:1},     //用户状态(1：启用，2：禁用。默认启用)
    create_time:Date,       //创建时间
    update_time:Date        //更新时间
},{
    collection:'tb_user_info'
});

exports.User = mongoose.model('user',userSchema);