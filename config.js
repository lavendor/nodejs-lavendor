/**
 * Created by Yanghao on 2017/11/21.
 *
 * 配置文件
 */

/**
 *
 * @type {{route: {exclude: [*]}
 * session: {secret: string, resave: boolean, saveUninitialized: boolean, maxAge: number}
 * mongodb: {URL: string},
 * domain: {address: string, port: number},
 * logger: {level: string}}}
 */
var config={

    app_name : 'lavendor后台管理系统',

    /**
     * 整个项目，添加一个前缀，统一路径，避免项目跳转路径重定向失败的错误
     * @type {string}
     */
    app_url_prefix : '/lavendor',

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
        maxAge:1000 * 60 * 60,       //session有效期 一小时
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

    //树型结构根节点设置，ID为空
    tree:{
        id:'',
        text:'Root'
    },

    //日志配置
    logger:{
        level:'DEBUG'
    }
}

module.exports = config;