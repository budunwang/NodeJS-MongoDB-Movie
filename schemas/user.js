const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let UserSchema = new mongoose.Schema({
   name: {
        unique: true,
        type: String
   },
    password: {
        unique: true,
        type: String
    },
    // 根据数字定义用户权限
    // 0: Normal User
    // 1: Verified User
    // 2: Professor User
    // >10: admin
    // >50: super admin
    role: Number,
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

// 此处不使用箭头函数，this应该指向调用它的函数，所以不能使用箭头函数进行绑定
UserSchema.pre('save', function(next){
    let _user = this;
    this.meta.updateAt = Date.now();
    if(this.isNew) {
        this.meta.createAt = Date.now();
    }
    // 密码加盐
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
            return next(err);
        }

        // 产生随机数（加盐）
        bcrypt.hash(_user.password, salt, function(err, hash){
            if(err) {
                return next(err);
            }
            // 生成加盐后的密码，赋值给原密码
            _user.password = hash;
            next();
        });
    });
});

// 实例方法调用
UserSchema.methods = {
    // bcrypt密码匹配比较
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, (err, result) => {
           if(err) {
               return cb(err, null);
           }
           return cb(null, result);
        });
    }
};

// 静态方法调用
UserSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
};

module.exports = UserSchema;
