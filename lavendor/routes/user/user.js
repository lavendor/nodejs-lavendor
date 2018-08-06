/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();

var userServices = require('../../services/user/user_services');
var commonUtils = require('../../../common/commonUtils');

/**
 * 用户列表页
 */
router.get('/',function(req,res){
    res.render('app/user/user_list');
});

/**
 * 跳转到用户详情页
 */
router.get('/userInfo',function(req,res){
    var id = req.query.id;
    if(!id){ //新增
        res.render('app/user/user_info');
    }else{  //修改
        userServices.getUserList({_id:id},null,null).then(function(user){
            res.render('app/user/user_info',{user:user[0]});
        }).catch(function(err){
            res.render('app/user/user_info',{err:err});
        })
    }
})

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
    commonUtils.respJSONArray(res,userServices.addUser(params));
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
        user_sex:body.sex,
        user_role:body.user_role,
        user_sys:body.user_sys,
        user_account:body.user_account,
        user_password:body.user_password,
        update_time:new Date()
    };
    commonUtils.respJSONArray(res,userServices.editUserById(_id,params));
});

/**
 * 根据id删除用户信息
 */
router.get('/deleteUserById',function(req,res){
    var id = req.query._id;
    commonUtils.respJSONArray(res,userServices.deleteUserById(id));
});

/**
 * 获取用户列表
 */
router.get('/getUserList',function(req,res){
    var searchMap = {},populate = null,sort = {};
    commonUtils.respJSONArray(res,userServices.getUserList(searchMap,populate,sort));
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
    var searchMap = {},populate = 'user_sys user_role ';
    commonUtils.resJSONPage(res,userServices.getUserListPagination(searchMap,params.page,params.size,populate,null));
});


module.exports = router;