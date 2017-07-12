/**
 * Created by yanghao on 2017/7/8.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('role/config');
});

module.exports = router;