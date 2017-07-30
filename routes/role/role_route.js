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
    var params = {
        role_name:req.body.role_name,
        role_code:req.body.role_code,
        role_type:req.body.role_type
    };
    roleService.addRole(params,function(msg){
        res.send({success:true,msg:msg});
    })
});

module.exports = router;