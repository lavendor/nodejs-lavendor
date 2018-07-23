/**
 * Created by Administrator on 2018/7/14.
 */
var express = require('express'),
    menuService = require('../../model/menu/menu_services'),
    commonUtlis = require('../../common/common_utils'),
    router = express.Router();

/**
 * 到index页面
 * 初始化菜单
 */
router.get('/', function (req, res) {
    menuService.getMenuList().then(function(lists){
        var menuTrees = commonUtlis.getArrToTree(lists,'_id','menu_parent');
        res.render('app/index/index',{
            menuTrees:menuTrees
        });
    }).catch(function(err){
        res.render('app/index/index',{
            menuTrees:null,
            message:err.message
        });
    });
});


module.exports = router;