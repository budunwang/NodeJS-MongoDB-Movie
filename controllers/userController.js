const User = require('../models/user');

// 登陆过滤器
exports.signinRequire = function(req, res, next) {
    if(!req.session.user) {
        return res.redirect('/signin');
    }
    next();
}

// 权限过滤器
exports.adminRequire = function(req, res, next) {
    let user = req.session.user;
    // 小于权限10的用户返回登陆页面
    if(!user.role || user.role <= 10) {
        return res.redirect('/signin');
    }
    next();
}

// 新注册页面
exports.showSignUp = function(req, res) {
    res.render('signup', {
        title: 'Sign up'
    });
}

// 新登录页面
exports.showSignIn = function(req, res) {
    res.render('signin', {
        title: 'Sign in'
    })
}

// 注册页面
exports.signup = function(req, res) {
    let _user = req.body.user;
    User.find({'name': _user.name}, (err, result) => {
       if(err) {
           console.log(err);
       }
       // 用户名存在
       if(result && result.length > 0) {
           return res.redirect('/signup');
       } else {
           let user = new User(_user);
           user.save((err, user) => {
               if(err) {
                   console.log(err);
               }
               return res.redirect('/signin');
           });
       }
    });
};

// 登录页面
exports.signin = function(req, res) {
    let _user = req.body.user;
    let name = _user.name;
    let password = _user.password;
    User.findOne({name: name}, (err, user) => {
        if(err) {
            console.log(err);
        }
        // 数据库中不存在该用户
        if(user === null) {
            // console.log("Not exist");
            return res.redirect("/signup");
        } else {
            // 查询用户名密码是否匹配
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                }
                if (isMatch) {
                    req.session.user = user;
                    // console.log("Pass");
                    return res.redirect("/");
                } else {
                    // console.log("Fail");
                    return res.redirect("/signin");
                }
            });
        }
    });
}

// user显示列表
exports.userList = function(req, res) {
    User.fetch((err, users) => {
        if(err) {
            console.log(err);
        }
        res.render('userList', {
            title: 'User list',
            users: users
        });
    });
}

// 登出
exports.logout = function(req, res) {
    req.session.user = undefined;
    res.redirect('/');
}