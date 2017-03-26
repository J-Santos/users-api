// var mongoose    =   require("mongoose");
// // mongoose.connect('mongodb://localhost:27017/users');
// // create instance of Schema
// var mongoSchema =   mongoose.Schema;
// // create schema
// var userSchema  = {
//     "userEmail" : String,
//     "userPassword" : String
// };
// // create model if not exists.
// module.exports = mongoose.model('userLogin',userSchema);

var userModel = require('../schemas/user');
var User = userModel.User;

exports.createUser = function (req,callback){
	var user = new User(req.body);
	//console.log(req.body);
    user.save(function(err) {
        callback(err);
    });
}

// exports.getUsers = function (req,callback){
// 	mongoOp.find({},function(err,data){
//         // Mongo command to fetch all data from collection.
//             if(err) {
//                 response = {"error" : true,"message" : "Error fetching data"};
//             } else {
//                 response = {"error" : false,"message" : data};
//             }
//             res.json(response);
//         });
// }


exports.getUsers = function (query,callback){
	User.find({},function(err, users) {
		callback(err,users)
	});
	// if(JSON.stringify(query) != '{}'){
	// 	console.log("Query found");
	// 	User.find({visibility : {$in : ['public','friends-only']}, email : {$ne : query.email}}).or([{nick_name : new RegExp(query.search, 'i')}, {interests : new RegExp(query.search, 'i')}]).exec(function(err, users) {
	// 		callback(err,users)
	// 	});
	// }else{
	// 	User.find({visibility : {$in : ['public','friends-only']}},function(err, users) {
	// 		callback(err,users)
	// 	});
	// }
	
}

exports.getUser = function (req, callback){
	//console.log("User id: ",req.params.user_id);
	User.findOne({'email': req.params.user_id}).exec(function(err, user) {
        callback(err,user);
    });
}

exports.updateUser = function (query, conditions,callback){
	//console.log("User body: "+JSON.stringify(conditions));
	User.findOne(query,function(err,user){	
		if(err){
			return callback(err,null);
		}
		else if(user == null){
			return callback(new Error("User not found"),null );
		}
		
		for (var key in conditions){
			if(key == 'email'){
				return callback(new Error('Email is unique and cannot be modified'), null)
			}
			user[key] = conditions[key];
		}
		user.save(callback(err, user));
	});
}

exports.deleteUser = function (req,callback){
	User.remove({email : req.params.user_id}, function(err) {
            callback(err);
    });
}





