const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mngs =mongoose.model("Lang", 
 new Schema({
 userID: {type: String},
lang: {type: String, default: "ES"}

}))
module.exports = mngs