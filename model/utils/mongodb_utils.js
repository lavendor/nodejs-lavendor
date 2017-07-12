/**
 * Created by yanghao on 2017/7/9.
 */
var mongodb = require('mongoose');
var URL = 'mongodb://localhost:27017/lavendor';

var $mongoose = null;

/**
 * 获取mongodb连接
 *
 * 一个应用只能有一个mongodb的数据库连接
 */
exports.getConnection = function(){
    var mongoose;

    if($mongoose == null){
        /**
         * 链接数据库
         * @type {Connection|Promise}
         */
        mongoose = mongodb.createConnection(URL);

        $mongoose = mongoose;
    }

    /**
     * 链接成功
     */
    mongoose.on('connected',function(){
        console.log('mongoose connected on '+URL);
    });

    /**
     * 断开连接
     */
    mongoose.on('disconnected',function(){
        console.warn('mongoose disconnected');
    });

    /**
     * 连接失败
     */
    mongoose.on('error',function(error){
        console.warn('mongoose connect error:'+error);
    });

    return $mongoose;
};

