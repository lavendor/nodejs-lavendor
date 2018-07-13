/**
 * Created by admin on 2018/5/24.
 */
var express = require('express'),
    router = express.Router(),
    menuServices = require('../../model/menu/menu_services');

/**
 * 跳转到系统列表页
 */
router.get('/',function(req,res){
    res.render('menu/menu_list');
});

/**
 * 获取菜单列表
 */
router.get('/menuList',function(req,res){
    menuServices.getMenuList().then(function(menus){
        res.send({success:true,msg:'',total:menus.length,data:menus});
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

/**
 * 获取系统列表
 */
router.get('/sysList',function(req,res){
    var params = req.query.q;//自动补全查询条件
    menuServices.sysList(params).then(function(menus){
        res.send({success:true,data:menus});
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

/**
 * 新增系统
 */
router.post('/addMenu',function(req,res){
    var body = req.body;
    var params = {
        menu_name:body.menu_name,
        menu_code:body.menu_code,
        menu_sys:body.menu_sys,
        menu_parent:body.menu_parent,
        menu_icon:body.menu_icon,
        menu_sort:body.menu_sort,
        menu_url:body.menu_url,
        menu_status:body.menu_status
    };
    menuServices.addMenu(params).then(function(r){
        res.send({success:true,msg:r})
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});


module.exports = router;