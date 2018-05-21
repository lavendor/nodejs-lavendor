/**
 * Created by yanghao on 2018/5/18.
 */
var express = require('express'),
    router = express.Router(),
    userService = require('../../model/user/user_services');

/**
 * 登录
 */
router.post('/',function(req,res){
    var body = req.body;
    var username = body.username;
    var password = body.password;
    if(username=='admin' && password=='123'){
        req.session.user = username;
        res.send({success:true});
    }else{
        res.send({success:false,msg:'用户名或密码错误，请重新登录.'});
    }
});

/**
 * 注册
 */
router.post('/register',function(req,res){
    var body = req.body;
    var params = {
        user_name:body.fullname,
        user_account:body.username,
        user_password:body.password,
        user_email:body.email,
        user_status:'1',//默认为启动状态
        create_time:new Date()
    };
    userService.addUser(params).then(function(msg){
        res.send({success:true,msg:msg});
    }).catch(function(err){
        res.send({success:false,msg:err});
    });
})


module.exports = router;