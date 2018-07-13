/**
 * Created by yanghao on 2017/7/1.
 *
 * 应用入口
 */
var path = require('path'),
    hbs = require('hbs'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    express = require('express'),
    session = require('express-session'),
    config = require('./config'),
    app = express();

app.use(cookieParser());//解析cookie的中间件
app.use(bodyParser.json());//请求体解析中间件
app.use(bodyParser.urlencoded({extended: false}));//请求体转换成string/array型数据

//设置模版引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', hbs.__express);

//引入静态资源
app.use(express.static(path.join(__dirname, 'public')));

//注册partials路径
hbs.registerPartials(__dirname + '/views/partials');

/**
 * 用户session配置
 */
app.use(session({
    secret:config.session.secret,
    resave:config.session.resave,
    saveUninitialized:config.session.saveUninitialized,
    cookie:{
        maxAge:config.session.maxAge
    }
}));

//拦截器
var filter = require('./middleware/route-filter');
app.set('login','login');//登录路由
app.set('exclude',config.route.exclude);//排除路由
app.use(filter(app));//对此app实施拦截

//挂载路由
var routeLoader = require('./middleware/router-loader');
routeLoader.init(app,path.join(__dirname+'/routes/'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('error',{layout:null});
});

module.exports = app;

