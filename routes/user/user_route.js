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
        user_no:req.body.user_code,
        user_name:req.body.user_name,
        user_password:req.body.user_password,
        create_time:new Date()
    };
    userServices.addUser(params,function(msg){
        res.send({success:true,msg:msg});
    });
});

/**
 * 获取用户列表
 */
router.post('/getUserList',function(req,res){
    userServices.getUserList(req,res,function(err,users){
        if(err){
            res.send({success:false,msg:err,data:null});
        }else{
            res.send({'success':true,'msg':"获取用户列表成功",'total':users.length,'rows':users});
        }
    });
});


module.exports = router;