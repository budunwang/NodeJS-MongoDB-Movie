const mongoose = require('mongoose');
const CommentSchema = require('../schemas/comment');

let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
