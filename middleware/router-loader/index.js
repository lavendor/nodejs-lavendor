/**
 * Created by admin on 2018/7/13.
 *
 * 给出路由路径， 自动装载路由
 *
 *
 */

var fs = require('fs'),
    path = require('path');


module.exports = routerLoader;

/**
 * 装载路由
 */
function routerLoader(app){
    //路由路径，默认当前目录下routes文件夹
    var routerPath = path.resolve('../../routes');
    if(app){
        routerPath = app.get('routes');
    }
    if(!routerPath){
        routerPath = path.resolve('../../routes');
    }

    geFileList(routerPath).then(function(files){
        files.forEach(function(file){
            var routeName = file.name.slice(0,file.name.length-3);
            var routePath = path.resolve(file.path);
            app.use(routeName,require(routePath));
        })
    }).catch(function(err){
        throw Error('not found routes files. because '+err);
    })
}

/**
 * 递归遍历源文件夹下的所有文件，并且返回一个文件数组
 * @param source
 */
function geFileList(source) {
    return new Promise(function (resolve, reject) {
        var filesList = [];
        readFile(source, filesList);
        resolve(filesList);
    })
}

//遍历读取文件
function readFile(source, filesList) {
    var files = fs.readdirSync(source);//需要用到同步读取
    files.forEach(function (file) {
        var filePath = path.join(source,file);
        var states = fs.statSync(filePath);
        if (states.isDirectory()) {
            readFile(filePath, filesList);
        } else {
            //创建一个对象保存信息
            var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位
            obj.name = file;//文件名
            obj.path = filePath; //文件绝对路径
            filesList.push(obj);//所有文件
        }
    })
}
