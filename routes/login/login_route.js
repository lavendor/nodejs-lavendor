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
   res.send(true)
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