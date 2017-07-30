/**
 * Created by yanghao on 2017/7/12.
 */
var mongoose = require('mongoose');
var $mongoose = require('../utils/mongodb_utils').getConnection();
var Schema = mongoose.Schema;

/**
 * 创建一个用户model
 * @type {*|Schema}
 */
var userSchema = new Schema({
    user_name:String,
    user_code:String,
    user_password:String,
    create_time:Date,
    update_time:Date
},{
    collection:'tb_user'
});
exports.$user = $mongoose.model('user',userSchema);
