/**
 * Created by yanghao on 2017/7/9.
 *
 * MongoDB数据库连接
 */
var mongodb = require('mongoose'),
    logger = require('./logHelper').logger,
    config = require('../config');

//获取mongodb url
var URL = config.mongodb.URL;

var mongoose = null;

/**
 * 获取mongodb连接
 *
 * 一个应用只能有一个mongodb的数据库连接
 */
exports.getConnection = function(){

    if(mongoose == null){
        /**
         * 链接数据库
         * @type {Connection|Promise}
         */
        mongodb.connect(URL);

        var db = mongodb.connection;

        /**
         * 链接成功
         */
        db.on('connected',function(){
            logger.info('mongoose connected on '+URL);
        });

        /**
         * 断开连接
         */
        db.on('disconnected',function(){
            logger.warn('mongoose disconnected');
        });

        /**
         * 连接失败
         */
        db.on('error',function(error){
            logger.error('mongoose connect error:'+error);
        });

        mongoose = mongodb;
    }
    return mongoose;
};

