/**
 * Created by Administrator on 2018/7/14.
 */
var express = require('express'),
    router = express.Router();


/**
 * 仪表盘页面
 */
router.get('/', function (req, res) {
    res.render('dashboard/dashboard');
});

module.exports = router;