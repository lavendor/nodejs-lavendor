/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();

var userServices = require('../../model/user/user_services');

/**
 * 登陆页面
 */
router.get('/',function(req,res){
    res.render('user/user_list');
});

router.get('/login',function(req,res){
    res.render('user/login');
});

/**
 * 添加用户信息的方法
 */
router.post('/addUser',function(req,res){
    var params = {
        user_name:req.body.user_name,
        user_code:req.body.user_code,
        user_password:req.body.user_password,
        create_time:new Date()
    };
    userServices.addUser(params,function(msg){
        res.send({success:true,msg:msg});
    });
});


module.exports = router;