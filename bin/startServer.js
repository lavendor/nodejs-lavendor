/**
 * Created by Yanghao on 2017/11/21.
 *
 * 启动项目文件，开启服务
 */

var app = require('../app'),
    config = require('../config'),
    http = require('http');


var server = http.createServer(app);

function WebServer(opts) {
    if (!opts) opts = {};
    this._address = opts.address ? opts.address : '127.0.0.1';
    this._port = opts.port ? opts.port : 8080;
}

WebServer.prototype = {
    startServer: function () {
        self = this;

        server.listen(self._port, self._address);

        server.on('error', function (error) {
            console.log('start web Server failed: ' + error);
        });

        server.on('listening', function () {
            var address = server.address();
            console.log('start web Server succeed: listening on ' + address.address + ':' + address.port);
        });
    }
}

var web = new WebServer(config.domain);
web.startServer();


