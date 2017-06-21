const express = require('express');

let movie_controller = require('../controllers/movieController');
let router = express.Router();

router.get('/',movie_controller.index);
router.get('/admin/list', movie_controller.list);
router.get('/movie/:id', movie_controller.detail);
router.get('/admin/movie', movie_controller.admin);
router.post('/admin/movie/new', movie_controller.newMovie);
router.get('/admin/update/:id', movie_controller.update);
router.delete('/admin/list', movie_controller.listDelte);

module.exports = router;
