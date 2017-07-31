/**
 * Created by yanghao on 2017/7/31.
 */
var mongoose = require('mongoose');
var $mongoose = require('./utils/mongodb_utils').getConnection();
var Schema = mongoose.Schema;

/**
 * 组织结构model
 * @type {mongoose.Schema}
 */
var orgSchema = new Schema({
    org_code:String,                //组织编码
    org_name:String,                //组织名称
    org_parent:String,              //父节点ID
    org_sys:String,                 //所属系统
    org_status:Number               //状态
},{
    collection:"tb_org_info"
});
exports.$org = $mongoose.model('org',orgSchema);