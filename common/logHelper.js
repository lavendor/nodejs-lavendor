/**
 * Created by Yanghao on 2017/12/22.
 *
 * log4js 日志组件 日志文件在common/logs中
 */
var config = require('../config'),      //配置文件
    log4js = require('log4js'),         //log4js
    logpath = __dirname+'/logs/';        //log4js文件位置

log4js.configure({
    appenders:{
        warn:{
            type:'file',
            filename:logpath+'/warn.log',
            maxLongSize:10*1024*1024,//10M
            numBackups:5,
            compress:true,
            encoding:'utf-8',
            layout:{
                type:'pattern',
                pattern: '%d{yyyy-MM-dd hh.mm.ss} %p %c %m%n',
            }
        },
        info:{
            type:'file',
            filename:logpath+'/info.log',
            maxLongSize:10*1024*1024,//10M
            numBackups:5,
            compress:true,
            encoding:'utf-8',
            layout:{
                type:'pattern',
                pattern: '%d{yyyy-MM-dd hh.mm.ss} [%p] %c - %m%n',
            }
        },
        console:{
            type:'console',
            layout:{
                type:'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c - %m%n',
            }
        }
    },
    categories:{
        default:{
            appenders:['console','info','warn'],
            level:'debug'
        }
    }
});


const logger = log4js.getLogger('console');

logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');

module.exports = logger;
