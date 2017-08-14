/**
 * Created by yanghao on 2017/7/8.
 */

module.exports = function(app){

    //默认到index页面
    app.get('/',function(req,res){
        res.redirect('/index');
    });

    //路由配置
    app.use('/index',function(req,res){
        res.render('index',{name:'yanghao',title:'HandlerBar'});
    });

    /**
     * 仪表盘页面
     */
    app.use('/dashboard',function(req,res){
        res.render('index/dashboard');
    });

    app.use('/login',require('./login/login'));
    app.use('/user',require('./user/user_route'));
    app.use('/role',require('./role/role_route'));
}