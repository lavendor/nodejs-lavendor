/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();

/**
 * 登陆页面
 */
router.get('/',function(req,res){
    res.render('user/user_list');
});



module.exports = router;