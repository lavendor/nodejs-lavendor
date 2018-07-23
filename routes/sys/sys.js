/**
 * Created by admin on 2018/5/24.
 */
var express = require('express'),
    router = express.Router(),
    sysServices = require('../../model/sys/sys_services');

/**
 * 跳转到系统列表页
 */
router.get('/',function(req,res){
    res.render('app/sys/sys_list');
});

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
        sys_status:body.sys_status
    };
    sysServices.addSys(params).then(function(r){
        res.send({success:true,msg:r})
    }).catch(function(err){
        res.send({success:false,msg:err});
    })
});


module.exports = router;

