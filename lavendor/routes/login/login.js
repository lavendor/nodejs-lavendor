/**
 * Created by yanghao on 2018/5/18.
 */
var express = require('express'),
    router = express.Router(),
    config = require('../../../config'),
    commonUtils = require('../../../common/commonUtils'),
    permitServices = require('../../services/permit/permit_services'),
    userService = require('../../services/user/user_services');

/**
 * 跳转到登录页面
 */
router.get('/',function(req,res){
    // 登录页面不需要其他渲染
    res.render('common/login', {layout: null});
});

/**
 * 初始化菜单
 */
router.get('/initMenuByRoleId/:id',function(req,res){
    var roleId = req.params.id;
    var searchMap = {role_id:roleId},populate = {path:'menu_id',options:{sort:{'menu_sort':1}}};
    commonUtils.respJSONArray(res,permitServices.getRoleMenuList(searchMap,populate));
});

/**
 * 用户登录，设置session
 */
router.post('/',function(req,res){
    var body = req.body;
    var username = body.username;
    var password = body.password;
    var search = {user_account:username,user_password:password};
    userService.getUserByOther(search).then(function(user){
        if(user) {
            req.session.user = user;//设置session

            //登录成功之后返回首页，使用默认的渲染页面
            res.render('app/index/index');
        }else{
            res.send({success:false,msg:"用户["+username+']不存在.'});
        }
    }).catch(function(err){
        res.send({success:false,msg:'用户名或密码错误，请重新登录:'+err})
    });
});

/**
 * 注册
 */
router.post('/register',function(req,res){
    var body = req.body;
    var params = {
        user_no : commonUtils.getUUID(),
        user_name:body.fullname,
        user_account:body.username,
        user_password:body.password,
        user_email:body.email,
        user_role:config.initSys.user_role,//初始角色 普通用户
        user_sex : body.gender,
        user_status:'1',//默认为启动状态
        create_time:new Date()
    };
    userService.addUser(params).then(function(msg){
        res.send({success:true,msg:msg});
    }).catch(function(err){
        res.send({success:false,msg:err});
    });
});

/**
 * 退出登录
 */
router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/login');
});

module.exports = router;