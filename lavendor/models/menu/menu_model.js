/**
 * Created by admin on 2018/5/28.
 */
var mongoose = require('../../../common/mongodb_utils').getConnection(),
    Schema = mongoose.Schema;

var MenuSchema = new Schema({
    menu_name: String,       //菜单名称
    menu_code: {type:String,unique: true},       //菜单编码 唯一
    menu_url: String,        //菜单URL
    menu_sys: String,        //所属系统
    menu_parent: String,     //上级菜单
    menu_icon: String,       //菜单图标
    menu_sort: Number,       //排序号
    menu_status: Number      //状态   1：启用，2：禁用
}, {
    collection: 'tb_menu_info'
});

exports.Menu = mongoose.model('menu', MenuSchema);