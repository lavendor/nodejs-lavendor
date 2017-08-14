/**
 * Created by yanghao on 2017/7/1.
 *
 * 应用入口
 */
var path = require('path');
var hbs = require('hbs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(logger('dev'));//日志中间件
app.use(cookieParser());//解析cookie的中间件
app.use(bodyParser());//请求体解析中间件
app.use(bodyParser.urlencoded({extended:false}));//请求体转换成string/array型数据

//设置模版引擎
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('.html',hbs.__express);

//引入静态资源
app.use(express.static(path.join(__dirname,'public')));

//注册partials路径
hbs.registerPartials(__dirname+'/views/partials');

//挂载路由
var router = require('./routes');
router(app);

//链接数据库
require('./model/utils/mongodb_utils').getConnection();


//启动服务器端口
var server = app.listen(8080,function(){
    var address = server.address().address;
    var port = server.address().port;
    console.log('服务已经已经启动：http://'+address+':'+port);
});

