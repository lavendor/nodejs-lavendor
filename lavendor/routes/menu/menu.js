/**
 * Created by admin on 2018/5/24.
 */
var express = require('express'),
    router = express.Router(),
    config = require('../../../config'),
    commonUtils = require('../../../common/commonUtils'),
    menuServices = require('../../services/menu/menu_services');

/**
 * 跳转到系统列表页
 */
router.get('/',function(req,res){
    res.render('app/menu/menu_list');
});

/**
 * 跳转到用户信息页面
 */
router.get('/menuInfo',function(req,res){
    var id = req.query.id;
    if(id){
        //修改，返回对象渲染到页面中
        menuServices.getMenuById(id).then(function(menu){
            res.render('app/menu/menu_info',{menu:menu})
        }).catch(function(err){
            res.render('app/menu/menu_info',{error:err});
        });
    }else{
        //新增
        res.render('app/menu/menu_info');
    }
});

/**
 * 获取菜单列表，生成菜单树
 */
router.get('/menuList',function(req,res){
    var searchMap = {},populate = null,sort = {'menu_sort':1};
    searchMap.menu_status = 0;//有效
    commonUtils.respJSONArray(res,menuServices.getMenuList(searchMap,populate,sort))
});

/**
 * 获取菜单列表,数据表格
 */
router.get('/menuGridList',function(req,res){
    var searchMap = {},populate = null,sort = {'menu_sort':1};
    commonUtils.respJSONArray(res,menuServices.getMenuList(searchMap,populate,sort));
});

/**
 * 获取系统列表
 */
router.get('/sysList',function(req,res){
    var params = req.query.q;//自动补全查询条件

    commonUtils.respJSON(res,menuServices.sysList(params));
});

/**
 * 加载菜单树
 */
router.get('/menuTree',function(req,res){
    menuServices.menuTree().then(function(menuTree){
        res.send([{id:config.tree.id,text:config.tree.text,children:menuTree}]);
    }).catch(function(err){
        res.send(err);
    })
});

/**
 * 新增菜单
 */
router.post('/addMenu',function(req,res){
    var body = req.body;
    var params = {
        menu_name:body.menu_name,
        menu_code:body.menu_code,
        menu_sys:body.menu_sys,
        menu_parent:body.menu_parent,
        menu_icon:body.menu_icon,
        menu_sort:body.menu_sort,
        menu_url:body.menu_url,
        menu_status:0
    };
    return commonUtils.respJSONArray(res,menuServices.addMenu(params));
});

/**
 * 修改菜单
 */
router.post('/editMenuById',function(req,res){
    var body = req.body,id = req.body._id;
    var params = {
        menu_name:body.menu_name,
        menu_code:body.menu_code,
        menu_sys:body.menu_sys,
        menu_parent:body.menu_parent,
        menu_icon:body.menu_icon,
        menu_sort:body.menu_sort,
        menu_url:body.menu_url,
        menu_status:0
    };
    commonUtils.respJSONArray(res,menuServices.updateMenuById(id,params),'修改成功');
});

/**
 * 删除一个菜单
 */
router.get('/deleteMenuById',function(req,res){
    var id = req.query._id;
    return commonUtils.respJSONArray(res,menuServices.deleteMenuById(id));
});

/**
 * 修改状态
 */
router.get('/changeMenuStatusById',function(req,res){
    var id = req.query._id,menu_status = req.query.status;
    var params = {menu_status:menu_status};
    return commonUtils.respJSONArray(res,menuServices.updateMenuById(id,params));
})


module.exports = router;