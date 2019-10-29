const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: Schema.Types.String, unique: true, required: true },
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
    isAdmin: { type: Schema.Types.Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);