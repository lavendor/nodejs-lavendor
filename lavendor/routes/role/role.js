/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();
var roleService = require('../../services/role/role_services');

/**
 * 跳转到角色列表页
 */
router.get('/',function(req,res){
    res.render('app/role/role_list');
});

/**
 * 跳转到角色详情页
 */
router.get('/roleInfo',function(req,res){
    var id = req.query.id;
    if(id){ //修改操作
        roleService.getRoleById(id).then(function(role){
            res.render('app/role/role_info',{role:role});
        }).catch(function(err){
            res.send('app/role/role_info',{error:err});
        })
    }else{
        res.render('app/role/role_info');
    }
});

/**
 * 添加一个角色
 */
router.post('/addRole',function(req,res){
    var body = req.body;
    var params = {
        role_name:body.role_name,
        role_code:body.role_code,
        role_sys:body.role_sys,
        role_status:1           //初始状态都是启用
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
        role_sys:body.role_sys
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

/**
 * 修改状态
 */
router.get('/changeRoleStatusById',function(req,res){
    var id = req.query._id,role_status = req.query.status;
    var params = {role_status:role_status};
    roleService.updateRoleById(id,params).then(function(result){
        res.send({success:true,msg:result})
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
})

/**
 * 获取用户列表的公用
 */
router.get('/roleListApi',function(req,res){
    var search = {role_status:1};//状态为启用
    roleService.getRoleList(search,null,null).then(function(roles){
        res.send(roles);
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

module.exports = router;