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

//链接数据库
require('./common/mongodb_utils').getConnection();

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

app.use(session({
    secret:config.session.secret,
    resave:config.session.resave,
    saveUninitialized:config.session.saveUninitialized,
    cookie:{
        maxAge:config.session.maxAge
    }
}));

//挂载路由
var router = require('./routes');
router(app);


module.exports = app;

