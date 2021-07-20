const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mngs =mongoose.model("Weapon", 
 new Schema({
 userID: {type: String},
weapons: {type: Array}

}))
module.exports = mngs