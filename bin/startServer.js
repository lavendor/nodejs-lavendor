/**
 * Created by Yanghao on 2017/11/21.
 *
 * 启动项目文件，开启服务
 */

var app = require('../app'),
    config = require('../config'),
    logger = require('../common/logHelper').logger,
    http = require('http');

//创建一个服务
var server = http.createServer(app);

/**
 * 创建web server对象
 * 服务器端口和IP地址默认设置
 * @param opts
 * @constructor
 */
function WebServer(opts) {
    if (!opts) opts = {};
    this._address = opts.address ? opts.address : '127.0.0.1';
    this._port = opts.port ? opts.port : 8080;
}

/**
 * 给web server对象添加方法
 * @type {{startServer: WebServer.startServer}}
 */
WebServer.prototype = {
    //开启web服务
    startServer: function () {
        self = this;

        server.listen(self._port, self._address);

        server.on('error', function (error) {
            logger.error('start web Server failed: ' + error);
        });

        server.on('listening', function () {
            var address = server.address();
            logger.info('start web Server succeed: listening on ' + address.address + ':' + address.port);
        });
    }
}

var web = new WebServer(config.domain);
web.startServer();


