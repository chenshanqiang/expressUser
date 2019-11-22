var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {
        layout: false,
        title: "用户登录"
            // personInfoList: result
    });
});
module.exports = router;