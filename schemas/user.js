var mongoose    =   require("mongoose");
//var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = new mongoose.Schema({
    "email" : String,
    "password" : String,
    "user_type": String,
    "patient_id": String,
    "family_patient_id": String,
    "name": {
    	"first_name": String,
    	"last_name": String
    },
    "phone_number": String,
    "address": {
    	"street": String,
    	"city": String,
    	"state": String,
    	"county": String,
    	"country": String,
    },
    "medical_record":{
    	"patient_id": String,
    	"gender": String,
    	"age": Number,
    	"weight": Number,
    	"doctor": String,
    	"past_diagnosis": [String],
    	"current_diagnosis": [String],
    	"family_history": [String],
    	"prescriptions": [String],
    	"upcoming_appts":{
    		"patient_id": String,
    		"doctor_id": String,
    		"date": String,
    		"time": String,
    		"location":{
    			"place": String,
    			"phone_number": String,
    			"address":{
    				"street": String,
    				"city": String,
    				"state": String,
    				"county": String,
    				"country": String
    			}
    		}
    	}
    }
});
// create model if not exists.
exports.User = mongoose.model('User', userSchema);