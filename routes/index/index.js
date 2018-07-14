/**
 * Created by Administrator on 2018/7/14.
 */
var express = require('express'),
    router = express.Router();

/**
 * 到index页面
 */
router.get('/', function (req, res) {
    res.render('index/index');
});


module.exports = router;