const express = require('express');

let movie_controller = require('../controllers/movieController');
let user_controller = require('../controllers/userController');
let comment_controller = require('../controllers/commentController');
let router = express.Router();

// route过滤器
// 将session中的user存为locals中的user，header显示页面根据user来决定显示内容
router.use(function(req, res, next) {
    let _user = req.session.user;
    if(_user) {
        req.app.locals.user = _user;
    } else {
        req.app.locals.user = undefined;
    }
    next();
});

router.get('/',movie_controller.index);
router.get('/movie/:id', movie_controller.detail);

router.get('/admin/movie/list', user_controller.signinRequire, user_controller.adminRequire, movie_controller.list);
router.get('/admin/movie', user_controller.signinRequire, user_controller.adminRequire, movie_controller.admin);
router.post('/admin/movie/new', user_controller.signinRequire, user_controller.adminRequire, movie_controller.newMovie);
router.get('/admin/movie/update/:id', user_controller.signinRequire, user_controller.adminRequire, movie_controller.update);
router.delete('/admin/movie/list', user_controller.signinRequire, user_controller.adminRequire, movie_controller.delete);

router.post('/user/signup', user_controller.signup);
router.post('/user/signin', user_controller.signin);
router.get('/signup', user_controller.showSignUp);
router.get('/signin', user_controller.showSignIn);
router.get('/user/logout', user_controller.logout);
router.get('/admin/user/list', user_controller.signinRequire, user_controller.adminRequire, user_controller.userList);

router.post('/admin/comment', user_controller.signinRequire, comment_controller.save);

module.exports = router;
