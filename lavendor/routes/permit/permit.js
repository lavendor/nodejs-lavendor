/**
 * Created by Administrator on 2018/7/14.
 */

var express = require('express'),
    router= express.Router();

/**
 * 跳转到权限页面
 */
router.get('/',function(req,res){
    res.render('app/permit/permit_list');
})

module.exports = router;