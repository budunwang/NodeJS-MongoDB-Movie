const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');

let User = mongoose.model('User', UserSchema);

module.exports = User;