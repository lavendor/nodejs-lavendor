/**
 * Created by yanghao on 2017/7/12.
 */
var mongoose = require('../../common/mongodb_utils').getConnection();
var Schema = mongoose.Schema;

/**
 * 用户model
 * @type {*|Schema}
 */
var userSchema = new Schema({
    user_no:String,         //用户编号
    user_email:String,      //用户邮箱
    user_phone:String,      //用户电话
    user_name:String,       //用户姓名
    user_sex:Number,        //用户性别
    user_account:String,    //登录账号
    user_password:String,   //登录密码
    user_role:String,       //用户角色
    user_sys:String,        //所属系统
    user_status:Number,     //用户状态
    create_time:Date,       //创建时间
    update_time:Date        //更新时间
},{
    collection:'tb_user_info'
});

exports.User = mongoose.model('user',userSchema);