const Movie = require('../models/movie');
const _ = require('underscore');

// admin 后台管理页
// admin/movie
exports.admin = function(req, res) {
    res.render('admin', {
        title: 'Movie Admin',
        movie: {
            title: '',
            director: '',
            country: '',
            language: '',
            year: '',
            poster: '',
            flash: '',
            summary: ''
        }
    });
}

// detail 电影详情页
// movie/:id
exports.detail = function(req, res) {
    let id = req.params.id;
    Movie.findById(id, (err, movie) => {
        if(err) {
            console.log(err);
        } else {
            res.render('detail', {
                title: movie.title,
                movie: movie
            });
        }
    });
}

// index 索引页
// 显示电影列表
exports.index = function(req, res) {
    Movie.fetch((err, movies) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Movie page',
                movies: movies
            });
        }
    });
}

// list 列表页
// admin/movie/list
exports.list = function(req, res) {
    Movie.fetch((err, movies) => {
        if(err) {
            console.log(err);
        } else {
            res.render('list',{
                title: 'list',
                movies: movies
            });
        }
    });
}

// 从数据库中删除电影
// 向list列表返回success，进行删除
exports.delete = function(req, res) {
    let id = req.query.id;
    if(id){
        Movie.remove({_id: id}, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
}

// 上传新电影信息
// /admin/movie/new
// 返回到新电影的详细页
exports.newMovie = function(req, res) {
    let id = req.body.movie._id;
    let movieObj = req.body.movie;
    let _movie;
    //电影已经存在
    if (id !== 'undefined' && id !== '') {
        Movie.findById(id, (err, movie) => {
            if (err) {
                console.log(err);
            }
            //更新数据
            _movie = _.extend(movie, movieObj);
            _movie.save((err, movie) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {
        //上传新的movie到数据库
        _movie = new Movie({
            title: movieObj.title,
            director: movieObj.director,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            flash: movieObj.flash,
            poster: movieObj.poster,
            summary: movieObj.summary
        });
        _movie.save((err, movie) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/movie/' + movie._id);
            }
        });
    }
}

// 更新电影信息，进入admin后台页
// /admin/movie/update/:id
exports.update = function(req, res) {
    let id = req.params.id;
    if(id) {
        Movie.findById(id, (err, movie) => {
            res.render('admin', {
                title: 'Movie Admin',
                movie: movie
            });
        });
    }
}