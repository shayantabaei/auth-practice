const mongoose = require('mongoose');

// Accessing mongoose schema
const Schema = mongoose.Schema;

// Creating a new user schema that has email & password string types
const userSchema = new Schema({
    email: String,
    password: String
});

// exporting the model (nameOfModel, the associated schema, collection on mLab)
module.exports = mongoose.model('user', userSchema, 'users');