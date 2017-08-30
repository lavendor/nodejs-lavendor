/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();
var roleService = require('../../model/role/role_services');

router.get('/',function(req,res){
    res.render('role/role_list');
});

/**
 * 添加一个角色
 */
router.post('/addRole',function(req,res){
    var body = req.body;
    var params = {
        role_name:body.role_name,
        role_code:body.role_code,
        role_type:body.role_type,
        role_status:body.role_status
    };
    roleService.addRole(params,function(msg){
        res.send({success:true,msg:msg});
    })
});

/**
 * 获取角色列表
 */
router.get('/getRoleList',function(req,res){
    roleService.getRoleList(req,res,function(err,roles){
       if(err){
           res.send({success:false,msg:'获取数据失败',data:null});
       }else{
           res.send({success:true,msg:'获取数据成功',data:roles});
       }
    });
});

module.exports = router;