/**
 * Created by Administrator on 2018/7/14.
 */

var express = require('express'),
    router= express.Router(),
    commonUtils = require('../../../common/commonUtils'),
    menuServices = require('../../services/menu/menu_services'),
    permitServices = require('../../services/permit/permit_services');

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

/**
 * 给角色授权
 */
router.post('/commitPermit',function(req,res){
    var roleId = req.body.role_id;
    var menuIds = req.body.menu_ids;
    menuIds = JSON.parse(menuIds);
    if(roleId && menuIds){
        commonUtils.respJSONArray(res,permitServices.saveOrUpdateMenu(roleId,menuIds));
    }else{
        res.send({success:false,msg:'请选择菜单和角色！'});
    }
});

/**
 * 根据角色ID查询菜单信息
 */
router.get('/getMenusByRoleId',function(req,res){
    var roleId = req.query.roleId;
    if(roleId){
        commonUtils.respJSONArray(res,permitServices.getMenusByRoleId(roleId));
    }else{
        res.send({success:false,msg:'请选择角色！'});
    }
});

module.exports = router;