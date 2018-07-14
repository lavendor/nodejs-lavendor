/**
 * Created by yanghao on 2018/5/18.
 */
var express = require('express'),
    router = express.Router(),
    userService = require('../../model/user/user_services');

/**
 * 跳转到登录页面
 */
router.get('/',function(req,res){
    // 登录页面不需要其他渲染
    res.render('login', {layout: null});
})

/**
 * 用户登录，设置session
 */
router.post('/',function(req,res){
    var body = req.body;
    var username = body.username;
    var password = body.password;
    var search = {user_account:username,user_password:password};
    userService.findUserBySearch(search).then(function(user){
        if(user.length==1) {
            req.session.user = user;//设置session
            res.send({success:true});
        }else{
            res.send({success:false,msg:'用户名或密码错误，请重新登录.'})
        }
    }).catch(function(err){
        res.send({success:false,msg:err});
    });
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

/**
 * 退出登录
 */
router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/login');
});

module.exports = router;