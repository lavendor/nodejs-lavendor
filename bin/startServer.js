/**
 * Created by Yanghao on 2017/11/21.
 *
 * 启动项目文件，开启服务
 */

var app = require('../app'),
    http = require('http');


var server = http.createServer(app);

