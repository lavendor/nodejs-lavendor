/**
 * Created by Yanghao on 2017/11/21.
 *
 * 配置文件
 */
var config={
    //路由配置
    route:{
      exclude:[ //公共路由排除，不需要被拦截,任何人都能访问
          '/login',             //  登录
          '/login/register',          //  注册
          '/login/logout',            //  退出
          '/error',             //  错误页
      ],
    },

    //session配置
    session:{
        secret:'lavendor',          //secret id
        resave:true,                //重复保存
        saveUninitialized:false,    //未初始化是否保存
        maxAge:1000 * 60 * 5,       //session有效期 5分钟
    },

    //数据库配置
    mongodb:{
        URL:'mongodb://localhost:27017/lavendor'
    },

    //服务器配置
    domain:{
        address:'127.0.0.1',
        port:8080
    },

    //日志配置
    logger:{
        level:'DEBUG'
    }
}

module.exports = config;