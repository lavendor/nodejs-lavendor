/**
 * Created by Administrator on 2018/7/14.
 */
var express = require('express'),
    router = express.Router();

/**
 * 到index页面
 * 初始化菜单
 */
router.get('/', function (req, res) {
    res.render('app/index/index');
});


module.exports = router;