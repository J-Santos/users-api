var mongoose    =   require("mongoose");

var appointmentSchema  = new mongoose.Schema({
	"patient_id": {type: String},
	"doctor_id": {type: String},
	"date": {type: String},
	"time": {type: String},
	"location":{
		"place": {type: String},
		"phone_number": {type: String},
		"address":{
			"street": {type: String},
			"city": {type: String},
			"state": {type: String},
			"county": {type: String},
			"country": {type: String},
		}
	}
});

exports.Appointment = mongoose.model('Appointment', appointmentSchema);