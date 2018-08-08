/**
 * Created by Administrator on 2018/7/14.
 */

var express = require('express'),
    router= express.Router(),
    commonUtils = require('../../../common/commonUtils'),
    menuServices = require('../../services/menu/menu_services');

/**
 * 跳转到权限页面
 */
router.get('/',function(req,res){
    res.render('app/permit/permit_list');
});

/**
 * 获取菜单树
 */
router.get('/getMenuTree',function(req,res){
    commonUtils.respJSON(res,menuServices.menuTree());
});

module.exports = router;