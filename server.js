var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var usersModel     =   require("./models/users");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});


router.route("/users")
    .get(function(req,res){
        // var response = {};
        // usersModel.find({},function(err,data){
        // // Mongo command to fetch all data from collection.
        //     if(err) {
        //         response = {"error" : true,"message" : "Error fetching data"};
        //     } else {
        //         response = {"error" : false,"message" : data};
        //     }
        //     res.json(response);
        // });

        var query = {
            email : req.param('email'),
            password : req.param('password')
        }
        //console.log('Before getUsers');
        usersModel.getUsers(query,function(err,users){
            if (err){
                //console.log('before 500');
                res.status(500).send(err.message);
            }
            else if(users == undefined || users == null ){
                res.status(404).json({ message: 'User not found' })
            }
            else{
                res.status(200).json(users);
            }
        });



    })

    .post(function(req,res){
        var response = res;
        //console.log(req.body);
        usersModel.createUser(req, function (err){
            if(err)
                res.status(500).send(err.message);
            else
                res.status(201).json({ message: 'User created!' });
        });
        //var db = new usersModel();
        // var response = res;
        // // fetch email and password from REST request.
        // // Add strict validation when you use this in Production.
        
        // db.userEmail = req.body.email; 
        // // Hash the password using SHA1 algorithm.
        // db.userPassword =  require('crypto')
        //                   .createHash('sha1')
        //                   .update(req.body.password)
        //                   .digest('base64');
        
        // db.save(function(err){
        // // save() will run insert() command of MongoDB.
        // // it will add new data in collection.
        //     if(err) {
        //         response = {"error" : true,"message" : "Error adding data"};
        //     } else {
        //         response = {"error" : false,"message" : "Data added"};
        //     }
        //     res.json(response);
        // });
    });

router.route("/users/:user_id")
    .get(function(req,res){
        usersModel.getUser(req,function(err,user){
            console.log(user);
            if (err){
                res.status(500).send(err.message);
            }
            else if(user == undefined || user == null || user == []){
                res.status(404).json({ message: 'User not found' })
            }
            else{
                res.status(200).json(user);
            }
        });
    })

    .put(function(req, res) {
        usersModel.updateUser({email:req.params.user_id},req.body,function(err,user){
            //console.log("Err: "+JSON.stringify(err, ["message", "arguments", "type", "name"]));
            if (err){
                res.status(500).send(err.message);
            }
            else if(user == undefined || user == null  ){
                res.status(404).json({ message: 'User not found' });
            }
            else{
                res.status(204).send();
            }
        });
    })

    .delete(function(req, res) {
        usersModel.deleteUser(req,function(err){
            if (err)
                res.status(500).send(err.message);
            else
                res.status(200).json({ message: 'User deleted' });
        });
    });

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");

var http = require ('http');
var mongoose    =   require("mongoose");
//mongoose.connect('mongodb://localhost:27017/users');
var connection_uri = process.env.MONGODB_URI || 'mongodb://cmpe295a:chandra3295a@ds143330.mlab.com:43330/healthcare-system';

mongoose.connect(connection_uri, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + connection_uri + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + connection_uri);
  }
});

