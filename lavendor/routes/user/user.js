/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();

var userServices = require('../../services/user/user_services');

/**
 * 用户列表页
 */
router.get('/',function(req,res){
    res.render('app/user/user_list');
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
    userServices.addUser(params).then(function(msg){
        res.send({success:true,msg:msg});
    }).catch(function(err){
        res.send({success:false,msg:err});
    });
});

/**
 * 修改用户信息
 */
router.post('/editUserById',function(req,res){
    var body = req.body;
    var _id = body._id;
    var params = {
        user_no:body.user_no,
        user_name:body.user_name,
        user_sex:body.user_sex,
        user_role:body.user_role,
        user_sys:body.user_sys,
        user_account:body.user_account,
        user_password:body.user_password,
        update_time:new Date()
    };
    userServices.editUserById(_id,params,function(err){
        if(err){
            res.send({success:false,msg:"更新数据失败"});
        }else{
            res.send({success:true,msg:"更新数据成功"});
        }
    });
});

/**
 * 根据id删除用户信息
 */
router.get('/deleteUserById',function(req,res){
    var id = req.query._id;
    userServices.deleteUserById(id,function(err){
        if(err){
            res.send({success:false,msg:"删除数据失败"});
        }else{
            res.send({success:true,msg:"删除数据成功"});
        }
    })
});

/**
 * 获取用户列表
 */
router.get('/getUserList',function(req,res){
    userServices.getUserList(req,res)
        .then(function(users){
            res.send({'success':true,'msg':"获取用户列表成功",'total':users.length,'data':users});
        }).catch(function(err){
            res.send({success:false,msg:err,data:null});
        });
});

/**
 * 后台分页获取数据列表
 */
router.get('/getUserListPagination',function(req,res){
    var queryParams = req.query;
    var params= {
        page:queryParams.page,
        size:queryParams.size
    };
    //按条件获取所有数据
    var allUsers = userServices.getUserListPagination(params);
    //获取所有数据
    var user = userServices.getUserList(req,res);

    //使用Promise并行执行两个方法，并且按照顺序返回值
    Promise.all([allUsers,user]).then(function(values){
        var total = values[0].length, rows = values[1];
        res.send({'success':true,'msg':"获取用户列表成功",'total':total,'rows':rows});
    }).catch(function(e){
        res.send({success:false,msg:e,data:null});
    });
});


module.exports = router;