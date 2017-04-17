var ejs=require("ejs");
var http=require("http");
var mongo=require("./mongo");

exports.registeruser=function (req,msg,callback) {
try{
    var res={};
    console.log("inside registeruser.js");
    console.log(msg);
    var firstname=msg.firstname;
    var lastname=msg.lastname;
    var email=msg.email;
    var password=msg.password;
    console.log(firstname);
    var activation=1;
    var adduser;
    var query="select * from users where email='"+msg.email+"'";
    adduser="INSERT INTO users(`fname`,`lname`,`email`,`password`,`activation`) VALUES ('"+msg.firstname+"','"+msg.lastname+"','"+msg.email+"',SHA('"+msg.password+"'),'"+activation+"')";
    console.log("adduser query"+adduser);
    mongo.fetchData(function(err,result){
    if(err){
        throw err;
    }else{
        console.log(result.length);
        if(result.length>0){
            //duplicate user
            res.code=400;
            callback(req,res);
        }else{
            mongo.fetchData(function(err,result1){
                if(err){
                    throw err;
                }else{
                    console.log(result1.affectedRows>0);
                    if(result1.affectedRows>0){
                        res.code=200;
                        callback(req,res);
                    }else{
                        //couldnt be added
                        res.code=404;
                        callback(req,res);
                    }
                }
            },adduser);
        }
    }},query);
}
catch(e)
{
    var res={};
    res.statusCode=404;
    res.message="Server could not server the request";
    callback(null,res);
}
};
