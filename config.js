/**
 * Created by Yanghao on 2017/11/21.
 *
 * 配置文件
 */
var config={
    //数据库配置
    mongodb:{
        URL:'mongodb://localhost:27017/lavendor'
    },
    //服务器配置
    domain:{
        address:'127.0.0.1',
        port:8080
    }
}

module.exports = config;