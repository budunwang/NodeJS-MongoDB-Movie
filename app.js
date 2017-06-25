const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const moment = require('moment');
const index = require('./routes/index');

let app = express();

// 数据库url
const db_url = 'mongodb://localhost:27017/db_Movie';
// 数据库连接
mongoose.connect(db_url);

// 引入moment函数
app.locals.moment = moment;

// 设置view位置
app.set('views', path.join(__dirname, './views/pages'));
// 设置view模板引擎
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// post请求解码
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));
// 设置session数据库持久化
app.use(session({
    secret: 'movie',
    store: new mongoStore({
        url: db_url,
        collection: 'sessions'
    })
}));
// router路由过滤索引
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

//开发环境配置
if( 'development' === app.get('env')) {
    // 提示错误
    app.set('showStackError', true);
    // 错误显示形式
    app.use(logger(':method :url :status'));
    // 前端页面代码不压缩
    app.locals.pretty = true;
    // mongoose代码显示
    mongoose.set('debug', true);
}

module.exports = app;
