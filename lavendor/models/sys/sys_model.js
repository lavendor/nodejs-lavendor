/**
 * Created by admin on 2018/5/24.
 */
var mongoose = require('../../../common/mongodb_utils').getConnection(),
    Schema = mongoose.Schema;

/**
 * 系统实例
 */
var SysSchema = new Schema({
    sys_name: String,    //系统名称
    sys_url: String,     //系统路径
    sys_status: {type:Number,default:0},  //系统状态 0 关闭；1-启用
}, {
    collection: 'tb_sys_info'
});

exports.Sys = mongoose.model('sys',SysSchema);