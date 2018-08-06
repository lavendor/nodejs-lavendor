/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();
var roleService = require('../../services/role/role_services');
var commonUtils = require('../../../common/commonUtils');

/**
 * 跳转到角色列表页
 */
router.get('/',function(req,res){
    res.render('app/role/role_list');
});

/**
 * 跳转到角色详情页
 */
router.get('/roleInfo',function(req,res){
    var id = req.query.id;
    if(id){ //修改操作
        roleService.getRoleById(id).then(function(role){
            res.render('app/role/role_info',{role:role});
        }).catch(function(err){
            res.send('app/role/role_info',{error:err});
        })
    }else{
        res.render('app/role/role_info');
    }
});

/**
 * 添加一个角色
 */
router.post('/addRole',function(req,res){
    var body = req.body;
    var params = {
        role_name:body.role_name,
        role_code:body.role_code,
        role_sys:body.role_sys,
        role_status:1           //初始状态都是启用
    };
    commonUtils.respJSONArray(res,roleService.addRole(params));
});

/**
 * 根据id修改一个角色
 */
router.post('/editRoleById',function(req,res){
    var body = req.body;
    var _id = body._id;
    var params = {
        role_code:body.role_code,
        role_name:body.role_name,
        role_sys:body.role_sys
    };

    commonUtils.respJSONArray(res,roleService.editRoleById(_id,params));
});

/**
 * 根据id删除一个角色
 */
router.get('/deleteRoleById',function(req,res){
    var _id = req.query._id;//获取角色id
    commonUtils.respJSONArray(res,roleService.deleteRoleById(_id));
});

/**
 * 获取角色列表
 */
router.get('/getRoleList',function(req,res){
    var search = {},populate = 'role_sys';
    commonUtils.respJSONArray(res,roleService.getRoleList(search,populate,null));
});

/**
 * 修改状态
 */
router.get('/changeRoleStatusById',function(req,res){
    var id = req.query._id,role_status = req.query.status;
    var params = {role_status:role_status};
    commonUtils.respJSONArray(res,roleService.updateRoleById(id,params));
})

/**
 * 获取用户列表的公用
 */
router.get('/roleListApi',function(req,res){
    var search = {role_status:1};//状态为启用
    commonUtils.respJSONArray(res,roleService.getRoleList(search,null,null));
});

module.exports = router;