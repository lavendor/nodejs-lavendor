/**
 * Created by yanghao on 2017/7/8.
 */

module.exports = function(app){
    //路由配置
    app.get('/',function(req,res){
        res.render('index',{name:'yanghao',title:'HandlerBar'});
    });

    app.use('/login',require('./login/index'));
    app.use('/user',require('./user/index'));
    app.use('/role',require('./role/index'));

}