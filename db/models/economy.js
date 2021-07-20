const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mngs =mongoose.model("Economy", 
 new Schema({
 userID: {type: String},
money: {type: Number}

}))
module.exports = mngs