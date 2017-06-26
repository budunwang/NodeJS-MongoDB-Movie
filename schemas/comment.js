const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let CommentSchema = new mongoose.Schema({
    movie: {
        type: ObjectId,
        ref: 'Movie'
    },
    from: {
        type: ObjectId,
        ref: 'User'
    },
    to: {
        type: ObjectId,
        ref: 'User'
    },
    reply: [{
        from: {
            type: ObjectId,
            ref: 'User'
        },
        to: {
            type: ObjectId,
            ref: 'User'
        },
        content: String
    }],
    content: String,
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

CommentSchema.pre('save', function(next){
    this.meta.updateAt = Date.now();
    if(this.isNew) {
        this.meta.createAt = Date.now();
    }
    next();
});

CommentSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
};

module.exports = CommentSchema;
