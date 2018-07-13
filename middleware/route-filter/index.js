/**
 * Created by admin on 2018/7/13.
 *
 * 路由拦截的中间件，可以拦截所有请求
 *
 * 在app.js中设置排除的路由，设置登录路由
 *
 */

module.exports = routerFilter;

/**
 * 拦截路由
 * @param options
 * @returns {routerFilter}
 */
function routerFilter(app){
    return function routerFilter(req,res,next){
        if(!app){
            return next();
        }

        //排除在路由之外的路径
        var exclude = app.get('exclude');
        var loginPath = app.get('login');
        var url = req.originalUrl;

        if(exclude.indexOf(url)>=0){
            // 公共部分放行通过
            return next();

        }else if(req.session.user){
            //包含session的放行
            return next();

        }else if(!req.session.user){
            //没有session，返回到登录页面
            res.redirect(loginPath);
        }
    }
}