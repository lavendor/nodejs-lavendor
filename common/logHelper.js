/**
 * Created by Yanghao on 2017/12/22.
 *
 * log4js 日志组件 日志文件在common/logs中
 */
var config = require('../config'),      //配置文件
    log4js = require('log4js'),         //log4js
    path   = require('path'),           //path
    logpath = path.resolve('../logs') ;   //log4js 日志文件位置,项目路径下的/logs 目录下，没有会自动创建

//配置log4js
log4js.configure({
    appenders:{
        //error appender error以上日志写入到 error.log文件中
        error:{
            type:'file',
            filename:logpath+'/error.log',
            maxLongSize:10*1024*1024,//10M
            numBackups:5,
            compress:true,
            encoding:'utf-8',
            layout:{
                type:'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c - %m',
            }
        },
        //info appender info以上内容日志写入到info.log文件中
        info:{
            type:'file',
            filename:logpath+'/info.log',
            maxLongSize:10*1024*1024,//10M
            numBackups:5,
            compress:true,
            encoding:'utf-8',
            layout:{
                type:'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c - %m',
            }
        },
        //过滤日志，error级别以上的内容使用error appender
        into_error_file:{
            type:'logLevelFilter',
            appender:'error',
            level:"error"
        },
        //过滤日志，error级别以上的内容使用info appender
        into_info_file:{
            type:'logLevelFilter',
            appender:'info',
            level:'debug'
        },
        //日志打印到控制台
        console:{
            type:'console',
            layout:{
                type:'pattern',
                pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}]% [%p] %c - %m',
            }
        }
    },
    categories:{
        default:{
            appenders:['console','into_info_file','into_error_file'],
            level:'debug'
        }
    }
});


const logger = log4js.getLogger('console');


//建立日志常用方法
var loggerHelper = {
    debug:function(msg){
        logger.debug(msg);
    },
    info:function(msg){
        logger.info(msg);
    },
    warn:function(msg){
        logger.warn(msg);
    },
    error:function(msg){
        logger.error(msg);
    }
}

exports.loggerHelper = loggerHelper;
exports.logger = logger;
