var mongoose    =   require("mongoose");
//var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = new mongoose.Schema({
    "email" : String,
    "password" : String
});
// create model if not exists.
exports.User = mongoose.model('User', userSchema);
//module.exports = mongoose.model('userLogin',userSchema);