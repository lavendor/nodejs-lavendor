/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();
var roleService = require('../../services/role/role_services');

router.get('/',function(req,res){
    res.render('app/role/role_list');
});

/**
 * 跳转到角色详情页
 */
router.get('/roleInfo',function(req,res){
    res.render('app/role/role_info');
})

/**
 * 添加一个角色
 */
router.post('/addRole',function(req,res){
    var body = req.body;
    var params = {
        role_name:body.role_name,
        role_code:body.role_code,
        role_sys:body.role_sys,
        role_status:body.role_status
    };
    roleService.addRole(params,function(msg){
        res.send({success:true,msg:msg});
    })
});

/**
 * 根据id修改一个角色
 */
router.post('/editRoleById',function(req,res){
    var body = req.body;
    var _id = body._id;
    var params = {
        role_code:body.role_code,
        role_name:body.role_name,
        role_sys:body.role_sys,
        role_status:body.role_status
    };

    roleService.editRoleById(_id,params,function(err){
        if(err){
            res.send({success:false,msg:"修改数据失败"});
        }else{
            res.send({success:true,msg:"修改数据成功"});
        }
    });
});

/**
 * 根据id删除一个角色
 */
router.get('/deleteRoleById',function(req,res){
    var _id = req.query._id;//获取角色id
    roleService.deleteRoleById(_id,function(err){
        if(err){
            res.send({success:false,msg:"删除数据失败"});
        }else{
            res.send({success:true,msg:"删除数据成功"});
        }
    });
});

/**
 * 获取角色列表
 */
router.get('/getRoleList',function(req,res){
    var search = {},populate = 'role_sys';
    roleService.getRoleList(search,populate,null).then(function(roles){
        res.send({success:true,msg:'获取数据成功',data:roles});
    }).catch(function(err){
        res.send({success:false,msg:err.message,data:null});
    });
});

module.exports = router;