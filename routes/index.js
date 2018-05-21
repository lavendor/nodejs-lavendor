/**
 * Created by yanghao on 2017/7/8.
 */
var log4js = require('log4js'),
    config = require('../config'),
    logger = require('../common/logHelper').logger;

module.exports = function(app){

    //路由路径添加日志
    app.use(log4js.connectLogger(logger,{level:'info'}));

    /**
     * 拦截过滤所有请求
     */
    app.use(function(req,res,next){
        var url = req.originalUrl;
        var exclude = config.route.exclude;
        if(exclude.indexOf(url)>=0){
            // 公共部分放行通过
            next();
        }else if(req.session.user){
            //包含session的放行
            next();
        }else{
            res.redirect('login');
        }
    });

    //登录页面
    app.get('/login',function(req,res){
        // 登录页面不需要其他渲染
        res.render('login',{layout:null});
    });

    /**
     * 退出登录
     */
    app.get('/logout',function(req,res){
        req.session.user = null;
        res.redirect('login');
    });

    //路由配置
    app.use('/index',function(req,res){
        res.render('index');
    });

    /**
     * 仪表盘页面
     */
    app.use('/dashboard',function(req,res){
        res.render('index/dashboard');
    });

    app.use('/user',require('./user/user_route'));//user
    app.use('/role',require('./role/role_route'));
    app.use('/login',require('./login/login_route'));
}