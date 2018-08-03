/**
 * Created by admin on 2018/5/24.
 */
var express = require('express'),
    router = express.Router(),
    sysServices = require('../../services/sys/sys_services');

/**
 * 跳转到系统列表页
 */
router.get('/',function(req,res){
    res.render('app/sys/sys_list');
});

/**
 * 跳转到系统详情页
 */
router.get('/sysInfo',function(req,res){
    var id = req.query.id;
    if(id){
        sysServices.getSysById(id).then(function(sys){
            res.render('app/sys/sys_info',{sys:sys});
        }).catch(function(err){
            res.render('app/sys/sys_info',{error:err});
        })
    }else{
        res.render('app/sys/sys_info');
    }
})

/**
 * 获取系统列表
 */
router.get('/sysList',function(req,res){
    sysServices.getSysList().then(function(syss){
        res.send({success:true,msg:'',total:syss.length,data:syss});
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

/**
 * 新增系统
 */
router.post('/addSys',function(req,res){
    var body = req.body;
    var params = {
        sys_name:body.sys_name,
        sys_url:body.sys_url,
        sys_status:1            //默认启用
    };
    sysServices.addSys(params).then(function(r){
        res.send({success:true,msg:r})
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

/**
 * 更新系统信息
 */
router.post('/editSysById',function(req,res){
    var body = req.body;
    var id = body._id;
    var params = {
        sys_name:body.sys_name,
        sys_url:body.sys_url
    };
    sysServices.updateSysById(id,params).then(function(result){
        res.send({success:true,data:result});
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

/**
 * 修改状态
 */
router.get('/changeSysStatusById',function(req,res){
    var id = req.query._id,sys_status = req.query.status;
    var params = {sys_status:sys_status};
    sysServices.updateSysById(id,params).then(function(result){
        res.send({success:true,msg:result})
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});

/**
 * 删除系统
 */
router.get('/deleteSysById',function(req,res){
    sysServices.deleteSysById().then(function(result){
        res.send({success:false,data:result});
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
})


module.exports = router;

