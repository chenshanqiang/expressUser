// 加载处理错误的中间件
var createError = require('http-errors');
// express框架
var express = require('express');
// 处理路径模块
var path = require('path');
/* 
 *node.js 中间件， 用于处理 enctype = "multipart/form-data"（
 *设置表单的MIME编码） 的表单数据。
 */
var multer = require('multer');
// 处理cookie中间件
var cookieParser = require('cookie-parser');
// 处理访问日志中间件
var logger = require('morgan');
// 引入express-handlebars模块
var exphbs = require('express-handlebars');
// 路由文件
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
// node.js 中间件， 用于处理 JSON, Raw, Text 和 URL 编码的数据。
var bodyParser = require('body-parser');


// 使用express的入口文件
var app = express();

// view engine setup
// 设置模块引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('html', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.html'
}));
app.set('view engine', 'html');


// 使用访问处理日志中间件
app.use(logger('dev'));
//处理post请求中  把post请求的数据 读取处理 放在req
app.use(express.json());

/* extended， 其决定了允许解析的请求体（ req.body） 内容。
当extended的值为false时， req.body的内容可以为字符串
或者数组， 当extended的值为true时， req.body的内容可以
为任何类型的数据 */
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
// app.use(multer());
//处理cookie
app.use(cookieParser());

//静态资源托管中间件
app.use(express.static('public'));
app.use(express.static('node_modules'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(bodyParser.urlencoded({ extended: false }));

//使用路由
app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;