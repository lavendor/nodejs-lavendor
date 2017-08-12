/**
 * Created by yanghao on 2017/7/8.
 */

module.exports = function(app){
    //路由配置
    app.use('/index',function(req,res){
        res.render('index',{name:'yanghao',title:'HandlerBar'});
    });

    app.use('/login',require('./login/login'));

    app.use('/user',require('./user/user_route'));

    app.use('/role',require('./role/role_route'));
}