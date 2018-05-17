/**
 * Created by yanghao on 2017/7/8.
 */
var log4js = require('log4js'),
    logger = require('../common/logHelper').logger;

module.exports = function(app){

    //路由路径添加日志
    app.use(log4js.connectLogger(logger,{level:'info'}));

    //默认到登录页面
    app.get('/',function(req,res){
        // 登录页面不需要其他渲染
        res.render('login',{layout:null});
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
}