const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mngs =mongoose.model("Cooldown", 
 new Schema({
 userID: {type: String},
vote: {type: Number},
daily: {type: Number},
weekly: {type: Number},
monthly: {type: Number}

}))
module.exports = mngs