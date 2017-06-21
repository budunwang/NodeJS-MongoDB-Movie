const mongoose = require('mongoose');
const MovieSchema = require('../schemas/movie');

let Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;