const Comment = require("../models/comment");

exports.save = function(req, res) {
    let _comment = req.body.comment;
    let movieId = _comment.movie;
    // 点击评论的id
    // 如果点击评论的id不存在，即是新的评论
    // 如果点击评论的id存在，即是回复评论
    if(_comment.cid) {
        Comment.findById(_comment.cid, (err, comment) => {
           let reply = {
               from: _comment.from,
               to: _comment.tid,
               content: _comment.content
           };
           if(!comment.reply) {
               comment.reply = [];
           }
           comment.reply.push(reply);
           comment.save((err, comment) => {
              if(err) {
                  console.log(err);
              }
              return res.redirect('/movie/' + movieId);
           });
        });
    } else {
        // 新评论
        let comment = new Comment(_comment);
        comment.save((err, comment) => {
            if(err) {
                console.log(err);
            }
            return res.redirect('/movie/' + movieId);
        });
    }
}

