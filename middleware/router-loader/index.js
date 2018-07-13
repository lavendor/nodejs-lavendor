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
    path : './routes/',
    app : null,
    listDir : function(dir){
        var fileList = fs.readdirSync(dir,'utf-8');
        for(var i=0;i<fileList.length;i++) {
            var stat = fs.lstatSync(dir + fileList[i]);
            if (stat.isDirectory()) {
                this.listDir(dir + fileList[i]  + '/');
            } else {
                this.loadRoute(dir + fileList[i]);
            }
        }
    },
    loadRoute : function(routeFile){
        var route = require(routeFile.substring(0,routeFile.lastIndexOf('.')));
        console.log(route.basePath);
        //完整的请求路径
        var routePath = routeFile.substring(8,routeFile.lastIndexOf('.'));
        if(routePath.length >= 5){
            //除去index的有效路径
            if(routePath.substring(routePath.length-5)=="index"){
                var validPath = routePath.substring(0,routePath.length-5);
                this.app.use(validPath,route);
            }else{
                this.app.use(routePath,route);
            }
        }else{
            this.app.use(routePath,route);
        }
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