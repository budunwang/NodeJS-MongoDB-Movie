const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    title: String,
    director: String,
    country: String,
    language: String,
    poster: String,
    flash: String,
    year: Number,
    summary: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

// hook函数，AOP编程，在存储save前自动执行
// 修改创建时间和更新时间
MovieSchema.pre('save', (next) => {
    this.meta.updateAt = Date.now();
    if(this.isNew) {
        this.meta.createAt = Date.now();
    }
    next();
});

MovieSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
};

module.exports = MovieSchema;

