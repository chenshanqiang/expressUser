var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* 连接数据库 */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'chenshanqiang'
});
connection.connect();


/* GET home page. */
router.post('/', function(req, res) {
    var user_login = req.body.user,
        user_pwd = req.body.pwd;
    console.log(user_login);
    console.log(user_pwd);
    if (user_login == '') {
        res.end('用户不能为空！');
    }
    if (user_login != 'admin') {
        res.end('用户不存在！');
    }
    res.end('1');
});

router.get('/main', function(req, res) {
    var sql = 'select * from user';
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.render('user', {
            layout: false,
            title: "用户信息",
            personInfoList: result
        });
    });
});

// 修改数据
router.post('/update', function(req, res) {
    var sql = 'select * from user where user_id= ' + req.body.userId;
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.send(result);
    });

});

router.post('/update_submit', function(req, res) {
    var id = req.body.id,
        name = req.body.name,
        age = req.body.age,
        gender = req.body.gender,
        phonenum = req.body.phonenum,
        address = req.body.address;
    var sql = 'UPDATE user SET user_name = "' + name + '",\
    user_age=' + age + ' ,user_gender= "' + gender + '", user_phone = "' + phonenum + '", \
    user_address = "' + address + '" WHERE user_id = ' + id;
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[update error] - ', err.message);
            return;
        }
        res.send('数据更新成功！');
    });
});
// 删除home paper页面数据
router.post('/del_main_data', function(req, res) {
    var sql = 'DELETE FROM user WHERE user_id = ' + req.body.userId;
    // 执行sql语句
    connection.query(sql, function(err, result) {
        if (err) {
            return;
        }
        res.send('删除成功!');
    });
});
//main paper 提交数据
router.post('/add_user_data', function(req, res) {
    // 数据插入sql语句
    var sql = 'INSERT INTO user (user_name,user_age,user_gender,user_phone,user_address) \
                VALUES ("' + req.body.name + '","' + req.body.age + '","' + req.body.gender +
        '","' + req.body.phonenum + '","' + req.body.address + '")';
    // 执行sql语句
    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }
        res.send('1');
    });
});
module.exports = router;