/**
 * Created by admin on 2018/7/13.
 *
 * 给出路由路径， 自动装载路由
 *
 * https://blog.csdn.net/rcwukaka/article/details/54016642
 */

var fs = require('fs'),
    path = require('path');

//动态加载路由
var loadRoute = {
    path : './routes/',     //默认路由路径
    app : null,

    /**
     * 获取路由文件列表
     * @param dir
     */
    listDir : function(dir){
        var fileList = fs.readdirSync(dir,'utf-8');
        for(var i=0;i<fileList.length;i++) {
            var stat = fs.lstatSync(dir + fileList[i]);
            if (stat.isDirectory()) {
                this.listDir(dir + fileList[i]  + '/');
            } else {
                this.loadRoute(dir + fileList[i],dir);
            }
        }
    },

    /**
     * 加载路由
     * @param routeFile 路由文件
     * @param dir 路由路径所在绝对目录
     */
    loadRoute : function(routeFile,dir){
        var route = require(routeFile.substring(0,routeFile.lastIndexOf('.')));
        //完整的请求路径
        var routePath = routeFile.substring(dir.length,routeFile.lastIndexOf('.'));
        routePath = "/"+routePath;
        this.app.use(routePath,route);

        //判断index文件，可以做排除
        /*if(routePath.length >= 5){
            var p = routePath.substring(routePath.length-5);//取最后面五个字符，判断是不是index文件

            if(p=="index"){ //是index 则路由路径为 /
                var validPath = routePath.substring(0,routePath.length-5);
                this.app.use(validPath,route);
            }else{ //不是index 则 为 /+当前文件名
                this.app.use(routePath,route);
            }
        }else{
            this.app.use(routePath,route);
        }*/
    },

    /**
     * 初始化
     * @param app
     * @param path
     * @returns {boolean}
     */
    init : function(app,path){
        if(!app){
            console.error("系统主参数App未设置");
            return false;
        }
        this.app = app;
        this.path = path?path:this.path;
        this.listDir(this.path);
    }
};

module.exports = loadRoute;