/**
 * Created by admin on 2018/5/24.
 */
var express = require('express'),
    router = express.Router(),
    config = require('../../config'),
    menuServices = require('../../model/menu/menu_services');

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
            res.render('app/menu/menu_info',{menu:menu[0]})
        }).catch(function(err){
            res.render('app/menu/menu_info',{error:err});
        });
    }else{
        //新增
        res.render('app/menu/menu_info');
    }
});

/**
 * 获取菜单列表
 */
router.get('/menuList',function(req,res){
    menuServices.getMenuList().then(function(menus){
        res.send({success:true,msg:'',total:menus.length,data:menus});
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

/**
 * 获取系统列表
 */
router.get('/sysList',function(req,res){
    var params = req.query.q;//自动补全查询条件
    menuServices.sysList(params).then(function(menus){
        res.send(menus);
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
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
    menuServices.addMenu(params).then(function(r){
        res.send({success:true,msg:r})
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
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
    menuServices.updateMenuById(id,params).then(function(){
        res.send({success:true,msg:'修改成功!'});
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

/**
 * 删除一个菜单
 */
router.get('/deleteMenuById',function(req,res){
    var id = req.query._id;
    menuServices.deleteMenuById(id).then(function(){
        res.send({success:true})
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

/**
 * 修改状态
 */
router.get('/changeMenuStatusById',function(req,res){
    var id = req.query._id,menu_status = req.query.status;
    var params = {menu_status:menu_status};
    menuServices.updateMenuById(id,params).then(function(result){
        res.send({success:true,msg:result})
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
})


module.exports = router;