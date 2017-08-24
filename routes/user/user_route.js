/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();

var userServices = require('../../model/user/user_services');

/**
 * 用户列表页
 */
router.get('/',function(req,res){
    res.render('user/user_list');
});

/**
 * 添加用户信息的方法
 */
router.post('/addUser',function(req,res){
    var body = req.body;
    var params = {
        user_no:body.user_no,
        user_name:body.user_name,
        user_sex:body.user_sex,
        user_role:body.user_role,
        user_sys:body.user_sys,
        user_status:'1',//默认为启动状态
        user_account:body.user_account,
        user_password:body.user_password,
        create_time:new Date()
    };
    userServices.addUser(params,function(msg){
        res.send({success:true,msg:msg});
    });
});

/**
 * 获取用户列表
 */
router.get('/getUserList',function(req,res){
    userServices.getUserList(req,res,function(err,users){
        if(err){
            res.send({success:false,msg:err,data:null});
        }else{
            res.send({'success':true,'msg':"获取用户列表成功",'total':users.length,'data':users});
        }
    });
});


module.exports = router;