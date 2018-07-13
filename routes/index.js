/**
 * Created by yanghao on 2017/7/8.
 */
var log4js = require('log4js'),
    config = require('../config'),
    logger = require('../common/logHelper').logger;

module.exports = router;

function router (app){

    //路由路径添加日志
    app.use(log4js.connectLogger(logger,{level:'info'}));

    /**
     * 默认到登录页面
     */
    app.get('/',function(req,res){
        res.redirect('login');
    })

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

    /**
     * 到index页面
     */
    app.use('/index',function(req,res){
        res.render('index');
    });

    /**
     * 仪表盘页面
     */
    app.use('/dashboard',function(req,res){
        res.render('index/dashboard');
    });


    /*app.use('/sys',require('./sys/sys'));//系统管理
    app.use('/menu',require('./menu/menu'));//菜单管理
    app.use('/user',require('./user/user'));//user
    app.use('/role',require('./role/role'));
    app.use('/login',require('./login/login'));*/
}